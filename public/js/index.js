import initRouter from "./router/router.js";
import cancelScroll from "./utils/cancelScroll.js";

const root = document.getElementById("root");

window.addEventListener("DOMContentLoaded", () => {
	initRouter(root);
	cancelScroll();
});
