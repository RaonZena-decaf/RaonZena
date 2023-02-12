import React, { Component } from "react";
import style from "./ovVideo.module.css";
export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      nickname: this.props.nickname,
    };
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div className={style.webcamCapture}>
        <video
          autoPlay={true}
          ref={this.videoRef}
          width="100%"
          height="100%"
          id={this.state.nickname}
        />
        ;<span className={style.username}>{this.state.nickname}</span>
      </div>
    );
  }
}
