import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './Scheduler.css';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import ScheduledGames from './ScheduledGames';
import SearchPanel from './games_panel/SearchPanel';


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
      const winPercentage =  getWinPercentage(gameOpponent, advantage)
      const ranking =  getRanking(gameOpponent)
      scheduledGames[index] = 
      {
        gameDate: game.scheduledTime,
        opponent: gameOpponent,
        advantage: capitalize(advantage),
        winPercentage: winPercentage,
        ranking: ranking,
        aggregate: getStrength(winPercentage, ranking),
        quadrant: getQuadrant(ranking)
      }
    });

    return scheduledGames
  }

  function capitalize(advantage) {
    return advantage.charAt(0).toUpperCase() + advantage.slice(1);
  }

  function getStrength(winPercentage, ranking){
    let strengthScore = getWeightedScore(winPercentage, ranking) - 50;
    strengthScore = strengthScore.toFixed(2).toString();
    return strengthScore > 0 ? "+" + strengthScore : strengthScore
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

  function getQuadrant(ranking) {
    const MAX_RANKING = 358
    // Quadrants are calculated by the top 25 percentage of teams ranked by NET score falling
    // into the first quadrant, next 25% in the second, etc.
    if (ranking < MAX_RANKING*(1/4)) {
      return 1;
    } else if (ranking < MAX_RANKING*(2/4)) {
      return 2
    } else if (ranking < MAX_RANKING*(3/4)) {
      return 3;
    } else{
      return 4;
    }
  }

  function getWeightedScore(winPercentage, NET_Ranking) {
    let MAXIMUM_RANKING = 323
    MAXIMUM_RANKING = MAXIMUM_RANKING - 1
    const MODIFIED_RANKING = parseFloat(NET_Ranking)
    const NET_WEIGHT = 50 - (50*((MODIFIED_RANKING - 1) / MAXIMUM_RANKING))

    const MODIFIED_WP = winPercentage * 100
    const WP_WEIGHT = MODIFIED_WP / 2

    return NET_WEIGHT + WP_WEIGHT
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
