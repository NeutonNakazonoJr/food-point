const joi = require('joi');
// const moment = require('moment-timezone');

const rgxText = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s"^`~:.,?!-]+$/;
const rgxTime = /^(([01]\d|2[0-3]):([0-5]\d))$/;
const rgxDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const rgxLocation = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/;

const eventSchema = {

    eventBasicInfos: joi.object({
        name: joi.string().regex(rgxText).allow('').messages({
            'string.base': 'O nome deve ser uma string',
            'string.pattern.base': 'O nome deve conter apenas letras e [^ ` ~ : . , ? ! -]',
        }),
        theme: joi.string().regex(rgxText).allow('').messages({
            'string.base': 'O tema deve ser uma string',
            'string.pattern.base': 'O tema deve conter apenas letras e [^ ` ~ : . , ? ! -]',
        }),
        eventDescription: joi.string().regex(rgxText).allow('').messages({
            'string.base': 'A descrição deve ser uma string',
            'string.pattern.base': 'A descrição deve conter apenas letras e [^ ` ~ : . , ? ! -]',
        }),
        eventDate: joi.string().allow('').custom((value, helpers) => {
            if (!rgxDate.test(value)) {
                return helpers.error('any.invalid');
            }

            // const eventDate = moment(value, "DD/MM/YYYY").toDate();
            // const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);

            // if(eventDate < currentDate) {
            //     return helpers.error('any.invalid');
            // }
  
        }).message({ 
            'any.invalid': 'Data inválida ou fora do formato dd/mm/yyyy' 
        }),
        eventTime: joi.string().allow('').custom((value, helpers) => {
            if (!rgxTime.test(value)) {
                return helpers.error('any.invalid');
            }
        }).message({ 
            'any.invalid': 'O formato do horário deve ser: horas 00:00 minutos' 
        }),
        eventLocation: joi.string().regex(rgxLocation).allow('').messages({
            'string.base': 'O tipo de dados de localização deve ser uma string',
            'string.pattern.base': 'A localização deve conter apenas letras',
        })
    })
}

module.exports = eventSchema;