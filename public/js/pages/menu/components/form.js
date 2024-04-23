function saveDish(dishId, newDishId, dishName, dishType) {
	const event = new CustomEvent("updateDish", {
		detail: {
			ID: dishId,
			newDishId: newDishId,
			name: dishName,
			type: dishType
		},
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
		},
	});
	window.dispatchEvent(event);
}

function getDishField(dishId, dishName, dishType) {
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
	input.value = dishName;
	btn.type = "button";
	btn.disabled = true;
	btn.style.cursor = "not-allowed";
	btn.textContent = "Salvar prato";

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
			saveDish(dishId, dishId, input.value, dishType);
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
						ingredient.ingredientId,
						ingredient.name,
						ingredient.unityMeasure,
						ingredient.quantity
					);
				}
			}, defaultAwait);
		}
	}

	let timeOut = 0;
	let saved = true;
	const defaultAwait = 4000;
	const ingredient = {
		ingredientId: ingredientId,
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
		"Quilogramas",
		"Gramas",
		"Mililitros",
		"Litros",
		"Unidades",
	];

	options.forEach((option, index) => {
		const opt = document.createElement("option");
		opt.value = index === 0 ? "0" : option;
		opt.text = option;
		if (!unityMeasure && typeof unityMeasure !== "string") {
			if (index === 0) {
				opt.selected = true;
				opt.disabled = true;
			}
		} else {
			if (unityMeasure === option) {
				opt.selected = true;
				opt.disabled = true;
			}
		}
		unitSelect.appendChild(opt);
	});

	
	nameInput.addEventListener("change", saveIngrediente);
	quantityInput.addEventListener("change", saveIngrediente);
	unitSelect.addEventListener("change", saveIngrediente);
	
	fieldset.appendChild(nameInput);
	fieldset.appendChild(quantityInput);
	fieldset.appendChild(unitSelect);

	if(ingredient.ingredientId) {
		const deleteButton = document.createElement("button");
		deleteButton.dataset.ingredientId = ingredient.ingredientId;
		deleteButton.addEventListener("click", deleteThisIngredient)
		fieldset.appendChild(deleteButton);
	}

	window.addEventListener("dispatchIngredientChange", () => {
		if (!saved) {
			clearTimeout(timeOut);
			saved = true;
			saveIngredient(
				dishId,
				ingredient.ingredientId,
				ingredient.name,
				ingredient.unityMeasure,
				ingredient.quantity
			);
		}
	});

	return fieldset;
}

function deleteThisIngredient(e) {
	if(e instanceof Event && e.target instanceof HTMLButtonElement) {
		console.log(e.target.dataset.ingredientId);
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
					ingredient.ingredientId,
					ingredient.name,
					ingredient.unityMeasure,
					ingredient.quantity
				)
			);
		});
	}
	addIngredient.addEventListener("click", (e) => {
		e.preventDefault();
		window.dispatchEvent(new CustomEvent("dispatchIngredientChange"));
		const ingredientField = createIngredientFieldset(
			dishID,
			null,
			"",
			null,
			null
		);
		fieldset.insertBefore(ingredientField, addIngredient);
	});

	fieldset.appendChild(addIngredient);

	return fieldset;
}

export default function getForm(dish) {
	const form = document.createElement("form");
	form.id = "newEventMenu-form";
	form.addEventListener("submit", (e) => e.preventDefault());

	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	h1.textContent = "Menu";
	p.textContent =
		"Organize as comidas servidas durante o evento gastronômico";

	let dishFieldset = getDishField(
		dish.ID,
		dish.name,
		dish.type
	);

	let ingredientsField = getIngredientsField(dish.ID, dish.ingredients);

	window.addEventListener("selectDishType", (e) => {
		if (e.detail && e.detail.controller && e.detail.key && e.detail.type) {
			const controller = e.detail.controller;

			if (controller.getLengthOfDishes() <= 0) {
				controller.addDish("", "", e.detail.type);
			}
			const dishes = controller.getDishes();
			const dish =
				dishes.length === 1 ? dishes[0] : dishes[dishes.length - 1];

			const newDishFieldset = getDishField(
				dish.ID,
				dish.name,
				dish.type,
				dish.ingredients
			);
			const newIngredientsField = getIngredientsField(
				dish.ID,
				dish.ingredients
			);

			form.replaceChild(newDishFieldset, dishFieldset);
			form.replaceChild(newIngredientsField, ingredientsField);

			dishFieldset = newDishFieldset;
			ingredientsField = newIngredientsField;
		}
	});

	form.appendChild(h1);
	form.appendChild(p);
	form.appendChild(dishFieldset);
	form.appendChild(ingredientsField);

	return form;
}
