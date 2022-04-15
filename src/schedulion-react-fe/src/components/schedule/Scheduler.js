import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import './DataTable.css';
import './Scheduler.css';
import { Link } from 'react-router-dom';
import { CalendarPlus, ArrowLeftCircle } from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import ScheduledGames from './ScheduledGames';
import './Create.css';
import SearchPanel from './games_panel/SearchPanel';

export default function Scheduler({teams, teamsLoading, rankings, rankingsLoading, user, selectedSchedule, setSelectedSchedule}) {
  const history = useHistory()

  const [scheduledGames, setScheduledGames] = useState(null)

  const fetchScheduledGames = (body) => {
    URL = "http://localhost:5000/list_scheduled_games" + "?uID=" + body.user + "%scheduleName=" + body.selectedSchedule
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

  useEffect(() => {
    if (!user) history.replace("/login")
    if (!selectedSchedule) history.replace("/listSchedule")
  }, [selectedSchedule, user,])

  function returnToScheduleList() {
    setSelectedSchedule("")
  }

  return (
    <div className="Create">
      <div data-tip data-for="addTip" className="NewSchedule">
        <Link to="/create" className="CreateIcon">
          <CalendarPlus/>
        </Link>
        <ReactTooltip id="addTip" place="right" effect="solid">
          Create
        </ReactTooltip>
      </div>
      <div>
        <ArrowLeftCircle 
          onClick = {returnToScheduleList}
        />
      </div>
      <div className='float-child-left'>
        <SearchPanel
          teams={teams}
          teamsLoading={teamsLoading}
          rankings={rankings}
          rankingsLoading={rankingsLoading}
          selectedSchedule={selectedSchedule}
          user={user}
          />
      </div>
      <div className='float-child-right'>
      <ScheduledGames/>
      </div>
    </div>
  );
}
