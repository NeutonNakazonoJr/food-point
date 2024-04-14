const joi = require('joi');
const { validate : uuidValidation } = require('uuid');

const rgxText = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s"^`~:.,?!]+$/;
const rgxTime = /^(([01]\d|2[0-3]):([0-5]\d))$/;
const rgxDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;


const eventSchema = {

    eventBasicInfos: joi.object({
        name: joi.string().regex(rgxText).allow('').messages({
            'string.base': 'O nome deve ser uma string',
            'string.pattern.base': 'O nome deve conter apenas letras e [^ ` ~ : . , ? !]',
        }),
        theme: joi.string().regex(rgxText).allow('').messages({
            'string.base': 'O tema deve ser uma string',
            'string.pattern.base': 'O tema deve conter apenas letras e [^ ` ~ : . , ? !]',
        }),
        description: joi.string().regex(rgxText).allow('').messages({
            'string.base': 'A descrição deve ser uma string',
            'string.pattern.base': 'A descrição deve conter apenas letras e [^ ` ~ : . , ? !]',
        }),
        eventDate: joi.string().allow('').custom((value, helpers) => {
            if (!rgxDate.test(value)) {
                return helpers.error('any.invalid');
            }
        }).message({ 
            'any.invalid': 'O formato da data deve ser: dd/mm/yyyy' 
        }),
        eventTime: joi.string().allow('').custom((value, helpers) => {
            if (!rgxTime.test(value)) {
                return helpers.error('any.invalid');
            }
        }).message({ 
            'any.invalid': 'O formato do horário deve ser: horas 00:00 minutos' 
        })
    })
}

module.exports = eventSchema;