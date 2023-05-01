const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Patient = require("../../models/Patient.js");
const Doctor = require('../../models/Doctor');


// @route GET api/patients/test
// @description tests patients route
// @access Public
router.get('/allPatients', async (req, res) => {
    try {
        const patients = await Patient.find()
        if(!patients) return res.status(400).send("Patients not found");

        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send(error)
    } 
});

//get one patient
router.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if(!patient) return res.status(400).send("patient not found");

        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error)
    }
})

//get a patient's doctors
router.get("/:id/patient-doctors", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if(!patient) return res.status(400).send("patient not found");

        const doctors = await Promise.all(
            patient.doctors.map((docId)=> {
                return Doctor.findById(docId)
            })
            )

         if(!doctors) return res.status(400).send("doctors not found");

        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//create a patient
router.post('/register', async (req, res) => {
    console.log("patient route");
    try {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        
        // //create new user
        const newPatient = await new Patient({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            cnic: req.body.cnic,
            ph_num: req.body.ph_num,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            blood_group: req.body.blood_group,
            address: req.body.address,
            city: req.body.city,
        })

        

        //save user
        const patient = await newPatient.save();


        res.status(200).send(patient);
        console.log("Patient successfully created")

    } catch (error) {
        res.status(500).send(error);
    }


})

//add a doctor to patient's list
router.put("/:id/add-doctor", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if(!patient) return res.status(400).send("patient not found"); 

        if (!patient.doctors.includes(req.body.doctor_id)) {
            
            await patient.updateOne({$push: {doctors: req.body.doctor_id}})
            res.status(200).send("Doctor is added");
        } else {
            res.status(200).send("Doctor is already added!")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

//delete a doctor from patient's list
router.put("/:id/delete-doctor", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if(!patient) return res.status(400).send("patient not found"); 

        if (patient.doctors.includes(req.body.doctor_id)) {
            
            await patient.updateOne({$pull: {doctors: req.body.doctor_id}})
            res.status(200).send("Doctor is removed");
        } else {
            res.status(200).send("Doctor does not exist!")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})


//Sign-in a patient
router.post("/sign-In", async (req, res) => {
    try {
       const patient = await Patient.findOne({email: req.body.email});
       if(!patient) return res.status(404).send("Invalid email");

       const validPassword = await bcrypt.compare(req.body.password, patient.password);
       if(!validPassword) return res.status(400).send("Wrong password");

       res.status(200).send(patient);
        
    } catch (error) {
        res.status(500).send(error);
    }
    
})

//delete a patient
router.delete("/:id", async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if(!patient) return res.status(400).send("patient not found"); 
        
        res.status(200).send("Patient is deleted")
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;