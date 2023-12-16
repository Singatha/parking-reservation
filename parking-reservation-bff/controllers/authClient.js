// Yet to be implemented
// import the auth client (so need to implement a factory pattern to return either auth or parking client)
// invoke the client methods and export
const { parkingReservationAuthClient } = require('./client.js');

const registerUserRequest = {
	username: "Rick",
 	email: "rick@test.com",
	password: "1234",
  name: "Rick",
  surname: "Sanchez",
};

module.exports.registerUser = parkingReservationAuthClient.registerUser(registerUserRequest, (error, response) => {
  if (!error) {
    console.log('User Registered', response);
    return response;
  } else {
    console.error('Failed to Register User :', error);
    return error;
  }
});
