
const jwt = require('jsonwebtoken');

const signToken = (userId) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('JWT secret key is missing');
  }

  return jwt.sign({ id: userId }, secretKey, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Set the expiration time as needed
  });
};

module.exports = signToken;