import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './appointmentModal.css'
import axios from 'axios';


export default function AppointmentModal({open, handleClose, appointmentId, doctor, patient_id}) {
  const [slots, setSlots] = useState(["9:00-9:30", "9:30-10:00", "10:00-10:30", "10:30-11:00", "10:30-11:00", "10:30-11:00", "10:30-11:00",]);
  const [appointment, setAppointment ] = React.useState();
  const [startDate, setStartDate] = React.useState(null) 
  const [slot, setSlot] = useState({_id: "", from: "", to: "", time: "", doctor_id: ""});
  
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const getAppointment = async () => {
    if(appointmentId){
      try {
        const res = await axios.get(`http://localhost:8000/api/appointment/${appointmentId}`);
        const date = res.data.date
        setAppointment(res.data)
        setStartDate(new Date(date))
        setSlot({...slot, _id: res.data.slot_id})
      } catch (error) {
         console.log(error) 
      }
    }
  }
  
  console.log("This is slot");
  console.log(slot)

  const getDoctorSlots = async ()=> {
    if(doctor) {
      try {
        const res = await axios.get(`http://localhost:8000/api/slot/doctor-slots/${doctor.id}`);
        setSlots(res.data)
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const checkSlots = async () => {
    let takenslots = []
    let tempSlots = slots
    let filteredArray
    let appointments;
    let date1;
    try {
      const res = await axios.get(`http://localhost:8000/api/appointment/doctor-appointments/${doctor.id}`);
      appointments = res.data
      appointments.map((a, i)=> {
        date1= new Date(a.date);
            if(date1.toDateString() === startDate.toDateString() ) {
                if(a.patient_id != patient_id){
                  console.log("Appointment date is equal to current date")
                  takenslots.push(a.slot_id)
                } 
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
          return  sl._id === ts
        })
      })

      setSlots(filteredArray)
    } else {
      getDoctorSlots()
    }
  }


  useEffect(
    ()=>{
     getDoctorSlots()
     getAppointment()
   },[appointmentId])

   useEffect( 
     ()=> {
       checkSlots()
     }, [startDate])
  

  const handlebtnClick = (time) => {
    const slotss = slots;
    console.log(time);
    setSlot(time);
    slotss.map((sl, i) => {
      if ( sl._id === time) {
        console.log("Slot "+ time + " has been taken")
      }
      return sl;

      setSlots(slotss)
    })
    
  }
  
  const updateAppointment = async () => {
    const date = startDate.toLocaleDateString();

    if( slot.from && slot.time) {
      const newAppointment = {
        date: date,
        slot_id: slot._id,
        from: slot.from,
        time: slot.time,
        doctor_id: doctor.id,
        doctorName: doctor.name,
        patient_id: appointment.patient_id,
        patientName: appointment.patientName,
        status: "pending"
      }
      alert("Appointment has been requested");
  
      console.log("this is new appointment")
      console.log(newAppointment)
  
      try {
        const res = await axios.put(`http://localhost:8000/api/appointment/${appointmentId}`, newAppointment)
        console.log(res.data)
        getAppointment()
  
      } catch (error) {
        console.log(error)
      }
      handleClose();
    } else {
      alert("Please select available slot and date")
    }

    
  }

  const handleClick = () => {
    const date = startDate
    console.log(date)
    if(slot && date){
      updateAppointment();
    } else{
      alert("Please select available slot and date");
    }
    
  }

  console.log(appointment)
  console.log(slots)
  


  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Appointment</DialogTitle>
        <DialogContent sx={{height: 300}} >
          <DialogContentText>
            Please select date and available slot to book an appointment
          </DialogContentText>

          <label>Doctor Name:</label>
          <input value={doctor.name} readOnly style={{padding: "5px", marginLeft: '5px', marginBottom: '10px'}}/>
          
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            filterDate={isWeekday}
            minDate={new Date()}
            placeholderText="Select a weekday"
            inline
            />
            
            <div className='slot-div'>
          { slots &&
            slots.map((sl, i)=>{
              if ( sl._id === slot._id) {
                return (
                <button key={i} className='slot-box-checked' disabled={false} onClick={()=> {handlebtnClick(sl)}} >
                 {sl.from}-{sl.to} {sl.time}
               </button>              )  
              }
              return (
                <button key={i} className='slot-box' disabled={false} onClick={()=> {handlebtnClick(sl)}} >
                {sl.from}-{sl.to} {sl.time}
               </button>
              )        
            })
          }
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
