const eventRepository = require("../repositories/eventRepository");

const eventController = {

    createNewEvent: async (req, res) => {
        try {
            const [ newEventId ] = await eventRepository.insertNewEvent(req.userId);
            return res.status(201).json(newEventId);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

module.exports = eventController;