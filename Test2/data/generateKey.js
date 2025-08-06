const crypto = require('crypto');

// Generate a 32-byte random value and convert it to a hexadecimal string
const apiKey = crypto.randomBytes(32).toString('hex');
console.log(apiKey);
