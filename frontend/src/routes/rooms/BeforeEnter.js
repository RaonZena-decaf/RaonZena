import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { Component } from "react";
import style from "./beforeenter.module.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/navbar";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
  FaUser,
} from "react-icons/fa";
import VideoContainer from "../../components/camera/NoneVideo";
const APPLICATION_SERVER_URL = "http://localhost:5000/";
class BeforeEnter extends Component {
  constructor(props) {
    super(props);
    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      mic: true,
      camera: true,
    };
    this.goBack = this.goBack.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.cameraSet = this.cameraSet.bind(this);
    this.micSet = this.micSet.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }
  cameraSet(e) {
    console.log(e.target)
    this.setState({
      camera: true,
    });
  }
  micSet() {
    this.setState({
      mic: false,
    });
  }
  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }
  render() {
    const myUserName = this.state.myUserName;
    const mysessionId = this.state.mysessionId;
    const mic = this.state.mic;
    const camera = this.state.camera;
    return (
      <div className={style.background}>
        <Navbar />
        <div className={style.container}>
          <div className={style.innercontainer}>
            <div className={style.leftcontainer}>
              <h2 className={style.header}>
                <span>{mysessionId}</span>에 참가 준비 중 입니다
              </h2>
              <div className={style.bottom}>
                <div className={style.textcont}>
                  <FaUser className={style.highlight} /> 현재 {myUserName}
                  /6 명이 방에 있습니다
                </div>
                <div className={style.textcont}>
                  카메라와 마이크 권한을 요청합니다. <br />
                  요청 메세지를 확인하여 주세요.
                </div>
                <div className={style.textcont}>
                  만약 오류가 발생하였을 경우, <br /> 홈 화면으로 이동 후 재접속
                  하시기 바랍니다
                </div>
              </div>
              <button onClick={this.goBack}>나가기</button>
            </div>

            <div className={style.rightcontainer}>
              <VideoContainer />
              <div className={style.accessory}>
                {mic ? (
                  <FaMicrophoneAlt onClick={this.micSet} />
                ) : (
                  <FaMicrophoneAltSlash onClick={this.micSet} />
                )}

                {camera ? (
                  <FaVideo onClick={this.cameraSet}/>
                ) : (
                  <FaVideoSlash onClick={this.cameraSet} />
                )}
              </div>
              <button className={style.enter} onClick={this.joinSession}>
                Enter
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default BeforeEnter;
