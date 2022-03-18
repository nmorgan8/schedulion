import * as React from 'react';
import './DataTable.css';
import './Scheduler.css';
import { Link } from 'react-router-dom';
import { CalendarPlus } from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';
import ScheduleList from './ScheduleList';
import './Create.css';

export default function Scheduler() {
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
    <ScheduleList/>
    </div>
  );
}
