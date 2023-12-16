const grpc = require('@grpc/grpc-js');
const { connection } = require('../model/database.js');

async function registerUser(call, callback){
  try {

    const eisha = await connection.connect((err) => {
      if (err) throw err;
      connection.query(`INSERT INTO User (user_hash, user_email, user_name, user_first_name, user_last_name) VALUES (${call.password}, ${call.email}, ${call.username}, ${call.name}, ${call.surname})`, (err, result, fields) => {
        if (err) throw err;
        callback(null, result);
      });
    });
  } catch (error) {
    console.error('Error Registering User:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to register user' });
  }
}

module.exports = registerUser;
