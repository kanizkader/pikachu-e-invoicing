import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, ThankYouButtons } from './pageStyle';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import banner from '../happy_pikachu.gif';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RenderHTMLThanks() {
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
      <Box sx={{backgroundColor: '#e7b118', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '3%'}}>
        <Box sx={ StyledPage }>
          <Typography align="center" sx={ {color: 'black', fontSize: '20pt', fontWeight: '800', fontFamily: 'monospace', minWidth: '50%', paddingBottom: '5%'} }>
            Thank you for using Pikachu E-Invoicing Services!
          </Typography>
          <img style={{ width: "50%", paddingBottom: '5%' }} src={banner} alt='banner' />
          <Typography align="center" sx={ {color: 'black', fontSize: '12pt', minWidth: '50%', align: 'center', paddingLeft: '30%', paddingRight: '30%', paddingBottom: '5%'} }>
            Your rendered HTML invoice should be downloaded automatically to your downloads folder as 'rendered_e-invoice.html'. To view the HTML source code, open with an appropriate file editor.
            <br/><br/>Would you like to continue your e-invoicing journey? 
          </Typography>
          <Stack spacing={6} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleCreate}>CREATE E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleRender}>RENDER E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleSend}>SEND E-INVOICE</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export function RenderPDFThanks() {
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
      <Box sx={{backgroundColor: '#e7b118', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '3%'}}>
        <Box sx={ StyledPage }>
          <Typography align="center" sx={ {color: 'black', fontSize: '20pt', fontWeight: '800', fontFamily: 'monospace', minWidth: '50%', paddingBottom: '5%'} }>
            Thank you for using Pikachu E-Invoicing Services!
          </Typography>
          <img style={{ width: "50%", paddingBottom: '5%' }} src={banner} alt='banner' />
          <Typography align="center" sx={ {color: 'black', fontSize: '12pt', minWidth: '50%', align: 'center', paddingLeft: '30%', paddingRight: '30%', paddingBottom: '5%'} }>
            Your rendered invoice PDF should be downloaded automatically to your downloads folder as 'rendered_e-invoice.pdf'.
            <br/><br/>Would you like to continue your e-invoicing journey? 
          </Typography>
          <Stack spacing={6} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleCreate}>CREATE E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleRender}>RENDER E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleSend}>SEND E-INVOICE</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export function RenderJSONThanks() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
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
      <Box sx={{backgroundColor: '#e7b118', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '3%'}}>
        <Box sx={ StyledPage }>
          <Typography align="center" sx={ {color: 'black', fontSize: '20pt', fontWeight: '800', fontFamily: 'monospace', minWidth: '50%', paddingBottom: '5%'} }>
            Thank you for using Pikachu E-Invoicing Services!
          </Typography>
          <img style={{ width: "50%", paddingBottom: '5%' }} src={banner} alt='banner' />
          <Typography align="center" sx={ {color: 'black', fontSize: '12pt', minWidth: '50%', align: 'center', paddingLeft: '30%', paddingRight: '30%', paddingBottom: '5%'} }>
            Your rendered JSON invoice should be downloaded automatically to your downloads folder as 'rendered_e-invoice.json'. To view the JSON source code, open with an appropriate file editor.
            <br/><br/>Would you like to continue your e-invoicing journey? 
          </Typography>
          <Stack spacing={6} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleCreate}>CREATE E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleRender}>RENDER E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleSend}>SEND E-INVOICE</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export function CreateThanks() {
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
      <Box sx={{backgroundColor: '#e7b118', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '3%'}}>
        <Box sx={ StyledPage }>
          <Typography align="center" sx={ {color: 'black', fontSize: '20pt', fontWeight: '800', fontFamily: 'monospace', minWidth: '50%', paddingBottom: '5%'} }>
            Thank you for using Pikachu E-Invoicing Services!
          </Typography>
          <img style={{ width: "50%", paddingBottom: '5%' }} src={banner} alt='banner' />
          <Typography align="center" sx={ {color: 'black', fontSize: '12pt', minWidth: '50%', align: 'center', paddingLeft: '30%', paddingRight: '30%', paddingBottom: '5%'} }>
            Your created a UBL XML invoice should be downloaded automatically to your downloads folder as 'UBL_e-invoice.xml'. To view the XML source code, open with an appropriate file editor.
            <br/><br/>Would you like to continue your e-invoicing journey? 
          </Typography>
          <Stack spacing={6} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleCreate}>CREATE E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleRender}>RENDER E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleSend}>SEND E-INVOICE</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export function SendThanks() {
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
      <Box sx={{backgroundColor: '#e7b118', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '3%'}}>
        <Box sx={ StyledPage }>
          <Typography align="center" sx={ {color: 'black', fontSize: '20pt', fontWeight: '800', fontFamily: 'monospace', minWidth: '50%', paddingBottom: '5%'} }>
            Thank you for using Pikachu E-Invoicing Services!
          </Typography>
          <img style={{ width: "50%", paddingBottom: '5%' }} src={banner} alt='banner' />
          <Typography align="center" sx={ {color: 'black', fontSize: '12pt', minWidth: '50%', align: 'center', paddingLeft: '30%', paddingRight: '30%', paddingBottom: '5%'} }>
            Your invoice has been successfully sent. Would you like to continue your e-invoicing journey? 
          </Typography>
          <Stack spacing={6} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleCreate}>CREATE E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleRender}>RENDER E-INVOICE</Button>
            <Button variant="contained" sx={ ThankYouButtons } onClick={handleSend}>SEND E-INVOICE</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}