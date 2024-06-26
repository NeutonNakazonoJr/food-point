const eventRepository = require("../repositories/eventRepository");
const createAndOrganizePurchaseList = require("../services/purchaseList.js");

const eventController = {
	createNewEvent: async (req, res) => {
		try {
			const [newEventId] = await eventRepository.insertNewEvent(
				req.userId
			);
			return res.status(201).json(newEventId);
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

	updateEventLocation: async (req, res) => {
		try {
			const eventId = req.params.id;
			const basicInfos = await eventRepository.updateLocation(
				req.body,
				eventId
			);
			return res.status(200).json({ basicInfos });
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

	updateEventBasicInfos: async (req, res) => {
		try {
			const eventId = req.params.id;
			const basicInfos = await eventRepository.updateBasicInfos(
				req.body,
				eventId
			);
			return res.status(200).json({ basicInfos });
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

	createNewDish: async (req, res) => {
		try {
			const eventId = req.params.id;
			const newDishAndIngridientsId = await eventRepository.insertNewDish(
				req.body,
				eventId
			);
			return res.status(201).json(newDishAndIngridientsId);
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

	getAllEvents: async (req, res) => {
		try {
			const events = await eventRepository.findAllEvents(req.userId);
			return res.status(200).json({ events });
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

	getAllEventInfos: async (req, res) => {
		try {
			const eventInfos = await eventRepository.findCompleteEventInfos(
				req.params.id
			);
			return res.status(200).json({ eventInfos });
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

	deleteEvent: async (req, res) => {
		try {
			const [deletedEventId] = await eventRepository.deletedEventById(
				req.params.id
			);
			if (!deletedEventId.event_id) {
				throw new Error("Erro interno no servidor");
			}
			return res
				.status(200)
				.json({ message: "Evento deletado com sucesso" });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	getEventPurchaseList: async (req, res) => {
		try {
			const purchaseList = await createAndOrganizePurchaseList(
				req.params.id
			);
			return res.status(200).json({
				eventId: req.params.id,
				list: purchaseList,
			});
		} catch (error) {
			return res.status(500).json({ error: "Erro interno no servidor" });
		}
	},

    updateIngredientPurchaseList: async (req, res) => {
        try {
            
            const eventId = req.params.id;
            const ingredientList = req.body.ingredientList;
            
            const updateRequested = await eventRepository.updatePurchaseList(eventId, ingredientList);
            return res.status(200).json({
                success: updateRequested.success, 
                message: updateRequested.message 
            });
        } catch (error) {
          return res.status(500).json({ error: 'Erro interno no servidor' });  
        }
    },

    getAllDishes: async (req, res) => {
        try {
            const dishes = await eventRepository.getAllDishesByEventId(req.params.id);
            return res.status(200).json({ dishes });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}



module.exports = eventController;
