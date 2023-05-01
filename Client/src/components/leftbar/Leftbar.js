import React, { useState } from 'react'
import './leftbar.css'
import { PatientLeftbarData, DoctorLeftbarData} from './LeftbarData'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import BookOnline from '@mui/icons-material/BookOnline';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


const Leftbar = ({patient, doctor, admin}) => {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [showMenuItem1, setShowMenuItem1] = useState(false);
  const [showMenuItem2, setShowMenuItem2] = useState(false);
  const [showMenuItem3, setShowMenuItem3] = useState(false);
  let user = (patient && "patient") || (doctor && "doctor") || (admin && "admin");
  const navigate = useNavigate();
  console.log(PF);


  const handleItem1Click = () => {
    setShowMenuItem1(prevVal => !prevVal);
  }

  const handleItem2Click = () => {
    setShowMenuItem2(prevVal => !prevVal);
  }

  const handleItem3Click = () => {
    setShowMenuItem3(prevVal => !prevVal);
  }
  
  const handleLogOutClick = () => {
    localStorage.removeItem('user');
    navigate(`/Sign-In/${user}`)
  }


  return (
    <div className='leftbar-container'>
    <div className='leftbar-top'>
     <img src={PF+"images/patient-avatar.jpg"} className='leftbar-top-img' alt="Patient-Avatar"/>
     { patient && <h3>Patient</h3>}
     { doctor && <h3>Doctor</h3>}
     { admin && <h3>Admin</h3>}

    </div>

    <div className='leftbar-list'>
    <ul>
      {patient && PatientLeftbarData.map((item, key) => {
        return (
          <Link to={item.link} style={{textDecoration: "none", color: "white"}}>
          <li className='list-row' key={key}>
            <div className='list-icon'>{item.icon}</div>
            <div className='list-title'>{item.title}</div>  
          </li>
          </Link>
        )
      })}

      {doctor && DoctorLeftbarData.map((item, key) => {
        return (
          <Link to={item.link} style={{textDecoration: "none", color: "white"}}>
          <li className='list-row' key={key}>
            <div className='list-icon'>{item.icon}</div>
            <div className='list-title'>{item.title}</div>  
          </li>
          </Link>
        )
      })}

      {admin &&
      <>
      <Link to="/admin/" style={{textDecoration: "none", color: "white"}}>
          <li className='list-row'>
            <div className='list-icon'><HomeIcon/></div>
            <div className='list-title'>Home</div>  
          </li>
          </Link>

          <li className='list-row' onClick={handleItem1Click}>
            <div className='list-icon'><BookOnline/></div>
            <div className='list-title'>Appointments</div>  
          </li>

          {showMenuItem1 &&
          <div className='menu'>

            <div className='menu-item' onClick={handleItem1Click}>
            <Link to="/admin/add-appointment" style={{textDecoration: "none", color: "white"}}>
            Add Appointment
            </Link>
            </div>

            <div className='menu-item' onClick={handleItem1Click}>
            <Link to="/admin/all-appointments" style={{textDecoration: "none", color: "white"}}>
            All Appointments
            </Link>
            </div>  
            
          </div>
           }

           <li className='list-row' onClick={handleItem2Click}>
            <div className='list-icon'><PersonIcon/></div>
            <div className='list-title'>Patients</div>  
          </li>

          {showMenuItem2 &&
          <div className='menu'>

            <div className='menu-item' onClick={handleItem2Click}>
            <Link to="/admin/add-patient" style={{textDecoration: "none", color: "white"}}>
            Add Patient
            </Link>
            </div>

            <div className='menu-item' onClick={handleItem2Click}>
            <Link to="/admin/all-patients" style={{textDecoration: "none", color: "white"}}>
            All Patients
            </Link>
            </div>  
            
          </div>
           }


          <li className='list-row' onClick={handleItem3Click}>
            <div className='list-icon'><PersonAddAlt1Icon/></div>
            <div className='list-title'>Doctors</div>  
          </li>

          {showMenuItem3 &&
          <div className='menu'>

            <div className='menu-item' onClick={handleItem3Click}>
            <Link to="/admin/add-doctor" style={{textDecoration: "none", color: "white"}}>
            Add Doctor
            </Link>
            </div>

            <div className='menu-item' onClick={handleItem3Click}>
            <Link to="/admin/all-doctors" style={{textDecoration: "none", color: "white"}}>
            All Doctors
            </Link>
            </div>  
            
          </div>
           }

      </>
      }
    </ul>

    
    <button className='logout-btn' onClick={handleLogOutClick}>
    <LogoutIcon/>
    <span className='logout-text'> Logout</span> 
    
    </button>



    </div>
    </div>
  )
}

export default Leftbar