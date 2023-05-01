import React from 'react'
import "./allAppointments.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppointmentTable from '../../../components/appointmentTable/AppointmentTable'

const AllAppointments = () => {
  return (
    <div className='patientAppointments-container'>

   <Box>
     <Paper elevation={3} sx={{height: 50}}>
    <div className='patientAppointments-top'> 
    <h2>Appointment Management</h2>
    </div>
    </Paper>   
    </Box>

    <Box>
     <Paper elevation={3} sx={{height: 550}}>
    <div className='patientAppointments-middle' >
    <h3 className='patientAppointments-middle-text'>Appointments</h3>
    
    <AppointmentTable admin={true}/>
    </div>
    </Paper>   
    </Box>

    </div>
  )
}

export default AllAppointments