import React, { useState } from 'react'

export default function CreateNewSchedule({user, refreshSchedules, URL_VARIABLE}) {
    const [scheduleName, setScheduleName] = useState("")
    const [gameNumber, setGameNumber] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()

        const createSchedule = (body) => {
            URL = URL_VARIABLE + 'add_schedule'
            return fetch(URL, {
                'method': 'POST',
                headers : {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(r => console.log(r))
            .catch(error => console.log(error))
        }
        createSchedule({scheduleName, gameNumber, user})
        setScheduleName('')
        setGameNumber('')
        refreshSchedules({user})
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Schedule Name
                <input 
                    type="text" 
                    value={scheduleName}
                    onChange={e=>setScheduleName(e.target.value)}
                />
                </label>
                <label>
                    Number of Games
                    <input 
                        type="text" 
                        pattern="[0-9]*"
                        value={gameNumber}
                        onChange={e=>setGameNumber(e.target.value)}
                    />
                </label> 
                <input type="submit" value="Submit" />
            </form>
    )
}