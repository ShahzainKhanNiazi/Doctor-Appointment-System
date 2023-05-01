import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { UserContext } from '../../../Context';

const Home = () => {
  const {user: doctor} = useContext(UserContext)
  const [schedule, setSchedule] = useState();

  console.log("This is doctor's home")
  console.log(doctor);

  const getSchedule = async () => {
    const res = await axios.get(`http://localhost:8000/api/schedule/doctor-schedule/${doctor._id}`);
    console.log(res.data);
    setSchedule(res.data);
  }


  useEffect(()=>{
    getSchedule()
  }, [])

  return (
    <div className='patientHome-container'>
       <Box>
         <Paper elevation={3} sx={{height: 50}}>
         <div className='patientHome-top'>
           <h2>Home</h2>
         </div>
         </Paper>
       </Box>

       <Box>
         <Paper elevation={3} sx={{height: 550}}>
     <div className='patientHome-middle'>
     <h3>Basic Info:</h3>
     
     <div className='patient-details'>
     <ul>
       <li><p> <b>Name:   </b> {doctor.firstName} {doctor.lastName} </p></li>
       <li><p> <b>Email:  </b>  {doctor.email}</p></li>
       <li><p> <b>Phone   </b>  {doctor.ph_num}</p></li>
       <li><p> <b>City:   </b>  {doctor.city}</p></li>
       <li><p> <b>Clinic location:</b>  {doctor.address}</p></li>
     </ul>           
     </div>
     
     </div>
     

     <hr/>
       

     <div className='patientHome-bottom'>
           <h3>Professional Info:</h3>
           
           <div className='patient-details health-details'>
           <ul>
             <li><p> <b>Education:</b> {doctor.education}</p></li>
             <li><p> <b>Specialization:</b>      {doctor.specialization}</p></li>
             <li><p> <b>Days:</b> {schedule?.days.map((day,i) => <span>{day.dayName}, </span>)} </p></li>
             <li><p> <b>Timings:</b>      {schedule?.from} - {schedule?.to}</p></li>
           </ul>                           
           </div>
     </div>
     </Paper>
       </Box>

    </div>
  )
}
 

export default Home