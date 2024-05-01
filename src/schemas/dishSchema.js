const joi = require('joi');

const rgxDish = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
const dishSchema = joi.object({
    dishName: joi.string().pattern(rgxDish).required().messages({
        'string.base': 'O tipo de dado de nome do prato deve ser uma string',
        'string.pattern.base': 'O nome do prato deve conter apenas letras e hífen',
        'any.required': 'O nome do prato é obrigatório',
        'string.empty': 'O campo nome não pode estar vazio'
    }),
})

module.exports = dishSchema;