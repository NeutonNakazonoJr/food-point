const { validate: uuidValidate } = require("uuid");
const guestRepository = require("../repositories/guestRepository");
const eventMiddleware = require("./eventMiddleware");
const eventRepository = require("../repositories/eventRepository");

const guestMiddleware = {
	validateGuestId: async (req, res, next) => {
		try {
			const guestId = req.params.guestId;

			if (!uuidValidate(guestId)) {
				return res
					.status(400)
					.json({ error: "ID do convidado inválido" });
			}

			const [registeredGuest] = await guestRepository.selectOneGuest(
				guestId
			);

			if (!registeredGuest) {
				return res
					.status(404)
					.json({ error: "Convidado não encontrado" });
			}

			const [eventOfThisGuest] = await eventRepository.findEventById(
				registeredGuest.event_id
			);

			if (!eventOfThisGuest) {
				return res.status(404).json({
					error: "Convidado não está associado a um evento válido.",
				});
			}

			if (eventOfThisGuest.user_id !== req.userId) {
				return res.status(404).json({
					error: "O usuário não ter permissão para alterar esse convidado.",					
				});
			}

			next();
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},
	validateEventId: async (req, res, next) => {
		if (["GET", "POST"].includes(req.method)) {
			eventMiddleware.validateEventId(req, res, next);
		} else {
			next();
		}
	},
};

module.exports = guestMiddleware;
