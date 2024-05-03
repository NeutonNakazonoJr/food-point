const { validate : uuidValidate } = require('uuid');
const dishRepository = require('../repositories/dishRepository');
const ingredientRepository = require('../repositories/ingredientRespository');


const validateIngredientId =  async (req, res, next) => {
    try {
        const dishId = req.params.dishId;
        const ingredientId = req.params.ingredientId;

        if (!uuidValidate(ingredientId)) {
            return res.status(400).json({ error: 'ID do ingrediente inválido' });
        }

        const [ registeredDish ] = await dishRepository.getDishById(dishId);
        const [ registeredIngredient ] = await ingredientRepository.findIngredientById(ingredientId);

        if (!registeredIngredient) {
            return res.status(404).json({ error: 'Ingrediente não encontrado' });
        }

        if (registeredDish.id !== registeredIngredient.dish_id) {
            return res.status(404).json({ error: 'ID do prato e/ou ID do ingrediente inválido' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}


module.exports = validateIngredientId;
