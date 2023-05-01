const express = require('express');
const router = express.Router();
const Slot = require("../../models/Slot");

//get a doctor's slots 
router.get("/doctor-slots/:doctor_id", async (req, res) => {
    try {
        const slot = await Slot.find({doctor_id : req.params.doctor_id});
        if(!slot) return res.status(400).send("No slots for this doctor");
        
        res.status(200).send(slot)
    } catch (error) {
        res.status(500).send(error)
    }    
})


//get one slot 
router.get("/:id", async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id)
        res.status(200).send(slot)
    } catch (error) {
        res.status(500).send(error)
    }
})


//create a slot
router.post("/", async (req, res) => {
    try {

        //create new slot
        const newSlot = await new Slot({
            from: req.body.from,
            to: req.body.to,
            time: req.body.time,
            doctor_id: req.body.doctor_id,
        })

        //save slot
        const slot = await newSlot.save();

        res.status(200).send(slot);

    } catch (error) {
        res.status(500).send(error);
    }
})

//update a slot
router.put("/:id" , async (req, res) => {
    try {
        const slot = await Slot.findById (req.params.id)
        if(!slot) return res.status(400).send("slot not found");
        
        await slot.updateOne({$set: req.body}); 

        res.status(200).send("The slot has been updated");
    } catch (error) {
        res.status(500).send(error)
    }
})

//delete a slot
router.delete("/:id", async(req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);
        if(!slot) return res.status(400).send("slot not found");

        res.status(200).send("Slot is deleted");
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;