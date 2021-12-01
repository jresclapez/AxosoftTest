const axios = require('axios');
require('dotenv').config();

// add authentication in the header of http requests

const http = axios.create();

http.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: 'Bearer ' + process.env.ACCESS_TOKEN
    }
  };
});

module.exports = http;
