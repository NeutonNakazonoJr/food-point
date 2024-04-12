const { getUserByEmail } = require('../repositories/userRepository.js');
const { createToken } = require('../utils/jwt.js');

const loginAuthenticationController = async (req, res) => {
    try {
 
        const { id } = await getUserByEmail(req.body.email);
        const token = createToken({ userId: id }, process.env.SECRET_KEY_JWT, { expiresIn: '8h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor'});
    }
}

module.exports = loginAuthenticationController;