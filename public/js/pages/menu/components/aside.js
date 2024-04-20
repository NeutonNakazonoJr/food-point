function selectThisButton(button, parent) {
	if (button instanceof HTMLButtonElement && parent instanceof HTMLElement) {
		if (parent.hasChildNodes()) {
			const children = parent.childNodes;
			children.forEach((kid) => {
				if (kid instanceof HTMLButtonElement) {
					const classlist = kid.classList;
					if (classlist.contains("newEventMenu-selected")) {
						kid.classList.remove("newEventMenu-selected");
					}
				}
			});
		}
		button.classList.add("newEventMenu-selected");
	}
}

function dispatchSelectDishType(dishTypeName) {
	const event = new CustomEvent("selectDishType", {
		detail: dishTypeName,
	});
	window.dispatchEvent(event);
}

export default function getAsideForMenu(menu) {
	const aside = document.createElement("aside");
	aside.classList.remove;
	const menuKeys = Object.keys(menu);
	menuKeys.forEach((key, index) => {
		const button = document.createElement("button");
		const dishTypeName = menu[key].name;

		if (index === 0) {
			button.classList.add("newEventMenu-selected");
			dispatchSelectDishType(dishTypeName);
		}
		button.textContent = dishTypeName;
		button.addEventListener("click", () => {
			selectThisButton(button, aside);
			dispatchSelectDishType(dishTypeName);
		});
		aside.appendChild(button);
	});

	return aside;
}
