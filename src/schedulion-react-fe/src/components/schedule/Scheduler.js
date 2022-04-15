import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"
import './DataTable.css';
import './Scheduler.css';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import ScheduleList from './ScheduleList';
import './Create.css';
import SearchPanel from './games_panel/SearchPanel';

export default function Scheduler({teams, teamsLoading, rankings, rankingsLoading, user, selectedSchedule, setSelectedSchedule}) {
  const history = useHistory()

  useEffect(() => {
    if (!user) history.replace("/login")
    if (selectedSchedule) history.replace("/listSchedule")
  }, [])


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
    <div className='float-child-left'>
      <SearchPanel
        teams={teams}
        teamsLoading={teamsLoading}
        rankings={rankings}
        rankingsLoading={rankingsLoading}
        />
    </div>
    <div className='float-child-right'>
    <ScheduleList/>
    </div>
    </div>
  );
}
