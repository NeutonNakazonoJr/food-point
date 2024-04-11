const userRepository = require('../repositories/userRepository');

const userController = {

    createNewUser: async (req, res) => {
        try {
            const newUser = await userRepository.insertNewUser(req.body);
            return res.status(201).json({ newUser });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro interno no Servidor'
            })
        }
    },

    getUsersInfosById: async (req, res) => {
        try {
            const { id } = req.params;
            const usersInfo = await userRepository.getUserById(id);
            return res.status(200).json({ ... usersInfo });
        } catch (error) {
            return res.status(500).json({ 
                error: 'Erro interno no Servidor'
            });
        }
    }
}

module.exports = userController;