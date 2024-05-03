const { validate : uuidValidate } = require('uuid');
const eventRepository = require('../repositories/eventRepository');
const dishRepository = require('../repositories/dishRepository');


const validateDishId =  async (req, res, next) => {
    try {
        const dishId = req.params.dishId;
        const eventId = req.params.id;

        if (!uuidValidate(dishId)) {
            return res.status(400).json({ error: 'ID do prato inválido' });
        }

        const [ registeredDish ] = await dishRepository.getDishById(dishId);
        const [ registeredEvent ] = await eventRepository.findEventById(eventId);

        if (!registeredDish) {
            return res.status(404).json({ error: 'Prato não encontrado' });
        }

        if (registeredEvent.event_id !== registeredDish.event_id) {
            return res.status(404).json({ error: 'ID do prato e/ou ID do evento inválido' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}


module.exports = validateDishId;
