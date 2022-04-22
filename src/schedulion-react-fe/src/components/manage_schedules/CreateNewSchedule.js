import React, { useState } from 'react'
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Button from 'react-bootstrap/Button'

function CreateNewSchedule({user, refreshSchedules, URL_VARIABLE, hide}) {
    const [scheduleName, setScheduleName] = useState("")
    const [gameNumber, setGameNumber] = useState(0)
    const [show, setShow] = useState(false);

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
        hide()
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
          <Button variant="primary" type="submit">
          Submit
          </Button>
        </Form>
    )
}

export default CreateNewSchedule
