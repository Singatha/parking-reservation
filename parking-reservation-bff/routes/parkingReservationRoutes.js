const express = require('express');
const parkingReservation = express.Router();
const parkingReservationClient = require('../controllers/parkingReservationClient.js');

parkingReservation.get('/list', (req, res) => {
  try {
    const result = parkingReservationClient.getParkingSpaceList();
    res.sendStatus(201);
    res.json(result);
  } catch(err){
    res.sendStatus(401);
    res.json(err);
  }
});

parkingReservation.post('/reserve', (req, res) => {
  res.send('reserve');
});

parkingReservation.get('/cancel', (req, res) => {
  res.send('cancel');
});

module.exports = parkingReservation;
