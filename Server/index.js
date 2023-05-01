const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')


const patientRoute = require('./routes/api/patient');
const doctorRoute = require('./routes/api/doctor');
const adminRoute = require('./routes/api/admin');
const appointmentRoute = require('./routes/api/appointment');
const scheduleRoute = require('./routes/api/schedule');
const slotRoute = require('./routes/api/slot');



const app = express();
app.use(cors());

// Connect Database
connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));


//routes
app.use('/api/patient', patientRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/appointment', appointmentRoute);
app.use('/api/slot', slotRoute);
app.use('/api/schedule', scheduleRoute);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));