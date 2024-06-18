import { ACTION_TYPES } from "../constants";
import { useQuizContext } from "../context/QuizContext";

function Options({ question }) {
  const { answer, dispatch } = useQuizContext();

  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${
            hasAnswered ? (idx === answer ? "answer" : "") : ""
          }  ${
            hasAnswered
              ? idx === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() =>
            dispatch({ type: ACTION_TYPES.NEW_ANSWER, payload: idx })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
