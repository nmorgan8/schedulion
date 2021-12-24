import React, { useState, useEffect } from 'react'
import { HouseDoor, Calendar3, GraphUp, Person } from 'react-bootstrap-icons'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './components/home/Home'
import LandingPage from "./components/landing_page/LandingPage"
import Scheduler from "./components/schedule/Scheduler"
import Create from "./components/schedule/Create"
import Login from "./components/user_authentication/Login"
import Register from './components/user_authentication/Register'
import Team from './components/dev/Team'
import Rankings from './components/dev/Rankings'
import ListSchedules from './components/manage_schedules/ListSchedules'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("Andrew")
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
            <text className="Left">Welcome, {username}</text>
            <Link className="Center" to="/">SCHEDULION</Link>
            <Link to="/listSchedule" className="CalendarIcon"><Calendar3 /></Link>
          </div>
          <Switch>
            <Route exact path="/"><LandingPage /></Route>
            <Route path="/login">
              <Login
              user = {user}
              setUser = {setUser}
              />
            </Route>
            <Route path="/register">
              <Register
              user = {user}
              setUser = {setUser}
              />
            </Route>
            <Route path="/home"><Home /></Route>
            <Route path="/scheduling/:scheduleID"><Scheduler/></Route>
            <Route path="/create"><Create/></Route>
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
