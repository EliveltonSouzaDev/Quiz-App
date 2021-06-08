import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

//style
import "./App.css";

//components
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

//pages
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [amount, setAmount] = useState("");

  const fetchQuestions = async (
    category = "",
    difficulty = "",
    amount = ""
  ) => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
              score={score}
              mistakes={mistakes}
            />
          </Route>
          <Route exact path="/quiz">
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              amount={amount}
              setAmount={setAmount}
              mistakes={mistakes}
              setMistakes={setMistakes}
            />
          </Route>
          <Route exact path="/result">
            <Result score={score} name={name} mistakes={mistakes} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
