import * as React from 'react';
import Navbar from '../../components/navbar/Navbar';
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
import {Link, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import {UserContext} from '../../Context';
import { useEffect } from 'react';

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

export default function SignIn({admin, doctor, patient}) {
  const navigate = useNavigate();
  const {handleSubmit, control} = useForm();
  const { isFetching, isError, dispatch} = React.useContext(UserContext);


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const onSubmit = async (data) => {
    dispatch({type:"LOGIN_START"});
    if(admin){
    try {
      const res = await axios.post("http://localhost:8000/api/admin/sign-In", data);

      console.log(res.data)
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
      navigate("/admin");
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE", payload: error.response});
      console.log(error.response)
    }
      
    } else if(doctor){
      try {
        const res = await axios.post("http://localhost:8000/api/doctor/sign-In", data);
        console.log(res.data);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data});
        navigate("/doctor");  
      } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload: error.response});
        console.log(error.response)
      }
      
    } else {
      try {
        const res = await axios.post("http://localhost:8000/api/patient/sign-In", data);
        console.log(res.data);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data});
        navigate("/patient");  
      } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload: error.response});
        console.log(error.response)
      }
    }
  }

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={value}
              onChange={onChange}
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!error}
            helperText={error ? error.message : null}
            />
            )}
        rules={{ required: 'Email required' }}
      />

      {isError && isError.status=="404" && <div style={{color: 'red', height: "50px"}}>{isError.data}</div> }

<Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              value={value}
              onChange={onChange}
              type="password"
              id="password"
              error={!!error}
              helperText={error ? error.message : null}
              autoComplete="current-password"
            />
            )}
        rules={{ required: 'Password required' }}
      />

      {isError && isError.status=="400" && <div style={{color: 'red', height: "50px"}}>{isError.data}</div>}
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching}
            >
              {isFetching? <CircularProgress color="inherit" size="20px"/>: "SIGN IN"}
            </Button>
            <Grid container>
              {!admin && 
                <Grid item>
                {doctor ? 
                <Link to="/Sign-Up/doctor">
                  {"Don't have an account? Sign Up"}
                </Link> :
                <Link to="/Sign-Up/patient">
                  {"Don't have an account? Sign Up"}
                </Link>
                }
              </Grid>
               }
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}