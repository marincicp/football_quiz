import { useEffect, useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import { ACTION_TYPES, SEC_PER_QUESTION } from "../constants";

function Timer() {
  const { dispatch, questions } = useQuizContext();
  const [secondsRemaining, setSecondsRemaining] = useState(
    questions.length * SEC_PER_QUESTION
  );

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    if (secondsRemaining === 0) {
      return dispatch({ type: ACTION_TYPES.TIME_OUT });
    }

    const timer = setInterval(() => {
      setSecondsRemaining(secondsRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, setSecondsRemaining, dispatch]);

  return (
    <div className="timer ">
      {mins < 10 && "0"}
      {mins} : {secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
