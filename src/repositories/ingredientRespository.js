const dbConnection = require('../database/db-connection.js');

const ingredientRepository = {

    findIngredientById: async (ingredientId) => {
        const query = 'SELECT * FROM ingredient WHERE id = $1';
        const { rows } = await dbConnection.query(query, [ingredientId]);
        return rows;
    },

    updateIngredientById: async (newInfos, ingredientId) => {
        const query = 'UPDATE ingredient SET "name" = $1, unity_measure = $2, quantity = $3 WHERE id = $4 RETURNING *';
        const values = [newInfos.name, newInfos.unityMeasure, newInfos.quantity, ingredientId];
        const { rows } = await dbConnection.query(query, values);
        return rows;
    },

    insertNewIngredient: async (eventId, dishId, ingredientInfos) => {
        const query = 'INSERT INTO ingredient (event_id, dish_Id, "name", unity_measure, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const { name, unityMeasure, quantity } = ingredientInfos;
        const { rows } = await dbConnection.query(query, [eventId, dishId, name, unityMeasure, quantity]);
        return rows;
    },

    getIngredientsInfoByDish: async (dishId) => {
        const query = 'SELECT "name", unity_measure, quantity FROM ingredient WHERE dish_id = $1';
        const { rows }  = await dbConnection.query(query, [dishId]);
        return rows;
    },

    deleteIngredientById: async (ingredientId) => {
        const query = 'DELETE FROM ingredient WHERE id = $1 RETURNING id';
        const { rows }  = await dbConnection.query(query, [ingredientId]);
        return rows;
    }
}

module.exports = ingredientRepository;