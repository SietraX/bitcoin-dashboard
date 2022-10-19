import * as React from "react";
import { formatTime } from "../../utils/timeUtils";
import { adjustmentButtons } from "./buttonConfig";

import "./style.css";

const DEFAULT_TIME_VALUE = 36000;
const SECOND_IN_MS = 1000;

const Timer = () => {
  const [time, setTime] = React.useState(DEFAULT_TIME_VALUE);
  const [pause, setPause] = React.useState(false);

  const handleAdjustmentClick = (event) => {
    const adjustmentValue = parseInt(event.target.dataset.adjustmentValue, 10);
    if (
      (adjustmentValue < 0 && time > -1 * adjustmentValue) ||
      adjustmentValue > 0
    ) {
      setTime((time) => time + adjustmentValue);
    }
  };

  React.useEffect(() => {
    if (!pause) {
      const timeoutId = setInterval(() => {
        setTime((timeValue) => timeValue - 1);
      }, SECOND_IN_MS);

      return () => clearInterval(timeoutId);
    }
  }, [pause]);

  const handlePause = () => {
    setPause((pause) => !pause);
  };

  const handleReset = () => {
    setTime(DEFAULT_TIME_VALUE);
    setPause(true);
  };

  return (
    <>
      <div className="timer-value">{formatTime(time)}</div>
      <div className="buttons-container">
        {adjustmentButtons.map((adjustmentButton) => (
          <button
            className="adjustment-button"
            data-adjustment-value={adjustmentButton.value}
            onClick={handleAdjustmentClick}
            key={adjustmentButton.id}
          >
            {adjustmentButton.text}
          </button>
        ))}
      </div>
      <div className="kick-buttons-container">
        <div className="kick-button">
          <button className="kick-button-start" onClick={handlePause}>
            {pause ? "Start" : "Pause"}
          </button>
          <button className="kick-button-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
