import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function DoctorCard({name, specialization, fee, url}) {
  const [open, setOpen] = React.useState(false);
  const PF = process.env.REACT_APP_PUBLIC_URL;

  const handleClickOpen = () => {
      setOpen(true);   
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Card sx={{ width: "100%",height:"100%"}} variant="outlined">
      <CardMedia
        component="img"
        height="200"
        image={PF+'/images/'+url}
        alt="doctor image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Dr. {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {specialization}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fee: {fee}
        </Typography>
      </CardContent>
    </Card>

    </>
  );
}


{/* <Button size="small">View</Button> */}