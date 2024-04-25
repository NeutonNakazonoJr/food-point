const { SECRET_KEY_JWT } = require("../config/config.js");
const { getUserByEmail } = require("../repositories/userRepository.js");
const { verifyToken } = require("../utils/jwt.js");
const { comparePassword } = require("../utils/passwordEncryption.js");


const loginValidation = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [ userFound ] = await getUserByEmail(email);

        if (!userFound) {
            return res.status(401).json({ error: 'Email e/ou Senha inválido'});
        }

        const isValidPassword = await comparePassword(password, userFound.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Email e/ou Senha inválido'});
        }

        next();
    } catch (error) {    
        return res.status(500).json({ error: 'Erro interno no servidor'});
    } 
}

const userAuthorization = async (req, res, next) => {
    try {
        const token = req.cookies.session_token;
        
        if (!token) {
            return res.status(401).json({ error: 'Token Ausente' });
        }

        const isValidToken = verifyToken(token, SECRET_KEY_JWT);
       
        if (!isValidToken) {
            return res.status(401).json({ error: 'Token Inválido'});
        }

        req.userId =  isValidToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

module.exports = { loginValidation, userAuthorization };