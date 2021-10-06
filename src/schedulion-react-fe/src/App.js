import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

export default function App() {

  // added code to test backend access
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLMUWin, setLMUWin] = useState(0);
  const [currentLMULose, setLMULose] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  useEffect(() => {
    fetch('/api/record').then(res => res.json()).then(data => {
      setLMUWin(data.record['win'])
      setLMULose(data.record['lose'])
    })
  }, []);

  // code for homepage
  const Home = () => (
    <div>
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
    </div>
  )

  const Scheduling = () => (
    <div>
      <h2>Scheduling</h2>
      <p>We will be adding various cool stuff to help with scheduling!</p>
    </div>
  );

  const Statistics = () => (
    <div>
      <h2>Statistics</h2>
      <p>UNLEASH YOUR INNER STATS NERD!!!</p>
    </div>
  )

  // default application
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link to="/scheduling">Scheduling</Link>
            &nbsp;|&nbsp;
            <Link to="/statistics">Statistics</Link>
          </div>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/scheduling"><Scheduling /></Route>
            <Route path="/statistics"><Statistics /></Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

// export default App;
