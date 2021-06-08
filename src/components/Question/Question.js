import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Question.css";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  mistakes,
  setMistakes,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  // verifica se a opção selecionada é igual a correta
  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  //verifica se a opçao correta foi escolhida e acrescenta +1 no score ou mistakes
  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      setScore(score + 1);
      setError(false);
    } else {
      setMistakes(mistakes + 1);
    }
  };
  const handleNext = () => {
    if (currQues > questions.length - 2) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError("Please select an option first");
    }
  };

  //reinicia os estados ao sair.
  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1}</h1>
      <div className="SingleQuestion">
        <h2
          dangerouslySetInnerHTML={{ __html: questions[currQues].question }}
        ></h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {/* verifica se tem algo dentro de options e percorre o array com o map*/}
          {options &&
            options.map((i) => (
              <button
                onClick={() => handleCheck(i)}
                //   verifica se a opção esta selecionada e desabilitaa as outras
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                dangerouslySetInnerHTML={{ __html: i }}
                disabled={selected}
              ></button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {/* se for a ultima questão muda o texto para submit */}
            {currQues > questions.length - 2 ? "Submit" : "Next Question"}{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
