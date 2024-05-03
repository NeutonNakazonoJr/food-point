const userRepository = require("../repositories/userRepository");
const joi = require('joi');
const { verifyToken } = require("../utils/jwt");
const { SECRET_KEY_JWT } = require("../config/config.js");

const recoverPassMiddleware = {
    validateEmail: async (req, res, next) => {
        try {
            const emailSchema = joi.string().email().messages({
                'string.base': 'O preenchimento do campo deve ser do tipo string',
                'string.email': 'Formato de email inválido',
            });

            await emailSchema.validateAsync(req.body.email);
        

            const [ registeredUser ] = await userRepository.getUserByEmail(req.body.email);

            if (!registeredUser) {
                return res.status(400).json({ error: 'Email inválido' });
            }
   
            req.userID = registeredUser.id;

            next();
        } catch (error) {
            if (error.details && error.details.length > 0) {
                const errorMessage = error.details[0].message;
                return res.status(400).json({ error: errorMessage });
            } else {
                return res.status(500).json({ error: 'Erro interno no servidor'});
            }
        }
    },

    validadeToken: (req, res, next) => {
        try {
            const token = req.body.token;

            if (!token) {
                return res.status(401).json({ error: 'Código de validação ausente' });
            }

            const isValidToken = verifyToken(token, SECRET_KEY_JWT);

            if (!isValidToken) {
                return res.status(401).json({ error: 'Código de validação inválido'});
            }
            req.userId = isValidToken.userID;
            next();
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor'});
        }    
    }
}


module.exports = recoverPassMiddleware;
