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
  const userinfo = useSelector((store) => store.userData);
  const [isclicked, setisclick] = useState(false);
  const [clickedlist, setclickedlist] = useState([]);
  const [cardlist, setCardlist] = useState([]);
  const [userName, setUserName] = useState(null);

  console.log("여기!!!!!!!!!!!!!!!!!!");
  console.log(userinfo);

  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setclickedlist((prev) => [...prev, data.clicked]);
      console.log("여기다!!!!!!!!!!!!!!!!!!");
      console.log("User ID: ", event.from.connectionId);
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

  useEffect(() => {
    if (!host) {
      const num = _.sampleSize(_.range(1, 9), 8);

      console.log("데이터 보내는 곳", num);
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
      console.log("여기다!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(e.target.id);
      // setUserName(data);
      // console.log("User Name: ", userName);
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
                {!clickedlist.includes(lotto.chanceId) ? (
                  <div
                    className={styles.front}
                    onClick={handleclick}
                    id={lotto.chanceId}
                  >
                    앞면
                  </div>
                ) : (
                  <div
                    className={styles.back}
                    onClick={handleclick}
                    id={lotto.chanceId}
                  >
                    {lotto.item}
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
                  >
                    앞면
                  </div>
                ) : (
                  <div
                    className={styles.back}
                    onClick={handleclick}
                    id={lotto.chanceId}
                  >
                    {lotto.item}
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
