const { getUserByEmail } = require("../repositories/userRepository.js");
const { comparePassword } = require("../utils/passwordEncryption.js");


const loginValidation = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [ userFound ] = await getUserByEmail(email);

        if (!userFound) {
            return res.status(401).json({ error: 'Email e/ou Senha inválido'})
        }

        const isValidPassword = await comparePassword(password, userFound.password);
    
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Email e/ou Senha inválido'})
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor'});
    }
}


module.exports = loginValidation;