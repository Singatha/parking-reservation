const express = require('express');
const parkingSpaceRoute = express.Router();
const { parkingReservationClient } = require('../controllers/client.js');
const { verifyToken } = require('../lib/utils.js');

parkingSpaceRoute.post('/add', verifyToken, (req, res) => {
  try {
    parkingReservationClient.addParkingSpace(req.body, (error, response) => {
      if (!error) {
        // console.log('Parking Space List fetched:', response);
        res.status(200);
        res.json(response);
        return response;
      } else {
        // console.error('Failed to fetch Parking List:', error);
        return error;
      }
    });
  } catch(err){
    res.status(401);
    res.json(err);
  }
});

parkingSpaceRoute.post('/edit', verifyToken, (req, res) => {
  try {
    parkingReservationClient.editParkingSpace(req.body, (error, response) => {
      if (!error) {
        // console.log('Parking Space List fetched:', response);
        res.status(200);
        res.json(response);
        return response;
      } else {
        // console.error('Failed to fetch Parking List:', error);
        return error;
      }
    });
  } catch(err){
    res.status(401);
    res.json(err);
  }
});

parkingSpaceRoute.get('/remove', verifyToken, (req, res) => {
  try {
    parkingReservationClient.removeParkingSpace(req.body, (error, response) => {
      if (!error) {
        // console.log('Parking Space List fetched:', response);
        res.status(200);
        res.json(response);
        return response;
      } else {
        // console.error('Failed to fetch Parking List:', error);
        return error;
      }
    });
  } catch(err){
    res.status(401);
    res.json(err);
  }
});

module.exports = parkingSpaceRoute;
