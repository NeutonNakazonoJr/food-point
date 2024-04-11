const userRepository = require('../repositories/userRepository.js');
const { validate : uuidValidate } = require('uuid');

const userMiddleware = {

    validateUserId: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!uuidValidate(id)) { 
                throw new Error('ID inválido');
            };

            const getUser = await userRepository.getUserById(id);

            if (!getUser) { 
                throw new Error('Usuário não encontrado.')
            };
         
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }

        next();
    }
}

module.exports = userMiddleware;