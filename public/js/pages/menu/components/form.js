import { buttonLoadState } from "../../../utils/load/buttonLoadState.js";

let main = null;
function saveDish(dishName, ingredients) {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("postDish", {
			detail: {
				dishName,
				ingredients,
			},
		});
		main.dispatchEvent(event);
	}
}

function updateDish(dishId, dishName, addDish) {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("updateDish", {
			detail: {
				dishId,
				dishName,
				addDish,
			},
		});
		main.dispatchEvent(event);
	}
}

function postIngredient(dishId, ingredientId, name, unityMeasure, quantity) {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("postIngredient", {
			detail: {
				dishId,
				ingredientId,
				name,
				unityMeasure,
				quantity,
			},
		});
		main.dispatchEvent(event);
	}
}

function updateIngredient(dishId, ingredientId, name, unityMeasure, quantity) {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("updateIngredient", {
			detail: {
				dishId,
				ingredientId,
				name,
				unityMeasure,
				quantity,
			},
		});
		main.dispatchEvent(event);
	}
}

function deleteIngredient(dishId, ingredientId) {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("deleteIngredient", {
			detail: {
				dishId,
				ingredientId,
			},
		});
		main.dispatchEvent(event);
	}
}

function emptyReboot() {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("emptyReboot", {});
		main.dispatchEvent(event);
	}
}

function getDishField(dishId, dishName) {
	const fieldset = document.createElement("fieldset");

	const label = document.createElement("label");
	const input = document.createElement("input");
	const btn = document.createElement("button");
	const inputID = "newEventMenu-form-dishName";

	let lastInputValue = dishName;
	let saved = true;

	label.htmlFor = inputID;
	input.id = inputID;
	input.type = "text";
	input.placeholder = "Pão com gergelim";
	input.pattern = `^[a-zA-ZÀ-ÖØ-öø-ÿ\\s'\\-]+$`;
	input.title = "O nome do prato deve conter apenas letras e hífen";
	input.value = dishName.trim();
	btn.type = "button";
	btn.textContent = "Salvar prato";

	if (!dishName || dishName.trim() === "") {
		btn.disabled = true;
		btn.style.cursor = "not-allowed";
	}

	input.addEventListener("input", () => {
		if (input.reportValidity()) {
			if (lastInputValue !== input.value) {
				saved = false;
				lastInputValue = input.value.trim();
			}
			btn.disabled = false;
			input.removeAttribute("style");
			btn.removeAttribute("style");
			return;
		}
		input.style.outline = "2px solid red";
		btn.style.cursor = "not-allowed";
		btn.disabled = true;
	});

	btn.addEventListener("click", () => {
		if (input.reportValidity()) {
			saved = true;
			updateDish(dishId, input.value.trim(), true);
		}
	});

	fieldset.addEventListener("dispatchIngredientChange", () => {
		if (!saved && input.checkValidity()) {
			saved = true;
			updateDish(dishId, input.value.trim(), false);
		}
	});

	fieldset.appendChild(label);
	fieldset.appendChild(input);
	fieldset.appendChild(btn);

	return fieldset;
}

function createIngredientFieldset(
	dishId,
	ingredientId,
	name,
	unityMeasure,
	quantity
) {
	function saveIngredient() {
		if (this instanceof HTMLElement) {
			if (!this.reportValidity()) {
				this.style.outline = "2px solid red";
				this.style.zIndex = "2";
				this.style.border = "2px solid var(--blackberry)";
				return;
			}
			this.removeAttribute("style");
			ingredient[this.dataset.ingredient] = this.value;
			updateIngredient(
				dishId,
				ingredient.id,
				ingredient.name,
				ingredient.unityMeasure,
				parseInt(ingredient.quantity)
			);
		}
	}

	const ingredient = {
		id: ingredientId,
		name: name,
		unityMeasure: unityMeasure,
		quantity: quantity,
	};

	const fieldset = document.createElement("fieldset");
	fieldset.className = "newEventMenu-ingredient";

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.placeholder = "trigo";
	nameInput.value = name;
	nameInput.pattern = `^[a-zA-ZÀ-ÖØ-öø-ÿ\\s'\\-]+$`;
	nameInput.title = "O nome do prato deve conter apenas letras e hífen";
	nameInput.dataset.ingredient = "name";

	const quantityInput = document.createElement("input");
	quantityInput.type = "number";
	quantityInput.min = "0";
	quantityInput.valueAsNumber = isNaN(parseInt(quantity))
		? 0
		: parseInt(quantity);
	quantityInput.dataset.ingredient = "quantity";

	const unitSelect = document.createElement("select");
	unitSelect.name = "unity-of-measurement";
	unitSelect.id = `newEventMenu-unityOfMeasurement-${Date.now()}`;
	unitSelect.dataset.ingredient = "unityMeasure";
	const options = [
		"Selecione uma unidade de medida",
		"Quilogramas (kg)",
		"Gramas (g)",
		"Mililitros (ml)",
		"Litros (L)",
		"Unidades (u)",
	];

	options.forEach((option, index) => {
		const opt = document.createElement("option");
		opt.value = index === 0 ? "0" : option;
		opt.text = option;
		if (index === 0) {
			opt.disabled = true;
			if (!unityMeasure) {
				opt.selected = true;
			}
		}
		if (unityMeasure && unityMeasure === option) {
			opt.selected = true;
		}
		unitSelect.appendChild(opt);
	});

	nameInput.addEventListener("input", saveIngredient);
	quantityInput.addEventListener("input", saveIngredient);
	unitSelect.addEventListener("input", saveIngredient);

	fieldset.appendChild(nameInput);
	fieldset.appendChild(quantityInput);
	fieldset.appendChild(unitSelect);

	if (ingredient.id) {
		const deleteButton = document.createElement("button");
		deleteButton.dataset.id = ingredient.id;
		deleteButton.dataset.dishId = dishId;
		deleteButton.addEventListener("click", deleteThisIngredient);
		fieldset.appendChild(deleteButton);
	}

	return fieldset;
}

function deleteThisIngredient(e) {
	if (e instanceof Event && e.target instanceof HTMLButtonElement) {
		buttonLoadState(e.target, true);
		const ingredientId = e.target.dataset.id;
		const dishId = e.target.dataset.dishId;
		if (!ingredientId || !dishId) {
			return;
		}
		deleteIngredient(dishId, ingredientId);
	}
}

function getIngredientsField(dishId, ingredients) {
	const dishID = dishId;
	const fieldset = document.createElement("fieldset");
	const legend = document.createElement("legend");
	const addIngredient = document.createElement("button");
	addIngredient.textContent = "Adicionar ingrediente";

	if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
		legend.textContent = "Ingredientes";
		fieldset.appendChild(legend);
		ingredients.forEach((ingredient) => {
			const ingredientFieldset = createIngredientFieldset(
				dishID,
				ingredient.id,
				ingredient.name,
				ingredient.unityMeasure,
				ingredient.quantity
			);
			fieldset.appendChild(ingredientFieldset);
		});
	}
	addIngredient.addEventListener("click", async (e) => {
		e.preventDefault();
		postIngredient(dishID, null, null, null, null);
	});

	fieldset.appendChild(addIngredient);

	return fieldset;
}

function getEmptyDishField() {
	const fieldset = document.createElement("fieldset");

	const label = document.createElement("label");
	const input = document.createElement("input");
	const btn = document.createElement("button");
	const inputID = "newEventMenu-form-dishName";

	label.htmlFor = inputID;
	input.id = inputID;
	input.type = "text";
	input.placeholder = "Pão com gergelim";
	input.pattern = `^[a-zA-ZÀ-ÖØ-öø-ÿ\\s'\\-]+$`;
	input.title = "O nome do prato deve conter apenas letras e hífen";
	btn.type = "button";
	btn.textContent = "Salvar prato";
	btn.style.cursor = "not-allowed";
	btn.disabled = true;

	input.addEventListener("input", () => {
		if (input.reportValidity()) {
			btn.disabled = false;
			input.removeAttribute("style");
			btn.removeAttribute("style");
			return;
		}
		input.style.outline = "2px solid red";
		btn.style.cursor = "not-allowed";
		btn.disabled = true;
	});

	btn.addEventListener("click", () => {
		if (input.reportValidity()) {
			const event = new CustomEvent("publishDish", {
				detail: input.value.trim(),
				bubbles: true,
			});
			fieldset.dispatchEvent(event);
		}
	});

	fieldset.appendChild(label);
	fieldset.appendChild(input);
	fieldset.appendChild(btn);

	return fieldset;
}

function createEmptyIngredientFieldset() {
	function saveIngredient() {
		if (this instanceof HTMLElement) {
			if (!this.reportValidity()) {
				this.style.outline = "2px solid red";
				this.style.zIndex = "2";
				this.style.border = "2px solid var(--blackberry)";
				return;
			}
			this.removeAttribute("style");
			ingredient[this.dataset.ingredient] = this.value;
			const event = new CustomEvent("saveIngredient", {
				detail: ingredient,
				bubbles: true,
			});
			fieldset.dispatchEvent(event);
		}
	}
	const ingredient = {
		id: Date.now(),
		name: null,
		unityMeasure: null,
		quantity: null,
	};

	const fieldset = document.createElement("fieldset");
	fieldset.className = "newEventMenu-ingredient";

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.placeholder = "trigo";
	nameInput.pattern = `^[a-zA-ZÀ-ÖØ-öø-ÿ\\s'\\-]+$`;
	nameInput.title = "O nome do prato deve conter apenas letras e hífen";
	nameInput.dataset.ingredient = "name";

	const quantityInput = document.createElement("input");
	quantityInput.type = "number";
	quantityInput.min = "0";
	quantityInput.dataset.ingredient = "quantity";

	const unitSelect = document.createElement("select");
	unitSelect.name = "unity-of-measurement";
	unitSelect.id = `newEventMenu-unityOfMeasurement-${Date.now()}`;
	unitSelect.dataset.ingredient = "unityMeasure";
	const options = [
		"Selecione uma unidade de medida",
		"Quilogramas (kg)",
		"Gramas (g)",
		"Mililitros (ml)",
		"Litros (L)",
		"Unidades (u)",
	];

	options.forEach((option, index) => {
		const opt = document.createElement("option");
		opt.value = index === 0 ? "0" : option;
		opt.text = option;
		if (index === 0) {
			opt.disabled = true;
			opt.selected = true;
		}
		unitSelect.appendChild(opt);
	});

	const deleteButton = document.createElement("button");
	deleteButton.dataset.id = ingredient.id;
	deleteButton.addEventListener("click", (e) => {
		buttonLoadState(deleteButton, true, "fork-white");
		const event = new CustomEvent("removeIngredient", {
			detail: ingredient.id,
			bubbles: true,
		});
		fieldset.dispatchEvent(event);
		fieldset.remove();
	});

	nameInput.addEventListener("input", saveIngredient);
	quantityInput.addEventListener("input", saveIngredient);
	unitSelect.addEventListener("input", saveIngredient);

	fieldset.appendChild(nameInput);
	fieldset.appendChild(quantityInput);
	fieldset.appendChild(unitSelect);
	fieldset.appendChild(deleteButton);

	return fieldset;
}

function getEmptyIngredientField() {
	const fieldset = document.createElement("fieldset");
	const legend = document.createElement("legend");
	const addIngredient = document.createElement("button");
	addIngredient.textContent = "Adicionar ingrediente";

	fieldset.appendChild(addIngredient);
	addIngredient.addEventListener("click", (e) => {
		e.preventDefault();
		if (fieldset.childElementCount === 1) {
			legend.textContent = "Ingredientes";
			fieldset.insertBefore(legend, addIngredient);
		}
		fieldset.insertBefore(createEmptyIngredientFieldset(), addIngredient);
	});

	return fieldset;
}

function bootEmptyForm(form, h1, p) {
	form.innerHTML = "";
	const dish = {
		dishName: "",
		ingredients: [],
	};
	const emptyDishField = getEmptyDishField();
	const emptyIngredientField = getEmptyIngredientField();

	const saveIngredient = (e) => {
		if (e.detail && typeof e.detail === "object") {
			const index = dish.ingredients.findIndex(
				(i) => i.id === e.detail.id
			);
			if (index === -1) {
				dish.ingredients.push(e.detail);
				return;
			}
			dish.ingredients[index] = e.detail;
		}
	};
	const removeIngredient = (e) => {
		if (e.detail) {
			const index = dish.ingredients.findIndex((i) => i.id === e.detail);
			if (index === -1) {
				return;
			}
			dish.ingredients.splice(index, 1);
		}
	};
	const publishDish = (e) => {
		dish.dishName = e.detail;
		saveDish(dish.dishName, dish.ingredients);
	};

	emptyIngredientField.addEventListener("saveIngredient", saveIngredient);
	emptyIngredientField.addEventListener("removeIngredient", removeIngredient);
	emptyDishField.addEventListener("publishDish", publishDish);

	form.appendChild(h1);
	form.appendChild(p);
	form.appendChild(emptyDishField);
	form.appendChild(emptyIngredientField);
}

function bootForm(form, h1, p, dish) {
	form.innerHTML = "";

	if (!dish) {
		bootEmptyForm(form, h1, p);
		return;
	}

	const dishFieldset = getDishField(dish.dishId, dish.dishName, dish.type);
	const ingredientsField = getIngredientsField(dish.dishId, dish.ingredients);

	form.appendChild(h1);
	form.appendChild(p);
	form.appendChild(dishFieldset);
	form.appendChild(ingredientsField);
}

export default async function getForm(menu, currentType, mainComponent) {

	main = mainComponent;
	const form = document.createElement("form");
	form.id = "newEventMenu-form";
	form.addEventListener("submit", (e) => e.preventDefault());

	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	h1.textContent = "Menu";
	p.textContent = "Organize as refeições do evento.";

	const dish = undefined;
	bootForm(form, h1, p, dish);

	form.addEventListener("selectDishType", (e) => {
		currentType = e.detail.key;
		const dish = undefined;
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("postDish", () => {
		const dish = undefined;
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("updateDish", (e) => {
		if (e.detail.addDish) {
			bootForm(form, h1, p, undefined);
			return;
		}
		const dish = menu[currentType].controller.getLastDish();
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("postIngredient", (e) => {
		const dish = menu[currentType].controller.getOneDish(e.detail.dishId);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("deleteIngredient", (e) => {
		const dish = menu[currentType].controller.getOneDish(e.detail.dishId);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("dishSelectedToDelete", () => {
		const dish = undefined;
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("dishSelectedToEdit", (e) => {
		const dish = menu[currentType].controller.getOneDish(e.detail);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("dispatchIngredientChange", async () => {
		const children = form.childNodes;
		for (const child of children) {
			if (child instanceof HTMLFieldSetElement) {
				await new Promise((resolve, reject) => {
					child.dispatchEvent(
						new CustomEvent("dispatchIngredientChange")
					);
					resolve();
				});
			}
		}
	});

	form.addEventListener("emptyReboot", () => {
		const dish = undefined;
		bootForm(form, h1, p, dish);
	});

	return form;
}
