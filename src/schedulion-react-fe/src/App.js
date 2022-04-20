import React, { useState, useEffect } from 'react'
import { HouseDoor, Calendar3, GraphUp, Person } from 'react-bootstrap-icons'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Scheduler from "./components/schedule/Scheduler"
import Login from "./components/user_authentication/Login"
import Register from './components/user_authentication/Register'
import Team from './components/dev/Team'
import Rankings from './components/dev/Rankings'
import ListSchedules from './components/manage_schedules/ListSchedules'
import TeamCard from './components/schedule/games_panel/TeamCard.js'
import Teams from './components/schedule/games_panel/Teams'
import { TESTING_URLS, DEPLOYMENT_URLS } from './global_variables/Variables'


import { useLocalStorage } from './components/tools/useLocalStorage'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [user, setUser] = useLocalStorage("user", "")
  const [rankingsLoading, setRankingsLoading] = useState(true)
  const [schedulesLoading, setSchedulesLoading] = useState(true)
  const [schedules, setSchedules] = useState(null)
  const [selectedSchedule, setSelectedSchedule] = useState("")
  const [games, setGames] = useState(null)
  const [gamesLoading, setGamesLoading] = useState(true)
  const [NETRankings, setNETRankings] = useState(null)

  const isTesting = false

  const URL_VARIABLE = isTesting ? TESTING_URLS.url : DEPLOYMENT_URLS.url

  const fetchSchedules = (body) => {
    URL = URL_VARIABLE + "list_schedules" + "?uID=" + body.user
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
    URL = URL_VARIABLE + "get_cards"
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

  const fetchRankings = () => {
    URL = URL_VARIABLE + "get_NET_rankings"
    return fetch(URL, {method: "GET"})
    .then (res => res.json())
    .then(json => {
      setNETRankings(json)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchPossibleGames()
    fetchRankings()
  }, [])


  useEffect(() => {
    if (user) {
      fetchSchedules({user});
    }
  }, [user]);


  useEffect(() => {
    if (schedules !== null) {
      console.log(schedules)
      setSchedulesLoading(false)
    }
  }, [schedules])

  useEffect(() => {
    if (NETRankings !== null) {
      setRankingsLoading(false)
    }
  }, [NETRankings])

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
            <Route path="/login">
              <Login
              user = {user}
              setUser = {setUser}
              URL_VARIABLE = {URL_VARIABLE}
              />
            </Route>
            <Route path="/register">
              <Register
              user = {user}
              setUser = {setUser}
              URL_VARIABLE = {URL_VARIABLE}
              />
            </Route>
            <Route path="/scheduling">
              <Scheduler
                user = {user}
                teams={games}
                teamsLoading={gamesLoading}
                rankings={NETRankings}
                rankingsLoading={rankingsLoading}
                user = {user}
                URL_VARIABLE = {URL_VARIABLE}
                setSelectedSchedule = {setSelectedSchedule}
                selectedSchedule = {selectedSchedule}

              />
            </Route>
            <Route path="/listSchedule">
              <ListSchedules
              schedulesLoading={schedulesLoading}
              schedules={schedules}
              user = {user}
              refreshSchedules = {fetchSchedules}
              setSelectedSchedule = {setSelectedSchedule}
              selectedSchedule = {selectedSchedule}
              />
            </Route>
            <Route path="/teams">
              <Teams
                teamsLoading={gamesLoading}
                teams={games}
                rankings = {NETRankings}
                rankingsLoading = {rankingsLoading}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}
