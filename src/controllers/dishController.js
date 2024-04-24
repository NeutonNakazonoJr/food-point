const dishRepository = require("../repositories/dishRepository");

const dishController = {

    updateDishName: async (req, res) => {
        try {
            const [ updatedInfo ] = await dishRepository.updadeDishNameById(req.body.dishName, req.params.dishId);
            return res.status(200).json({ 
                message: 'Nome do prato atualizado com sucesso',
                updatedInfo
            });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' })
        }
    },

    deleteDish: async (req, res) => {
        try {
            const [ deletedDishId ] = await dishRepository.deleteDishById(req.params.dishId);
            if (!deletedDishId.id) {
                throw new Error('Erro interno no servidor');
            }
            return res.status(200).json({ message: 'Prato deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = dishController;