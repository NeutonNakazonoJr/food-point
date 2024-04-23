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

function generateCard(dish, editing) {
	const div = document.createElement("div");
	const p = document.createElement("p");
	const editBtn = document.createElement("button");
	const deleteBtn = document.createElement("button");
	const dishName = dish.name === "" ? "Prato vazio" : dish.name;

	p.textContent = stringLimiter(dishName, 12, true);
	div.classList.add("newEventMenu-item");
	if (editing) {
		div.classList.add("newEventMenu-item-editing");
		p.textContent += "(editando)";
		editBtn.disabled = true;
		editBtn.style.cursor = "not-allowed";
	}
	editBtn.addEventListener("click", (e) => {
		e.preventDefault();
		editThisDish(dish.ID);
	});

	deleteBtn.addEventListener("click", (e) => {
		e.preventDefault();
		deleteThisDish(dish.ID, dish.type);
	});

	window.addEventListener("dishSelectedToEdit", (e) => {
		if (e.detail === dish.ID) {
			div.classList.add("newEventMenu-item-editing");
			const text = p.textContent;
			p.textContent = stringLimiter(text, 12, true) + "(editando)";
			editBtn.disabled = true;
			editBtn.style.cursor = "not-allowed";
			return;
		}
		if (div.classList.contains("newEventMenu-item-editing")) {
			div.classList.remove("newEventMenu-item-editing");
		}
		p.textContent = p.textContent.replace("(editando)", "");
		editBtn.disabled = false;
		editBtn.removeAttribute("style");
	});

	div.appendChild(p);
	div.appendChild(editBtn);
	div.appendChild(deleteBtn);

	return div;
}

export default function getDisplay(menu, currentType) {
	function renderDiv(dishes) {
		dishes.forEach((dish, index, arr) => {
			const isFirstDish = index === 0;
			const isLastDish = index === arr.length - 1;
			const isInEditingMode =
				(isFirstDish && isFirstLoad) || (!isFirstLoad && isLastDish);
			div.prepend(generateCard(dish, isInEditingMode));
		});
		isFirstLoad = false;
	}
	function rebootDiv() {
		const dishes = menu[currentType].controller.getDishes();

		div.innerHTML = "";
		renderDiv(dishes);

		span.textContent = `(${dishes[0].type})`;
		div.prepend(h6);
	}

	const dishes = menu[currentType].controller.getDishes();
	let isFirstLoad = true;

	const div = document.createElement("div");
	const h6 = document.createElement("h6");
	const span = document.createElement("span");

	h6.textContent = "Pratos criados ";
	span.textContent = `(${dishes[0].type})`;

	renderDiv(dishes);

	h6.appendChild(span);
	div.prepend(h6);

	window.addEventListener("selectDishType", (e) => {
		currentType = e.detail.key;
		rebootDiv();
	});
	window.addEventListener("updateDish", rebootDiv);
	window.addEventListener("dishSelectedToDelete", rebootDiv);

	return div;
}
