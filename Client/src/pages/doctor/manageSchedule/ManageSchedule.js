import React, { useContext, useRef, useState, useEffect } from 'react'
import "./manageSchedule.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { UserContext } from '../../../Context';

const ManageSchedule = () => {
  const {user: doctor} = useContext(UserContext);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState([]);
  const [slot, setSlot] = useState({start: "", end: "", meridiem: "", doctor_id: ""})
  const [slots, setSlots] = useState([]);
  const [divElement, setDivElement] = useState([])
  const [timeError, setTimeError] = useState(false);
  const [hasSchedule, setHasSchedule] = useState(false);
  const [schedule_id, setSchedule_id] = useState("");
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const divRef = useRef();
  const validTime = /\b((1[0-2]|0?[1-9]):([0-5][0-9])\s?([AaPp][Mm]))/
  const validSlot = /^(0?[1-9]|1[012]):[0-5][0-9]$/
  let tempdays = days;

    const handleChange = (e) => {
      if(tempdays.length >=e.target.value){
        for(let i = tempdays.length; i>e.target.value; i--){
          tempdays.pop()
        }
      }

      setDivElement([]);
        console.log(e.target.value)
        for(let i = 1; i<=e.target.value; i++ )
        setDivElement(
          (prevVal) =>
          [...prevVal, generateDiv(i)]
        );
    }

    const handleTimeChange = (e) => {
      const {name, value} = e.target;
      
      console.log(name, value)
    
      if(name === "from") {
        setFrom(value)
      } else{
        setTo(value)
      } 
    }

    const getDoctorSchedule = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/schedule/doctor-schedule/${doctor._id}`);
        setSchedule_id(res.data._id);
        setHasSchedule(true);
        console.log("schedule exists")  
      } catch (error) {
        console.log(error.response);
      }
    }

    const getDoctorSlots = async ()=> {
      try {
        const res = await axios.get(`http://localhost:8000/api/slot/doctor-slots/${doctor._id}`);
        setSlots(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }

     const handleDayChange = (e, num) => {
       const dayName = e.target.value;
       let found = tempdays.some((temp) => {return temp.dayNum===num})

      if(!found) {
        tempdays.push({dayNum: num, dayName})
       } else {
         tempdays = tempdays.map((temp) => {
           if(temp.dayNum === num) {
             return {dayNum: num, dayName}
           } else{
             return temp;
           }
         })
         
       }
       
       setDays(tempdays);
      
     }

     if(days.length===0){
       console.log("Length is zero")
     }

     console.log(days.length);
     console.log(days);

    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log(from);
      console.log(to);

      if(!validTime.test(from) || !validTime.test(to)) {
        setTimeError(true)
      } else {
        setTimeError(false)
        console.log("Time is correct")
        createSchedule();
      }      
    }

    const createSchedule = async () => {
      const schedule = {
        days: days,
        from: from,
        to: to,
        doctor_id: doctor._id
      }

      if(!hasSchedule) {
        try {
          const res = await axios.post(`http://localhost:8000/api/schedule/`, schedule)
         console.log(res.data)
        } catch (error) {
          console.log(error);
        }
          } 
          else {
            try {
              const res = await axios.put(`http://localhost:8000/api/schedule/${schedule_id}`, schedule)
              console.log(res.data)
            } catch (error) {
              console.log(error);
            }
      }
    }

    const handleSlotChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      console.log(name, value)
      setSlot(
        (prevVal) =>{
          return (
            {
              ...prevVal,
              [name] : value,
              
            })            
          }
      ) }

      const createSlot = async () => {
        const newSlot = {
          from: slot.start,
          to: slot.end,
          time: slot.meridiem,
          doctor_id: doctor._id
        }
        try {
          const res = await axios.post(`http://localhost:8000/api/slot/`, newSlot);
          console.log(res.data)          
        } catch (error) {
          console.log(error)
        }
        
      }

    const handleSlotSubmit = (e) => {
      e.preventDefault();

      if(validSlot.test(slot.start) && validSlot.test(slot.end)){
        createSlot()       
        setSlots((prevVal) => [...prevVal, slot])
        setSlot({...slot, start: "", end: ""});
      } else {
        alert("Enter valid time")
      }
      getDoctorSlots();
    }

    const handleDeleteClick = (id) => {
      deleteSlot(id);
    }

    const deleteSlot = async (id) => {
      try {
        const res = await axios.delete(`http://localhost:8000/api/slot/${id}`);
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      getDoctorSlots();
    }

    const generateDiv = (num) => {
        return (
          <div className='working-day-div'>
          <label htmlFor='day' className='working-day-label'>Day {num}: </label>
            <select name='day' required className='working-day-select' onChange={(e) =>handleDayChange(e, num)}>
            <option value="" disabled selected >Select a day</option>      
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thur">Thursday</option>
              <option value="Fri">Friday</option>            
            </select>
          </div>
        )         
    }
    useEffect(()=>{
      getDoctorSchedule();
    },
     [])

     useEffect(()=>{
      getDoctorSlots();

     }, [])


  return (
    <div className='manage-schedule-container'>

   <Box>
     <Paper elevation={3} sx={{height: 50}}>
    <div className='manage-schedule-top'> 
    <h2>Schedule Management</h2>
    </div>
    </Paper>   
    </Box>

    <Box>
     <Paper elevation={3} sx={{height: 550}}>
    <div className='manage-schedule-middle' >
    <h3 className='manage-schedule-middle-text'>Create Your Schedule</h3>
    <form onSubmit={handleFormSubmit}>

    <div className='manage-schedule-working-days'>
    <label htmlFor="days" className='working-days-label'>Working Day/s: </label>
    <select name="days" required onChange={handleChange} className='working-days-select'>
        <option value="" disabled selected >Select number of days</option>      
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </select>
    </div>

    <div className='manage-schedule-working-day' ref={divRef}>
    {divElement}
    </div>

    <div className='manage-schedule-working-hours'>
      Timings 
      <label htmlFor='from'  className='working-hours-label'> From: </label>
      <input name='from' ref={fromRef} required className='working-hours-input' onChange={handleTimeChange} placeholder='E.g 7:00 pm'/>
      <label htmlFor='to'>  To: </label>
      <input name='to' ref={toRef} required className='working-hours-input' onChange={handleTimeChange} placeholder='E.g 9:00 pm'/> 
    </div>

    {timeError && <div style={{color: "red", marginTop: '10px'}}>'Please enter time in correct format'</div>}

    <button type='submit' className='create-schedule-button'>Create schedule</button>

    
    </form>
    </div>

    <div className='manage-schedule-bottom'>
    <h3 className='manage-schedule-bottom-text'>Create Slots</h3>
    <div>
        <form onSubmit={handleSlotSubmit}>
        <div className='create-slot-div'>
        <label htmlFor='start'> Start: </label>
         <input className='create-slot-input' name='start' onChange={handleSlotChange} value={slot.start} required />
         <label htmlFor='end'> End: </label>
         <input className='create-slot-input' name='end' onChange={handleSlotChange} value={slot.end} required />
         <select name="meridiem" onChange={handleSlotChange} required style={{ marginLeft: '10px'}}>
           <option value="" disabled selected>meridiem</option>
           <option value="AM">AM</option>
           <option value="PM">PM</option>
         </select>
         <button type='submit' className='create-slot-button'>Create</button> 
        </div>
        </form>
        </div>

        <div className='slots-view'>
        <h4>Slots</h4>
        <div className='slots-div'>
          {slots.map((item, index) => 
            <div className='slot-div' key={index}>
              {item.from} - {item.to} { item.time}
              <button className='delete-button' onClick={() =>handleDeleteClick(item._id)}>delete</button>
            </div>
            
           )}
        </div>
        </div>   

    </div>
    </Paper>   
    </Box>

    </div>
  )
}

export default ManageSchedule


