const userRepository = require('../repositories/userRepository');

const userController = {

    createNewUser: async (req, res) => {
        try {
            await userRepository.insertNewUser(req.body);
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro interno no Servidor'
            })
        }
    },

    getUsersInfosById: async (req, res) => {
        try {
            const { id } = req.params;
            
            const [ usersInfo ] = await userRepository.getUserById(id);
            return res.status(200).json({ ... usersInfo });
        } catch (error) {
            return res.status(500).json({ 
                error: 'Erro interno no Servidor'
            });
        }
    },

    updateUsersInfos: async (req, res) => {
        try {
            const newInfos = req.body;
            const { id } = req.params;
        
            const [ updatedInfos ] = await userRepository.updateUserPublicInfos(newInfos, id);
            return res.status(200).json({
                message: 'Informação atualizada com sucesso',
                updatedInfos
            })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    updateUsersPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const { id } = req.params;

            await userRepository.updateUsersNewPassword(password, id);
            return res.status(200).json({ message: 'Senha atualizada com sucesso'})
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' })
        }
    }
}

module.exports = userController;