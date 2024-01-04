const grpc = require('@grpc/grpc-js');
const { connection } = require('../model/database.js');
const { validPassword, genPassword, issueJWT } = require('../lib/utils.js');

async function register(call, callback){
  const { request: { user_name, email, password, first_name, last_name } } = call;
  const { salt, hash } = genPassword(password);
  try {
    await connection.connect((err) => {
      if (err) throw err;
      const sqlQuery = "INSERT INTO User (user_email, user_hash, user_salt, user_name, user_first_name, user_last_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";
      const queryValues = [email, hash, salt, user_name, first_name, last_name];
      connection.query(sqlQuery, queryValues, (err, result, fields) => {
        if (err) throw err;
        callback(null, { message: "User registered successfully" });
      });
    });
  } catch (error) {
    console.error('Error Registering User:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to register user' });
  }
}

async function login(call, callback){
  const { request: { user_name, password } } = call;
  try {
    await connection.connect((err) => {
      if (err) throw err;
      const sqlQuery = "SELECT * FROM User WHERE User.user_name = ? LIMIT 1";
      const queryValues = [user_name];
      connection.query(sqlQuery, queryValues, (err, result, fields) => {
        if (err) throw err;
        const isValid = validPassword(password, result[0].user_hash, result[0].user_salt);
        if (isValid){
          const jwt = issueJWT(result.user_id);
          callback(null, { message: "Login succefully", token: jwt.token, expires: jwt.expires });    
        } else {
          callback(null, { message: "Invalid password" })
        }
      });
    });
  } catch (error) {
    console.error('Error Logging User:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to login user' });
  }
}

async function getUser(call, callback){
  const { request: { user_id } } = call;
  try {
    await connection.connect((err) => {
      if (err) throw err;
      const sqlQuery = "SELECT * FROM User WHERE User.user_id = ?";
      const queryValues = [user_id];
      connection.query(sqlQuery, queryValues, (err, result, fields) => {
        if (err) throw err;
        callback(null, result);
      });
    });
  } catch (error) {
    console.error('Error Logging User:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Unable to login user' });
  }
}

module.exports = {
  register,
  login,
  getUser
};
