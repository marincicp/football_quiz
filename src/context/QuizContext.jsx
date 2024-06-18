import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTION_TYPES, STATUS } from "../constants";

const initState = {
  status: STATUS.LOADING,
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};
const URL = "http://localhost:8000/questions";

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.DATA_RECIVED:
      return { ...state, questions: action.payload, status: STATUS.READY };
    case ACTION_TYPES.DATA_FAILED:
      return { ...state, status: STATUS.ERROR };
    case ACTION_TYPES.START:
      return {
        ...state,
        status: STATUS.ACTIVE,
      };
    case ACTION_TYPES.NEW_ANSWER:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTION_TYPES.NEXT_QUESTION:
      return { ...state, index: state.index++, answer: null };
    case ACTION_TYPES.FINISH:
      return {
        ...state,
        status: STATUS.FINISHED,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ACTION_TYPES.RESTART:
      return { ...initState, questions: state.questions, status: STATUS.READY };
    case ACTION_TYPES.TIME_OUT:
      return {
        ...state,
        status: STATUS.FINISHED,
      };
    default:
      throw new Error("Action unknown");
  }
}
const QuizContext = createContext();

export function QuizContextProvider({ children }) {
  const [{ status, questions, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();

        dispatch({ type: ACTION_TYPES.DATA_RECIVED, payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: ACTION_TYPES.DATA_FAILED });
      }
    };

    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        points,
        status,
        questions,
        index,
        answer,
        dispatch,
        numQuestions,
        maxPossiblePoints,
        highscore,
        // secondsRemaining,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  } else {
    return context;
  }
}
