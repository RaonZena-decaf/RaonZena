import React, { useState, useEffect } from "react";

const App = () => {
  const [webcam, setWebcam] = useState();
  const [start, setStart] = useState(false);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    // Load the webcam
    async function loadWebcam() {
      const webcam = await tmImage.fromCamera(0);
      setWebcam(webcam);
    }
    loadWebcam();
  }, []);

  const predict = async () => {
    // Get the prediction from the Teachable Machine model
    const prediction = await model.predict(webcam.canvas);
    const label = prediction.className;
    const confidence = prediction.confidence;

    // Check if the confidence score is higher than the current highscore
    if (confidence > highscore) {
      setHighscore(confidence);
    }

    // Stop the loop if the highscore is above a certain threshold
    if (highscore >= 0.8) {
      setStart(false);
    }
  };

  // Start or stop the loop
  const toggleLoop = () => {
    setStart(!start);
  };

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        webcam.update();
        predict();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [start, webcam]);

  return (
    <div>
      <button onClick={toggleLoop}>
        {start ? "Stop" : "Start"}
      </button>
      <p>Highscore: {highscore}</p>
      <canvas ref={webcam.canvas} />
    </div>
  );
};

export default App;