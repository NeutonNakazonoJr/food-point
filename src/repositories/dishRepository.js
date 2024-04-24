const dbConnection = require('../database/db-connection.js');

const dishRepository = {

    getDishById: async (dishId) => {
        const query = 'SELECT * FROM dish WHERE id = $1';
        const { rows: requestedDish }= await dbConnection.query(query, [dishId]);
        return requestedDish;
    },

    updadeDishNameById: async (newName, dishId) => {
        const query = 'UPDATE dish SET dish_name = $1 WHERE id = $2 RETURNING dish_name as dishName';
        const { rows } = await dbConnection.query(query, [newName, dishId]);
        return rows;
    },

    deleteDishById: async (dishId) => {
        const query = 'DELETE FROM "dish" WHERE id = $1 RETURNING id';
        const { rows } = await dbConnection.query(query, [dishId]);
        return rows;
    }
}

module.exports = dishRepository;