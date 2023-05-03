import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageWriting } from './pageStyle';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { CreateFormViaUpload } from '../components/createForms'



function Createup() {

  return (
    <>
    <Navbar/>
    <Box sx={ StyledPage }>
      <Typography align="center" sx={ PageHeading }>CREATE E-INVOICE</Typography>
      <Typography align="center" sx={ PageWriting }>
        Uploade a valid .json document to create your e-invoice
      </Typography>
      <CreateFormViaUpload/>
    </Box>
    </>
    
  );
}

export default Createup;
