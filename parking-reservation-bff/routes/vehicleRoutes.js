const express = require('express');
const vehicleRoute = express.Router();
const { parkingReservationClient } = require('../controllers/client.js');
const { verifyToken } = require('../lib/utils.js');

vehicleRoute.post('/add', verifyToken, (req, res) => {
  try {
    parkingReservationClient.addVehicle(req.body, (error, response) => {
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

vehicleRoute.post('/edit', verifyToken, (req, res) => {
  try {
    parkingReservationClient.editVehicle(req.body, (error, response) => {
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

vehicleRoute.get('/remove', verifyToken, (req, res) => {
  try {
    parkingReservationClient.removeVehicle(req.body, (error, response) => {
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

module.exports = vehicleRoute;
