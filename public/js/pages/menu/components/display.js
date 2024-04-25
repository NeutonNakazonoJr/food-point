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

function generateCard(
	dish,
	editing,
	dishIdSelected = null,
	isTablet,
	isMobile,
	isWideScreen
) {
	const div = document.createElement("div");
	const p = document.createElement("p");
	const editBtn = document.createElement("button");
	const deleteBtn = document.createElement("button");
	const dishName = dish.dishName === "" ? "Prato vazio" : dish.dishName;

	let stringLength = 12;
	if (isTablet) {
		stringLength = 6;
	}
	if (isMobile) {
		stringLength = 40;
	}
	if (isWideScreen) {
		stringLength = 16;
	}
	p.textContent = stringLimiter(dishName, stringLength, true);
	div.classList.add("newEventMenu-item");
	if ((editing && !dishIdSelected) || dishIdSelected === dish.dishId) {
		div.classList.add("newEventMenu-item-editing");
		p.textContent += "*";
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

	div.appendChild(p);
	div.appendChild(editBtn);
	div.appendChild(deleteBtn);

	return div;
}

export default async function getDisplay(menu, currentType) {
	function renderDiv(
		dishes,
		dishIdSelected,
		isTablet,
		isMobile,
		isWideScreen
	) {
		dishes.forEach((dish, index, arr) => {
			const isFirstDish = index === 0;
			const isLastDish = index === arr.length - 1;
			const isInEditingMode =
				(isFirstDish && isFirstLoad) || (!isFirstLoad && isLastDish);
			div.prepend(
				generateCard(
					dish,
					isInEditingMode,
					dishIdSelected,
					isTablet,
					isMobile,
					isWideScreen
				)
			);
		});
		isFirstLoad = false;
	}
	async function rebootDiv(dishIdSelected = null) {
		const dishes = await menu[currentType].controller.getDishes(
			menu[currentType].name
		);

		div.innerHTML = "";
		renderDiv(dishes, dishIdSelected, isTablet, isMobile, isWideScreen);

		span.textContent = `(${dishes[0].type})`;
		div.prepend(h6);
	}

	const dishes = await menu[currentType].controller.getDishes(
		menu[currentType].name
	);
	let isFirstLoad = true;
	let isTablet;
	let isMobile;
	let isWideScreen;

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
	div.addEventListener("resize", () => {
		const currentWidth =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
		const newIsTablet = currentWidth < 1000;
		const newIsMobile = currentWidth < 770;
		const newIsWideScreen = currentWidth > 1300;

		if (
			isMobile !== newIsMobile ||
			isTablet !== newIsTablet ||
			isWideScreen !== newIsWideScreen
		) {
			rebootDiv();
			isMobile = newIsMobile;
			isTablet = newIsTablet;
			isWideScreen = newIsWideScreen;
		}
	});

	return div;
}
