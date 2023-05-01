import React, { useEffect, useState } from 'react'
import "./addAppointment.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { MenuItem, Select, Typography, TextField, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const AddAppointment = () => {
  const [startDate, setStartDate] = useState(new Date()); 
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [slots, setSlots] = useState();
  const [slot, setSlot] = useState();

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const getDoctors = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/doctor/allDoctors`)
      console.log(res.data)
      setDoctors(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getDoctorSlots = async (id)=> {
      try {
        const res = await axios.get(`http://localhost:8000/api/slot/doctor-slots/${id}`);
        setSlots(res.data)
      } catch (error) {
        console.log(error.response);
      }
  }

  const checkSlots = async (id) => {
    let takenslots = []
    let tempSlots = slots
    let filteredArray
    let appointments;
    let date1;
    try {
      const res = await axios.get(`http://localhost:8000/api/appointment/doctor-appointments/${id}`);
      appointments = res.data
      appointments.map((a, i)=> {
        date1= new Date(a.date);
            if(date1.toDateString() === startDate.toDateString() ) {
                console.log("Appointment date is equal to current date")
                takenslots.push(a.slot_id)
            } else{
                console.log("Appointment date is not equal to current date")
                console.log("------> "+ date1)
                console.log("------> "+ startDate)
            }
      })
    } catch (error) {
      console.log(error)
    }
    if(takenslots.length > 0) {
      filteredArray = tempSlots.filter(sl => {
        return !takenslots.some(ts => {
          return  ts === sl._id 
        })
      })

      setSlots(filteredArray)
    } else {
      getDoctorSlots(id)
    }
  }

  const handleChange = (e) => {
    const Id = e.target.value.Id;
    const name = e.target.value.name;

  
    getDoctorSlots(Id);
    setDoctorId(Id);
    setDoctorName(name);
  }

  const handleBtnClick = (sl) => {
    setSlot(sl);
  }


  const makeAppointment = async () => {
    const date = startDate.toLocaleDateString();

      const newAppointment = {
        date: date,
        slot_id: slot._id,
        from:  slot.from,
        time: slot.time,
        doctor_id: doctorId,
        doctorName: doctorName,        
        patientName: 'Admin'
      }

      try {
        const res = await axios.post(`http://localhost:8000/api/appointment/adminAppointment`, newAppointment)
        console.log(res.data);
        alert("Appointment has been requested");
      } catch (error) {
        console.log(error)
      }
      setSlot("");
      setStartDate(new Date());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(slot && startDate){
      makeAppointment();
    } else{
      alert("Please select a date and available slot");
    }
    
  }

  useEffect(()=>{
    checkSlots(doctorId)
  }
  ,[doctorId, startDate])

  useEffect(()=>{
    getDoctors()
  }
  ,[])


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
     <Paper elevation={3} sx={{height: "90vh"}}>
    <div className='patientAppointments-middle' >
    <h3 className='patientAppointments-middle-text'>Add a new Appointment</h3>

    <form onSubmit={handleSubmit}>
    <Box>

    

    <Typography component="label" sx={{mr: '5px'}}>Select a doctor</Typography>
    
    <Select placeholder="Select a doctor" sx={{width: "20%"}} onChange={handleChange} required>
      <MenuItem value='0' disabled selected>Select a Doctor</MenuItem> 
      {doctors.map((doc,i) => 
        <MenuItem value={{"Id":doc._id, "name":doc.firstName+" "+doc.lastName}} >Dr. {doc.firstName} {doc.lastName}</MenuItem>
      )} 
      
    </Select>

    </Box>  

    <Box>
    <Typography >Select a date</Typography>
    <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            filterDate={isWeekday}
            minDate={new Date()}
            placeholderText="Select a weekday"
            inline
            />

    <div className='slot-div'>         
    {slots && 
    slots.map((sl,i) =>{
      if ( sl._id === slot?._id) {
                return (
                <button key={i} className='slot-box-checked' disabled={false} onClick={()=> {handleBtnClick(sl)}} type='button'>
                 {sl.from}-{sl.to} {sl.time}
               </button>              )  
              }
              return (
                <button key={i} className='slot-box' disabled={false} onClick={()=> {handleBtnClick(sl)}} type='button'>
                {sl.from}-{sl.to} {sl.time}
               </button>
              )
    }
    )}
      
    </div>

    <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
    <Button variant="contained" type='submit'>Request</Button>
    </Box>

    </Box>    
    
    </form>
    </div>

    
    </Paper>   
    </Box>

    </div>
  )
}

export default AddAppointment