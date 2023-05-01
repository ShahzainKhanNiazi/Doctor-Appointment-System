import * as React from 'react';
import { useEffect,useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function PatientTable({doctor, admin}) {
  const [patients, setPatients] = useState([])

  const getPatients = async () => {
    if(doctor){
      try {
        const res = await axios.get(`http://localhost:8000/api/doctor/${doctor}/allPatients`)
        setPatients(res.data)  
      } catch (error) {
        console.log(error)
      }
    }else{
      const res = await axios.get(`http://localhost:8000/api/patient/allPatients`)
        setPatients(res.data) 
    }
  }

  const handleClick = (id) => {
    let newPatients = patients
    newPatients = newPatients.filter((patient, i) => patient._id !== id);
    setPatients(newPatients); 
    deletePatient(id)
  }

  const deletePatient = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/patient/${id}`)
      console.log(res.data)
      getPatients();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPatients()
  }, [doctor])

  return (
    <TableContainer component={Paper} sx={{ width: 900, maxHeight: 400 }} variant="outlined">
      <Table sx={{ minWidth: 200 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Patient No</TableCell>
            <TableCell align="left">Patient Name</TableCell>
            <TableCell align="left">Patient Email</TableCell>
            <TableCell align="left">Patient Number</TableCell>
            <TableCell align="left">Gender</TableCell>
            {admin && <TableCell align="left">Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {patients?.map((patient, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover
              
            >
              <TableCell component="th" scope="row">
                {index <= 9 ? "0"+(index+1) : (index+1)}
              </TableCell>
              <TableCell align="left">{patient.firstName} {patient.lastName}</TableCell>
              <TableCell align="left">{patient.email}</TableCell>
              <TableCell align="left">{patient.ph_num}</TableCell>
              <TableCell align="left">{patient.gender}</TableCell>
              {admin && <TableCell align="left"><button onClick={() => handleClick(patient._id)}>Remove</button></TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
