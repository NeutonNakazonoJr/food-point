const dbConnection = require('../database/db-connection.js');

const eventRepository = {

    insertNewEvent: async (userId) => {
        const query = 'INSERT INTO event (id, user_id) VALUES (uuid_generate_v4(), $1) RETURNING id;';
        const { rows } = await dbConnection.query(query, [ userId ]);
        return rows; 
    },

    findEventById: async (eventId) => {
        const query = 'SELECT * FROM "event" WHERE id = $1';
        const { rows } = await dbConnection.query(query, [ eventId ]);
        return rows;
    },

    updateBasicInfos: async (eventInfos, eventId) => {

        const values = [
            eventInfos.name || null, 
            eventInfos.theme || null, 
            eventInfos.eventDescription || null, 
            eventInfos.eventDate || null,
            eventInfos.eventTime || null,
            eventInfos.eventLocation || null, 
            eventId
        ];

        const query = `UPDATE "event" SET 
            event_name = $1, theme = $2, event_description = $3,  event_date = $4, event_time = $5, event_location = $6  WHERE id = $7 
            RETURNING *`;

        const { rows } = await dbConnection.query(query, values); 
        return rows;
    }
}

module.exports = eventRepository;