import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // added above code to test backend and as ex
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  // testing backend compatability
  const [currentLMUWin, setLMUWin] = useState(0);
  const [currentLMULose, setLMULose] = useState(0);

  useEffect(() => {
    fetch('/record').then(res => res.json()).then(data => {
      setLMUWin(data.record['win'])
      setLMULose(data.record['lose'])
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* added for testing */}
        <p>The current time is {currentTime}.</p>
        <p>LMU Wins: {currentLMUWin}</p>
        <p>LMU Loses: {currentLMULose}</p>

      </header>
    </div>
  );
}

export default App;
