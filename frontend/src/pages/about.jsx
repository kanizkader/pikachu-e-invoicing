import React from 'react';
import { Navbar } from '../components/navbar';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { StyledPage, PageHeading, PageSubheading, PageWriting } from './pageStyle';
import aboutus from '../aboutus.png';

const About = () => {
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <Typography align="center" sx={ PageHeading }>ABOUT US</Typography>
        <Typography align="center" sx={ PageSubheading }>
          Where our name comes from?
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          The name Pikachu is a portmanteau of the words, pika, an onomatopoeia in the Japanese language for a spark or a sparkle of lightning, and chuu, a Japanese onomatopoeia for the squeak made by a mouse.
        </Typography>
        <br/>
        <Typography align="center" sx={ PageSubheading }>
          Our Mission
        </Typography>
        <Typography align="center" sx={ PageWriting }>
          Pikachu E-Invoicing provides rapid and easy e-invoice creating, rendering and sending services. We are determined to make transactions accessible for everyone.
        </Typography><br/>
        <img style={{ width: "20%", paddingBottom: '5%' }} src={aboutus} alt='about-us' />
      </Box>
    </>
  ) 
}
  
export default About;