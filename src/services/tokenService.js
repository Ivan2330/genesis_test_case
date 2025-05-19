const { v4: uuidv4 } = require('uuid');

// Generate a unique token for email confirmation/unsubscribe
exports.generateToken = () => {
  return uuidv4();
};
