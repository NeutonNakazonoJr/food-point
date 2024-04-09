import router from "./router/router.js";

const root = document.getElementById("root");
root.innerHTML = "";
root.appendChild(router.getRoute("/"));

