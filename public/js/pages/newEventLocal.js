import eventProgressBar from "../components/eventProgressBar.js";
import getHeader from "../components/header.js";

function getMap() {
	const div = document.createElement("div");
	
	return div;
}

function getMain() {
	const main = document.createElement("main");
	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	const div = getMap();

	main.id = "newEventLocal";
	h1.textContent = "Local";
	p.textContent = "Todo espetáculo precisa de um palco!";

	main.appendChild(h1);
	main.appendChild(p);
	main.appendChild(div);
	return main;
}

function getFooter() {
	const footer = document.createElement("footer");
	const a = document.createElement("a");

	a.href = "#";
	footer.appendChild(a);
	return footer;
}

export default function newEventLocalPage(constructorInfo) {
	const event = null || constructorInfo?.event?.id;
	const stage = constructorInfo?.stage || {
		current: 2,
		last: 1,
	};

	const header = getHeader(false, false);
	const eventProgress = eventProgressBar(
		false,
		true,
		stage.last,
		stage.current
	);

	const main = getMain();
	const footer = getFooter();
	const wrapper = document.createDocumentFragment();

	wrapper.appendChild(header);
	wrapper.appendChild(eventProgress);
	wrapper.appendChild(main);
	wrapper.appendChild(footer);
	return wrapper;
}
