import React from 'react';
import { Navbar } from '../components/navbar';
import { LoginForm } from '../components/loginForm';
import { useSelector } from 'react-redux';

function Login() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>
      <LoginForm/>
    </>
  );
}

export default Login;