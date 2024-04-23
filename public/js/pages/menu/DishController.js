export default class DishController {
	#dishes = [];

	getDishes() {
		const dishes = this.#dishes;
		console.log("GET", this.#dishes);
		return dishes;
	}

	getOneDish(dishId) {
		const index = this.#dishes.findIndex((dish) => dish.ID === dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}
		const dish = this.#dishes[index];
		console.log("GET ONE", this.#dishes);
		return dish;
	}

	getLengthOfDishes() {
		console.log("GET LENGTH", this.#dishes);
		return this.getDishes().length;
	}

	addDish(dishId, dishName, type) {
		if (this.#dishes.find((dish) => dish.ID === dishId)) {
			console.log(`Prato com ID ${dishId} já existe.`);
			return;
		}

		this.#dishes.push({
			ID: dishId,
			name: dishName,
			type: type,
			ingredients: [],
		});
		console.log(`Prato "${dishName}" adicionado com sucesso.`);
		console.log("POST", this.#dishes);
	}

	updateDish(dishId, newDishId, dishName, type) {
		const index = this.#dishes.findIndex((dish) => dish.ID === dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}

		this.#dishes[index] = {
			...this.#dishes[index],
			ID: newDishId,
			name: dishName,
			type: type,
		};
		console.log("PUT", this.#dishes);
	}

	removeDish(dishId) {
		const index = this.#dishes.findIndex((dish) => dish.ID === dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}

		this.#dishes.splice(index, 1);
		console.log(`Prato com ID ${dishId} removido com sucesso.`);
		console.log("DELETE  | current arr: ", this.#dishes);
	}

	findDishIndex(dishId) {
		const index = this.#dishes.findIndex((dish) => dish.ID === parseInt(dishId));
		return index;
	}

	findIngredientIndex(dishIndex, targetIngredient) {
		const ingredientIndex = this.#dishes[dishIndex].ingredients.findIndex(
			(ingredient) =>
				ingredient.ingredientId === targetIngredient.ingredientId
				|| ingredient.ingredientId === targetIngredient
		);
		return ingredientIndex;
	}

	pushIngredient(dishId, ingredients) {
		if (ingredients.ingredientId === "" || !ingredients.ingredientId) {
			ingredients.ingredientId = Date.now();
		}

		const index = this.findDishIndex(dishId);
		if(index === -1) {
			console.log("não encontramos esse ID:" + dishId);
			return;
		}
		const ingredientIndex = this.findIngredientIndex(index, ingredients);
		if (ingredientIndex !== -1) {
			this.updateIngredient(dishId, ingredients);
			return;
		}

		this.#dishes[index].ingredients.push(ingredients);
		console.log(`Ingredientes atualizados para o prato com ID ${dishId}.`);
		console.log("PUT", this.#dishes);
	}

	updateIngredient(dishId, newIngredient) {
		const index = this.findDishIndex(dishId);
		if(index === -1) {
			console.log("não encontramos esse ID:" + dishId);
			return;
		}
		const ingredientIndex = this.findIngredientIndex(index, newIngredient);
		if (ingredientIndex === -1) {
			console.log(`o ingrediente com ID ${ingredientIndex} não existe.`);
			return;
		}
		this.#dishes[index].ingredients[ingredientIndex] = {
			...this.#dishes[index].ingredients[ingredientIndex],
			ingredientId: newIngredient.ingredientId,
			name: newIngredient.name,
			unityMeasure: newIngredient.unityMeasure,
			quantity: newIngredient.quantity,
		};
		console.log(`Ingredientes atualizados para o prato com ID ${dishId}.`);
		console.log("PUT", this.#dishes);
	}

	deleteIngredient(dishId, targetIngredient) {
		const index = this.findDishIndex(dishId);
		if(index === -1) {
			console.log("não encontramos esse ID:" + dishId);
			return;
		}
		const ingredientIndex = this.findIngredientIndex(
			index,
			targetIngredient
		);
		if (ingredientIndex === -1) {
			console.log(`o ingrediente com ID ${ingredientIndex} não existe.`);
		}
		this.#dishes[index].ingredients.splice(ingredientIndex, 1);
		console.log(`Ingredientes atualizados para o prato com ID ${dishId}.`);
		console.log("PUT", this.#dishes);
	}
}
