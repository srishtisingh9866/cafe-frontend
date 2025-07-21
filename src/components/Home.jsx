import { useState } from "react";
import "./Home.css"; // Import the CSS file

export default function Home() {
  const [wicket, setWicket] = useState(0);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState();

  const incrementRun = () => {
    if (wicket < 10) {
      setRun(run + 1);
      setMessage("Well Done");
    }
  };
  const incrementWicket = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
      setMessage("Better Luck Next Time");
    } else {
      setMessage("Game Over");
    }
  };

  return (
    <div className="container">
      <div className="buttons">
        <button onClick={incrementRun}>Run</button>
        <button onClick={incrementWicket}>Wicket</button>
      </div>
      <div className="stats">
        <h3>Runs: {run}</h3>
        <h3>Wickets: {wicket}</h3>
      </div>
      <hr style={{ width: "100%", margin: "1rem 0" }} />
      <div className="message">{message}</div>
    </div>
  );
}