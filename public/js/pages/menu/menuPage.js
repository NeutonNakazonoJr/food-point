import eventProgressBar from "../../components/eventProgressBar.js";
import getHeader from "../../components/header.js";
import DishController from "./DishController.js";
import getAsideForMenu from "./components/aside.js";
import getDisplay from "./components/display.js";
import getForm from "./components/form.js";

function getMenu(eventID) {
	return {
		stater: {
			name: "Entrada",
			controller: new DishController(eventID),
		},
		salad: {
			name: "Salada",
			controller: new DishController(eventID),
		},
		main: {
			name: "Principal",
			controller: new DishController(eventID),
		},
		side: {
			name: "Acompanhamento",
			controller: new DishController(eventID),
		},
		dessert: {
			name: "Sobremesa",
			controller: new DishController(eventID),
		},
		drink: {
			name: "Drink",
			controller: new DishController(eventID),
		},
	};
}

function dispatchIngredientChange() {
	if (!ingredientChangeHasBeenDispatched) {
		ingredientChangeHasBeenDispatched = true;
		console.log("--dispatchIngredientChange--");
		const event = new CustomEvent("dispatchIngredientChange");
		window.dispatchEvent(event);
		ingredientChangeHasBeenDispatched = false;
	}
}
let ingredientChangeHasBeenDispatched = false;

export default async function menuPage(constructorInfo) {
	const tempEventID = "9136f3da-09ec-4c82-94be-b01d5df98156";
	const menu = getMenu(tempEventID);

	let currentType = "stater";

	const header = getHeader(false, true);
	const progressBar = eventProgressBar(true, true, 0, 1);
	const main = document.createElement("main");
	main.id = "newEventMenu";
	await menu.stater.controller.addDish(null, null, "Entrada");

	window.addEventListener("selectDishType", async (e) => {
		dispatchIngredientChange();
		currentType = e.detail.key;
		form.dispatchEvent(new CustomEvent("selectDishType", e));
		display.dispatchEvent(new CustomEvent("selectDishType", e));
	});

	window.addEventListener("updateDish", async (e) => {
		if (menu[currentType].name === e.detail.type) {
			dispatchIngredientChange();
			await menu[currentType].controller.updateDish(
				e.detail.dishId,
				e.detail.dishName,
				e.detail.addNewDish
			);
			form.dispatchEvent(new CustomEvent("updateDish", e));
			display.dispatchEvent(new CustomEvent("updateDish", e));
		}
	});

	window.addEventListener("updateIngredient", async (e) => {
		const ingredient = {
			id: e.detail.ingredientId,
			name: e.detail.name,
			unityMeasure: e.detail.unityMeasure,
			quantity: e.detail.quantity,
		};
		await menu[currentType].controller.pushIngredient(
			e.detail.dishId,
			ingredient
		);
		form.dispatchEvent(new CustomEvent("updateIngredient", e));
		display.dispatchEvent(new CustomEvent("updateIngredient", e));
	});

	window.addEventListener("deleteIngredient", async (e) => {
		await menu[currentType].controller.deleteIngredient(
			e.detail.dishId,
			e.detail.ingredientId
		);
		form.dispatchEvent(new CustomEvent("deleteIngredient", e));
		display.dispatchEvent(new CustomEvent("deleteIngredient", e));
	});

	window.addEventListener("dishSelectedToDelete", async (e) => {
		await menu[currentType].controller.removeDish(e.detail.dishId);
		form.dispatchEvent(new CustomEvent("dishSelectedToDelete", e));
		display.dispatchEvent(new CustomEvent("dishSelectedToDelete", e));
	});

	const aside = getAsideForMenu(menu);
	const form = await getForm(menu, currentType);
	const display = await getDisplay(menu, currentType);

	main.appendChild(aside);
	main.appendChild(form);
	main.appendChild(display);

	/*
		<footer id="newEventMenu-footer">
			<a href="#">Decidir mais tarde</a>
		</footer>
	*/
	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(progressBar);
	wrapper.appendChild(main);

	return wrapper;
}
