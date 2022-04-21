import React, { useState, useEffect } from 'react'
import './SearchPanel.css'
import Teams from './Teams'


export default function SearchPanel({teams, teamsLoading, rankings, rankingsLoading, selectedSchedule, user, URL_VARIABLE, gameDate, postGameRequest}) {
  // Teams should just be renamed to search panel
  console.log(postGameRequest)

  return (
    <div className="SearchPanel">
    <Teams
      teams={teams}
      teamsLoading={teamsLoading}
      rankings={rankings}
      rankingsLoading={rankingsLoading}
      selectedSchedule={selectedSchedule}
      user={user}
      URL_VARIABLE={URL_VARIABLE}
      gameDate={gameDate}
      postGameRequest={postGameRequest}
    />
    </div>
  );

}
