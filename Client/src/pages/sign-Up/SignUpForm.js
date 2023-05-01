import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm, Controller} from "react-hook-form";
import { MenuItem } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import  axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" style={{textDecoration: "none", color: "grey"}}>
        Tele-Clinic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({doctor, patient}) {
  const [user, setUser] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const {handleSubmit, control} = useForm();
  const navigate = useNavigate();
  let formElement;


  const registerUser = async (data) => {
    if(doctor){
      try {
      
        const res = await axios.post("http://localhost:8000/api/doctor/register", data);
        
        
        console.log( res.data);
        console.log("Doctor signed up")
        navigate("/Sign-In/doctor")
      } catch (error) {
        console.log(error)
      }

    } else {
      try {
      
        const res = await axios.post("http://localhost:8000/api/patient/register", data);
        
        
        console.log( res.data);
        console.log("Patient signed up")
        navigate("/Sign-In/patient")
      } catch (error) {
        console.log(error)
      }

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

 doctor ?
  formElement = <>
    <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              rules={{ 
                required: 'First name required',
                pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                },
               }}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              rules={{ 
              required: 'Last name required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                }, 
                }}
              />
              </Grid>
              <Grid item xs={12} sm={7}>
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
              <Grid item xs={12} sm={5}>
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
              <Grid item xs={12} sm={6}>
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
              rules={{ required: 'Confirm Password required' }}
              />
              </Grid>
              
              
              <Grid item xs={12} sm={6}>
              <Controller
              name="education"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Education"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="education"
                  autoComplete="education"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'education required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                },
                 }}
              />
              </Grid>
              
              {showError &&
              <Grid item xs={12} >
              <Typography color='error'>Passwords do not match</Typography>
              </Grid>}

              <Grid item xs={12} sm={6}>
              <Controller
              name="institute"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Institute"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="institute"
                  autoComplete="institute"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Institute required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                },
                 }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <Controller
              name="specialization"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Specialization"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="specialization"
                  autoComplete="specialization"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'specialization required',
              pattern: { 
                  value: /^[A-Za-z]+$/,
                  message: "Letters only"
                },
                 }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <Controller
              name="experience"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Experience in years"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="experience"
                  autoComplete="experience"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Experience is required',
              pattern: { 
                  value: /^[0-9]+$/,
                  message: "Numbers only"
                },
               }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <Controller
              name="license_no"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="PMC Registration No"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="license_no"
                  autoComplete="license_no"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'License number is required' }}
              />
              </Grid>

              

              <Grid item xs={12} sm={6}>
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
              rules={{ 
                required: 'Ph No required', 
                pattern: {value: /^((?:00|\+)92)?(0?3(?:[0-4]\d|55)\d{7})$/, message:"Invalid phone number"}
                 }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
              <Controller
              name="fee"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Consultation fee"
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="fee"
                  autoComplete="fee"
                  error={!!error}
                  helperText={error ? error.message : null}
                  color="success"
                />
                )}
              rules={{ required: 'Consultation fee is required',
              pattern: { 
                  value: /^[0-9]+$/,
                  message: "Numbers only"
                }, }}
              />
              </Grid>

              
              <Grid item xs={12} sm={6}>
              <Controller
              name="dob"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth                  
                  type="date"
                  value={value}
                  onChange={onChange}
                  id="dob"
                  color="success"
                  helperText={"Select your Date-of-Birth"}                  
                />
                )}
              rules={{ required: 'Date-of-Birth required' }}
              />
              </Grid>

              <Grid item xs={12} >
              <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  required
                  fullWidth
                  label="Clinic Address"
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

              <Grid item xs={12} sm={6}>
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
                },
                 }}
              />
              </Grid>

            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Sign-In/doctor">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
 
  </>   
  :
  formElement = <>
    <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={7}>
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
              <Grid item xs={12} sm={5}>
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
              <Grid item xs={12} sm={6}>
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
              
              
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              
              <Grid item xs={12} sm={6}>
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


              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} >
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

              <Grid item xs={12} sm={6}>
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

            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/Sign-In/patient">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
  </>
  

  return (
    <>
    <Navbar/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          {formElement}
                     </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
    
      )
}