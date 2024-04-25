import stringLimiter from "../../../utils/stringLimiter.js";

function editThisDish(dishId) {
	const event = new CustomEvent("dishSelectedToEdit", {
		detail: dishId,
	});
	window.dispatchEvent(event);
}

function deleteThisDish(dishId, type) {
	const event = new CustomEvent("dishSelectedToDelete", {
		detail: { dishId, type },
	});
	window.dispatchEvent(event);
}

function generateCard(dish, editing, dishIdSelected = null) {
	const div = document.createElement("div");
	const p = document.createElement("p");
	const editBtn = document.createElement("button");
	const deleteBtn = document.createElement("button");
	const dishName = dish.dishName === "" ? "Prato vazio" : dish.dishName;

	p.textContent = stringLimiter(dishName, 12, true);
	div.classList.add("newEventMenu-item");
	if ((editing && !dishIdSelected) || dishIdSelected === dish.dishId) {
		div.classList.add("newEventMenu-item-editing");
		p.textContent += "(editando)";
		editBtn.disabled = true;
		editBtn.style.cursor = "not-allowed";
	}

	editBtn.addEventListener("click", (e) => {
		e.preventDefault();
		editThisDish(dish.dishId);
	});

	deleteBtn.addEventListener("click", (e) => {
		e.preventDefault();
		deleteThisDish(dish.dishId, dish.type);
	});

	// div.addEventListener("dishSelectedToEdit", (e) => {
	// 	if (e.detail === dish.dishId) {
	// 		div.classList.add("newEventMenu-item-editing");
	// 		const text = p.textContent;
	// 		p.textContent = stringLimiter(text, 12, true) + "(editando)";
	// 		editBtn.disabled = true;
	// 		editBtn.style.cursor = "not-allowed";
	// 		return;
	// 	}
	// 	if (div.classList.contains("newEventMenu-item-editing")) {
	// 		div.classList.remove("newEventMenu-item-editing");
	// 	}
	// 	p.textContent = p.textContent.replace("(editando)", "");
	// 	editBtn.disabled = false;
	// 	editBtn.removeAttribute("style");
	// });

	div.appendChild(p);
	div.appendChild(editBtn);
	div.appendChild(deleteBtn);

	return div;
}

export default async function getDisplay(menu, currentType) {
	function renderDiv(dishes, dishIdSelected) {
		dishes.forEach((dish, index, arr) => {
			const isFirstDish = index === 0;
			const isLastDish = index === arr.length - 1;
			const isInEditingMode =
				(isFirstDish && isFirstLoad) || (!isFirstLoad && isLastDish);
			div.prepend(generateCard(dish, isInEditingMode, dishIdSelected));
		});
		isFirstLoad = false;
	}
	async function rebootDiv(dishIdSelected = null) {
		const dishes = await menu[currentType].controller.getDishes(
			menu[currentType].name
		);

		div.innerHTML = "";
		renderDiv(dishes, dishIdSelected);

		span.textContent = `(${dishes[0].type})`;
		div.prepend(h6);
	}

	const dishes = await menu[currentType].controller.getDishes(
		menu[currentType].name
	);
	let isFirstLoad = true;

	const div = document.createElement("div");
	const h6 = document.createElement("h6");
	const span = document.createElement("span");

	h6.textContent = "Pratos criados ";
	span.textContent = `(${dishes[0].type})`;

	renderDiv(dishes);

	h6.appendChild(span);
	div.prepend(h6);

	div.addEventListener("selectDishType", (e) => {
		currentType = e.detail.key;
		rebootDiv();
	});
	div.addEventListener("updateDish", () => rebootDiv());
	div.addEventListener("dishSelectedToDelete", () => rebootDiv());
	div.addEventListener("dishSelectedToEdit", (e) => rebootDiv(e.detail));

	return div;
}
