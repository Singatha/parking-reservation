const grpc = require('@grpc/grpc-js');
const { connection } = require('../model/database.js');

async function getParkingSpace(call, callback){
  try {
    let availableSpaces = {
      parking_space_id: 0,
      parking_space_type: '', 
      building_name: '',
      address: '',
      price: 0.0,
      is_available: false,
    };

    const eisha = await connection.connect((err) => {
      if (err) throw err;
      connection.query("SELECT * FROM ParkingSpace WHERE parking_space_id=1", (err, result, fields) => {
        if (err) throw err;

        availableSpaces.parking_space_id = result[0].parking_space_id;
        availableSpaces.parking_space_type = result[0].parking_space_type;
        availableSpaces.building_name = result[0].building_name;
        availableSpaces.address = result[0].address;
        availableSpaces.price = Number(result[0].price);
        availableSpaces.is_available = result[0].is_available;
        
        callback(null, availableSpaces);

      });
    });
  } catch (error) {
    console.error('Error fetching parking list:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to fetch parking list' });
  }
};

module.exports = getParkingSpace;
