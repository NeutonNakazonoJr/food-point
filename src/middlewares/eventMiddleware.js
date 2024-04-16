const { validate : uuidValidate } = require('uuid');
const eventRepository = require('../repositories/eventRepository');

const eventMiddleware = {
    validateEventId: async (req, res, next) => {
        try {
            const eventId = req.params.id;
   
            if (!uuidValidate(eventId)) {
                return res.status(400).json({ error: 'ID do evento inválido' });
            }

            const [ registeredEvent ] = await eventRepository.findEventById(eventId);
   
            if (!registeredEvent) {
                return res.status(404).json({ error: 'Evento não encontrado' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

module.exports = eventMiddleware;