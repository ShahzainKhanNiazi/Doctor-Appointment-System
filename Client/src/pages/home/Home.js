import React from 'react'
import BasicCard from '../../components/card/Card';
import "./home.css";
import Grid from '@mui/material/Grid';
import {CardData} from "../../cardData";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import DoctorCard from '../../components/doctorCard2/DoctorCard';


const Home = () => {
  const PF = process.env.REACT_APP_PUBLIC_URL;

  return (
    <>
    <Navbar/>

    <div className='home-container'>
      <div className='top-container'>
        <div className='top-desc'>
           <h1 className='top-h1'>THE MOST VALUABLE THING IS YOUR HEALTH.</h1>
           <h4 className='top-h3'>BookADoc makes it easier for you to connect with your doctor directly.</h4>
        </div>
      </div>

      <div className="middle-container">
      <Grid container spacing={2}>
      {CardData.map((card, i) =>
        <Grid item xs={6} md={4}>
          <BasicCard title={card.title} body={card.body}/>
        </Grid>
      )}
        
      </Grid>
      </div>

      <div className='bottom-container'>
      <h1 className='bottom-title'>How it <span className='home-name'> works?</span> </h1>
      <p className='bottom-desc'>Lorem ipsum dolor amet consectetur adipisicing eliteiuim sete eiusmod tempor incididunt ut labore etnalom dolore magna aliqua udiminimate veniam quis norud.</p>

      <div className='bottom-cards'>
      
      <div className='bottom-card'>
        <img src={PF+'images/selection-icon.png'} alt='selection-icon' style={{width: '30%', height: '30%', marginBottom: '5px'}}/>
        <h4 style={{marginBottom: '5px'}}>SELECT A DOCTOR</h4>
        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
      </div>


      <div className='bottom-card'>
        <img src={PF+'images/profile-view-icon.png'} alt='profile-view-icon' style={{width: '30%', height: '30%', marginBottom: '5px'}}/>
        <h4 style={{marginBottom: '5px'}}>VIEW PROFILE</h4>
        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
      </div>

      <div className='bottom-card'>
      <img src={PF+'images/booking-icon.png'} alt='booking-icon' style={{width: '30%', height: '30%', marginBottom: '5px'}}/>
        <h4 style={{marginBottom: '5px'}}>BOOK AN APPOINTMENT</h4>
        <p>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri. In eum omnes molestie.</p>
      </div>

      </div>

      </div>


    
      <div className='lower-section'>
      
      <div style={{width: "30%"}}>
      <DoctorCard name={"Haris Sheikh"} specialization={"Physiotherapist"} fee={"1000"} url={"doctor-4.jpg"}/>
      </div>
         
      <div style={{width: "30%"}}>
         <DoctorCard name={"Afaq Ahmed"} specialization={"ENT Specialist"} fee={"1500"} url={"doctor-4.jpg"}/>
      </div>

       <div style={{width: "30%"}}>
         <DoctorCard name={"Samina Tariq"} specialization={"Psychiatrist"} fee={"1000"} url={"doctor-4.jpg"}/>
       </div>
       
      </div>

    </div>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default Home;


