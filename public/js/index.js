import eventProgressBar from "./components/eventProgressBar.js";
import getHeader from "./components/header.js";
import initRouter from "./router/router.js";
import stopScroll from "./utils/stopScroll.js";

const root = document.getElementById("root");
root.prepend(eventProgressBar());
root.prepend(getHeader());

window.addEventListener("DOMContentLoaded", () => {
	initRouter(root);
	stopScroll();
});