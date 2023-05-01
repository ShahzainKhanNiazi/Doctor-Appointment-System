import React, { useContext } from 'react'
import './home.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { UserContext } from '../../../Context';
import axios from 'axios';

const Home = () => {
  const {user: patient} = useContext(UserContext)

  console.log("This is patient home")
  console.log(patient);
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
       <li><p> <b>Name:   </b> {patient.firstName} {patient.lastName} </p></li>
       <li><p> <b>Email:  </b>  {patient.email}</p></li>
       <li><p> <b>Phone   </b>  No: {patient.ph_num}</p></li>
       <li><p> <b>City:   </b>  {patient.city}</p></li>
       <li><p> <b>Address:</b>  {patient.address}.</p></li>
     </ul>           
     </div>
     
     </div>
     

     <hr/>
       

     <div className='patientHome-bottom'>
           <h3>Health metrics:</h3>
           
           <div className='patient-details health-details'>
           <ul>
             <li><p> <b>Blood Group:</b> {patient.blood_group || "N/A"}</p></li>
             <li><p> <b>Weight:</b>      {patient.weight ? patient.weight+" kg" : "N/A"}</p></li>
             <li><p> <b>Height:</b>       {patient.height ? patient.height+" ft" : "N/A"} </p></li>
             <li><p> <b>Gender:</b>      {patient.gender==="M" ? "Male": "Female"}</p></li>
           </ul>                           
           </div>
     </div>
     </Paper>
       </Box>

    </div>
  )
}

export default Home