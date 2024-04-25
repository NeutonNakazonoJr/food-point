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

async function dispatchIngredientChange() {
	const newPromise = new Promise((resolve, reject) => {
		if (!ingredientChangeHasBeenDispatched) {
			ingredientChangeHasBeenDispatched = true;
			console.log("--dispatchIngredientChange--");
			const event = new CustomEvent("dispatchIngredientChange");
			window.dispatchEvent(event);
			ingredientChangeHasBeenDispatched = false;
			resolve();
		}
	});
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

function callFnWithDelay(delayMs, fn) {
	setTimeout(fn, delayMs);
}

export default async function menuPage(constructorInfo) {
	const tempEventID = "9136f3da-09ec-4c82-94be-b01d5df98156";
	const menu = getMenu(tempEventID);

	let currentType = "stater";
	const delay = 50;

	const header = getHeader(false, true);
	const progressBar = eventProgressBar(true, true, 0, 1);
	const main = document.createElement("main");
	main.id = "newEventMenu";
	await menu.stater.controller.addDish(null, null, "Entrada");

	window.addEventListener("selectDishType", async (e) => {
		await dispatchIngredientChange();
		currentType = e.detail.key;
		callFnWithDelay(delay, async () => {
			await dispatchThisEventForElements(
				form,
				display,
				"selectDishType",
				e
			);
		});
	});

	window.addEventListener("updateDish", async (e) => {
		if (menu[currentType].name === e.detail.type) {
			await dispatchIngredientChange();
			await menu[currentType].controller.updateDish(
				e.detail.dishId,
				e.detail.dishName,
				e.detail.addNewDish
			);
			callFnWithDelay(delay, async () => {
				await dispatchThisEventForElements(
					form,
					display,
					"updateDish",
					e
				);
			});
		}
	});

	window.addEventListener("updateIngredient", async (e) => {
		await dispatchIngredientChange();
		console.log('window.addEventListener("updateIngredient"')
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
		console.log("finished controller.pushIngredient")
		callFnWithDelay(delay, async () => {
			console.log("dispatchThisEventForElements")
			await dispatchThisEventForElements(
				form,
				display,
				"updateIngredient",
				e
			);
		});
	});

	window.addEventListener("deleteIngredient", async (e) => {
		await dispatchIngredientChange();
		await menu[currentType].controller.deleteIngredient(
			e.detail.dishId,
			e.detail.ingredientId
		);
		callFnWithDelay(delay, async () => {
			await dispatchThisEventForElements(
				form,
				display,
				"deleteIngredient",
				e
			);
		});
	});

	window.addEventListener("dishSelectedToDelete", async (e) => {
		await dispatchIngredientChange();
		await menu[currentType].controller.removeDish(e.detail.dishId);

		callFnWithDelay(delay, async () => {
			await dispatchThisEventForElements(
				form,
				display,
				"dishSelectedToDelete",
				e
			);
		});
	});

	window.addEventListener("dishSelectedToEdit", async (e) => {
		await dispatchIngredientChange();

		callFnWithDelay(delay, async () => {
			await dispatchThisEventForElements(
				form,
				display,
				"dishSelectedToEdit",
				e
			);
		});
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
