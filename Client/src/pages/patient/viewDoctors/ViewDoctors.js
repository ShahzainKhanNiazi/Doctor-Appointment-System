import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import "./viewDoctors.css"
import Grid from '@mui/material/Grid';
import DoctorCard from '../../../components/doctorCard/DoctorCard';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { IconButton} from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../../Context';


const ViewDoctors = () => {
   const {user: patient} = useContext(UserContext);
   const [doctors, setDoctors] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(startingIndex+3);
  const [docLength, setDocLength] = useState();
  const [showError, setShowError] = useState(false);
  const url =  "doctor-4.jpg";

  const getDoctors = async () => {
     try {
        const res = await axios.get(`http://localhost:8000/api/doctor/allDoctors`)
        console.log(res.data)
        setDoctors(res.data)
     } catch (error) {
        console.log(error)        
     }
  }

  const handleChange = e => {
   console.log("search ----------->",e.target.value)
   console.log("doctors----------->",doctors)
   const search = e.target.value

   if(search=== ""){
     getDoctors()
     setShowError(false)
   }else{
     const filterData = doctors.filter(
       (doctor)=> doctor.specialization.toLowerCase().includes(search)
     )

     if(filterData.length>0){
       setShowError(false)
       setDoctors(filterData)
     } else {
       setShowError(true)
     }   
   }
 }

  useEffect(()=> {
     getDoctors()
  },
   [])
   
  useEffect(()=> {
      setDocLength(doctors.length)
   },
    [doctors])



   console.log("------->"+docLength)
   

  const handleForwardClick= () => {
    setStartingIndex(
      (prevVal) =>
      prevVal + 1
    )
    setEndingIndex(startingIndex+4)
  }

  const handleBackClick= () => {
    setStartingIndex(
      (prevVal) =>
      prevVal - 1    
      )
      setEndingIndex(startingIndex+2) 
    
  }

  return (
    <div className='viewDoc-container'> 
    <Box>
     <Paper elevation={3} sx={{height: 50}}>
     <div className='viewDoc-top'>
     <h2>Doctors</h2>
     </div>
     </Paper>
     </Box>

     <Box>
     <Paper elevation={3} sx={{height: 550}}>
     <div className='viewDoc-middle'>
     <h3 className='viewDoc-middle-text'>Choose a doctor</h3>

     <Box 
      sx={{
        display:"flex",
        flexDirection:"row-reverse",
        paddingRight:"4%"
      }}
    >
      <TextField id="standard-basic"  placeholder='Search by specialization' variant="standard" w="7" onChange={handleChange} />
    </Box>

     <div className='doctor-cards'>
     <Grid container spacing={1}>

     {doctors.slice(startingIndex, endingIndex).map((doctor, i) => ( 
        <Grid item xl={6} lg={4}>
         <DoctorCard doctor={doctor} url={url} patient_id={patient?._id}/>
       </Grid>
       )
       )}

     </Grid>

     </div>
     
     </div>

     <div className='viewDoc-bottom'>
     <IconButton onClick={handleBackClick} disabled={startingIndex === 0}>
        <ArrowBack/>
     </IconButton>
     
     <IconButton onClick={handleForwardClick} disabled={docLength === endingIndex}>
        <ArrowForward/>
     </IconButton>  
     </div>
     </Paper>
     </Box>
    
    </div>
  )
}

export default ViewDoctors