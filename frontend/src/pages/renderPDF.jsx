import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading,  PageWriting } from './pageStyle';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RenderPDFForm } from '../components/renderForms'

function RenderPDF() {
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>RENDER XML E-INVOICE TO PDF</Typography>
        <Typography align="center" sx={ PageWriting }>
          Fill out the following form to render your e-invoice to PDF.
        </Typography>
        <RenderPDFForm/>
      </Box>
    </>
  );
}

export default RenderPDF;