import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button';
import "./doctorModal.css"


const DoctorModal = ({open, handleClose, doctor, schedule}) => {
    


  return (
    <div>
         <Dialog open={open} onClose={handleClose} >
        <DialogTitle><h2>Doctor Details</h2></DialogTitle>
        <DialogContent sx={{height: "100%", width: "400px", mt: "20px"}} >
          <DialogContentText>
          </DialogContentText>

          <p className='detail-para'>
          <label className='title'><b>Name:</b></label>
          <span className='value'>Dr. {doctor?.firstName} {doctor?.lastName}</span>
          </p> 
          

          <p className='detail-para'>
            <label className='title'><b>Phone No:</b></label>
            <span className='value'>{doctor?.ph_num}</span>
          </p>
          
          <p className='detail-para'>
            <label className='title'><b>Education:</b></label>
            <span className='value'>{doctor?.education}</span>
          </p>

          <p className='detail-para'>
            <label className='title'><b>Specialization:</b></label>
            <span className='value'>{doctor?.specialization}</span>
          </p>

          <p className='detail-para'>
            <label className='title'><b>City:</b></label>
            <span className='value'>{doctor?.city}</span>
          </p>

          <p className='detail-para'>
            <label className='title'><b>Clinic Location:</b></label>
            <span className='value'>{doctor?.address}</span>
          </p>

          <p className='detail-para'>
            <label className='title'><b>Timings:</b></label>
            <span className='value'>{schedule?.from} - {schedule?.to}</span>
          </p>

          <p className='detail-para'>
            <label className='title'><b>Days:</b></label>
            <span className='value'>{schedule?.days.map((day,i) => <span>{day.dayName}, </span>)}</span>
          </p>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DoctorModal