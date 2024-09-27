// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || '', // Initialize token from local storage
  login: JSON.parse(localStorage.getItem('login')) || {},
  tourid: JSON.parse(localStorage.getItem('tourid')) || '',
review_rating:JSON.parse(localStorage.getItem('review_rating')) || '',
tourlocation:JSON.parse(localStorage.getItem('tourlocation')) || '',
tourseats:JSON.parse(localStorage.getItem('tourseats')) || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to local storage
    },
    clearToken: (state) => {
      state.token = ''; // Set token to empty string
      localStorage.removeItem('token'); // Remove token from local storage
    },
    setLogin: (state, action) => {
      state.login = action.payload;
      localStorage.setItem('login', JSON.stringify(action.payload)); // Save login data to local storage
    },
    
    setTourid: (state, action) => {
      state.tourid = action.payload;
      localStorage.setItem('tourid', JSON.stringify(action.payload)); // Save login data to local storage
    },
    
    setReview_Rating: (state, action) => {
      state.review_rating = action.payload;
      localStorage.setItem('review_rating', JSON.stringify(action.payload)); // Save login data to local storage
    },
    setTourlocation: (state, action) => {
      state.tourlocation = action.payload;
      localStorage.setItem('tourlocation', JSON.stringify(action.payload)); // Save login data to local storage
    },
    setTourseats: (state, action) => {
      state.tourseats= action.payload;
      localStorage.setItem('tourseats', JSON.stringify(action.payload)); // Save login data to local storage
    },
  },
});

export const { setToken, clearToken, setLogin, setTourid, setReview_Rating,setTourlocation,setTourseats} = authSlice.actions;
export default authSlice.reducer;
