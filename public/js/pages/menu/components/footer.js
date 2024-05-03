import dispatchOnStateChange from "../../../events/onStateChange.js";

export default function getFooter(eventId = null, href = "/home/create/local") {
	const constructorInfo = {
		animation: false,
		event: {
			id: eventId,
		},
		stage: {
			current: 2,
			last: 1,
		},
	};
	const footer = document.createElement("footer");
	footer.id = "newEventMenu-footer";

	const a = document.createElement("a");
	a.href = href;
	a.textContent = "Decidir mais tarde";
	a.classList.add("do__latter");
	a.addEventListener("click", (e) => {
		e.preventDefault();
		dispatchOnStateChange(href, constructorInfo);
	});
	footer.appendChild(a);
	footer.addEventListener("ableToContinue", () => {
		a.textContent = "Salvar e continuar";
		a.classList.remove("do__latter");
	});
	footer.addEventListener("unableToContinue", () => {
		a.textContent = "Decidir mais tarde";
		a.classList.add("do__latter");
	});
	return footer;
}
