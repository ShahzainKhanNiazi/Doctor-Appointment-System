import * as React from 'react';
import "./addPatient.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm, Controller} from "react-hook-form";
import { MenuItem } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import  axios from 'axios';
import {Link} from 'react-router-dom';

const AddPatient = () => {
  const theme = createTheme();
  const [showError, setShowError] = React.useState(false);
  const {handleSubmit, control} = useForm();


  const registerUser = async (data) => {
    try {
    
      const res = await axios.post("http://localhost:8000/api/patient/register", data);
      
      
      console.log( res.data);
      alert("Patient is created")
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
}


const onSubmit = data => {
  if(data.password !== data.confirmPassword) {
    (setShowError(true));
  } else {
    setShowError(false);
    registerUser(data);
  }
}



  return (
    <div className='patientAppointments-container'>

   <Box>
     <Paper elevation={3} sx={{height: 50}}>
    <div className='patientAppointments-top'> 
    <h2>Patient Management</h2>
    </div>
    </Paper>   
    </Box>

    <Box>
     <Paper elevation={3} sx={{height: "100%"}}>
    <div className='patientAppointments-middle' >
    <h3 className='patientAppointments-middle-text'>Add a new Patient</h3>

    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}> 

    <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
              <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  value={value}
                  onChange={onChange}
                  id="firstName"
                  label="First Name"
                  error={!!error}
                  helperText={error ? error.message : null}
                  autoFocus
                  color="success"
                />
              )}
              rules={{ required: 'First name required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                },
                 }}
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={value}
                  onChange={onChange}
                  autoComplete="family-name"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Last name required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                },
                 }}
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={value}
                  onChange={onChange}
                  autoComplete="email"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Email required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "must contain '@' '.com' "
              }, }}
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  id="password"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Password required' }}
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Confirm password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  id="confirmPassword"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'First name required' }}
              />
              </Grid>
              
              
              <Grid item xs={12} sm={4}>
              <Controller
              name="cnic"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="CNIC Number"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="cnic"
                  autoComplete="cnic"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'CNIC required' ,
              pattern: { 
                  value: /^[0-9]{5}-[0-9]{7}-[0-9]$/,
                  message: "Please enter yor cnic in 12345-1234567-1 format"
                }, }}
              />
              </Grid>

              {showError &&
              <Grid item xs={12} >
              <Typography color='error'>Passwords do not match</Typography>
              </Grid>}

              <Grid item xs={12} sm={4}>
              <Controller
              name="age"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Age"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="age"
                  autoComplete="age"
                  color="success"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
                )}
              rules={{ required: 'Age required',
              pattern: { 
                  value: /^[0-9]+$/,
                  message: "Numbers only"
                },
                 }}
              />
              </Grid>

              <Grid item xs={12} sm={4}>
              <Controller
              name="ph_num"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Ph No"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="ph_num"
                  autoComplete="ph_num"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Ph No required',
              pattern: {value: /^((?:00|\+)92)?(0?3(?:[0-4]\d|55)\d{7})$/, 
              message:"Invalid phone number"
              },
                }}
              />
              </Grid>

              
              <Grid item xs={12} sm={4}>
              <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Gender"
                  select
                  value={value}
                  onChange={onChange}
                  id="gender"
                  autoComplete="gender"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"O"}>Other</MenuItem>
                </TextField>
                )}
              rules={{ required: 'Gender required' }}
              />
              </Grid>


              <Grid item xs={12} sm={4}>
              <Controller
              name="blood_group"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Blood Group"
                  select
                  value={value}
                  onChange={onChange}
                  id="blood_group"
                  autoComplete="blood_group"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                >
                <MenuItem value={"A+"}>A+</MenuItem>
                <MenuItem value={"A-"}>A-</MenuItem>
                <MenuItem value={"B+"}>B+</MenuItem>
                <MenuItem value={"B-"}>B-</MenuItem>
                <MenuItem value={"O+"}>O+</MenuItem>
                <MenuItem value={"O-"}>O-</MenuItem>
                <MenuItem value={"AB+"}>AB+</MenuItem>
                <MenuItem value={"AB-"}>AB-</MenuItem>
                </TextField>
                )}
              rules={{  }}
              />
              </Grid>

              <Grid item xs={12} sm={4}>
              <Controller
              name="weight"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Weight in kgs"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="weight"
                  autoComplete="weight"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ pattern: { 
                  value: /^[0-9]+$/,
                  message: "Numbers only"
                }, }}
              />
              </Grid>

              <Grid item xs={12} sm={4}>
              <Controller
              name="height"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  
                  fullWidth
                  label="Height in feet"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="height"
                  autoComplete="height"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ pattern: { 
                  value: /^[0-9]+([.][0-9]+)?$/,
                  message: "Numbers only"
                }, }}
              />
              </Grid>

              <Grid item xs={12} sm={4}>
              <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="City"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="city"
                  autoComplete="city"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'City required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                }, }}
              />
              </Grid>

              <Grid item xs={8} >
              <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Address"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="address"
                  autoComplete="address"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Address required' }}
              />
              </Grid>

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2,}}
            >
              Sign Up
            </Button>

    </Box>

    </div>
    </Paper>   
    </Box>

    </div>
  )
}

export default AddPatient