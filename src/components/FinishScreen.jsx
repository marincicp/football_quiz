import { ACTION_TYPES } from "../constants";
import { useQuizContext } from "../context/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuizContext();

  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        Your score <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        onClick={() => dispatch({ type: ACTION_TYPES.RESTART })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
