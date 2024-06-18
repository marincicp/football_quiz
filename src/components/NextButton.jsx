import { ACTION_TYPES } from "../constants";
import { useQuizContext } from "../context/QuizContext";

function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuizContext();

  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION_TYPES.NEXT_QUESTION })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION_TYPES.FINISH })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
