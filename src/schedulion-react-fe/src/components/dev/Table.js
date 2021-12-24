import React from 'react'
import TableRow from './TableRow'

const Table = ({heading, body}) => {
    return (
        <table style={{ width: 1000 }}>
            <thead>
                <tr>
                    {heading.map(head => <th>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {body.map(row => <TableRow row={row} />)}
            </tbody>
        </table>
    )
}

export default Table;