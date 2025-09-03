import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Clock = ({ fontFamily = "Arial", fontColor = "white" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //unmount clear interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="clock"
      style={{
        padding: "20px",
        border: "3px solid rgba(0,0,0,0.6)",
        borderRadius: "9px",
        fontSize: "2rem",
        userSelect: "none",
        fontFamily: fontFamily,
        color: fontColor,
        boxShadow: "0 4px 18px #111",
        textShadow: `0 0 6px ${fontColor}, 0 0 14px #fff`,
        letterSpacing: 2,
      }}
    >
      {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
