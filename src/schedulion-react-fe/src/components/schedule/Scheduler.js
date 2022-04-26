import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './Scheduler.css';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import ScheduledGames from './ScheduledGames';
import SearchPanel from './games_panel/SearchPanel';
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField';

export default function Scheduler({teams, teamsLoading, rankings, rankingsLoading, user, selectedSchedule, setSelectedSchedule, URL_VARIABLE}) {
  const history = useHistory()

  const [scheduledGames, setScheduledGames] = useState(null)
  const [processedGames, setProcessed] = useState(null)
  const [scheduledGamesLoading, setScheduledGamesLoading] = useState(true)
  const [isSchedulingGame, setSchedulingGame] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [gameDate, setGameDate] = useState("2017-05-24")

  function postGameRequest(body) {
    const URL = URL_VARIABLE + 'add_game'
    return fetch(URL, {
      'method': 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(responseJson => refreshPage(responseJson))
    .catch(error => console.log(error))
  }

  const refreshPage = (json) => {
    console.log(json)
    setSchedulingGame(false)
    setModalOpen(false)
    fetchScheduledGames({user, selectedSchedule})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (gameDate !== "") {
      setSchedulingGame(true)
    }
  }

  const fetchScheduledGames = (body) => {
    setScheduledGamesLoading(true)
    const URL = URL_VARIABLE + "list_scheduled_games?user=" + body.user + "&selectedSchedule=" + body.selectedSchedule
    return fetch(URL, {method: "GET"}
  )
    .then(res => res.json())
    .then(json => {
      setScheduledGames(json)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function processGames() {
    scheduledGames.forEach((game, index) => {
      const gameOpponent = game.gameOpponent
      const advantage = game.advantage
      const ranking = getRanking(gameOpponent)
      scheduledGames[index] =
      {
        gameDate: game.scheduledTime,
        opponent: gameOpponent,
        advantage: capitalize(advantage),
        winPercentage: getWinPercentage(gameOpponent, advantage),
        ranking: ranking,
        quadrant: getQuadrant(ranking, gameOpponent)
      }
    });

    return scheduledGames
  }

  function capitalize(advantage) {
    return advantage.charAt(0).toUpperCase() + advantage.slice(1);
  }

  function getWinPercentage(opponent, advantage) {
    let courtAdvantage = advantage.toLowerCase()
    for (const key in teams) {
      if (key === opponent) {
        return teams[key][courtAdvantage].toFixed(2)
      }
    }
    return -1
  }

  function getRanking(opponent) {
    for (const key in rankings) {
      if (rankings[key]['team'] === opponent) {
        return rankings[key]['True_Ranking']
      }
    }
    return -1
  }

  function getQuadrant(ranking, opponent) {
    const MAX_RANKING = 358
    // Quadrants are calculated by the top 25 percentage of teams ranked by NET score falling
    // into the first quadrant, next 25% in the second, etc.
    console.log("RANK:" + ranking + "-- TEAM:" + opponent)
    if (ranking < MAX_RANKING*(1/4)) {
      console.log(1)
      return 1;
    } else if (ranking < MAX_RANKING*(2/4)) {
      console.log(2)
      return 2
    } else if (ranking < MAX_RANKING*(3/4)) {
      console.log(3)
      return 3;
    }
    return 4;
  }

  function returnToScheduleList() {
    setSelectedSchedule("")
  }

  useEffect(() => {
    if (!user) history.replace("/login")
    if (!selectedSchedule) history.replace("/listSchedule")
  }, [selectedSchedule, user, history])

  useEffect(() => {
    fetchScheduledGames({user, selectedSchedule})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scheduledGames && !rankingsLoading && !teamsLoading) {
      const processed = processGames(scheduledGames)
      setProcessed(processed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduledGames, rankingsLoading, teamsLoading])

  useEffect(() => {
    if (processedGames != null) {
      setScheduledGamesLoading(false)
    }
  }, [processedGames])


  return (
    <div className='Scheduler'>
    <ArrowLeftCircle
      className = 'arrow'
      onClick = {returnToScheduleList}
    />
    <div className='float-child-left'>
      <SearchPanel
        teams={teams}
        teamsLoading={teamsLoading}
        rankings={rankings}
        rankingsLoading={rankingsLoading}
        selectedSchedule={selectedSchedule}
        user={user}
        URL_VARIABLE={URL_VARIABLE}
        gameDate = {gameDate}
        postGameRequest = {postGameRequest}
        />
    </div>
    <div className='float-child-right'>
    <ScheduledGames
      scheduledGames = {processedGames}
      scheduledGamesLoading = {scheduledGamesLoading}
    />
    </div>
  </div>
  );
}
