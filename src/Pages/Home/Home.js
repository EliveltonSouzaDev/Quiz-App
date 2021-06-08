import { Button, MenuItem, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import Categories from "../../components/Data/Data";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./Home.css";

import imgHome from "../../images/bgHome.png";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSubmit = () => {
    //aceita o submit apenas se todos os forms estiverem preenchidos
    if (!category || !difficulty || !name || amount <= 0) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty, amount);
      history.push("/quiz"); //encaminha para a página quiz
    }
  };
  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quizee Settings</span>

        <div className="settings__select">
          {error && (
            <ErrorMessage>Please fill all the fields correctly</ErrorMessage>
          )}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
          />

          <TextField
            style={{ marginBottom: 25 }}
            type="number"
            label="How Many Questions?"
            variant="outlined"
            onChange={(event) => setAmount(event.target.value)}
            value={amount}
          />
          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            value={difficulty}
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src={imgHome} className="banner" alt="quiz app" />
    </div>
  );
};

export default Home;
