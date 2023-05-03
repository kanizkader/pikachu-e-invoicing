import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageWriting, SingleButton } from './pageStyle';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Unavailable() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>
          ACCOUNT
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          This account is currently under the free tier.
        </Typography>
        <Button variant="contained" sx={ SingleButton } onClick={navigate('/pricing')}>Upgrade Plan</Button>
      </Box>
    </>
  )
}

export default Unavailable;