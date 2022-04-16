import React from 'react';
import './Create.css';
import SearchPanel from "./games_panel/SearchPanel";
import ListSchedules from '../manage_schedules/ListSchedules'

export default function Create(props) {
    return (
      <div className="Create">
      <ListSchedules/>
        </div>
      
    );
}
