import React from 'react'
import { useHistory } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import '../schedule/DataTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import loader from '../images/loader.gif'
import './ListSchedules.css'


const deleteSchedule = (event) => {
    const del = (id) => {
        const url = '/delete_schedule?id=' + id
        return fetch(url, {method: "DELETE"}
      )
      .then(res => res.json())
      .then(json => console.log(json))
    }
    del()
}

function redirectToSchedule(event, h) {
    console.log(event)
    if (event.field !== "delete") {
        const selectedSchedule = event.id
        const url = "/scheduling/" + selectedSchedule
        h.push(url)
    }
}

const COLUMN_LIST = [
    { field: 'id', hide: true },
    { field: 'name', headerName: 'Schedule Name', width: 200},
    { field: 'modified', headerName: 'Last Modified', width: 200, type: 'date' },
    { field: 'gameTotal', headerName: 'Total Season Games', width: 225}, 
    { field: 'gamesLeft', headerName: 'Unscheduled Games', width: 225},
    { 
        field: 'delete', 
        headerName: "Delete",
        renderCell: () => (
            <button className="delete-button" onClick={()=>deleteSchedule("id")}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        ),
        width: 120,
    },
    { 
        field: 'edit', 
        headerName: "Edit",
        renderCell: (c) => (
            <button className="delete-button" onClick={()=>redirectToSchedule(c.id)}>
                <FontAwesomeIcon icon={faPen}/>
            </button>
        ),
        width: 120,
    }
  ];

  function ListSchedules({schedules, schedulesLoading}) {
    const history = useHistory()

    return (
        schedulesLoading ?
        <img src={loader} alt="loading..." /> :
        <div className="GridSchedule" style={{ height: '700px', width: '80%' }}>
            <DataGrid
                rowHeight={75}
                columns={
                    [
                        { field: 'id', hide: true },
                        { field: 'name', headerName: 'Schedule Name', width: 200},
                        { field: 'modified', headerName: 'Last Modified', width: 200, type: 'date' },
                        { field: 'gameTotal', headerName: 'Total Season Games', width: 225}, 
                        { field: 'gamesLeft', headerName: 'Unscheduled Games', width: 225},
                        { 
                            field: 'delete', 
                            headerName: "Delete",
                            renderCell: (e) => (
                                <button className="delete-button" onClick={()=>deleteSchedule(e)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            ),
                            width: 120,
                        },
                        { 
                            field: 'edit', 
                            headerName: "Edit",
                            renderCell: (e) => (
                                <button className="delete-button" onClick={()=>redirectToSchedule(e, history)}>
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                            ),
                            width: 120,
                        }
                      ]
                }
                rows = {schedules}
                pageSize={15}
                rowsPerPageOptions={[5]}
                // onCellClick={e=>redirectToSchedule(e)}
            />
        </div>
    );
}


export default ListSchedules
