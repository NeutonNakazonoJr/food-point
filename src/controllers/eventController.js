const eventRepository = require("../repositories/eventRepository");

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
            const [ basicInfos ] = await eventRepository.updateBasicInfos(req.body, eventId);
            return res.status(200).json({ basicInfos });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    createNewDish: async (req, res) => {
        try {
            const eventId = req.params.id;
            const newDishAndIngridientsId = await eventRepository.insertNewDish(req.body, eventId);
            return res.status(201).json(newDishAndIngridientsId);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await eventRepository.findAllEvents(req.userId);
            return res.status(200).json({ events });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getAllEventInfos: async (req, res) => {
        try {
            const eventInfos = await eventRepository.findCompleteEventInfos(req.params.id);
            console.log(eventInfos);
            return res.status(200).json({ eventInfos })
        } catch (error) {
            
        }
    }
}

module.exports = eventController;