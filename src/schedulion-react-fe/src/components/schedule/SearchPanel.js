import React, { useState, useEffect } from 'react'
import './SearchPanel.css'
import Teams from './Teams'


export default function SearchPanel({teams, teamsLoading}) {
  const [games, setGames] = useState(null)
  const [gamesLoading, setGamesLoading] = useState(true)
  return (
    <div className="SearchPanel">
    <Teams
      teams={teams}
      teamsLoading={teamsLoading}
    />
    </div>
  );

}
