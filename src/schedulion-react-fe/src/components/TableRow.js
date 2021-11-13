import React from 'react'

const TableRow = ({row}) => {
    return (
        <tr>
            {row.map(val => <td>{val}</td>)}
        </tr>
    )
}

export default TableRow;