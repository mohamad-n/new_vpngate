import * as React from "react";
import { Text } from "./text";
import { ConnectContext } from "../../providers";

const Timer = ({ textStyle }) => {
  const [timer, setTimer] = React.useState(0);
  const [timerDigits, setTimerDigits] = React.useState();
  const { startConnectTime, appState } = React.useContext(ConnectContext);

  React.useEffect(() => {
    const _timer =
      startConnectTime &&
      setInterval(() => {
        setTimer(Math.floor(Date.now() / 1000) - startConnectTime);
        time_remain();
      }, 1000);

    if (!startConnectTime) {
      setTimer(0);
      time_remain();
    }

    return () => clearInterval(_timer);
  }, [timer, startConnectTime, appState]);

  const setDigits = (digit) => {
    if (digit.toString().length === 1) {
      return `0${digit}`;
    }
    return digit;
  };
  const time_remain = () => {
    // console.log(">>>>>>>>>>>", timer + 1);
    const seconds = timer % 60;
    const minutes = Math.floor((timer % 3600) / 60);
    const hour = Math.floor(timer / 3600);

    setTimerDigits({
      min: setDigits(minutes),
      sec: setDigits(seconds),
      hour: setDigits(hour),
    });
  };

  return (
    <Text style={textStyle}>
      {startConnectTime && `${timerDigits?.hour}:${timerDigits?.min}:${timerDigits?.sec}`}
    </Text>
  );
};

export default Timer;
