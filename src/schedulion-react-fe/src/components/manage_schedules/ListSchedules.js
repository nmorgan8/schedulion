import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import CreateNewSchedule from './CreateNewSchedule';
import { useHistory } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import '../schedule/DataTable.css';
import loader from '../images/loader.gif'
import { CalendarPlus } from 'react-bootstrap-icons';
import { Button } from '@material-ui/core';

function ListSchedules({schedules, schedulesLoading, user, refreshSchedules}) {
    const history = useHistory()
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    useEffect(() => {
        if (!user) history.replace("/login")
      }, [])
    
    const setIsModalOpenToTrue = () => {
        setIsModalOpen(true)
    } 

    const setModalIsOpenToFalse=()=> {
        setIsModalOpen(false)
    }

    const deleteSchedule = (user, scheduleName) => {
        scheduleName = scheduleName.replace(" ", "%20")
        URL = "http://localhost:5000/delete_schedule" + "?uID=" + user + "&scheduleID=" + scheduleName
        console.log(URL)
        return fetch(URL, {method: "DELETE"}
      )
        .then(res => res.json())
        .then(d => console.log(d))
        .catch(err => {
          console.log(err)
        })
    }

    const editSchedule = (scheduleName) => {
        history.replace("/scheduling/" + scheduleName)
    }

    const renderEditButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    style={{ margin: 32}}
                    onClick={() => {
                        editSchedule(params.id)
                    }}
                >
                    EDIT
                </Button>
            </strong>
        )
    }

    const renderDeleteButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    style={{ margin: 32}}
                    onClick={() => {
                        deleteSchedule(user, params.id)
                    }}
                >
                    Delete
                </Button>
            </strong>
        )
    }
    
    const handleGetRowID = (e) => {
        return e.name
    }

    const COLUMN_LIST = [
        { field: 'name', headerName: 'Schedule Name', width: 200},
        { field: 'gameTotal', headerName: 'Total Season Games', width: 225}, 
        { field: 'gamesLeft', headerName: 'Unscheduled Games', width: 225},
        { 
            field: 'editSchedule', 
            headerName: 'Edit Schedule', 
            width: 255,
            renderCell: renderEditButton,
            disableClickEventBubbling: true
        }, 
        { 
            field: 'deleteSchedule', 
            headerName: 'Delete Schedule', 
            width: 255,
            renderCell: renderDeleteButton,
            disableClickEventBubbling: true
        },   
      ];
    
    return (
        schedulesLoading ?
        <img src={loader} alt="loading..." /> :
        <div className="GridSchedule" style={{ height: '700px', width: '80%' }}>
            <CalendarPlus onClick={setIsModalOpenToTrue}/>
            <Modal 
                isOpen={isModalOpen}
                ariaHideApp={false}
            >
                <button onClick={setModalIsOpenToFalse}>x</button>
                <CreateNewSchedule 
                    user = {user}
                    refreshSchedules = {refreshSchedules}
                />
            </Modal>
            <DataGrid
                rowHeight={75}
                columns={COLUMN_LIST}
                rows = {schedules}
                getRowId={handleGetRowID}
                pageSize={15}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}


export default ListSchedules
