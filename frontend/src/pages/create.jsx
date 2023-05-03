import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageSubheading, PageWriting, SingleButton } from './pageStyle';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const handleUpload = () => {
    navigate('/create/inputupload');
  }

  const handleForm = () => {
    navigate('/create/inputform');
  }

  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>CREATE</Typography>
        <Typography align="center" sx={ PageSubheading }>
          Welcome to our e-invoice creation page!
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          Here, you can easily generate professional and compliant invoices for your business transactions. With our user-friendly interface, you can input all the necessary details such as customer information, items or services provided, and pricing. Our system will automatically calculate the taxes and totals for you, saving you time and effort. You can also customize your invoices with your company logo and branding. Once your invoice is ready, you can download or send it directly to your customer's email address.<br/><br/>Say goodbye to paper-based invoices and switch to our efficient and environmentally-friendly e-invoice solution today!
        </Typography>
        <Button variant="contained" sx={ SingleButton } onClick={handleUpload}>Create My E-Invoice With Upload</Button>
        <Button variant="contained" sx={ SingleButton } onClick={handleForm}>Create My E-Invoice With Form</Button>
      </Box>
    </>
  )
}
  
export default Create;