import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import CreateNewSchedule from './CreateNewSchedule';
import { useHistory } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import '../schedule/DataTable.css';
import loader from '../images/loader.gif'
import { CalendarPlus } from 'react-bootstrap-icons';

const COLUMN_LIST = [
    { field: 'name', headerName: 'Schedule Name', width: 200},
    { field: 'modified', headerName: 'Last Modified', width: 200, type: 'date' },
    { field: 'gameTotal', headerName: 'Total Season Games', width: 225}, 
    { field: 'gamesLeft', headerName: 'Unscheduled Games', width: 225} 
  ];
  
function ListSchedules({schedules, schedulesLoading, user}) {
    useEffect(() => {
        if (!user) history.replace("/listSchedule")
      }, [user])

    const history = useHistory()

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const setIsModalOpenToTrue = () => {
        setIsModalOpen(true)
    } 

    const setModalIsOpenToFalse=()=> {
        setIsModalOpen(false)
    }

    function redirectToSchedule(event) {
        const selectedSchedule = event.row.id
        const url = "/scheduling/" + selectedSchedule
        history.push(url)
    }

    const handleGetRowID = (e) => {
        return e.name
    }
    
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
                />
            </Modal>
            <DataGrid
                rowHeight={75}
                columns={COLUMN_LIST}
                rows = {schedules}
                getRowId={handleGetRowID}
                pageSize={15}
                rowsPerPageOptions={[5]}
                onCellClick={e=>redirectToSchedule(e)}
            />
        </div>
    );
}


export default ListSchedules
