import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageSubheading, PageWriting, MultipleButtons } from './pageStyle';
import { Button, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';

function Render () {
  const navigate = useNavigate();
  const handleHTML = () => {
    navigate('/render/html');
  }
  const handleJSON = () => {
    navigate('/render/json');
  }
  const handlePDF = () => {
    navigate('/render/pdf');
  }

  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>RENDER</Typography>
        <Typography align="center" sx={ PageSubheading }>
          Welcome to our e-invoice rendering page!
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          Here, you can easily convert your XML invoices into user-friendly formats such as HTML, JSON, and PDF. With our intuitive interface, you can upload your XML files and choose the desired output format with just a few clicks. Our advanced rendering technology ensures that the converted documents retain their original format, while also being easy to read and share. Whether you need to send an invoice to a client, or simply want to keep track of your records, our e-invoice rendering page has got you covered.<br/><br/>Try it out today and see how easy it is to convert your XML invoices into the formats you need!
        </Typography>
        <Stack spacing={6} direction="row" sx={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={ MultipleButtons } onClick={handleHTML}>XML <ArrowRightAltIcon/> HTML</Button>
          <Button variant="contained" sx={ MultipleButtons } onClick={handleJSON}>XML <ArrowRightAltIcon/> JSON</Button>
          <Button variant="contained" sx={ MultipleButtons } onClick={handlePDF}>XML <ArrowRightAltIcon/> PDF</Button>
        </Stack>
      </Box>
    </>
  ) 
}
  
export default Render;