import React, { useEffect, useState } from "react";

function Timer({ duration }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if(duration > 0){
        const timerId = setTimeout(() => {
            setTime(time - 1000)
        }, 1000);

        return () => clearTimeout(timerId)
    }
  }, [time, duration]);

  function getFormattedTime(milliseconds) {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinutes = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinutes / 60));

    let seconds = parseInt(totalSeconds % 60);
    let minutes = parseInt(totalMinutes % 60);
    let hours = parseInt(totalHours % 24);

    return `${hours}h: ${minutes}m : ${seconds}s`;
  }

  return <div>{getFormattedTime(time)}</div>;
}

export default Timer;
