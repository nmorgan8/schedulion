import React from 'react';
import CurrentSchedule from "./CurrentSchedule";
import './Create.css';
import NewGame from "./NewGame";


export default function Create(props) {
    return (
      <div className="Create">


      <CurrentSchedule/>
        <NewGame/>
      </div>
    );
}

// <Plus/>
