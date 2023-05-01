import React from 'react'
import Leftbar from '../../components/leftbar/Leftbar'
import './admin.css'
import Home from './home/Home'
import AllAppointments from './Appointments/AllAppointments'
import AllPatients from './patients/AllPatients'
import AllDoctors from './doctors/AllDoctors'
import AddAppointment from './add-appointment/AddAppointment' 
import AddDoctor from './add-doctor/AddDoctor'
import AddPatient from './add-patient/AddPatient'

const Admin = ({home, appointments, addAppointment, patients, addPatient,  doctors, addDoctor}) => {
  return (
    <div className='admin-container'>
        <div className='admin-left'>
         <Leftbar admin={true}/>

        </div>

        <div className='admin-middle'>
        {home && <Home/>}
        {appointments && <AllAppointments/>}
        {addAppointment && <AddAppointment/>}
        {patients && <AllPatients/>}
        {addPatient && <AddPatient/>}
        {doctors && <AllDoctors/>}
        {addDoctor && <AddDoctor/>}
        </div>
    </div>
  )
}

export default Admin