import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageWriting } from './pageStyle';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { RenderHTMLForm } from '../components/renderForms'

function RenderHTML() {
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>RENDER XML E-INVOICE TO HTML</Typography>
        <Typography align="center" sx={ PageWriting }>
          Fill out the following form to render your e-invoice to HTML.
        </Typography>
        <RenderHTMLForm/>
      </Box>
    </>
  );
}

export default RenderHTML;