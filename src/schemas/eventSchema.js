const joi = require("joi");
const moment = require("moment-timezone");

const rgxText = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s"^`~:.,?!-]+$/;
const rgxTime = /^(([01]\d|2[0-3]):([0-5]\d))$/;
const rgxDate = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const rgxLocation = /^-\d+(\.\d+)?,-\d+(\.\d+)?$/;
const rgxDish = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
const rgxUnityMeasure = /^\b([a-zA-Z]+)\s*\(([a-zA-Z]{1,2})\)$/;

const eventSchema = {
	eventBasicInfos: joi.object({
		name: joi.string().regex(rgxText).allow("").messages({
			"string.base": "O nome deve ser uma string",
			"string.pattern.base":
				"O nome deve conter apenas letras e (^ ` ~ : . , ? ! -)",
		}),
		theme: joi.string().regex(rgxText).allow("").messages({
			"string.base": "O tema deve ser uma string",
			"string.pattern.base":
				"O tema deve conter apenas letras e (^ ` ~ : . , ? ! -)",
		}),
		eventDescription: joi.string().regex(rgxText).allow("").messages({
			"string.base": "A descrição deve ser uma string",
			"string.pattern.base":
				"A descrição deve conter apenas letras e (^ ` ~ : . , ? ! -)",
		}),
		eventDate: joi
			.string()
			.allow("")
			.custom((value, helpers) => {
				if (!rgxDate.test(value)) {
					return helpers.error("any.invalid");
				}

				const eventDate = moment(value, "DD/MM/YYYY").toDate();
				const currentDate = new Date();
				currentDate.setHours(0, 0, 0, 0);

				if (eventDate < currentDate) {
					return helpers.error("any.invalid");
				}
			})
			.message({
				"any.invalid": "Data inválida ou fora do formato dd/mm/yyyy",
			}),
		eventTime: joi
			.string()
			.allow("")
			.custom((value, helpers) => {
				if (!rgxTime.test(value)) {
					return helpers.error("any.invalid");
				}
			})
			.message({
				"any.invalid":
					"O formato do horário deve ser: horas 00:00 minutos",
			}),
		eventLocation: joi.string().regex(rgxLocation).allow("").messages({
			"string.base": "O tipo de dados de localização deve ser uma string",
			"string.pattern.base": "A localização deve conter apenas letras",
		}),
	}),

	dish: joi.object({
		dishName: joi.string().pattern(rgxDish).required().messages({
			"string.base":
				"O tipo de dado de nome do prato deve ser uma string",
			"string.pattern.base":
				"O nome do prato deve conter apenas letras e hífen",
			"any.required": "O nome do prato é obrigatório",
			"string.empty": "O campo nome não pode estar vazio",
		}),
		type: joi.string().pattern(rgxDish).required().messages({
			"string.base":
				"O tipo de dado de nome do prato deve ser uma string",
			"string.pattern.base":
				"O nome do prato deve conter apenas letras e hífen",
			"any.required": "O tipo de prato é obrigatório",
			"string.empty": "O campo do tipo de prato não pode estar vazio",
		}),
		ingredients: joi.array().items(
			joi.object({
				name: joi.string().pattern(rgxDish).required().messages({
					"string.base":
						"O tipo de dado de nome do ingredinte deve ser uma string",
					"string.pattern.base":
						"O nome do ingredinte deve conter apenas letras e hífen",
					"any.required": "O nome do ingrediente é obrigatório",
					"string.empty":
						"O campo nome do ingrediente não pode estar vazio",
				}),
				unityMeasure: joi
					.string()
					.pattern(rgxUnityMeasure)
					.required()
					.messages({
						"string.base":
							"O tipo de dado de unidade de medida deve ser uma string",
						"string.pattern.base":
							"Unidade de medida inválida, ex válido: mililitros (ml)",
						"any.required": "A unidade de medida é obrigatório",
						"string.empty":
							"O campo de unidade de medida tem que estar definido",
					}),
				quantity: joi
					.number()
					.integer()
					.positive()
					.required()
					.messages({
						"any.required": "A quantidade é obrigatória",
						"number.integer":
							"O campo quantidade aceita apenas números inteiros",
						"number.positive":
							"O campo quantidade aceita apenas números positivos",
						"number.base":
							"O preenchimento do campo quantidade deve ser do tipo number",
						"string.empty":
							"O campo quantidade não pode estar vazio",
					}),
			})
		),
	}),
	eventLocation: joi.object({
		location: joi.string().pattern(rgxLocation).required().messages({
			"string.base": "O tipo de dado localização deve ser uma string",
			"string.pattern.base":
				"O nome do prato deve conter apenas números, traços e virgulas",
			"any.required": "O campo location é obrigatório",
			"string.empty": "O campo location não pode estar vazio",
		}),
	}),
};

module.exports = eventSchema;
