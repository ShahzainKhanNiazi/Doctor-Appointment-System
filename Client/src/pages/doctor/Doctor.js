import React from 'react'
import Leftbar from '../../components/leftbar/Leftbar'
import Home from './home/Home'
import './doctor.css'
import DoctorAppointments from './appointments/DoctorAppointments'
import Patients from './patients/Patients'
import ManageSchedule from './manageSchedule/ManageSchedule'

const Doctor = ({home, appointments, patients, schedule}) => {
  return (
    <div className='doctor-container'>
        <div className='doctor-left'>
        <Leftbar doctor={true}/>

        </div>

        <div className='doctor-middle'>
        {home && <Home/>}
        {appointments && <DoctorAppointments/>}
        {patients && <Patients/>}
        {schedule && <ManageSchedule/>}
        </div>
    </div>
  )
}

export default Doctor