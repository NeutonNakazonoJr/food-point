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
            // console.log(basicInfos);
            return res.status(200).json({ basicInfos });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = eventController;