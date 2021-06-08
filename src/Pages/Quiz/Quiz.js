import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./Quiz.css";
import Question from "../../components/Question/Question";

const Quiz = ({
  name,
  questions,
  score,
  setScore,
  setQuestions,
  mistakes,
  setMistakes,
}) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ]) //pega a questão correta com as incorretas e junta em um array.
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  return (
    <div className="quiz">
      <span className="subtitle"> Welcome , {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span className="category">{questions[currQues].category}</span>
            <span>
              Score : <span className="hits">{score}</span>
            </span>
            <span>
              mistakes : <span className="mistakes">{mistakes}</span>
            </span>
            <span className="difficulty">
              Difficulty : {questions[currQues].difficulty}
            </span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            mistakes={mistakes}
            setMistakes={setMistakes}
          />
        </>
      ) : (
        <CircularProgress style={{ margin: 100 }} size={150} thickness={1} />
      )}
    </div>
  );
};

export default Quiz;
