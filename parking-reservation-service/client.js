// const grpc = require('grpc');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const parkingProtoPath = './protos/parking.proto';
const packageDefinition = protoLoader.loadSync(parkingProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const parkingPackage = grpc.loadPackageDefinition(packageDefinition).parking;

const client = new parkingPackage.ParkingSpaceService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);


const parkingSpaceListRequest = {
  parking_space_id: 1
};

client.getParkingSpaceList(parkingSpaceListRequest, (error, response) => {
  if (!error) {
    console.log('Parking Space List fetched:', response);
  } else {
    console.error('Failed to fetch Parking List:', error);
  }
});
