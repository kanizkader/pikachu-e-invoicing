import React from 'react';
import { Navbar } from '../components/navbar';
import PricingDisplay from '../components/pricingDisplay';
import { Box } from '@mui/material';
import { StyledPage } from './pageStyle';

export const Pricing = () => {
  return (
    <>
      <Navbar/>
      <Box sx={ StyledPage }>
        <PricingDisplay/>
      </Box>
    </>
  )
}