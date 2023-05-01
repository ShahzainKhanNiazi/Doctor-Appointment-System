
import React from 'react'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DoctorTable from '../../../components/doctorTable/DoctorTable'

const AllDoctors = () => {
  return (
    <div className='doctor-patients-container'>

   <Box>
     <Paper elevation={3} sx={{height: 50}}>
    <div className='doctor-patients-top'> 
    <h2>Doctor Management</h2>
    </div>
    </Paper>   
    </Box>

    <Box>
     <Paper elevation={3} sx={{height: 550}}>
    <div className='doctor-patients-middle' >
    <h3 className='doctor-patients-middle-text'>Doctors</h3>
    
    <DoctorTable admin={true}/>
    </div>
    </Paper>   
    </Box>

    </div>
  )
}

export default AllDoctors