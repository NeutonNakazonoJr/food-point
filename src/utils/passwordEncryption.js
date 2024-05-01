const bcrypt = require('bcrypt');

const comparePassword = async (loginPassword, userPassword) => {
    const passwordValidation = bcrypt.compare(loginPassword, userPassword);
    return passwordValidation;
}

const hashPassword = async (password) => {
    const hash = bcrypt.hash(password, 10);
    return hash;
} 

module.exports = {
    comparePassword,
    hashPassword,
}