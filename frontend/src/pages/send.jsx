import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageSubheading, PageWriting, SingleButton } from './pageStyle';
import { SendForm } from '../components/sendForms';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export const Send = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/send/form');
  }
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>SEND</Typography>
        <Typography align="center" sx={ PageSubheading }>
          Welcome to our e-invoice sending page, where you can easily send electronic invoices to your clients or customers!
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          With our user-friendly interface, you can create and customize invoices quickly, and then send them directly to your recipients' email addresses. You can also track the status of your invoices in real-time, and receive notifications when they are viewed, paid, or past due. Plus, our platform is fully secure, so you can trust that your sensitive financial data is protected.<br/><br/>Simplify your invoicing process and save time with our e-invoice service today.
        </Typography>
        <Button variant="contained" sx={ SingleButton } onClick={handleButtonClick}>Send My E-Invoice</Button>
      </Box>
    </>
  ) 
}
  
export function SendingForm() {
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>SEND E-INVOICE</Typography>
        <Typography align="center" sx={ PageWriting }>
          Fill out the following form to email your e-invoice with a professional touch using Pikachu E-Invoicing Services.
        </Typography>
        <SendForm/>
      </Box>
    </>
  );
}