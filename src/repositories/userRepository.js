const dbConnection = require('../database/db-connection.js');
const { encryptPassword } = require('../utils/passwordEncryption.js');

const userRepository = {

    insertNewUser: async (userData) => {
        try {
            const { fullname, email } = userData;
            const hashPassword = await encryptPassword(userData.password);

            const query = 'INSERT INTO "user" (fullname, email, "password") VALUES ($1, $2, $3);';
            const newUser = await dbConnection.query(query, [fullname, email, hashPassword]);

            return newUser;
        } catch (error) {
            throw error;
        } 
    },

    getUserById: async (userId) => {
        try {
            const query = 'SELECT fullname, email FROM "user" WHERE id = $1';
            const { rows } = await dbConnection.query(query, [userId]);
            return rows[0];
        } catch (error) {
            return error;
        }   
    }

    // preciso fazer uma função para pegar usuario pelo email para usar para checar 
    // antes do usuario ser cadastrado para n dar erro pois o email é unique
}

module.exports = userRepository;