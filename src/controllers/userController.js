const userRepository = require('../repositories/userRepository');

const userController = {

    createNewUser: async (req, res) => {
        try {
            const newUser = await userRepository.insertNewUser(req.body);
            return res.status(201).json({newUser});
        } catch (error) {
            return res.status(500).json({
                error: 'Erro interno no servidor'
            })
        }
    }
}

module.exports = userController;