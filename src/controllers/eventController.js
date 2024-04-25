const eventRepository = require("../repositories/eventRepository");
const createAndOrganizePurchaseList = require("../services/purchaseList.js");

const eventController = {

    createNewEvent: async (req, res) => {
        try {
            const [ newEventId ] = await eventRepository.insertNewEvent(req.userId);
            return res.status(201).json(newEventId);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    updateEventBasicInfos: async (req, res) => {
        try {
            const eventId = req.params.id;
            const basicInfos = await eventRepository.updateBasicInfos(req.body, eventId);
            return res.status(200).json({ basicInfos });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    createNewDish: async (req, res) => {
        try {
            const eventId = req.params.id;
            const newDishAndIngridientsId = await eventRepository.insertNewDish(req.body, eventId);
            return res.status(201).json(newDishAndIngridientsId);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await eventRepository.findAllEvents(req.userId);
            return res.status(200).json({ events });
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    getAllEventInfos: async (req, res) => {
        try {
            const eventInfos = await eventRepository.findCompleteEventInfos(req.params.id);
            return res.status(200).json({ eventInfos })
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const [ deletedEventId ] = await eventRepository.deletedEventById(req.params.id);
            if (!deletedEventId.event_id) {
                throw new Error('Erro interno no servidor');
            }
            return res.status(200).json({ message: 'Evento deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getEventPurchaseList: async (req, res) => {
        try {
            const purchaseList = await createAndOrganizePurchaseList(req.params.id);
            return res.status(200).json({
                list: purchaseList
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }

}

module.exports = eventController;