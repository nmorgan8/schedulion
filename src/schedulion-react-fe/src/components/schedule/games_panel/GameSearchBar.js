import React, { useState } from 'react'

function GameSearchBar({setQuery, gameQuery}) {


    return (
        <div>
            <input
            onChange = {setQuery}
            value = {gameQuery}
            />
        </div>
    )
}

export default GameSearchBar