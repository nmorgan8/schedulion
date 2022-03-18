import React, { useState, useEffect } from 'react'
import './SearchPanel.css'
import TeamCards from './TeamCards'


export default function SearchPanel() {
  const [games, setGames] = useState(null)
  const [gamesLoading, setGamesLoading] = useState(true)
  return (
    <div className="SearchPanel">
    <TeamCards
    teams={games}
    teamsLoading={gamesLoading}
    />
    </div>
  );

}
