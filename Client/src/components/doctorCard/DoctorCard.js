import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppointmentForm from '../appointmentModal/AppointmentForm';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import DoctorModal from '../doctorModal/DoctorModal';


export default function DoctorCard({doctor, url, patient_id}) {
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false)
  const [schedule, setSchedule] = useState();
  const [slots, setSlots] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState(false);

  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_URL;

  const getSlots = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/slot/doctor-slots/${doctor._id}`)
      console.log(res.data);
       setSlots(res.data);
    } catch (error) {
      console.log(error)
    }    
  }

  const checkAppointments = async () => {
    if(patient_id){
      console.log(patient_id)
      try {
        const res = await axios.post(`http://localhost:8000/api/appointment/check-appointment/${doctor._id}`, {patient_id});
        res.status=== 200 ? setUpcomingAppointment(true): setUpcomingAppointment(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getSchedule = async () => {
    const res = await axios.get(`http://localhost:8000/api/schedule/doctor-schedule/${doctor._id}`);
    console.log(res.data);
    setSchedule(res.data);
  }

  const handleClickOpen = () => {
    
    if(patient_id){
      checkAppointments()
      if(!upcomingAppointment) {
        setOpen(true);
      } else {
        alert("You already have requested an appointment with this doctor")
      }
    }else{
      navigate("/Sign-In/patient")
    }     
  };

  const handleClose = () => {
    setOpen(false);
    checkAppointments()
  };

  const handleClickOpenView = () => {
    setOpenView(true)
  }

  const handleViewClose = () => {
    setOpenView(false)
}
  useEffect(() => {
    getSlots()
    getSchedule()
  }, [doctor._id])

  useEffect(()=>{
    checkAppointments()
  }, [patient_id, doctor._id])

  return (
    <>
    <Card sx={{ width: "80%",height:"100%"}} variant="outlined">
      <CardMedia
        component="img"
        height="220"
        image={PF+'/images/'+url}
        alt="doctor image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Dr. {doctor?.firstName} {doctor?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctor?.specialization}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fee: {doctor?.fee}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>Book an appointment</Button>
        <Button size="small" onClick={handleClickOpenView}>View</Button>
        
      </CardActions>
    </Card>

    <AppointmentForm doctor_id={doctor?._id} patient_id={patient_id} open={open} handleClose={handleClose} slots={slots} setSlots={setSlots}/>
    <DoctorModal open={openView} handleClose={handleViewClose} doctor={doctor} schedule={schedule}/>
    </>
  );
}