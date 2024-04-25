import {
	deleteDish,
	deleteIngredient,
	postDish,
	postIngredient,
	updateDishName,
	updateIngredient,
} from "../../api/eventApi.js";
import showToast from "../../components/toast.js";

export default class DishController {
	#dishes = [];
	#eventID;

	constructor(eventID) {
		this.#eventID = eventID;
	}

	//-----------------DISH GETTERS-----------------

	async getDishes(type) {
		const dishes = this.#dishes;
		console.log("GET", this.#dishes);
		if (dishes.length <= 0) {
			await this.addDish(null, null, type);
			return this.#dishes;
		} else {
			return dishes;
		}
	}

	async getOneDish(dishId) {
		const index = this.#dishes.findIndex((dish) => dish.dishId === dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}
		const dish = this.#dishes[index];
		console.log("GET ONE", this.#dishes);
		return dish;
	}

	async getLastDish(type) {
		const dishes = await this.getDishes(type);
		const dish = dishes[dishes.length - 1];
		return dish;
	}

	//-----------------DISH CONTROLLER-----------------

	async addDish(dishId, dishName, type) {
		const dishAlreadyExists = this.#dishes.find(
			(dish) => dish.dishId === dishId
		);
		if (this.#dishes.length > 0 && dishAlreadyExists) {
			console.log(`Prato com ID ${dishId} já existe.`);
			return;
		}

		if (!type) {
			console.error(`Prato tentou ser criado com TYPE vazio.`);
			return;
		}

		const dish = {
			dishName: dishName ?? "Prato vazio",
			type: type,
			ingredients: [],
		};
		const res = await postDish(this.#eventID, dish);
		if (res.error) {
			console.error(res.error);
			showToast(JSON.parse(res.error));
			return;
		}
		dish.dishId = res.dishId;
		this.#dishes.push(dish);

		console.log(`Prato "${dishName}" adicionado com sucesso.`);
		console.log("POST", this.#dishes);
	}

	async updateDish(dishId, dishName, newDish = true) {
		const index = this.findDishIndex(dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}

		if (!dishName) {
			console.error(`Prato tentou ser atualizado com DISH_NAME vazio.`);
			return;
		}

		const res = await updateDishName(this.#eventID, dishId, { dishName });
		if (res.error) {
			console.error(res.error);
			showToast(JSON.parse(res.error));
			return;
		}

		this.#dishes[index] = {
			...this.#dishes[index],
			dishName: dishName,
		};
		console.log("PUT", this.#dishes);
		if(newDish) {
			await this.addDish(null, null, this.#dishes[index].type);
		}
	}

	async removeDish(dishId) {
		const index = this.findDishIndex(dishId);
		if (index === -1) {
			console.log(`Prato com ID ${dishId} não existe.`);
			return;
		}

		const res = await deleteDish(this.#eventID, dishId);
		if (res.error) {
			console.error(res.error);
			showToast(JSON.parse(res.error));
			return;
		}

		this.#dishes.splice(index, 1);
		console.log(`Prato com ID ${dishId} removido com sucesso.`);
		console.log("DELETE  | current arr: ", this.#dishes);
	}

	findDishIndex(dishId) {
		const index = this.#dishes.findIndex((dish) => dish.dishId === dishId);
		return index;
	}

	//-----------------INGREDIENTS CONTROLLER-----------------

	findIngredientIndex(dishIndex, targetIngredient) {
		const ingredientIndex = this.#dishes[dishIndex].ingredients.findIndex(
			(ingredient) =>
				ingredient.id === targetIngredient.id ||
				ingredient.id === targetIngredient
		);
		return ingredientIndex;
	}

	async pushIngredient(dishId, ingredient) {
		const index = this.findDishIndex(dishId);
		if (index === -1) {
			console.log("não encontramos esse prato (ID):" + dishId);
			return;
		}
		if (ingredient.id) {
			const ingredientIndex = this.findIngredientIndex(index, ingredient);
			if (ingredientIndex !== -1) {
				this.updateIngredient(dishId, ingredient);
				return;
			}
		}

		const invalidName =
			!ingredient.name || typeof ingredient.name !== "string";
		const invalidMeasure =
			!ingredient.unityMeasure ||
			typeof ingredient.unityMeasure !== "string";
		const invalidQuantity =
			!ingredient.quantity || typeof ingredient.quantity !== "number";

		if (invalidName) {
			ingredient.name = "Ingrediente sem nome";
		}
		if (invalidMeasure) {
			ingredient.unityMeasure = "Unidades (u)";
		}
		if (invalidQuantity) {
			ingredient.quantity = 1;
		}

		const newIngredient = {
			name: ingredient.name,
			unityMeasure: ingredient.unityMeasure,
			quantity: ingredient.quantity,
		};

		const res = await postIngredient(this.#eventID, dishId, newIngredient);
		if (res.error) {
			console.error(res.error);
			showToast(JSON.parse(res.error));
			return;
		}
		newIngredient.id = res.newIngredientId.id;

		this.#dishes[index].ingredients.push(newIngredient);
		console.log(`Ingrediente adicionado para o prato com ID ${dishId}.`);
		console.log("PUT", this.#dishes);
	}

	async updateIngredient(dishId, ingredient) {
		const index = this.findDishIndex(dishId);
		if (index === -1) {
			console.log("não encontramos esse ID:" + dishId);
			return;
		}
		const ingredientIndex = this.findIngredientIndex(index, ingredient);
		if (ingredientIndex === -1) {
			console.log(`o ingrediente com ID ${ingredientIndex} não existe.`);
			return;
		}

		const invalidName =
			!ingredient.name || typeof ingredient.name !== "string";
		const invalidMeasure =
			!ingredient.unityMeasure ||
			typeof ingredient.unityMeasure !== "string";
		const invalidQuantity =
			!ingredient.quantity || typeof ingredient.quantity !== "number";

		if (invalidName) {
			ingredient.name = "Ingrediente sem nome";
		}
		if (invalidMeasure) {
			ingredient.unityMeasure = "Unidades (u)";
		}
		if (invalidQuantity) {
			ingredient.quantity = 1;
		}

		const newIngredient = {
			name: ingredient.name,
			unityMeasure: ingredient.unityMeasure,
			quantity: ingredient.quantity,
		};
		const res = await updateIngredient(
			this.#eventID,
			dishId,
			ingredient.id,
			newIngredient
		);
		if (res.error) {
			console.error(res.error);
			showToast(JSON.parse(res.error));
			return;
		}

		this.#dishes[index].ingredients[ingredientIndex] = {
			...this.#dishes[index].ingredients[ingredientIndex],
			name: newIngredient.name,
			unityMeasure: newIngredient.unityMeasure,
			quantity: newIngredient.quantity,
		};
		console.log(`Ingredientes atualizados para o prato com ID ${dishId}.`);
		console.log("PUT", this.#dishes);
	}

	async deleteIngredient(dishId, ingredientId) {
		const index = this.findDishIndex(dishId);
		if (index === -1) {
			console.log("não encontramos esse ID:" + dishId);
			return;
		}
		const ingredientIndex = this.findIngredientIndex(index, ingredientId);
		if (ingredientIndex === -1) {
			console.log(`o ingrediente com ID ${ingredientIndex} não existe.`);
		}
		const res = await deleteIngredient(this.#eventID, dishId, ingredientId);
		if (res.error) {
			console.error(res.error);
			showToast(JSON.parse(res.error));
			return;
		}

		this.#dishes[index].ingredients.splice(ingredientIndex, 1);
		console.log(`Ingredientes atualizados para o prato com ID ${dishId}.`);
		console.log("PUT", this.#dishes);
	}
}
