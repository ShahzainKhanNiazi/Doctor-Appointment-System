import * as React from 'react';
import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function DoctorTable({admin}) {
  const [doctors, setDoctors] = useState([])

  const getDoctors = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/doctor/allDoctors`)
      console.log(res.data)
      setDoctors(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveClick = (id) => {
    let newDoctors = doctors
    newDoctors = newDoctors.filter((newDoc, i) => newDoc._id !== id);
    setDoctors(newDoctors)
    deleteDoctor(id); 
  }

  const deleteDoctor = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/doctor/${id}`)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getDoctors()
  }, [])


  return (
    <TableContainer component={Paper} sx={{ width: 900, maxHeight: 400 }} variant="outlined">
      <Table sx={{ minWidth: 200 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Doctor No</TableCell>
            <TableCell align="left">Doctor Name</TableCell>
            <TableCell align="left">Doctor Number</TableCell>
            <TableCell align="left">Doctor Specialization</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">PMC Reg.No</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors?.map((doctor, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              
            >
              <TableCell component="th" scope="row">
                {i}
              </TableCell>
              <TableCell align="left">Dr. {doctor.firstName} {doctor.lastName}</TableCell>
              <TableCell align="left">{doctor.ph_num}</TableCell>
              <TableCell align="left">{doctor.specialization}</TableCell>
              <TableCell align="left">{doctor.gender}</TableCell>
              <TableCell align="left">{doctor.license_no}</TableCell>
              {doctor.status==="Not Allowed" ?
              <TableCell align="left"> <button onClick={()=> handleRemoveClick(doctor._id)}>Remove</button> </TableCell>
              :
              <TableCell align="left"><button>Allow</button></TableCell> 
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
