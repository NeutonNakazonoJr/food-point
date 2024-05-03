const joi = require('joi');

const passwordRegex = /^[a-zA-Z0-9]+$/;
const fullNameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/;

const usersSchemas= {
    userInsertSchema: joi.object({
        fullname: joi.string().required().regex(fullNameRegex).messages({
            'any.required': 'O nome completo é obrigatório',
            'string.empty': 'O nome completo não pode estar vazio',
            'string.base': 'O nome completo deve ser uma string',
            'string.pattern.base': 'O nome completo deve conter apenas letras',
        }),
        email: joi.string().email().required().messages({
            'any.required': 'O campo email é obrigatório',
            'string.empty': 'O campo email é obrigatório',
            'string.base': 'O preenchimento do campo deve ser do tipo string',
            'string.email': 'Formato de email inválido',
        }),
        password: joi.string().regex(passwordRegex).required().messages({
            'any.required': 'O campo senha é obrigatório',
            'string.empty': 'O campo senha é obrigatório',
            'string.base': 'O preenchimento do campo deve ser do tipo string',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra, um número e tamanho mínimo de 8.',
      }).min(8).message('A senha deve posssuir no mínimo 8 caracteres')
    }),
    
    userUpdateSchema: joi.object({
        fullname: joi.string().regex(fullNameRegex).messages({
            'string.base': 'O nome completo deve ser uma string',
            'string.pattern.base': 'O nome completo deve conter apenas letras',
        }),
        email: joi.string().email().messages({
            'string.base': 'O preenchimento do campo deve ser do tipo string',
            'string.email': 'Formato de email inválido',
        })
    }),

    userUpdatePasswordSchema: joi.object({
        password: joi.string().regex(passwordRegex).messages({
            'string.base': 'O preenchimento do campo deve ser do tipo string',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra, um número e tamanho mínimo de 8.',
      }).min(8).message('A senha deve posssuir 8 caracteres')
    })
}


module.exports = usersSchemas;
