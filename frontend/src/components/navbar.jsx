import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Tabs, Tab, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setLoggedOut } from '../reducers/authSlice';
import { useDispatch } from 'react-redux';

export const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <LoggedInNavbar />
      ) : (
        <LoggedOutNavbar />
      )}
    </>
  );
};

export const LoggedOutNavbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreate = () => {
    setAnchorEl(null);
    navigate('/unavailable');
  };
  
  const handleRender = () => {
    setAnchorEl(null);
    navigate('/render');
  };

  const handleSend = () => {
    setAnchorEl(null);
    navigate('/unavailable');
  };

  const handleAPI = () => {
    setAnchorEl(null);
    window.location.href = 'https://app.swaggerhub.com/apis/BB81GNATHAN_1/F10A_PIKACHU/1.0.0';
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ width: '100%' }} >
        <Tabs centered textColor='inherit' TabIndicatorProps={{style: {background:'#e7b118'}}}>
          <Tab 
            id="HeaderLabel" 
            role="navigateHome"
            label="[ PIKACHU E-INVOICING ]" 
            sx={ { color: '#e7b118', fontSize: '18pt', fontWeight: 'bold', fontFamily: 'monospace', minWidth: '40%' }} 
            onClick={() => navigate('/homepage')}
          />
          <Tab 
            id="AboutTab" 
            role="navigateAbout" 
            label="About Us" 
            textColor='inherit'
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/about')} 
          />
          <Tab 
            id="ServicesTab" 
            role="navigateServices" 
            label="Services ▼" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            textColor='inherit'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Tab 
            id="PricingTab" 
            role="navigatePricing" 
            label="Plans & Pricing" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/pricing')} 
          />
          <Tab 
            id="EducationTab" 
            role="navigateEducation" 
            label="Learn" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/learn')} 
          />
          <Tab 
            id="LoginTab" 
            role="navigateLogin" 
            label="Login/Register" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/')} 
          />
        </Tabs>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              minWidth: '120px', 
              backgroundColor: '#e7b118',
            },
          }}
        >
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleAPI}>API</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleCreate}>Create E-Invoice</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleRender}>Render E-Invoice</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleSend}>Send E-Invoice</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export const LoggedInNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const openAcc = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCreate = () => {
    setAnchorEl(null);
    navigate('/create');
  };
  
  const handleRender = () => {
    setAnchorEl(null);
    navigate('/render');
  };

  const handleSend = () => {
    setAnchorEl(null);
    navigate('/send');
  };

  const handleAPI = () => {
    setAnchorEl(null);
    window.location.href = 'https://app.swaggerhub.com/apis/BB81GNATHAN_1/F10A_PIKACHU/1.0.0';
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleAccount = () => {
    setAnchorEl(null);
    navigate('/account');
  }

  const handleLogout = async (event) => {
    setAnchorEl2(null);

    const response = await fetch(`/logout?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      localStorage.clear();
      dispatch(setLoggedOut());
      navigate('/homepage')
    } else if (response.status === 400) {
      alert('User does not exist. Please Register.')
    }
    else {
      alert('Login failed. Please try again.')
    }

  };

  return (
    <>
      <Box sx={{ width: '100%' }} >
        <Tabs centered textColor='inherit' TabIndicatorProps={{style: {background:'#e7b118'}}}>
          <Tab 
            id="HeaderLabel" 
            role="navigateHome"
            label="[ PIKACHU E-INVOICING ]" 
            sx={ { color: '#e7b118', fontSize: '18pt', fontWeight: 'bold', fontFamily: 'monospace', minWidth: '40%' }} 
            onClick={() => navigate('/homepage')}
          />
          <Tab 
            id="AboutTab" 
            role="navigateAbout" 
            label="About Us" 
            textColor='inherit'
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/about')} 
          />
          <Tab 
            id="ServicesTab" 
            role="navigateServices" 
            label="Services ▼" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            textColor='inherit'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Tab 
            id="PricingTab" 
            role="navigatePricing" 
            label="Plans & Pricing" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/pricing')} 
          />
          <Tab 
            id="EducationTab" 
            role="navigateEducation" 
            label="Learn" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            onClick={() => navigate('/learn')} 
          />
          <Tab 
            id="ServicesTab" 
            role="navigateServices" 
            label="Account ▼" 
            sx={{ fontSize: '13px', color: 'black', minWidth: '10%' }}
            textColor='inherit'
            aria-controls={openAcc ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openAcc ? 'true' : undefined}
            onClick={handleClick2}
          />
        </Tabs>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              minWidth: '120px', 
              backgroundColor: '#e7b118',
            },
          }}
        >
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleAPI}>API</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleCreate}>Create E-Invoice</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleRender}>Render E-Invoice</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleSend}>Send E-Invoice</MenuItem>
        </Menu>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={openAcc}
          onClose={handleClose2}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              minWidth: '120px', 
              backgroundColor: '#e7b118',
            },
          }}
        >
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleAccount}>Manage Account</MenuItem>
          <MenuItem sx={{fontSize: '11pt'}} onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
