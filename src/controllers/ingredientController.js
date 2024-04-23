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
    }
}

module.exports = ingredientController