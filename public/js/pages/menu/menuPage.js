import DishController from "./DishController.js";
import getAsideForMenu from "./components/aside.js";

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

export default function menuPage(constructorInfo) {
	const main = document.createElement("main");
	main.id = "newEventMenu";

	const aside = getAsideForMenu(menu);

	main.appendChild(aside);
	return main;
};
