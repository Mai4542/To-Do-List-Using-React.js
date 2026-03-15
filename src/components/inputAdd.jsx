import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Add() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
           <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1,width: '100%'} }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Headline of task" variant="outlined" />
    </Box>
        </Grid>
        <Grid size={4}>
         <Button variant="outlined" sx={{  m: 1,width: '90%',height:"75%",backgroundColor: '#ACCBF2',color: 'white',fontSize: '20px' }} className='card' onClick={{}}>Add</Button>
        </Grid>
       
      </Grid>
    </Box>
  );
}
