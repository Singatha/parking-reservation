const { parkingReservationClient } = require('./client.js');

const parkingSpaceListRequest = {
  parking_space_id: 1
};

module.exports.getParkingSpaceList = parkingReservationClient.getParkingSpaceList(parkingSpaceListRequest, (error, response) => {
  if (!error) {
    console.log('Parking Space List fetched:', response);
    return response;
  } else {
    console.error('Failed to fetch Parking List:', error);
    return error;
  }
});
