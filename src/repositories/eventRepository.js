const dbConnection = require("../database/db-connection.js");
const uuid = require("uuid");

const eventRepository = {
	insertNewEvent: async (userId) => {
		const query =
			"INSERT INTO event (event_id, user_id) VALUES (uuid_generate_v4(), $1) RETURNING event_id;";
		const { rows } = await dbConnection.query(query, [userId]);
		return rows;
	},

	findEventById: async (eventId) => {
		const query = 'SELECT * FROM "event" WHERE event_id = $1';
		const { rows } = await dbConnection.query(query, [eventId]);
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
			eventId,
		];

		const query = `UPDATE "event" SET 
            event_name = $1, theme = $2, event_description = $3,  event_date = $4, event_time = $5, event_location = $6  WHERE event_id = $7 
            RETURNING event_name, theme, event_description, event_date, event_date, event_time, event_location`;

		const { rows } = await dbConnection.query(query, values);
		return {
			eventName: rows[0].event_name,
			eventTheme: rows[0].theme,
			eventDescription: rows[0].event_description,
			eventDate: rows[0].event_date,
			eventTime: rows[0].event_time,
		};
	},
	updateLocation: async (eventInfos, eventId) => {
		const query = `UPDATE "event" SET 
            event_location = $1  WHERE event_id = $2 
            RETURNING event_name, theme, event_description, event_date, event_date, event_time, event_location`;

		const { rows } = await dbConnection.query(query, [
			eventInfos.location,
			eventId,
		]);
		return {
			eventName: rows[0].event_name,
			eventTheme: rows[0].theme,
			eventDescription: rows[0].event_description,
			eventDate: rows[0].event_date,
			eventTime: rows[0].event_time,
			eventTime: rows[0].event_location,
		};
	},

	insertNewDish: async (dishInfos, eventId) => {
		const dishQuery =
			'INSERT INTO dish (event_id, dish_name, "type") VALUES ($1, $2, $3) RETURNING id';
		const {
			rows: [{ id: dishId }],
		} = await dbConnection.query(dishQuery, [
			eventId,
			dishInfos.dishName,
			dishInfos.type,
		]);

		const registeredIngredientsIds = [];

		const ingredientInfos = dishInfos.ingredients;
		for (const ingredient of ingredientInfos) {
			const ingredientQuery = `INSERT INTO ingredient (event_id, dish_id, "name", "unity_measure", quantity)
                                    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

			const {
				rows: [{ id: ingredientId }],
			} = await dbConnection.query(ingredientQuery, [
				eventId,
				dishId,
				ingredient.name,
				ingredient.unityMeasure,
				ingredient.quantity,
			]);

			registeredIngredientsIds.push(ingredientId);
		}

		return { dishId, ingredientsIds: registeredIngredientsIds };
	},

	findAllEvents: async (userId) => {
		const query =
			'SELECT event_id, event_name, theme, event_date, event_time, event_location FROM "event" WHERE user_id = $1';
		const { rows } = await dbConnection.query(query, [userId]);
		return rows;
	},

	findCompleteEventInfos: async (eventId) => {
		const query = `SELECT
        json_build_object(
            'basicInfos', json_build_object (
                'eventName', e.event_Name,
                'eventDate', e.event_date,
                'eventTime', e.event_time,
                'eventLocation', e.event_location,
                'eventDescription', e.event_description,
                'eventTheme', e.theme
            ),
            'dishes', CASE WHEN count(d.id) > 0 THEN
                json_agg(
                    json_build_object(
                        'dishId', d.id,
                        'type', d.type,
                        'dishName', d.dish_name
                    )
                )
            ELSE
                '[]'::json
            END
        ) AS event_and_dishes
        FROM
            event e
        LEFT JOIN
            dish d ON e.event_id = d.event_id
        WHERE
            e.event_id = $1
        GROUP BY
            e.event_name, e.event_date, e.event_time, e.event_location, e.event_description, e.theme;
        `;
		const { rows } = await dbConnection.query(query, [eventId]);
		const eventInfos = rows[0].event_and_dishes;
		return eventInfos;
	},

	deletedEventById: async (eventId) => {
		const query =
			'DELETE FROM "event" WHERE event_id = $1 RETURNING event_id';
		const { rows } = await dbConnection.query(query, [eventId]);
		return rows;
	},

	getPurchaseList: async (eventId) => {
		const query = `SELECT name, SUM(quantity) AS total_quantity, purchased, unity_measure
        FROM (
            SELECT i.name, SUM(i.quantity) AS quantity, i.purchased, i.unity_measure
            FROM "event" e
            JOIN ingredient i ON e.event_id = i.event_id
            WHERE e.event_id = $1
            GROUP BY e.event_id, i.name, i.purchased, i.unity_measure
        ) AS aggregated
        GROUP BY name, unity_measure, purchased;`;
		const { rows } = await dbConnection.query(query, [eventId]);
		return rows;
	},

	updatePurchaseList: async (eventId, ingredientList) => {
		try {
			await dbConnection.query("BEGIN");

			let valuesClause = "";
			let params = [];
			let index = 1;

			for (const ingredient of ingredientList) {
				const { name, purchased } = ingredient;
				valuesClause += `($${index++}, $${index++}, $${index++}::uuid), `;
				params.push(purchased, name, eventId);
			}

			valuesClause = valuesClause.slice(0, -2);

			const query = `
                UPDATE ingredient AS i
                SET purchased = v.purchased::boolean
                FROM (VALUES ${valuesClause}) AS v(purchased, name, eventId)
                WHERE i.name = v.name AND i.event_id = v.eventId
            `;

			await dbConnection.query(query, params);
			await dbConnection.query("COMMIT");

			return { success: true, message: "Atualização bem sucedida" };
		} catch (error) {
			await dbConnection.query("ROLLBACK");
			throw error;
		}
	},
};
module.exports = eventRepository;
