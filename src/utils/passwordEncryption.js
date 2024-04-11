const bcrypt = require('bcrypt');

const comparePassword = async (loginPassword, userPassword) => {
    const passwordValidation = bcrypt.compare(loginPassword, userPassword);
    return passwordValidation;
}

const encryptPassword = async (password) => {
  const encryptedPassword = bcrypt.hash(password, 10);
  return encryptedPassword;
} 

module.exports = {
  comparePassword,
  encryptPassword,
}