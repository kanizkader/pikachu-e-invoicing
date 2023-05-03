import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageSubheading, PageWriting, MultipleButtons } from './pageStyle';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import banner from '../banner.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const handleCreate = () => {
    if (isLoggedIn) {
      navigate('/create');
    } else {
      navigate('/unavailable');
    }
  }
  const handleRender = () => {
    navigate('/render');
  }
  const handleSend = () => {
    if (isLoggedIn) {
      navigate('/send');
    } else {
      navigate('/unavailable');
    }
  }

  return (
    <>
      <Navbar/>
      <img style={{ width: "100%" }} src={banner} alt='banner' />
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageSubheading }>
          Empower your billing with Pikachu E-Invoicing - lightning-fast invoicing for all your business needs!
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          With our user-friendly interface, you can create and customize invoices quickly, and then send them directly to your recipients' email addresses. Simplify your invoicing process and save time with our e-invoice service today.
        </Typography>
        <Stack spacing={6} direction="row" sx={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={ MultipleButtons } onClick={handleCreate}>CREATE E-INVOICE</Button>
          <Button variant="contained" sx={ MultipleButtons } onClick={handleRender}>RENDER E-INVOICE</Button>
          <Button variant="contained" sx={ MultipleButtons } onClick={handleSend}>SEND E-INVOICE</Button>
        </Stack>
      </Box>
    </>
  )
}

export default Home;