import React from 'react'
import './SearchPanel.css'

function GameSearchBar({setQuery, gameQuery}) {


    return (
        <div>
            <input
            className='SearchBar'
            placeholder = 'search...'
            onChange = {setQuery}
            value = {gameQuery}
            />
        </div>
    )
}

export default GameSearchBar
