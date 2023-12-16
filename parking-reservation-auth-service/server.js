const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const registerUser = require('./service/parking-reservation-auth.js');

// gRPC setup
const authProtoPath = './parking-reservation-protos/parking-reservation-auth.proto';
const packageDefinition = protoLoader.loadSync(authProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const authPackage = grpc.loadPackageDefinition(packageDefinition).auth;
const grpcServer = new grpc.Server();

// Define gRPC service methods
grpcServer.addService(authPackage.AuthService.service, {
  registerUser: registerUser,
});

// Start gRPC server
grpcServer.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server is running on port 50052');
  grpcServer.start();
});
