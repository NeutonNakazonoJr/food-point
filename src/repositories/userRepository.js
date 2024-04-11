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
    }
}

module.exports = userRepository;