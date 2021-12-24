import React from 'react'
import { useHistory } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import '../schedule/DataTable.css';
import loader from '../images/loader.gif'

const COLUMN_LIST = [
    { field: 'name', headerName: 'Schedule Name', width: 200},
    { field: 'modified', headerName: 'Last Modified', width: 200, type: 'date' },
    { field: 'gameTotal', headerName: 'Total Season Games', width: 225}, 
    { field: 'gamesLeft', headerName: 'Unscheduled Games', width: 225} 
  ];
  
function ListSchedules({schedules, schedulesLoading}) {
    const history = useHistory()

    function redirectToSchedule(event) {
        const selectedSchedule = event.row.id
        const url = "/scheduling/" + selectedSchedule
        history.push(url)
    }
    
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
