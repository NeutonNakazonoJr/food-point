const jwt = require('jsonwebtoken');


const createToken = (payload, secretOrPrivateKey, options) => {
    const token = jwt.sign(payload, secretOrPrivateKey, options)
    return token;
}

const verifyToken = (token) => {
    const validToken = jwt.verify(token, tokenPassword, function(err, decoded) {
        if (err) {
            return false;
        } else {
            return decoded;
        }
    })
    return validToken
}

module.exports = {
    createToken,
    verifyToken
}