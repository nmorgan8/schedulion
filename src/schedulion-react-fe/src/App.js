import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {

  // added above code to test backend and as ex
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  // testing backend compatability
  const [currentLMUWin, setLMUWin] = useState(0);
  const [currentLMULose, setLMULose] = useState(0);

  useEffect(() => {
    fetch('/api/record').then(res => res.json()).then(data => {
      setLMUWin(data.record['win'])
      setLMULose(data.record['lose'])
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link className="App-link" to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/page2">Page2</Link>
          </div>
          <Switch>
            <Route exact path="/">
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

            </Route>
            <Route path="/page2">
                <p>This is page 2!</p>
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
