import React, { useState } from 'react'
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button'

function CreateNewSchedule({user, refreshSchedules, URL_VARIABLE}) {
    const [scheduleName, setScheduleName] = useState("")
    const [gameNumber, setGameNumber] = useState(0)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        const createSchedule = (body) => {
            const URL = URL_VARIABLE + 'add_schedule'
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
        refreshSchedules({user})
        createSchedule({scheduleName, gameNumber, user})
        setScheduleName('')
        setGameNumber('')
        refreshSchedules({user})
    }

    return (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Schedule Name: </Form.Label>
            <Form.Control
              type="text"
              value={scheduleName}
              placeholder="Spring 2022"
              onChange={e=>setScheduleName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numer of Games: </Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              value={gameNumber}
              onChange={e=>setGameNumber(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Button variant="primary" type="submit">
          Submit
          </Button>
        </Form>
    )
}

export default CreateNewSchedule
