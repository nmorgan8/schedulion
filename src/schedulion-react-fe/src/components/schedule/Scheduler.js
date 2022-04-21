import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './Scheduler.css';
import { ArrowLeftCircle, CalendarDate } from 'react-bootstrap-icons';
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
      scheduledGames[index] = 
      {
        gameDate: game.scheduledTime,
        opponent: gameOpponent,
        advantage: capitalize(advantage),
        winPercentage: getWinPercentage(gameOpponent, advantage),
        ranking: getRanking(gameOpponent),
        quadrant: 3
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
    isSchedulingGame ?
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
  :
    <div className='Scheduler'>
      <ArrowLeftCircle
        className = 'arrow'
        onClick = {returnToScheduleList}
      />
      <CalendarDate
        onClick = {() => {
          setModalOpen(true)
        }}
      />
      <div style={{ height: '800px', width: '80%' }}>
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
        >
            <button onClick={()=>{setModalOpen(false)}}>x</button>
            <div style={{
              margin: 'auto',
              display: 'block',
              width: 'fit-content'
            }}>
            <form onSubmit={handleSubmit}>
              <h3>Choose a date for new game</h3>
              <TextField
                id="date"
                label="Choose game date"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=> {
                  setGameDate(e.target.value)
                }}
              />
              <input type="submit" value="Submit" />
              </form>
            </div>
        </Modal>
      <ScheduledGames
        scheduledGames = {processedGames}
        scheduledGamesLoading = {scheduledGamesLoading}
      />
      </div>
    </div>
  );
}
