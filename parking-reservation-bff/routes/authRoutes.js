const express = require('express');
const auth = express.Router();
const parkingReservationAuthClient = require('../controllers/authClient.js');

auth.post('/register', (req, res) => {
  res.send('register');
});

auth.post('/login', (req, res) => {
  res.send('login');
});

auth.get('/verification/hash', (req, res) => {
  res.send('verification hash');
});

auth.get('/logout', (req, res) => {
  res.send('logout');
});

module.exports = auth;
