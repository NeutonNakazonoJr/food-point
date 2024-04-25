
const userRepository = require('../repositories/userRepository.js');
const { validate : uuidValidate } = require('uuid');
const { userUpdatePasswordSchema } = require('../schemas/userSchema.js');

const userMiddleware = {

    validateUserId: async (req, res, next) => {
        try {

            if (!uuidValidate(req.userId)) { 
                return res.status(400).json({error: 'ID inválido.'});
            };
            
            const [ getUser ] = await userRepository.getUserById(req.userId);
            
            if (!getUser) { 
                return res.status(400).json({ error: 'Usuário não encontrado.'});
            };
         
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }

        next();
    },

    validateUserEmail: async (req, res, next) => {
        try {
            
            if (req.method === 'PATCH' && !req.body.email) {
                next();
            }

            const { email } = req.body;
            const [ registeredEmail ] = await userRepository.getUserEmail(email);

            if (registeredEmail) {
                return res.status(400).json({ error: 'Email e/ou Senha inválido' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' , e});
        }
    },

    validatePasswordUpdate: async (req, res, next) => {
        try {
            await userUpdatePasswordSchema.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ error: error.message});
        }
    }
}

module.exports = userMiddleware;