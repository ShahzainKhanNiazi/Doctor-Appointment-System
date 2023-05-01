
import React, { useContext } from 'react'
import "./patients.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PatientTable from '../../../components/patientTable/PatientTable'
import { UserContext } from '../../../Context';

const Patients = () => {
  const {user: currentUser} = useContext(UserContext);

  return (
    <div className='doctor-patients-container'>

   <Box>
     <Paper elevation={3} sx={{height: 50}}>
    <div className='doctor-patients-top'> 
    <h2>Patient Management</h2>
    </div>
    </Paper>   
    </Box>

    <Box>
     <Paper elevation={3} sx={{height: 550}}>
    <div className='doctor-patients-middle' >
    <h3 className='doctor-patients-middle-text'>Patients</h3>
    
    <PatientTable doctor={currentUser._id}/>
    </div>
    </Paper>   
    </Box>

    </div>
  )
}

export default Patients