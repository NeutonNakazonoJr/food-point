const dbConnection = require('../database/db-connection.js');


const eventRepository = {

    insertNewEvent: async (userId) => {
        const query = 'INSERT INTO event (id, user_id) VALUES (uuid_generate_v4(), $1) RETURNING id;';
        const { rows } = await dbConnection.query(query, [ userId ]);
        return rows; 
    }
}

module.exports = eventRepository;