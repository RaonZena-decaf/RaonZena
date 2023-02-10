import { LottoList } from "./LottoList";
import React, { useState, useEffect } from "react";
import styles from "./Lotto.module.css";
import _ from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";

function Lotto({ start, result, openvidu, host }) {
  const baseUrl = useSelector((store) => store.baseUrl);
  const [isclicked, setisclick] = useState(false);
  const [clickedlist, setclickedlist] = useState([]);
  const [cardlist, setCardlist] = useState([]);
  useEffect(() => {
    const audio = new Audio();
    audio.src = "../music/Little Fish.mp3";
    audio.play();
    return () => {
      audio.pause();
    }
  },[]);
  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setclickedlist((prev) => [...prev, data.clicked]);
    });
  }

  openvidu.session.on("signal:SeedNumber", (event) => {
    const num = JSON.parse(event.data);
    console.log("받은거", typeof num, num);
    console.log(baseUrl);
    axios({
      method: "GET",
      url: `${baseUrl}games/gameType/chanceGame`,
      data: num,
    })
      .then((res) => {
        console.log(res.data);
        setCardlist(res.data);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    if (!host) {
      const num = _.sampleSize(_.range(1, 9), 8);

      openvidu.session.signal({
        data: JSON.stringify(num),
        type: "SeedNumber",
      });
    }
  }, []);

  const handleclick = (e) => {
    if (isclicked) {
      return;
    } else {
      const data = {
        clicked: e.target.id,
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
      <div className={styles.fadeoutbox}>시이이이이자아아아악하겠습니다!!!</div>
      <div className={styles.container}>
        {cardlist.slice(0, 4).map((lotto, idx) => {
          return (
            <div key={idx} className={styles.flip}>
              <div className={styles.card}>
                {!clickedlist.includes(lotto) ? (
                  <div
                    className={styles.front}
                    onClick={handleclick}
                    id={lotto}
                  >
                    앞면
                  </div>
                ) : (
                  <div className={styles.back} onClick={handleclick} id={lotto}>
                    {lotto}
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
                {!clickedlist.includes(lotto) ? (
                  <div
                    className={styles.front}
                    onClick={handleclick}
                    id={lotto}
                  >
                    앞면
                  </div>
                ) : (
                  <div className={styles.back} onClick={handleclick} id={lotto}>
                    {lotto}
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
