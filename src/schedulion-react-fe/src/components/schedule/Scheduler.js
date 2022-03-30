import * as React from 'react';
import './DataTable.css';
import './Scheduler.css';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import ScheduleList from './ScheduleList';
import './Create.css';
import SearchPanel from '../schedule/SearchPanel';
import Teams from './Teams';

export default function Scheduler({teams, teamsLoading}) {
  return (
    <div className="Create">

    <text data-tip data-for="addTip" className="NewSchedule">
              <Link to="/create" className="CreateIcon">
                <CalendarPlus/>
              </Link>
              <ReactTooltip id="addTip" place="right" effect="solid">
                Create
              </ReactTooltip>
    </text>
    <div className='float-child-left'>
      <SearchPanel
        teams={teams}
        teamsLoading={teamsLoading}/>
    </div>
    <div className='float-child-right'>
    <ScheduleList/>
    </div>
    </div>
  );
}
