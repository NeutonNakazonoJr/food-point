const Joi = require("joi");

const guestSchema = Joi.alternatives()
	.try(
		Joi.object({
			name: Joi.string().required().messages({
				"any.required":
					'O campo "name" é obrigatório e deve ser do tipo string.',
			}),
		}),
		Joi.object({
			name: Joi.string().required().messages({
				"any.required":
					'O campo "name" é obrigatório e deve ser do tipo string.',
			}),
			confirmed: Joi.boolean().required().messages({
				"any.required":
					'O campo "confirmed" é obrigatório e deve ser do tipo boolean.',
			}),
		})
	)
	.messages({
		"alternatives.match":
			"A requisição deve conter o nome do usuário. ex: 'name: string, confirmed: boolean'.",
	});

module.exports = guestSchema;
