const ingredientRepository = require("../repositories/ingredientRespository")

const ingredientController = {

    updateIngredient: async (req, res) => {
        try {
            const [ updatedIngredient ] = await ingredientRepository.updateIngredientById(req.body, req.params.ingredientId);
            return res.status(200).json({
                message: 'Informações do ingrediente atualizada com sucesso',
                updatedIngredient
            })
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error: 'Erro interno no servidor'});
        }
    },

    registerNewIngredient: async (req, res) => {
        try {
            const dishtId = req.params.dishId;
            const eventId = req.params.id;
            const [ newIngredientId ] = await ingredientRepository.insertNewIngredient(eventId, dishtId, req.body);
            return res.status(201).json({
                message: 'Ingrediente cadastrado com sucesso',
                newIngredientId
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    getIngredientsInfo: async (req, res) => {
        try {
            const ingredientList = await ingredientRepository.getIngredientsInfoByDish(req.params.dishId);
            return res.status(200).json({ingredientList});
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    deleteIngredient: async (req, res) => {
        try {
            const ingredientId  = req.params.ingredientId;
            const [ deletedIngredientId ] = await ingredientRepository.deleteIngredientById(ingredientId);

            if (!deletedIngredientId.id) {
                throw new Error('Erro interno no servidor');
            }
            
            return res.status(200).json({
                message: 'Ingrediente deletado com sucesso',
                id: deletedIngredientId.id
            })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = ingredientController