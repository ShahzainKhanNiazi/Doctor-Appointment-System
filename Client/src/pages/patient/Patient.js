import React from 'react'
import Leftbar from '../../components/leftbar/Leftbar'
import PatientAppointments from './appointments/PatientAppointments'
import Home from './home/Home'
import './patient.css'
import Settings from './settings/Settings'
import ViewDoctors from './viewDoctors/ViewDoctors'

const Patient = ({home, appointments, viewDoctors, settings}) => {
  return (
    <div className='patient-container'>

    <div className='patient-left'>
      <Leftbar patient={true}/>
    </div>

    <div className="patient-middle">
      {home && <Home/>}
      {appointments && <PatientAppointments/>}
      {viewDoctors && <ViewDoctors/>}
      {settings && <Settings/>}
    </div>
    </div>
  )
}

export default Patient