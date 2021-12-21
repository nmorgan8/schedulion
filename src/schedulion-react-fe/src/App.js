import React, { useState, useEffect } from 'react';
import { HouseDoor, Calendar3, GraphUp, Person } from 'react-bootstrap-icons';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from "./components/LandingPage";
import Scheduler from "./components/Scheduler";
import Create from "./components/Create";
import Statistics from "./components/Statistics";
import Login from "./components/Login";
import Team from './components/Team';
import Rankings from './components/Rankings'
import ListSchedules from './components/ListSchedules'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [rankingList, setRankingList] = useState(null)
  const [rankingsLoading, setRankingsLoading] = useState(true)
  const [schedulesLoading, setSchedulesLoading] = useState(true)
  const [schedules, setSchedules] = useState(null)


  useEffect(() => {
    const fetchRankings = () => {
      return fetch('/api/get_netrankings', {method: "GET"}
    )
      .then(res => res.json())
      .then(json => {
        setRankingList(json)
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchRankings();
  }, []);

  useEffect(() => {
    const fetchSchedules = () => {
      return fetch('/api/list_schedules', {method: "GET"}
    )
      .then(res => res.json())
      .then(json => {
        setSchedules(json)
      })
      .catch(err => {
        console.log(err)
      })
    }
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (schedules !== null) {
      setSchedulesLoading(false)
    }
  }, [schedules])

  useEffect(() => {
    if (rankingList !== null) {
      setRankingsLoading(false)
    }
  }, [rankingList])

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
            <Route path="/scheduling/:scheduleID"><Scheduler/></Route>
            <Route path="/create"><Create/></Route>
            <Route path="/statistics"><Statistics /></Route>
            <Route path="/teams/:team"><Team /></Route>
            <Route path="/listSchedule">
              <ListSchedules 
              schedulesLoading={schedulesLoading}
              schedules={schedules}
              />
            </Route>
            <Route path="/matchup">
              <Rankings
              predictedRankings={rankingList}
              rankingsLoading={rankingsLoading}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}
