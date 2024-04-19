const {
	selectAllGuest,
	insertNewGuest,
	updateOneGuest,
	deleteGuest,
} = require("../repositories/guestRepository");

const guestController = {
	getAllGuests: async (req, res) => {
		try {
			const eventId = req.params.id;
			const guests = await selectAllGuest(eventId);
			return res.status(200).json(guests);
		} catch (error) {
			res.status(500).json({ reason: "erro interno no servidor", error });
		}
	},
	createGuest: async (req, res) => {
		try {
			const eventId = req.params.id;
			const guestName = req.body.name;
			const newGuest = await insertNewGuest(eventId, guestName);
			return res.status(201).json(newGuest);
		} catch (error) {
			res.status(500).json({ reason: "erro interno no servidor", error });
		}
	},
	updateGuest: async (req, res) => {
		try {
			const guestId = req.params.guestId;
			const guestInfo = req.body;
			const updatedGuest = await updateOneGuest(guestId, guestInfo);
			return res.status(200).json(updatedGuest);
		} catch (error) {
			res.status(500).json({
				reason: "erro interno no servidor",
				error: error.message,
			});
		}
	},
	deleteOneGuest: async (req, res) => {
		try {
			const guestId = req.params.guestId;
			const result = await deleteGuest(guestId);
			return res.status(200).json({ success: true, result });
		} catch (error) {
			res.status(500).json({ reason: "erro interno no servidor", error });
		}
	},
};

module.exports = guestController;
