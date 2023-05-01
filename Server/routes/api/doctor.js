const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Doctor = require("../../models/Doctor");
const Patient = require('../../models/Patient');


// @route GET api/doctor/test
// @description tests doctor route
// @access Public
router.get("/allDoctors", async (req, res) => {
    try {
        const allDoctors = await Doctor.find()
        if(!allDoctors) return res.status(400).send("No doctor");
        
        res.status(200).send(allDoctors);
    } catch (error) {
        res.status(500).send(error)
    }
})

//get one doctor
router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor) return res.status(400).send("doctor not found");
        
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
})

//get doctor's all Patients
router.get("/:id/allPatients", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)

        if(!doctor) return res.status(400).send("doctor not found")

        const patients = await Promise.all(
             doctor.patients.map((patientId) => {
                 return Patient.findById(patientId)
             })
        )

        if(!patients) res.status(404).send("Patients not found");

        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send(error)
    }
})

//create a doctor
router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // //create new user
        const newDoctor = await new Doctor({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            dob: req.body.dob,
            education: req.body.education,
            institute: req.body.institute,
            experience: req.body.experience,
            license_no: req.body.license_no,
            fee: req.body.fee,
            ph_num: req.body.ph_num,
            gender: req.body.gender,
            address: req.body.address,
            city: req.body.city,
            specialization: req.body.specialization,
            status: "Not Allowed"
        })

        //save user
        const doctor = await newDoctor.save();

        res.status(200).send(doctor);

    } catch (error) {
        res.status(500).send(error);
    }


})

//add patient to doctor's list
router.put("/:id/add-patient", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        if(!doctor) return res.status(400).send("doctor not found")

         if( !doctor.patients.includes(req.body.patient_id)) {
             
            await doctor.updateOne({$push: {patients: req.body.patient_id}})
            res.status(200).send("Patient is added")
         } else{
             res.status(200).send("Patient already exists")
         }
    } catch (error) {
        res.status(500).send(error)
    }
})

//delete patient from doctor's list
router.put("/:id/delete-patient", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if( doctor.patients.includes(req.body.patient_id)){
            
            await doctor.updateOne({$pull: {patients: req.body.patient_id}})
            res.status(200).send("Patient is removed")
        } else {
            res.status(200).send("Patient does not exist")

        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//sign-in a doctor
router.post("/sign-In", async(req, res) => {
    try {
        const doctor = await Doctor.findOne({email: req.body.email});
        if(!doctor) return res.status(404).send("Invalid email")

        const validPassword = await bcrypt.compare(req.body.password, doctor.password)
        if(!validPassword) return res.status(400).send("Wrong Password")

        res.status(200).send(doctor)
        
    } catch (error) {
        res.status(500).send(error);
    }

})

//delete a doctor
router.delete("/:id", async (req, res)=> {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id)
        if(!doctor) return res.status(400).send("doctor not found");
        
        res.status(200).send("Doctor is deleted")    
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;