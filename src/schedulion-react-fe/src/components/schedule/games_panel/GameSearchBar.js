import React, { useState } from 'react'
import './SearchPanel.css'

function GameSearchBar({setQuery, gameQuery}) {


    return (
        <div>
            <input
            className='SearchBar'
            placeholder = 'LMU'
            onChange = {setQuery}
            value = {gameQuery}
            />
        </div>
    )
}

export default GameSearchBar
