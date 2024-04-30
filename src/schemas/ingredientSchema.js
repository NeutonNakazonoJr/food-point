const joi = require('joi');

const rgxDish = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
const rgxUnityMeasure = /^\b([a-zA-Z]+)\s*\(([a-zA-Z]{1,2})\)$/;

const ingredientSchema = joi.object({
    name: joi.string().pattern(rgxDish).required().messages({
        'string.base': 'O tipo de dado de nome do ingrediente deve ser uma string',
        'string.pattern.base': 'O nome do ingrediente deve conter apenas letras e hífen',
        'any.required': 'O nome do ingrediente é obrigatório',
        'string.empty': 'O campo nome do ingrediente não pode estar vazio'
    }),
    unityMeasure: joi.string().pattern(rgxUnityMeasure).required().messages({
        'string.base': 'O tipo de dado de unidade de medida deve ser uma string',
        'string.pattern.base': 'Unidade de medida inválida, ex válido: mililitros (ml)',
        'any.required': 'A unidade de medida é obrigatório',
        'string.empty': 'O campo de unidade de medida tem que estar definido'
    }),
    quantity: joi.number().integer().positive().required().messages({
        'any.required': 'A quantidade é obrigatória',
        'number.integer': 'O campo quantidade aceita apenas números inteiros',
        'number.positive': 'O campo quantidade aceita apenas números positivos',
        'number.base': 'O preenchimento do campo quantidade deve ser do tipo number', 
        'string.empty': 'O campo quantidade não pode estar vazio'
    }) 
})

const purchaseListSchema = joi.object({

    ingredientList: joi.array().items(
        joi.object({
            name: joi.string().pattern(rgxDish).required().messages({
                'string.base': 'O tipo de dado de nome do ingrediente deve ser uma string',
                'string.pattern.base': 'O nome do ingrediente deve conter apenas letras e hífen',
                'any.required': 'O nome do ingrediente é obrigatório',
                'string.empty': 'O campo nome do ingrediente não pode estar vazio'
            }),
            purchased: joi.boolean().messages({
                'boolean.base': 'purchased deve ser do tipo booleano'
            })
        })
    )
})

module.exports = { ingredientSchema, purchaseListSchema };