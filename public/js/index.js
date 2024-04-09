import router from "./router/router.js";

/** overrides root innerHTML with html from router
 */
function renderIntoRoot() {
    root.innerHTML = "";
    root.appendChild(router());
}

function init() {
    renderIntoRoot();
    // Adds a listener in popstate and onstatechange events.
    // When one of then are trigged, the root is changed
    window.addEventListener("popstate", renderIntoRoot);
    window.addEventListener("onstatechange", (e) => {
        const path = e.detail;
        window.history.pushState(null, null, path);
        renderIntoRoot;
    });
}

const root = document.getElementById("root");

window.addEventListener("DOMContentLoaded", init);
