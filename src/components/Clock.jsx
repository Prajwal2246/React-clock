import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //unmount clear interval
    return () => clearInterval(intervalId);
  }, []);

  const formatedTime = time.toLocaleTimeString();

  return <div className="clock">{formatedTime}</div>;
};

export default Clock;
