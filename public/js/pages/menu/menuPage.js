import eventProgressBar from "../../components/eventProgressBar.js";
import getHeader from "../../components/header.js";
import DishController from "./DishController.js";
import getAsideForMenu from "./components/aside.js";
import getDisplay from "./components/display.js";
import getForm from "./components/form.js";

const menu = {
	stater: {
		name: "Entrada",
		controller: new DishController(),
	},
	salad: {
		name: "Salada",
		controller: new DishController(),
	},
	main: {
		name: "Principal",
		controller: new DishController(),
	},
	side: {
		name: "Acompanhamento",
		controller: new DishController(),
	},
	dessert: {
		name: "Sobremesa",
		controller: new DishController(),
	},
	drink: {
		name: "Drink",
		controller: new DishController(),
	},
};

function dispatchIngredientChange() {
	const event = new CustomEvent("dispatchIngredientChange");
	window.dispatchEvent(event);
}

export default function menuPage(constructorInfo) {
	let currentType = "stater";

	const header = getHeader(false, true);
	const progressBar = eventProgressBar(true, true, 0, 1);
	const main = document.createElement("main");
	main.id = "newEventMenu";
	menu.stater.controller.addDish(Date.now(), "", "Entrada");

	window.addEventListener("selectDishType", (e) => {
		dispatchIngredientChange();
		currentType = e.detail.key;
	});

	window.addEventListener("updateDish", (e) => {
		if (menu[currentType].name === e.detail.type) {
			dispatchIngredientChange();
			menu[currentType].controller.updateDish(
				e.detail.ID,
				e.detail.newDishId,
				e.detail.name,
				e.detail.type
			);
			menu[currentType].controller.addDish(
				Date.now(),
				"",
				menu[currentType].name
			);
			const dishes = menu[currentType].controller.getDishes();
			const newForm = getForm(dishes[dishes.length - 1]);
			main.replaceChild(newForm, form);
			form = newForm;
		}
	});
	window.addEventListener("updateIngredient", (e) => {
		const ingredient = {
			ingredientId: e.detail.ingredientId,
			name: e.detail.name,
			unityMeasure: e.detail.unityMeasure,
			quantity: e.detail.quantity,
		};
		menu[currentType].controller.pushIngredient(
			e.detail.dishId,
			ingredient
		);
		dispatchIngredientChange();
		const dish = menu[currentType].controller.getOneDish(e.detail.dishId);
		const newForm = getForm(dish);
		main.replaceChild(newForm, form);
		form = newForm;
	});

	const aside = getAsideForMenu(menu);
	let form = getForm(menu.stater.controller.getDishes()[0]);
	const display = getDisplay(menu, currentType);

	main.appendChild(aside);
	main.appendChild(form);
	main.appendChild(display);

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(progressBar);
	wrapper.appendChild(main);

	return wrapper;
}
