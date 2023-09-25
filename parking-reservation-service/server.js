// const grpc = require('grpc');
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
const dbConfig = {
  host: 'mysql-db',
  user: 'root',
  password: 'password',
  database: 'parkingreservationDB',
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Create the Parking table
pool.query(`
  CREATE TABLE IF NOT EXISTS ParkingSpace (
    parking_space_id INT PRIMARY KEY AUTO_INCREMENT,
    parking_space_type VARCHAR(255) NOT NULL,
    building_name TEXT NOT NULL,
    address TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN
  )`, (error, results, fields) => {
    if (error) {
      console.error('Error creating ParkingSpace table:', error);
    } else {
      console.log('ParkingSpace table created successfully');
    }
});

pool.query(`
  INSERT INTO ParkingSpace (parking_space_type, building_name, address, price, is_available) VALUES ('crips', 'Queens Bridge', '441st', 69.0, true)`, (error, results, fields) => {
    if (error) {
      console.error('Error creating ParkingSpace table:', error);
    } else {
      console.log('ParkingSpace table created successfully');
    }
});

// Define gRPC service methods
grpcServer.addService(parkingPackage.ParkingSpaceService.service, {
  getParkingSpaceList: (call, callback) => {

    try {
      // const connection = await pool.getConnection();

      // // Check if the parking space is available for the given time range
      // // Implement this logic using SQL queries

      // // If available, create a reservation
      // const [result] = await connection.query(
      //   'SELECT * FROM ParkingSpace WHERE parking_space_id = '
      // );
      // console.log(result, "results")
      // connection.release();
      // let result = {};
      // pool.query('SELECT * FROM ParkingSpace WHERE parking_space_id = 1', (error, results) => {
      //   if (error) {
      //     console.error('Error retrieving bounties:', error);
      //   } else {
      //     console.log(results, "Hello There !");
      //     result = results
      //     // res.json(results);
      //   }
      // });

      // callback(null, { success: true, message: 'Parking List returned successfully' });
      // const connection = await pool.getConnection();
      // let availableSpaces = [];
      // // Implement logic to fetch available parking spaces from your database
      // connection.query('SELECT * FROM ParkingSpace',  (error, results, fields) => {
      //   if (error) {
      //     return console.error(error.message);
      //   }
      //   console.log(results);
        
      //   availableSpaces = rows.map(row => ({
      //     spaceId: row.parking_space_id,
      //     parkingType: row.parking_space_type, 
      //     name: row.building_name,
      //     address: row.address,
      //     price: row.price,
      //     isAvailable: row.is_available,
      //   }));
      // });

      // const availableSpaces = rows.map(row => ({
      //   spaceId: row.parking_space_id,
      //   parkingType: row.parking_space_type, 
      //   name: row.building_name,
      //   address: row.address,
      //   price: row.price,
      //   isAvailable: row.is_available,
      // }));
      // console.log(availableSpaces, "spaces");
      // connection.release();
      const availableSpaces = {
        parking_space_id: 1,
        parking_space_type: 'Crips', 
        building_name: 'Queens Bridge',
        address: '441st',
        price: 69.0,
        is_available: true,
      };
      callback(null, availableSpaces);
    } catch (error) {
      console.error('Error fetching parking list:', error);
      callback({ code: grpc.status.INTERNAL, details: 'Unable to fetch parkinig list' });
    }
  },
});

// Start gRPC server
// grpcServer.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
// grpcServer.start();
// console.log('gRPC server is running on port 50051');
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server is running on port 50051');
  grpcServer.start();
});
