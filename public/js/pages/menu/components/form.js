function saveDish(dishId, dishName, dishType, addNewDish = true) {
	const event = new CustomEvent("updateDish", {
		detail: {
			dishId,
			dishName,
			type: dishType,
			addNewDish: addNewDish,
		}
	});
	window.dispatchEvent(event);
}

function saveIngredient(dishId, ingredientId, name, unityMeasure, quantity) {
	const event = new CustomEvent("updateIngredient", {
		detail: {
			dishId,
			ingredientId,
			name,
			unityMeasure,
			quantity,
		}
	});
	console.log("about to window.dispatchEvent('updateIngredient')")
	window.dispatchEvent(event);
}

function deleteIngredient(dishId, ingredientId) {
	const event = new CustomEvent("deleteIngredient", {
		detail: {
			dishId,
			ingredientId,
		}
	});
	window.dispatchEvent(event);
}

function getDishField(dishId, dishName, dishType) {
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
			saveDish(dishId, input.value.trim(), dishType, true);
		}
	});

	window.addEventListener("dispatchIngredientChange", () => {
		if (!saved && input.checkValidity()) {
			saved = true;
			saveDish(dishId, input.value.trim(), dishType, false);
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
	function saveIngrediente() {
		clearTimeout(timeOut);
		if (this instanceof HTMLElement) {
			if (!this.reportValidity()) {
				this.style.outline = "2px solid red";
				this.style.zIndex = "2";
				this.style.border = "2px solid var(--blackberry)";
				return;
			}
			this.removeAttribute("style");
			ingredient[this.dataset.ingredient] = this.value;
			saved = false;
			timeOut = setTimeout(() => {
				if (!saved) {
					saved = true;
					saveIngredient(
						dishId,
						ingredient.id,
						ingredient.name,
						ingredient.unityMeasure,
						parseInt(ingredient.quantity)
					);
				}
			}, defaultAwait);
		}
	}

	let timeOut = 0;
	let saved = true;
	const defaultAwait = 4000;
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

	nameInput.addEventListener("input", saveIngrediente);
	quantityInput.addEventListener("input", saveIngrediente);
	unitSelect.addEventListener("input", saveIngrediente);

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

	window.addEventListener("dispatchIngredientChange", () => {
		if (!saved) {
			clearTimeout(timeOut);
			saved = true;
			saveIngredient(
				dishId,
				ingredient.id,
				ingredient.name,
				ingredient.unityMeasure,
				parseInt(ingredient.quantity)
			);
		}
	});

	return fieldset;
}

function deleteThisIngredient(e) {
	if (e instanceof Event && e.target instanceof HTMLButtonElement) {
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

	fieldset.appendChild(legend);

	if (ingredients && Array.isArray(ingredients)) {
		ingredients.forEach((ingredient) => {
			fieldset.appendChild(
				createIngredientFieldset(
					dishID,
					ingredient.id,
					ingredient.name,
					ingredient.unityMeasure,
					ingredient.quantity
				)
			);
		});
	}
	addIngredient.addEventListener("click", (e) => {
		console.log("addIngredient exec" + Date.now());
		e.preventDefault();
		window.dispatchEvent(new CustomEvent("dispatchIngredientChange"));
		saveIngredient(dishID, null, "", null, null);
	});

	fieldset.appendChild(addIngredient);

	return fieldset;
}

function bootForm(form, h1, p, dish) {
	console.log("fn bootform called!");
	form.innerHTML = "";
	const dishFieldset = getDishField(dish.dishId, dish.dishName, dish.type);
	const ingredientsField = getIngredientsField(dish.dishId, dish.ingredients);

	form.appendChild(h1);
	form.appendChild(p);
	form.appendChild(dishFieldset);
	form.appendChild(ingredientsField);
}

export default async function getForm(menu, currentType) {
	console.log("get FORM - " + Date.now());

	const form = document.createElement("form");
	form.id = "newEventMenu-form";
	form.addEventListener("submit", (e) => e.preventDefault());

	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	h1.textContent = "Menu";
	p.textContent =
		"Organize as comidas servidas durante o evento gastronômico";

	const dish = await menu[currentType].controller.getLastDish(menu[currentType].name);
	bootForm(form, h1, p, dish);

	form.addEventListener("selectDishType", async (e) => {
		currentType = e.detail.key;
		const dish = await menu[currentType].controller.getLastDish(e.detail.type);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("updateDish", async (e) => {
		if (menu[currentType].name === e.detail.type) {
			if (e.detail.addNewDish) {
				const dish = await menu[currentType].controller.getLastDish(e.detail.type);
				bootForm(form, h1, p, dish);
			} else {
				const dish = await menu[currentType].controller.getOneDish(
					e.detail.dishId
				);
				bootForm(form, h1, p, dish);
			}
		}
	});

	form.addEventListener("updateIngredient", async (e) => {
		console.log('form.addEventListener("updateIngredient"');
		const dish = await menu[currentType].controller.getOneDish(e.detail.dishId);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("deleteIngredient", async (e) => {
		const dish = await menu[currentType].controller.getOneDish(e.detail.dishId);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("dishSelectedToDelete", async (e) => {
		const dish = await menu[currentType].controller.getLastDish(e.detail.type);
		bootForm(form, h1, p, dish);
	});

	form.addEventListener("dishSelectedToEdit", async (e) => {
		const dish = await menu[currentType].controller.getOneDish(e.detail);
		bootForm(form, h1, p, dish);
	});
	return form;
}
