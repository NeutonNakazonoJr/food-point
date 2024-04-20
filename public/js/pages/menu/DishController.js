export default class DishController {
	#dishes = [];

	
	getDishes() {
		const dishes = this.#dishes;
		return dishes;
	}
	addDish(dishId, dishName, type) {
		if (this.#dishes.find(dish => dish.ID === dishId)) {
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
	}

	removeDish(dishId) {
		const index = this.#dishes.findIndex(dish => dish.ID === dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}

		this.#dishes.splice(index, 1);
		console.log(`Prato com ID ${dishId} removido com sucesso.`);
	}

	setIngredients(dishId, ingredients) {
		const index = this.#dishes.findIndex(dish => dish.ID === dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}

		this.#dishes[index].ingredients = ingredients;
		console.log(`Ingredientes atualizados para o prato com ID ${dishId}.`);
	}
}
