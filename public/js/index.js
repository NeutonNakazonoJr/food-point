import dispatchOnStateChange from "./events/onStateChange.js";
import initRouter from "./router/router.js";

const root = document.getElementById("root");

window.addEventListener("DOMContentLoaded", () => initRouter(root));
window.addEventListener("click", (e) => {
	if(e.target instanceof HTMLAnchorElement) {
		e.preventDefault();
		dispatchOnStateChange(e.target.href, null);
	}
})