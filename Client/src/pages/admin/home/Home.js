import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { UserContext } from '../../../Context';
import axios from 'axios';

const Home = () => {
  const {user: admin} = useContext(UserContext);
  const [appointments, setAppointments] = useState();
  const [patients, setPatients] = useState();
  const [doctors, setDoctors] = useState();
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [approvedAppointments, setapprovedAppointments] = useState(0);

  const getData = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/api/appointment/allAppointments`)
      setAppointments( res.data);
      
      res = await axios.get(`http://localhost:8000/api/doctor/allDoctors`)
      setDoctors(res.data);


      res = await axios.get(`http://localhost:8000/api/patient/allPatients`)
      setPatients(res.data);
    } catch (error) {
      console.log(error)
    }   
  }

  const updateData = () => {
    console.log("------->"+appointments)

    let tempArr = appointments?.filter((a) => a.status === "pending")
    let rest = appointments?.length - tempArr?.length
 
    setPendingAppointments(tempArr?.length)
    setapprovedAppointments(rest)

  }
  
  useEffect(()=>{
    getData()
  }, [])

  useEffect(()=>{
    updateData()
  }, [appointments])

  return (
    <div className='adminHome-container'>
       <Box>
         <Paper elevation={3} sx={{height: 50}}>
         <div className='adminHome-top'>
           <h2>Dashboard</h2>
         </div>
         </Paper>
       </Box>

       <Box>
         <Paper elevation={3} sx={{height: 550}}>
     <div className='adminHome-middle'>
     <Paper elevation={6} sx={{width: 230, height: 150, textAlign: "center"}}>
     <div className='box'>
     <h3 className='box-title'>Total Appointments</h3>
     <h2 className='box-value'>{appointments?.length}</h2>
     </div>
     

     </Paper>

     <Paper elevation={6} sx={{width: 230, height: 150, textAlign: "center"}}>
     <div className='box'>
     <h3 className='box-title'>Total Doctors</h3>
     <h2 className='box-value'>{doctors?.length}</h2>
     </div>

     </Paper>

     <Paper elevation={6} sx={{width: 230, height: 150, textAlign: "center"}}>
     <div className='box'>
     <h3 className='box-title'>Total Patients</h3>
     <h2 className='box-value'>{patients?.length}</h2>
     </div>

     </Paper>

     <Paper elevation={6} sx={{width: 230, height: 150, textAlign: "center"}}>
     <div className='box'>
     <h3 className='box-title'>Pending Appointments</h3>
     <h2 className='box-value'>{pendingAppointments}</h2>
     </div>

     </Paper>

     <Paper elevation={6} sx={{width: 230, height: 150, textAlign: "center"}}>
     <div className='box'>
     <h3 className='box-title'>Approved Appointments</h3>
     <h2 className='box-value'>{approvedAppointments}</h2>
     </div>

     </Paper>
     </div>

     </Paper>
       </Box>

    </div>
  )
}

export default Home