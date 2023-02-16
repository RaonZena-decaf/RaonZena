import { LottoList } from "./LottoList";
import React, { useState, useEffect } from "react";
import styles from "./Lotto.module.css";
import _, { lastIndexOf } from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
import { data, string } from "@tensorflow/tfjs";
import { store } from "../../app/store";

function Lotto({ start, result, openvidu, host }) {
  const baseUrl = useSelector((store) => store.baseUrl);
  const userName = useSelector((store) => store.userData.userName);
  const userNo = useSelector((store) => store.userData.userNo);
  const [isclicked, setisclick] = useState(false);
  const [clickedlist, setclickedlist] = useState([]);
  const [cardlist, setCardlist] = useState([]);
  useEffect(() => {
    const audio = new Audio();
    audio.src = "../music/Little Fish.mp3";
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (openvidu.session) {
      openvidu.session.on("signal:TrueAnswer", (event) => {
        const data = JSON.parse(event.data);
        setclickedlist((prev) => [...prev, data.clicked]);
      });
    }

    openvidu.session.on("signal:SeedNumber", (event) => {
      const encodedRandomNo = encodeURIComponent(event.data);

      axios({
        method: "GET",
        url: `${baseUrl}games/gameType/chanceGame?randomNo=${encodedRandomNo}`,
      })
        .then((res) => {
          setCardlist(res.data);
        })
        .catch((error) => console.log(error));
    });
    if (host) {
      const num = _.sampleSize(_.range(1, 40), 8);
      openvidu.session.signal({
        data: JSON.stringify(num),
        type: "SeedNumber",
      });
    }

    // return () => {
    //   openvidu.session.off("signal:TrueAnswer")
    //   openvidu.session.off("signal:SeedNumber")
    // }
  }, []);

  const handleclick = (e) => {
    if (isclicked) {
      return;
    } else {
      const data = {
        userNo,
        userName,
        clicked: e.target.id,
        gamename: "joker",
      };
      openvidu.session.signal({
        data: JSON.stringify(data),
        type: "TrueAnswer",
      });
      setisclick(true);
    }
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {cardlist.slice(0, 4).map((lotto, idx) => {
          return (
            <div key={idx} className={styles.flip}>
              <div className={styles.card}>
                {!clickedlist.includes(lotto.chanceId) ? (
                  <div
                    className={styles.front}
                    onClick={handleclick}
                    id={lotto.chanceId}
                    style={{
                      backgroundImage: `url(/CardImg/card${idx + 1}.png)`,
                    }}
                  ></div>
                ) : (
                  <div
                    className={styles.back}
                    onClick={handleclick}
                    id={lotto.chanceId}
                    style={{
                      backgroundImage: `url(/CardImg/card9.png)`,
                    }}
                  >
                    <div className={styles.img}>{lotto.item}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.container}>
        {cardlist.slice(4, 9).map((lotto, idx) => {
          return (
            <div key={idx} className={styles.flip}>
              <div className={styles.card}>
                {!clickedlist.includes(lotto.chanceId) ? (
                  <div
                    className={styles.front}
                    onClick={handleclick}
                    id={lotto.chanceId}
                    style={{
                      backgroundImage: `url(/CardImg/card${idx + 1}.png)`,
                    }}
                  ></div>
                ) : (
                  <div
                    className={styles.back}
                    onClick={handleclick}
                    id={lotto.chanceId}
                    style={{
                      backgroundImage: `url(/CardImg/card9.png)`,
                    }}
                  >
                    <div className={styles.img}>{lotto.item}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Lotto;
