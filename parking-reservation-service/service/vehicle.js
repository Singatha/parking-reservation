const grpc = require('@grpc/grpc-js');
const { connection } = require('../model/database.js');

async function addVehicle(call, callback){
	console.log(call, "tf is call?");
  try {
    await connection.connect((err) => {
      if (err) throw err;
      const sqlQuery = "INSERT INTO Vehicle (user_id, vehicle_name, vehicle_license_plate, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())";
      const queryValues = [call.user_id, call.vehicle_name, call.vehicle_license_plate];
      connection.query(sqlQuery, queryValues, (err, result, fields) => {
        if (err) throw err;        
        callback(null, { message : "Inserted Vehicle record successfully" });
      });
    });
  } catch (error) {
    console.error('Error adding vehicle record:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to add vehicle record' });
  }
};

async function editVehicle(call, callback){
  try {
    await connection.connect((err) => {
      if (err) throw err;
      const sqlQuery = "UPDATE Vehicle SET ? WHERE Vehicle.user_id?";
      const queryValues = [call.vehicle_name, call.vehicle_license_plate, call.user_id];
      connection.query(sqlQuery, queryValues, (err, result, fields) => {
        if (err) throw err;        
        callback(null, { message : "Edited Vehicle record successfully" });
      });
    });
  } catch (error) {
    console.error('Error editing vehicle record:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to edit vehicle record' });
  }
};

async function removeVehicle(call, callback){
  try {
    await connection.connect((err) => {
      if (err) throw err;
      const sqlQuery = "DELETE FROM Vehicle WHERE Vehicle.user_id = ? AND Vehicle.vehicle_name = ?";
      const queryValues = [call.user_id, call.vehicle_name];
      connection.query(sqlQuery, queryValues, (err, result, fields) => {
        if (err) throw err;        
        callback(null, { message : "Deleted Vehicle record successfully" });
      });
    });
  } catch (error) {
    console.error('Error removing vehicle record:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to remove vehicle record' });
  }
};

module.exports = {
	addVehicle,
	editVehicle,
	removeVehicle
};
