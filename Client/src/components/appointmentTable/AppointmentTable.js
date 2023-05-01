import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppointmentModal from './changeAppointmentModal/AppointmentModal';
import { useEffect } from 'react';
import axios from 'axios';


export default function AppointmentTable({patient_id, doctor_id, admin}) {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({id: "", name: ""});
  const [patient, setPatient] = useState({id: "", name: ""});
  const [appointmentId, setAppointmentId] = useState("");

  const getAppointments = async () => {
    if(patient_id){
      try {
        const res = await axios.get(`http://localhost:8000/api/appointment/patient-appointments/${patient_id}`)
        setAppointments(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    else if(doctor_id) {
      try {
        const res = await axios.get(`http://localhost:8000/api/appointment/doctor-appointments/${doctor_id}`)
        setAppointments(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    else if(admin) {
      try {
        const res = await axios.get(`http://localhost:8000/api/appointment/allAppointments`)
        setAppointments(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    
  }

  const handleCancelClick = (id) => {
    deleleAppointnment(id);
    let newAppointments = appointments;
    newAppointments = newAppointments.filter((item) => item._id !== id)
    setAppointments(newAppointments);
  }

  const handleApproveClick = (id) => {
    let newAppointments = appointments;
    newAppointments = newAppointments.map((item) =>{
      if(item._id === id){
        return item.status="approved"
      } else {
        return item
      }
    } )
    setAppointments(newAppointments);
    approveAppointment(id);

  }

  const deleleAppointnment = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/appointment/${id}`);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const approveAppointment = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/appointment/change-status/${id}`);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
    getAppointments();
  }

  const handleClickOpen = (id, docName, docId) => {
    setAppointmentId(id);
    setDoctor({id: docId, name: docName});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    getAppointments()
  }, [patient_id, doctor_id])
  
  return (
    <>
    <TableContainer component={Paper} sx={{ width: "100%", maxHeight: 400 }} variant="outlined">
      <Table sx={{ minWidth: 200 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Appointment No</TableCell>
            <TableCell align="left">{patient_id? "Doctor Name": "Patient Name"}</TableCell>
            {admin && <TableCell align="left"> Doctor Name</TableCell> }
            <TableCell align="left">Appointment Date</TableCell>
            <TableCell align="left">Appointment Time</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              
            >
              <TableCell component="th" scope="row">
                {i<9 ? "0"+(i+1): i+1}
              </TableCell>
              {patient_id ?
               <TableCell align="left">Dr. {appointment.doctorName}</TableCell>
               : <TableCell align="left">{appointment.patientName}</TableCell>
               }
               {admin &&
                <TableCell align="left">Dr. {appointment.doctorName}</TableCell>
               }
              <TableCell align="left">{appointment.date}</TableCell>
              <TableCell align="left">{appointment.from} {appointment.time}</TableCell>
              <TableCell align="left">{appointment.status}</TableCell>
              { (doctor_id || admin ) && (
               <>{appointment.status==="pending" ?
              <TableCell align="left"> <button onClick={() => handleApproveClick(appointment._id)}>Approve</button> / <button onClick={() => handleCancelClick(appointment._id)}>Cancel</button> </TableCell>  
              :
              <TableCell align="left"> <button onClick={() => handleCancelClick(appointment._id)}>Cancel</button> / <button onClick={ () => handleClickOpen(appointment._id, appointment.doctorName, appointment.doctor_id)}>Change</button></TableCell>
              }</>)}
              {patient_id && <TableCell align="left"> <button onClick={() => handleCancelClick(appointment._id)}>Cancel</button> / <button onClick={ () => handleClickOpen(appointment._id, appointment.doctorName, appointment.doctor_id)}>Change</button></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
      <AppointmentModal open={open} handleClose={handleClose} doctor={doctor} appointmentId={appointmentId} patient_id={patient_id}/>
    
    </>
  );
}
