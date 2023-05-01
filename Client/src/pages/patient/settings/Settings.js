import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import "./settings.css"

const Settings = () => {
  return (
    <div className='patientSettings-container'>
    <Box>
        <Paper elevation={3} sx={{height: 50}}>
        <div className='settings-top'>
         <h2 className='top-title'>Settings</h2>
        </div>
        </Paper>
    </Box>

    <Box>
     <Paper elevation={3} sx={{height: 550}}>
      <div className='settings-middle'>

      </div>

     </Paper>
     </Box>

    </div>
  )
}

export default Settings