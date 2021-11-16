import React from 'react'
import { useHistory } from "react-router-dom"


const TableRow = ({row}) => {
    const history = useHistory()

    function addSearchParameters(team) {
        const params = new URLSearchParams()
        params.append("name", team)
        const url = '/teams/' + team
        history.push(url)
    }

    const checkIfTeam = (team) => {
        const digitExp = new RegExp('^\\d+$')
        return digitExp.test(team)
    }

    return (
        <tr>
            {
                row.map(
                    function(val) {
                        if (checkIfTeam(val)) {
                            return(<td>{val}</td>)
                        } else {
                            return (<td><button onClick={() => addSearchParameters({val}.val)}>{val}</button></td>)
                        }
                    }
                )
            }
        </tr>
    )
}

export default TableRow;