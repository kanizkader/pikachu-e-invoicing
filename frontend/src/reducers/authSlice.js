import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, 
    isLoggedIn: false,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = authSlice.actions;

export default authSlice.reducer;