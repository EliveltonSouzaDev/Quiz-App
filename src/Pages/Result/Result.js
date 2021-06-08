import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import "./Result.css";

import imgResult from "../../images/imgResult.png";

const Result = ({ name, score, mistakes }) => {
  const history = useHistory();

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

  return (
    <div className="result">
      <h2 className="title">Well done! {name}:</h2>

      <h3 className="title">
        Final Hits : <span className="hit">{score}</span>
      </h3>
      <h3 className="title">
        Final Mistakes : <span className="mistake">{mistakes}</span>
      </h3>
      <img
        src={imgResult}
        alt="figura de menina estudando em frente ao computador"
      ></img>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
