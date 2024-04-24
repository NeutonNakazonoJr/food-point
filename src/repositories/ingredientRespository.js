const dbConnection = require('../database/db-connection.js');

const ingredientRepository = {

    findIngredientById: async (ingredientId) => {
        const query = 'SELECT * FROM ingredient WHERE id = $1';
        const { rows } = await dbConnection.query(query, [ingredientId]);
        return rows;
    },

    updateIngredientById: async (newInfos,ingredientId) => {
        const query = 'UPDATE ingredient SET "name" = $1, unity_measure = $2, quantity = $3 WHERE id = $4 RETURNING *';

        

        const values = [newInfos.name, newInfos.unityMeasure, newInfos.quantity, ingredientId];
        console.log(newInfos);
        const { rows } = await dbConnection.query(query, values);
        return rows
    }
}

module.exports = ingredientRepository;