import React, { useState, useEffect } from 'react'
import { HouseDoor, Calendar3, GraphUp, Person } from 'react-bootstrap-icons'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import LandingPage from "./components/landing_page/LandingPage"
import Scheduler from "./components/schedule/Scheduler"
import Create from "./components/schedule/Create"
import Login from "./components/user_authentication/Login"
import Register from './components/user_authentication/Register'
import Team from './components/dev/Team'
import Rankings from './components/dev/Rankings'
import ListSchedules from './components/manage_schedules/ListSchedules'
// import TeamCard from './components/schedule/TeamCard.js'
import Teams from './components/schedule/Teams'

import { useLocalStorage } from './components/tools/useLocalStorage'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [user, setUser] = useLocalStorage("user", "")
  const [rankingList, setRankingList] = useState(null)
  const [rankingsLoading, setRankingsLoading] = useState(true)
  const [schedulesLoading, setSchedulesLoading] = useState(true)
  const [schedules, setSchedules] = useState(null)
  const [games, setGames] = useState(null)
  const [gamesLoading, setGamesLoading] = useState(true)


  const fetchSchedules = (body) => {
    URL = "http://localhost:5000/list_schedules" + "?uID=" + body.user
    return fetch(URL, {method: "GET"}
  )
    .then(res => res.json())
    .then(json => {
      setSchedules(json)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const fetchPossibleGames = () => {
    URL = "http://localhost:5000/get_possible_games" + "?teamID=" + "Loyola Marymount"
    return fetch(URL, {method: "GET"}
  )
    .then(res => res.json())
    .then(json => {
      setGames(json)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchPossibleGames()
  }, [])

  useEffect(() => {
    if (user) {
      fetchSchedules({user});
    }
  }, [user]);


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

  useEffect(() => {
    if (games !== null) {
      setGamesLoading(false)
    }
  }, [games])


  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <div>
            <Link className="Center" to="/">SCHEDULION</Link>
            <Link to="/listSchedule" className="HomeIcon"><HouseDoor /></Link>
            <Link to="/login" className="PersonIcon" ><Person /></Link>
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
            <Route path="/scheduling/:schedule">
              <Scheduler
                user = {user}
              />
            </Route>
            <Route path="/create"><Create/></Route>
            <Route path="/listSchedule">
              <ListSchedules
              schedulesLoading={schedulesLoading}
              schedules={schedules}
              user = {user}
              refreshSchedules = {fetchSchedules}
              />
            </Route>
            <Route path="/matchup">
              <Rankings
              predictedRankings={rankingList}
              rankingsLoading={rankingsLoading}
              />
            </Route>
            <Route path="/teams">
              <Teams
              teams={games}
              teamsLoading={gamesLoading}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}
