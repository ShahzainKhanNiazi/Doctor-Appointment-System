import React, { useEffect, useState, useContext } from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import DoctorCard from '../../components/doctorCard/DoctorCard'
import Grid from '@mui/material/Grid';
import "./doctor.css"
import axios from 'axios';
import { UserContext } from '../../Context';
import { Box } from '@mui/system';
import { Input, TextField } from '@mui/material';


const Doctors = () => {
  const {user: patient} = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [showError, setShowError] = useState(false);
  const url = "doctor-4.jpg";

  const getDoctors = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/doctor/allDoctors`)
      console.log(res.data)
      setDoctors(res.data)
   } catch (error) {
      console.log(error)        
   }
  }

  useEffect(()=>{
    getDoctors()
  }, [])

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
  
  return (
    <>
    <Navbar/>
    <div className='contact-container'>
    
    <div className='contact-top'>
    <h1>Doctors</h1>  
    </div>

    <Box 
      sx={{
        display:"flex",
        flexDirection:"row-reverse",
        paddingRight:"4%"
      }}
    >
      <TextField id="standard-basic"  placeholder='Search by specialization' variant="standard" w="7" onChange={handleChange} />
    </Box>

    <Box 
      sx={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"flex-start",
        paddingLeft:"4%"
      }}
    >
    {!showError && doctors?.map((doctor, i) => ( 
      <Box sx={{
        width:"30%",
        marginX:"1%",
        marginY:"1%",
        
      }}>
        <DoctorCard doctor={doctor} url={url} />
      </Box>
  )
  )}

  {showError && 
  <Box sx={{
    height:"80vh",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems: "center"
    }}
    >
  <p>No match found</p>
  </Box> 
  }
    </Box>

    <Box sx={{
      position:"sticky"
    }}>
    <Footer/>
    </Box>

    </div>
    </>
  )
}

export default Doctors;