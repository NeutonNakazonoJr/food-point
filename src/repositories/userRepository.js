const dbConnection = require('../database/db-connection.js');
const { hashPassword } = require('../utils/passwordEncryption.js');

const userRepository = {

    insertNewUser: async (userData) => {
        try {
            const { fullname, email } = userData;
            const newHashPassword = await hashPassword(userData.password);

            const query = 'INSERT INTO "user" (fullname, email, "password") VALUES ($1, $2, $3);';
            const newUser = await dbConnection.query(query, [fullname, email, newHashPassword]);

            return newUser;
        } catch (error) {
           
            return error;
        } 
    },

    getUserById: async (userId) => {
        const query = 'SELECT fullname, email FROM "user" WHERE id = $1';
        const { rows } = await dbConnection.query(query, [userId]);
        return rows;
    },

    getUserEmail: async (userEmail) => {
        const query = 'SELECT email FROM "user" WHERE email = $1';
        const { rows } = await dbConnection.query(query, [userEmail]);
        return rows;       
    },

    updateUserPublicInfos: async (newInfos, userId) => {
        
        const attributesToUpdate = Object.keys(newInfos);  

        const formattedParameterForQuery = attributesToUpdate.map((attribute, index) => {
            return `${attribute} = $${index + 1}`
        })

        const indexIdParameter = formattedParameterForQuery.length + 1;
        const formattedParameters = formattedParameterForQuery.toString();


        const arrayValuesQuery = [... Object.values(newInfos), userId];
      
        const query = `UPDATE "user" SET ${formattedParameters} WHERE id = $${indexIdParameter} RETURNING ${attributesToUpdate}`;

        const { rows } = await dbConnection.query(query, arrayValuesQuery);
        return rows;
    },
     
    updateUsersNewPassword: async (newPassword, userId) => {
        try {
            const newPasswordHash = await hashPassword(newPassword);
            const query = 'UPDATE "user" SET password = $1 WHERE id = $2';
            return await dbConnection.query(query, [newPasswordHash, userId]);
        } catch (error) {
            return error;
        }
    },

    getUserByEmail: async (userEmail) => {
        const query = 'SELECT * FROM "user" WHERE email = $1';
        const { rows } = await dbConnection.query(query, [userEmail]);
        return rows;
    },

    deleteUserRegistration: async (userId) => {
        const query = 'DELETE FROM "user" WHERE id = $1 RETURNING id';
        const { rows } = await dbConnection.query(query, [userId]);
        return rows;
    }

}

module.exports = userRepository;