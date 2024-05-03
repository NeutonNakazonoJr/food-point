const userRepository = require('../repositories/userRepository.js');
const createEmailToRecoverPassword = require('../services/emailSenderPass.js');

const recoverPasswordController = {

    sendEmailToRecoverPass: async (req, res) => {
        try {
            await createEmailToRecoverPassword(req.userID, req.body.email);
            return res.status(200).json({ message: 'Email enviado' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    putNewUserPassword: async (req, res) => {
        try {
            await userRepository.updateUsersNewPassword(req.body.password, req.userId);
            return res.status(200).json({message: 'Senha atualizada com sucesso'});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

module.exports = recoverPasswordController;