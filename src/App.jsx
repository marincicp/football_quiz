import {
  Error,
  StartQuiz,
  Loader,
  Questions,
  Header,
  NextButton,
  Progress,
  FinishScreen,
  Footer,
  Timer,
  MainContainer,
} from "./components";
import { STATUS } from "./constants";
import { useQuizContext } from "./context/QuizContext";

export default function App() {
  const { status, questions, index } = useQuizContext();

  return (
    <div className="app">
      <Header />

      <MainContainer>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <Error />}
        {status === STATUS.READY && <StartQuiz />}
        {status === STATUS.ACTIVE && (
          <>
            <Progress />
            <Questions question={questions[index]} />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === STATUS.FINISHED && <FinishScreen />}
      </MainContainer>
    </div>
  );
}
