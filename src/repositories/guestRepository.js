const dbConnection = require("../database/db-connection.js");

const guestRepository = {
	selectAllGuest: async (event_id) => {
		const query = "SELECT * FROM guest WHERE event_id = $1";
		const { rows } = await dbConnection.query(query, [event_id]);
		return rows;
	},
	selectOneGuest: async (guest_id) => {
		const query = "SELECT * FROM guest WHERE id = $1";
		const { rows } = await dbConnection.query(query, [guest_id]);
		return rows;
	},
	insertNewGuest: async (event_id, name) => {
		const query =
			'INSERT INTO guest (event_id, "name") VALUES ($1, $2) RETURNING *';
		const { rows } = await dbConnection.query(query, [event_id, name]);
		return rows;
	},
	updateOneGuest: async (guestId, guestInfo) => {
		const values = [guestInfo.name];
		let set = '"name" = $1';
		let paramCounter = 2;

		if (guestInfo.confirmed || guestInfo.confirmed === false) {
			set = set + ", confirmed = $2";
			paramCounter++;
			values.push(guestInfo.confirmed);
		}
		values.push(guestId);

		const query =
			"UPDATE guest SET " +
			set +
			" WHERE id = $" +
			paramCounter +
			' RETURNING "name", confirmed';
		const { rows } = await dbConnection.query(query, values);
		return rows;
	},
	deleteGuest: async (guestId) => {
		const query = "DELETE FROM guest WHERE id = $1";
		const { rows } = await dbConnection.query(query, [guestId]);
		return rows;
	},
};

module.exports = guestRepository;
