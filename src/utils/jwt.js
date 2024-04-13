const jwt = require('jsonwebtoken');


const createToken = (payload, secretOrPrivateKey, options) => {
    const token = jwt.sign(payload, secretOrPrivateKey, options)
    return token;
}

const verifyToken = (token, tokenPassword) => {
    const validToken = jwt.verify(token, tokenPassword, function(err, data) {
        if (err) {
            return false;
        } else {
            return data;
        }
    })
    return validToken;
}

module.exports = {
    createToken,
    verifyToken
}