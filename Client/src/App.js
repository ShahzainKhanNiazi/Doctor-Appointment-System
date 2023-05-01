import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/About';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/sign-In/SignInForm';
import SignUp from './pages/sign-Up/SignUpForm';
import Patient from './pages/patient/Patient';
import Doctor from './pages/doctor/Doctor';
import Admin from './pages/admin/Admin';
import Doctors from './pages/contact/Doctors';
import { useContext } from 'react';
import { UserContext } from './Context';



function App() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="App">
     <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/doctors" element={<Doctors/>}/>


       {/* Sign-Up routes */}
       <Route path="Sign-Up">
       <Route path="patient" element={ <SignUp patient={true}/> }/>
       <Route path="doctor" element={<SignUp doctor={true}/>}/>
       </Route>
       
       {/* Sign-In routes */}
       <Route path="/Sign-In">
       <Route path="patient" element={<SignIn patient={true}/>}/>
       <Route path="doctor" element={<SignIn doctor={true}/>}/>
       <Route path="admin" element={<SignIn admin={true}/>} />
       </Route>

       {/* Patient routes */}
       <Route path="/patient">
       <Route index element={user ? <Patient home={true}/> : <SignIn patient={true}/>} />
       <Route path="appointments" element={user ? <Patient appointments={true}/> : <SignIn patient={true}/>} />
       <Route path="viewDoctors" element={user ? <Patient viewDoctors={true}/> : <SignIn patient={true}/>}/>
       <Route path="settings" element={user ? <Patient settings={true}/> : <SignIn patient={true}/>}/>
       </Route>


       {/* Doctor routes */}
       <Route path="/doctor">
       <Route index element={user ? <Doctor home={true}/> : <SignIn doctor={true}/>}/>
       <Route path="appointments" element={user ? <Doctor appointments={true}/> : <SignIn doctor={true}/>}/>
       <Route path="patients" element={user ? <Doctor patients={true}/> : <SignIn doctor={true}/>}/>
       <Route path="schedule" element={user ? <Doctor schedule={true}/> : <SignIn doctor={true}/>}/>
       </Route>

       {/* Admin routes */}
       <Route path="/admin">
       <Route index element={<Admin home={true}/>}/>
       <Route path="all-appointments" element={<Admin appointments={true}/>}/>
       <Route path="add-appointment" element={<Admin addAppointment={true}/>}/>
       <Route path="all-patients" element={<Admin patients={true}/>}/>
       <Route path="add-patient" element={<Admin addPatient={true}/>}/>
       <Route path="all-doctors" element={<Admin doctors={true}/>}/>
       <Route path="add-doctor" element={<Admin addDoctor={true}/>}/>
       </Route>


      </Routes>
    </div>
  );
}

export default App;
