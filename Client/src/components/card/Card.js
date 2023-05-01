import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function BasicCard(props) {
  return (
    <Card sx={{width: 350, height: 230 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{lineHeight: 1.6, wordSpacing: 0.5, marginTop: 1}}>
            {props.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
