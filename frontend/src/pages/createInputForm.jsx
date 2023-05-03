import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageWriting } from './pageStyle';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { CreateFormViaForm } from '../components/createForms'



function Createfo() {

  return (
    <>
    <Navbar/>
    <Box sx={ StyledPage }>
      <Typography align="center" sx={ PageHeading }>CREATE E-INVOICE</Typography>
      <Typography align="center" sx={ PageWriting }>
        Fill in the below information to create your e-invoice
      </Typography>
      <CreateFormViaForm/>
    </Box>
    </>
    
  );
}

export default Createfo;
