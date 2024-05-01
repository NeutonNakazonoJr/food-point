const joi = require('joi');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = joi.object({
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
            'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial, e ter um comprimento mínimo de 8 caracteres.',
      }).length(8).message('A senha deve posssuir 8 caracteres')
});

module.exports = loginSchema;
