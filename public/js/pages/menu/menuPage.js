import eventProgressBar from "../../components/eventProgressBar.js";
import getHeader from "../../components/header.js";
import showToast from "../../components/toast.js";
import dispatchOnStateChange from "../../events/onStateChange.js";
import DishController from "./DishController.js";
import getAsideForMenu from "./components/aside.js";
import getDisplay from "./components/display.js";
import getFooter from "./components/footer.js";
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

async function dispatchIngredientChange(elementHTML) {
	const newPromise = new Promise((resolve, reject) => {
		if (!ingredientChangeHasBeenDispatched && elementHTML instanceof HTMLElement) {
			ingredientChangeHasBeenDispatched = true;
			const event = new CustomEvent("dispatchIngredientChange");
			elementHTML.dispatchEvent(event);
			resolve();
		}
	});
	ingredientChangeHasBeenDispatched = false;
	return await newPromise;
}
let ingredientChangeHasBeenDispatched = false;

async function dispatchThisEventForElements(form, display, eventName, event) {
	const promise = new Promise((resolve, reject) => {
		if (form instanceof HTMLElement) {
			form.dispatchEvent(new CustomEvent(eventName, event));
			setTimeout(() => {
				resolve();
			}, 50);
		} else {
			setTimeout(() => {
				resolve();
			}, 50);
		}
	});
	promise.then(() => {
		if (display instanceof HTMLElement) {
			display.dispatchEvent(new CustomEvent(eventName, event));
		}
	});
	return await promise;
}

export default async function menuPage(constructorInfo) {
	if (
		!constructorInfo ||
		!constructorInfo.event ||
		!constructorInfo.event.id
	) {
		showToast("Houve um erro no processamento do ID do evento");
		dispatchOnStateChange("/home", { animation: true });
		return document.createDocumentFragment();
	}
	const stage = constructorInfo.stage || {
		current: 1,
		last: 0,
	};
	const eventID = constructorInfo.event.id;
	const menu = getMenu(eventID);

	let currentType = "stater";
	let ableToContinue = false;
	const allowUserContinue = () => {
		const menuKeys = Object.keys(menu);
		const menuLength = menuKeys.map(key=> {
			return menu[key].controller.getDishes().length;
		}).reduce((acc, actual) => acc + actual);
		if(menuLength > 0) {
			if(!ableToContinue) {
				footer.dispatchEvent(new CustomEvent("ableToContinue", {}));
				ableToContinue = true;
			}
		} else {
			footer.dispatchEvent(new CustomEvent("unableToContinue", {}));
			ableToContinue = false;
		}
	}

	const header = getHeader(false, false);
	const progressBar = eventProgressBar(true, true, stage.last, stage.current);
	const main = document.createElement("main");
	const footer = getFooter(eventID);

	main.id = "newEventMenu";

	main.addEventListener("selectDishType", async (e) => {
		await dispatchIngredientChange(form);
		currentType = e.detail.key;
		await dispatchThisEventForElements(form, display, "selectDishType", e);
	});

	main.addEventListener("postDish", async (e) => {
		await menu[currentType].controller.addDish(
			null,
			e.detail.dishName,
			menu[currentType].name,
			e.detail.ingredients
		);
		await dispatchThisEventForElements(form, display, "postDish", e);
		allowUserContinue();
	});

	main.addEventListener("updateDish", async (e) => {
		await dispatchIngredientChange(form);
		await menu[currentType].controller.updateDish(
			e.detail.dishId,
			e.detail.dishName
		);
		await dispatchThisEventForElements(form, display, "updateDish", e);
	});

	main.addEventListener("updateIngredient", async (e) => {
		await dispatchIngredientChange(form);
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
		await dispatchThisEventForElements(
			form,
			display,
			"updateIngredient",
			e
		);
	});

	main.addEventListener("deleteIngredient", async (e) => {
		await dispatchIngredientChange(form);
		await menu[currentType].controller.deleteIngredient(
			e.detail.dishId,
			e.detail.ingredientId
		);
		await dispatchThisEventForElements(
			form,
			display,
			"deleteIngredient",
			e
		);
	});

	main.addEventListener("dishSelectedToDelete", async (e) => {
		await dispatchIngredientChange(form);
		await menu[currentType].controller.removeDish(e.detail.dishId);

		await dispatchThisEventForElements(
			form,
			display,
			"dishSelectedToDelete",
			e
		);
		allowUserContinue();
	});

	main.addEventListener("dishSelectedToEdit", async (e) => {
		await dispatchIngredientChange(form);

		await dispatchThisEventForElements(
			form,
			display,
			"dishSelectedToEdit",
			e
		);
	});

	main.addEventListener("resize", () =>
		display.dispatchEvent(new CustomEvent("resize"))
	);

	const aside = getAsideForMenu(menu);
	const form = await getForm(menu, currentType);
	const display = await getDisplay(menu, currentType);

	main.appendChild(aside);
	main.appendChild(form);
	main.appendChild(display);

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(progressBar);
	wrapper.appendChild(main);
	wrapper.appendChild(footer);

	return wrapper;
}
