import getContentLoading from "./contentLoading.js";

const root = document.getElementById("root");
const display = document.createElement("div");
const loadingScreen = getContentLoading();

display.id = "apiLoadingScreen";
display.appendChild(loadingScreen);

export default function apiLoading(alive = true) {
	if (alive) {
		display.style.animationName = "fadeIn";
		root.appendChild(display);
	} else {
		display.style.animationName = "fadeOut";
		setTimeout(() => {
			display.remove();
		}, 250);
	}
}
