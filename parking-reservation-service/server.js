const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const getParkingSpace = require('./service/parking-reservation.js');

// gRPC setup
const parkingProtoPath = './parking-reservation-protos/parking-reservation.proto';
const packageDefinition = protoLoader.loadSync(parkingProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const parkingPackage = grpc.loadPackageDefinition(packageDefinition).parking;
const grpcServer = new grpc.Server();

// Define gRPC service methods
grpcServer.addService(parkingPackage.ParkingSpaceService.service, {
  getParkingSpaceList: getParkingSpace,
});

// Start gRPC server
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server is running on port 50051');
  grpcServer.start();
});
