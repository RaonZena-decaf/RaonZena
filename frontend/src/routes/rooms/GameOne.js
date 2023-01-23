import React, { useEffect, useState } from "react";
import ScoreBoard from "../../components/game/scoreboard"
import CatchMind from "../../components/game/catchmind"


function GameOne() {

  return (
    <div>
        <div>
        <h1>캐치 마인드</h1>
        <div>
            <div>
                <CatchMind />
            </div>
            <div>
                <ScoreBoard />
            </div>
            <div>
                <form>
                <input type="text" placeholder="정답을 입력해 주세요"></input>
                <button type="submit">제출</button>
                </form>
                <button>게임<br/>종료</button>
            </div>
        </div>

        <div> 
            {/* 반복 6번 */}
            <div>
                Chatting 
            </div>
            <div>
                Camera
            </div>
        </div>

        </div>
        <footer>Footer</footer>
    </div>
  );
}

export default GameOne;
