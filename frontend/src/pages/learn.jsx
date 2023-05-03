import React from 'react';
import { Navbar } from '../components/navbar';
import { StyledPage, PageHeading, PageSubheading, PageWriting } from './pageStyle';
import { Box, Typography } from '@mui/material';

export const Learn = () => {
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>How to use Pikachu E-Invoicing</Typography>
        <Typography align="center" sx={ PageSubheading }>
          Learn how to navigate our page!
        </Typography>
        <Typography align="center" sx={ PageWriting }>
        1.	Login via the login page or register if you do not have an account. <br /><br />
        2.	Under the services tab, you can choose which service you wish to interact with, create, send or render.<br /><br />
        3.	Create will prompt you to enter your invoice details or upload a JSON file with fields matching the example. This will return an XML file matching UBL 2.0 specifications that you can download<br /><br />
        4.	Send will prompt you to provide an XML invoice matching UBL 2.0 specifications as well as a recipient and will send the invoice as an email attachment to them<br /><br />
        5.	Render will allow you to provide an XML invoice and render the invoice digitally, as HTML, PDF or JSON.<br /><br />
        6.	Further assistance and queries can be directed to the chatbot, located in the bottom right of the screen which can answer any further questions. 
        </Typography>
      </Box>
    </>
  )
}

