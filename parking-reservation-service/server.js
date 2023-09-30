const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mysql = require('mysql2');

// gRPC setup
const parkingProtoPath = './protos/parking.proto';
const packageDefinition = protoLoader.loadSync(parkingProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const parkingPackage = grpc.loadPackageDefinition(packageDefinition).parking;
const grpcServer = new grpc.Server();

// Database configuration
const connection = mysql.createConnection({
  host: "mysql-db",
  user: "root",
  password: "password",
  database: "parkingreservationDB",
});

// Create a connection

// Create the Parking table
connection.connect((err) => {
  if (err) throw err;
  connection.query(`
  CREATE TABLE IF NOT EXISTS ParkingSpace (
    parking_space_id INT PRIMARY KEY AUTO_INCREMENT,
    parking_space_type VARCHAR(255) NOT NULL,
    building_name TEXT NOT NULL,
    address TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN
  )`, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
});

connection.connect((err) => {
  if (err) throw err;
  connection.query(`INSERT INTO ParkingSpace (parking_space_type, building_name, address, price, is_available) VALUES ('crips', 'Queens Bridge', '441st', 69.0, true)`, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
});


// Define gRPC service methods
grpcServer.addService(parkingPackage.ParkingSpaceService.service, {
  getParkingSpaceList: async(call, callback) => {

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
      callback({ code: grpc.status.INTERNAL, details: 'Unable to fetch parkinig list' });
    }
  },
});

// Start gRPC server
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server is running on port 50051');
  grpcServer.start();
});
