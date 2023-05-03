import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageSubheading, PageWriting, SingleButton } from './pageStyle';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Unavailable() {
  const navigate = useNavigate();
  const handleSign = () => {
    navigate('/signup')
  }

  const handleLogin = () => {
    navigate('/')
  }

  const handlePricing = () => {
    navigate('/pricing')
  }

  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageSubheading }>
          Hello! It seems like you are trying to access our Create and Send Services. 
        </Typography>
        <br />
        <Typography align="center" sx={ PageWriting }>
          Please register or login to your account to use these services. To use our premium services at unlimited access, take a look at our plans & pricing page for further information.
        </Typography>
        <Button variant="contained" sx={ SingleButton } onClick={handleSign}>Register</Button>
        <Button variant="contained" sx={ SingleButton } onClick={handleLogin}>Login</Button>
        <Button variant="contained" sx={ SingleButton } onClick={handlePricing}>Plans & Pricing</Button>
      </Box>
    </>
  )
}

export default Unavailable;