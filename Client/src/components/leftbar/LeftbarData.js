import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BookOnline from '@mui/icons-material/BookOnline';
import InsertInvitation from '@mui/icons-material/InsertInvitation';
import PersonIcon from '@mui/icons-material/Person';

export const PatientLeftbarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/patient/"
    },
    {
        title: "Make an appointment",
        icon: <InsertInvitation/>,
        link: "/patient/viewDoctors"
    },
    {
        title: "Appointments",
        icon: <BookOnline/>,
        link: "/patient/appointments"
    },
]

export const DoctorLeftbarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/doctor/"
    },
    {
        title: "Appointments",
        icon: <BookOnline/>,
        link: "/doctor/appointments"
    },
    {
        title: "Patients",
        icon: <PersonIcon/>,
        link: "/doctor/patients"
    },
    {
        title: "Manage Schedule",
        icon: <InsertInvitation/>,
        link: "/doctor/schedule"
    },
]
// {
//     title: "Profile",
//     icon: <PersonIcon/>,
//     link: "/patient/"
// },
// {
//     title: "Manage Account",
//     icon: <ManageAccounts/>,
//     link: "/patient/settings"
// },