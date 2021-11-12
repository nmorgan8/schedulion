import React, { useState, useEffect } from 'react';
import { HouseDoor, Calendar3, GraphUp, Person } from 'react-bootstrap-icons';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from "./components/LandingPage";
import Scheduler from "./components/Scheduler";
import Create from "./components/Create";
import Statistics from "./components/Statistics";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import './App.css';
import lmu from "./components/images/lmu.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import testdata from "./testData.json"


export default function App() {
  console.log(testdata)

  // added code to test backend access
  const [currentTime, setCurrentTime] = useState(0);
  // const [currentLMUWin, setLMUWin] = useState(0);
  // const [currentLMULose, setLMULose] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  // useEffect(() => {
  //   fetch('/api/record').then(res => res.json()).then(data => {
  //     setLMUWin(data.record['win'])
  //     setLMULose(data.record['lose'])
  //   })
  // }, []);



  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link to="/home" className="HomeIcon"><HouseDoor /></Link>
            <Link to="/login" className="PersonIcon" ><Person /></Link>
            <text className="Left">Welcome, Tigerlilly</text>
            <Link className="Center" to="/">SCHEDULION</Link>
            <Link to="/scheduling" className="CalendarIcon"><Calendar3 /></Link>
            <Link className="StatsIcon"to="/statistics"><GraphUp /></Link>
          </div>
          <Switch>
            <Route exact path="/"><LandingPage /></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/home"><Home /></Route>
            <Route path="/scheduling"><Scheduler/></Route>
            <Route path="/create"><Create/></Route>
            <Route path="/statistics"><Statistics /></Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}
