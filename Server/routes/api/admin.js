const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../../models/Admin');

router.get("/", async(req, res) => {
    
})

router.post("/register", async (req, res) => {
    try {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new admin
        const newAdmin = await new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: true,
        });

        //save admin
        const admin = await newAdmin.save();

        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/sign-In', async(req, res)=> {
    try {
        const admin = await Admin.findOne({email: req.body.email})
        if(!admin) return res.status(404).send("Invalid email");

        const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if(!validPassword) return res.status(400).send("Wrong password");

        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error);
        
    }
})

module.exports = router;