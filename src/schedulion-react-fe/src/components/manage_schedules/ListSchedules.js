import React, {useState, useEffect} from 'react'
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewSchedule from './CreateNewSchedule';
import { useHistory } from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import '../schedule/DataTable.css';
import loader from '../images/loader.gif'
import { CalendarPlus } from 'react-bootstrap-icons';
import { Button } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const GreyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(136, 139, 141, 0.97)',
    color: 'rgba(255, 255, 255, 1)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

function ListSchedules({schedules, schedulesLoading, user, refreshSchedules, selectedSchedule, setSelectedSchedule, URL_VARIABLE}) {
    const history = useHistory()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (!user) history.replace("/login")
        if (selectedSchedule) history.replace("/scheduling")
      }, [selectedSchedule, user, history])

    const editSchedule = (scheduleID) => {
        setSelectedSchedule(scheduleID)
    }


    const deleteSchedule = (user, scheduleName) => {
        scheduleName = scheduleName.replace(" ", "%20")
        const URL = URL_VARIABLE + "delete_schedule?uID=" + user + "&scheduleID=" + scheduleName
        return fetch(URL, {method: "DELETE"}
      )
        .then(res => res.json())
        .then(d => console.log(d))
        .catch(err => {
          console.log(err)
        })
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
        { field: 'name', headerName: 'Schedule Name', flex: 0.3},
        {
            field: 'editSchedule',
            headerName: 'Edit Schedule',
            flex: 0.2,
            renderCell: renderEditButton,
            disableClickEventBubbling: true
        },
        {
            field: 'deleteSchedule',
            headerName: 'Delete Schedule',
            flex: 0.2,
            renderCell: renderDeleteButton,
            disableClickEventBubbling: true
        },
      ];

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);


    return (
        schedulesLoading ?
        <img className='loading-gif' src={loader} alt="loading..." /> :
        <div className='Page'>
        <GreyTooltip title="New Schedule" placement="right" arrow>
          <CalendarPlus
              className='icon'
              onClick={handleShow}
          />
        </GreyTooltip>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create a New Schedule: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CreateNewSchedule
                    user = {user}
                    refreshSchedules = {refreshSchedules}
                    URL_VARIABLE = {URL_VARIABLE}
                    hide = {handleClose}
                />
                </Modal.Body>
              </Modal>
        <div className="AllSchedules" style={{ height: '700px', width: '80%' }}>
            <DataGrid
                rowHeight={75}
                columns={COLUMN_LIST}
                rows = {schedules}
                getRowId={handleGetRowID}
                pageSize={15}
                rowsPerPageOptions={[5]}
            />
            </div>
        </div>
    );
}

export default ListSchedules
