import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './appointmentform.css'
import axios from 'axios';
import { useEffect } from 'react';

export default function AppointmentForm({open, handleClose, doctor_id, patient_id, slots, setSlots}) {
  const [startDate, setStartDate] = useState(new Date()); 
  const [patientName, setpatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [slot, setSlot] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [appointment, setAppointment ] = useState({});
  
  
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const getSlots = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/slot/doctor-slots/${doctor_id}`)
      console.log(res.data);
       setSlots(res.data);
    } catch (error) {
      console.log(error)
    }    
  }

  const checkSlots = async () => {
    let takenslots = []
    let tempSlots = slots
    let filteredArray
    let appointments;
    let date1;
    try {
      const res = await axios.get(`http://localhost:8000/api/appointment/doctor-appointments/${doctor_id}`);
      appointments = res.data;
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
          return  sl._id === ts
        })
      })

      setSlots(filteredArray)
    } else {
      getSlots()
    }

    
  }


  const getDoctor = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/doctor/${doctor_id}`);
      const name = res.data.firstName +" "+res.data.lastName;
      setDoctorName(name);   
    } catch (error) {
      console.log(error)
    }
  }

  const getPatient = async() => {
    try {
      const res = await axios.get(`http://localhost:8000/api/patient/${patient_id}`);
      const name = res.data.firstName +" "+res.data.lastName;
      setpatientName(name);
    } catch (error) {
      console.log(error)
    }
  }

  const updatePatient = async () => {
    try {
      const res = await axios.put(`http://localhost:8000/api/patient/${patient_id}/add-doctor`, {doctor_id});
      console.log(res.data)      
    } catch (error) {
      console.log(error)
    }
  }

  const updateDoctor= async () => {
    try {
      const res = await axios.put(`http://localhost:8000/api/doctor/${doctor_id}/add-patient`, {patient_id});
      console.log(res.data)      
    } catch (error) {
      console.log(error)
  }
}

  
  const handlebtnClick = (time) => {
    const slotss = slots;
    console.log(time);
    setIsChecked(!isChecked);
    setSlot(time);
    slotss.map((sl, i) => {
      if ( sl._id === time) {
        console.log("Slot "+ time + " has been taken")
      }
      return sl;

      setSlots(slotss)
    })
    
  }

  const handleClick = async () => {
    const date = startDate.toLocaleDateString();

    if(slot && date) 
    {
      console.log(slot)
      const newAppointment = {
        date: date,
        slot_id: slot._id,
        from:  slot.from,
        time: slot.time,
        doctor_id: doctor_id,
        doctorName: doctorName,
        patient_id: patient_id,
        patientName: patientName
      }

      try {
        const res = await axios.post(`http://localhost:8000/api/appointment`, newAppointment)
        console.log(res.data);
        alert("Appointment has been requested");
      } catch (error) {
        console.log(error)
      }
      updatePatient()
      updateDoctor()
      setSlot("");
      setStartDate(new Date());
      
      handleClose();
    } else {
      console.log(slot)
      alert("Please select available date and slot")
    }        
    
  }

  useEffect( ()=> {
    getDoctor()
    getSlots()
  }
  , [doctor_id])

  useEffect( ()=> {
    checkSlots()
  }, [startDate])

  useEffect(()=> {
    getPatient()
  }, [patient_id])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Appointment</DialogTitle>
        <DialogContent sx={{height: 300}} >
          <DialogContentText>
            Please select date and available slot to book an appointment
          </DialogContentText>
          
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            filterDate={isWeekday}
            minDate={new Date()}
            placeholderText="Select a weekday"
            inline
            />
            
          <div className='slot-div'>
          {
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

          <p style={{fontSize: "12px", color: "red", marginTop: "10px"}}>Note: Please arrive 15 minutes before your appointment time</p>
          <p style={{fontSize: "12px", color: "red", marginTop: "5px"}}>Incase of emergeny please contact: 03121234567</p>
          
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
