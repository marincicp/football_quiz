import { ACTION_TYPES } from "../constants";
import { useQuizContext } from "../context/QuizContext";

function StartQuiz() {
  const { dispatch, numQuestions } = useQuizContext();

  return (
    <div className="start">
      <h3>Welcome to Football Quiz</h3>
      <p>{numQuestions} Questions to Test Your Football Knowledge </p>

      <button
        onClick={() => dispatch({ type: ACTION_TYPES.START })}
        className="btn btn-ui"
      >
        Start
      </button>
    </div>
  );
}

export default StartQuiz;
