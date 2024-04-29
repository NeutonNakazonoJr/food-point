let main = null;
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

function dispatchSelectDishType(key, dishTypeName, controller) {
	if (main instanceof HTMLElement) {
		const event = new CustomEvent("selectDishType", {
			detail: {
				key: key,
				type: dishTypeName,
				controller: controller,
			},
		});
		main.dispatchEvent(event);
	}
}

export default function getAsideForMenu(menu, mainComponent) {
	main = mainComponent;
	const aside = document.createElement("aside");
	aside.classList.remove;
	const menuKeys = Object.keys(menu);
	menuKeys.forEach((key, index) => {
		const button = document.createElement("button");
		const dishTypeName = menu[key].name;

		if (index === 0) {
			button.classList.add("newEventMenu-selected");
		}
		button.textContent = dishTypeName;
		button.addEventListener("click", () => {
			if (!button.classList.contains("newEventMenu-selected")) {
				selectThisButton(button, aside);
				dispatchSelectDishType(key, dishTypeName, menu[key].controller);
			}
		});
		aside.appendChild(button);
	});

	return aside;
}
