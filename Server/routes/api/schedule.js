const express = require('express');
const router = express.Router();
const Schedule = require("../../models/Schedule");


//get one schedule 
router.get("/:id", async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if(!schedule) return res.status(400).send("Schedule not found");

        res.status(200).send(schedule);
    } catch (error) {
        res.status(500).send(error);
    }
    
})

//get a doctor's schedule 
router.get("/doctor-schedule/:doctor_id", async (req, res) => {
    try {
        const doctorSchedule = await Schedule.findOne({ doctor_id : req.params.doctor_id});
        if(!doctorSchedule)  return res.status(404).send("No such schedule exists");
        
        res.status(200).send(doctorSchedule);
    } catch (error) {
        res.status(500).send("there is an error");
    }
})

//create a schedule
router.post("/", async (req, res) => {
    try {

        //create new schedule
        const newSchedule = await new Schedule({
            days: req.body.days,
            from: req.body.from,
            to: req.body.to,
            doctor_id: req.body.doctor_id,
        })

        //save schedule
        const schedule = await newSchedule.save();

        res.status(200).send(schedule);

    } catch (error) {
        res.status(500).send(error);
    }
})

//update a schedule
router.put("/:id" , async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if(!schedule ) res.status(400).send("Schedule not found");

        await schedule.updateOne({$set: req.body});

        res.status(200).send(schedule);
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;


// function(err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   } 
