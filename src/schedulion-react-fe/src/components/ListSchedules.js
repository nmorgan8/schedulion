import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css';
import loader from './images/loader.gif'

const COLUMN_LIST = [
    { field: 'name', headerName: 'Schedule Name', width: 200},
    { field: 'modified', headerName: 'Last Modified', width: 200, type: 'date' },
    { field: 'gameTotal', headerName: 'Total Season Games', width: 225}, // Potentially make this into an into only field
    { field: 'gamesLeft', headerName: 'Unscheduled Games', width: 225} // Potentially make this into an into only field
  ];

  const rows = [
    { id: 1, scheduleName: 'Fall 2020', lastModified: '10/10/2020', totalGames: 10, gamesLeft: 3 },
    { id: 2, scheduleName: 'Spring 2021', lastModified: '10/10/2020', totalGames: 8, gamesLeft: 5 },
    { id: 3, scheduleName: 'Summer 2021', lastModified: '10/10/2020', totalGames: 6, gamesLeft: 0 },
    { id: 4, scheduleName: 'Fall 2021', lastModified: '10/10/2020', totalGames: 2, gamesLeft: 2 },
    { id: 5, scheduleName: 'Spring 2022', lastModified: '10/10/2020', totalGames: 12, gamesLeft: 1 },
    { id: 6, scheduleName: 'Summer 2022', lastModified: '10/10/2020', totalGames: 13, gamesLeft: 2 },

  ]

function ListSchedules({schedules, schedulesLoading}) {
    // TODO (andrewseaman): Add user authentication to this
    const history = useHistory()

    function redirectToSchedule(event) {
        const selectedSchedule = event.row.id
        const url = "/scheduling/" + selectedSchedule
        history.push(url)
    }

    // TODO (andrewseaman): Create a new create schedule component
    return (
        schedulesLoading ?
        <img src={loader} alt="loading..." /> :
        <div className="GridSchedule" style={{ height: '700px', width: '80%' }}>
            <DataGrid
                rowHeight={75}
                columns={COLUMN_LIST}
                rows = {schedules}
                pageSize={15}
                rowsPerPageOptions={[5]}
                onCellClick={e=>redirectToSchedule(e)}
            />
        </div>
    );
}


export default ListSchedules
