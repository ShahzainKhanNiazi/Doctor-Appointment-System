const express = require('express');
const router = express.Router();
const Appointment = require("../../models/Appointment");

//get all appointments
router.get("/allAppointments", async (req, res) => {
    try {
        const allAppointments = await Appointment.find();
        if(!allAppointments) return res.status(400).send("No Appointments to show");

        res.status(200).send(allAppointments);
    } catch (error) {
        res.status(500).send(error)
    }
})

//get one appointment
router.get("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
        if(!appointment) return res.status(400).send("appointment not found");
        
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error)
    }
})

//get patient's all appointments
router.get("/patient-appointments/:patient_id", async (req, res) => {
    try {
        const patientAppointments = await Appointment.find({ patient_id : req.params.patient_id});
        if(!patientAppointments) return res.status(400).send("No Appointments");
        
        res.status(200).send(patientAppointments);
    } catch (error) {
        res.status(500).send(error)       
    }
})

//get doctor's all appointments
router.get("/doctor-appointments/:doctor_id", async (req, res) => {
    try {
        const doctorAppointments = await Appointment.find({ doctor_id : req.params.doctor_id});
        if(!doctorAppointments) return res.status(400).send("No Appointment for this doctor");

        res.status(200).send(doctorAppointments);
    } catch (error) {
        res.status(500).send(error)       
    }
})

router.post("/check-appointment/:doctor_id", async (req, res)=> {
        let currentDate = new Date() 
        let date1;
        let code;
        const patientId = req.body.patient_id;

    try {
        const doctorAppointments = await Appointment.find({ doctor_id : req.params.doctor_id});
        if(!doctorAppointments) return res.status(400).send("No Appointment for this doctor");

        const response = await Promise.all(doctorAppointments.filter((docA, i) => docA.patient_id===patientId).map((docA, i)=> {
            console.log(docA.date)
            date1= new Date(docA.date);
            if(date1 > currentDate || date1.toDateString() === currentDate.toDateString()) {
                console.log("Appointment date is greater than current date")
                console.log("-----> "+currentDate.toDateString())
                console.log("-----> "+date1.toDateString())
              return  code=200 
            } else{
                console.log("-----> "+currentDate.toDateString())
                console.log("-----> "+date1.toDateString())
                console.log("Appointment date is smaller than current date")
                code=204
            }
        })
        )
        if(!response) return res.status(400).send("No appointment matched");
       
        res.status(code).send(response)      
    } catch (error) {
        res.status(500).send(error)       
    }
})

//create an appointment
router.post("/adminAppointment", async (req, res) => {
    try {
        const newAppointment = await new Appointment({
            date: req.body.date,
            slot_id: req.body.slot_id,
            from: req.body.from,
            time: req.body.time,
            doctor_id: req.body.doctor_id,
            doctorName: req.body.doctorName,
            patientName: req.body.patientName,
            status : "pending",
        })
        
        const appointment = await newAppointment.save();

        res.status(200).send(appointment);
        console.log("Appointment successfully created")
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/", async (req, res) => {
    try {
        const newAppointment = await new Appointment({
            date: req.body.date,
            slot_id: req.body.slot_id,
            from: req.body.from,
            time: req.body.time,
            doctor_id: req.body.doctor_id,
            doctorName: req.body.doctorName,
            patient_id : req.body.patient_id,
            patientName: req.body.patientName,
            status : "pending",
        })
        
        const appointment = await newAppointment.save();

        res.status(200).send(appointment);
        console.log("Appointment successfully created")
    } catch (error) {
        res.status(500).send(error);
    }
})



//delete an appointment
router.delete("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if(!appointment) return res.status(400).send("appointment not found");

        res.status(200).send("The Appointment has been deleted");      
    } catch (error) {
        res.status(500).send(error);
    }

})

//update an appointment
router.put("/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment) return res.status(400).send("appointment not found");
        
        await appointment.updateOne({$set : req.body});

        res.status(200).send("The appointment has been updated")
    } catch (error) {
        res.status(500).send(error)
    }
})

//change appointment status
router.put("/change-status/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment) return res.status(400).send("appointment not found");
        
        await appointment.updateOne({$set : {status: "approved"}});

        res.status(200).send("The status has been changed")
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;