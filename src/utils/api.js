// src/utils/api.js

import axios from 'axios';

// The base URL for your Express backend
const API_BASE_URL = 'https://product-showcase-backend-kt44.onrender.com/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;