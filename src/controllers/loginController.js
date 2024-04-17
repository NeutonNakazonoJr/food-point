const { getUserByEmail } = require("../repositories/userRepository.js");
const { createToken } = require("../utils/jwt.js");
const { SECRET_KEY_JWT } = require("../config/config.js");

const loginAuthenticationController = async (req, res) => {
    try {
 
        const [ userInfos ] = await getUserByEmail(req.body.email);
        const token = createToken({ userId: userInfos.id } , process.env.SECRET_KEY_JWT, { expiresIn: '8h' });
        
        const cookieOptions = {
            maxAge: 8 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        };

        res.cookie('session_token', token, cookieOptions);
        return res.status(200).json({ success: true });

    } catch (error) {
        
        return res.status(500).json({ error: 'Erro interno no servidor'});
    }
}

module.exports = loginAuthenticationController;
