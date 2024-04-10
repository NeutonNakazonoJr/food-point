import homePage from "../pages/homePage.js";
import landingPageComponent from "../pages/landingPage.js";

const title = "Food Point";

function mockTemplate(innerText) {
    const html = document.createElement("h1");
    html.innerText = innerText;
    return html;
}

/** All routes of the front-end application.
 * Add a nem entry if you want to render in screen.
 */
const routes = {
    404: {
        html: () => mockTemplate("not found!"),
        title: title,
        description: "Esta página não existe!",
    },
    "/": {
        html: landingPageComponent,
        title: title,
        description: "Conheça o Food Point!",
    },
	"/home": {
		html: homePage,
		title: "Home | " + title,
		description: "Veja e crie eventos gastronômicos!"
	}
};

/** Check the current path and returns according with it
 * @returns {{
 *      html: Function,
 *      title: String,
 *      description: String
 * }}
 */
function router() {
    // exemple:
    // currentPath = https:foodpoint/ => "/"
    let currentPath = window.location.pathname;
    if (currentPath.length == 0) {
        currentPath = "/";
    }

    // validates if the route exist, if doesn't, returns 404 page.
    // return routes[currentPath] || routes["404"];

	// dev mode:
	return routes["/home"];
}

/** overrides root innerHTML with html from router
 * @param {HTMLElement} root
 * @param {object} constructorInfo
 */
function renderIntoRoot(root, constructorInfo) {
    const routeObj = router();
    const HTMLElement = routeObj.html(constructorInfo);

    // Sets meta information about the current page.
    window.document.title = routeObj.title;
    window.document
        .querySelector('meta[name="description"]')
        .setAttribute("content", routeObj.description);

    root.innerHTML = "";
    root.appendChild(HTMLElement);
}

/** Starts router listener
 * @param {HTMLElement} root
 */
function initRouter(root) {
    renderIntoRoot(root);
    let constructorInfo = {};

    // Adds a listener in popstate and onstatechange events.
    // When one of then are trigged, the root is changed
    window.addEventListener("popstate", (e) =>
        renderIntoRoot(root, constructorInfo)
    );
    window.addEventListener("onstatechange", (e) => {
        const path = e.detail.path;
        constructorInfo = e.detail.constructorInfo;

        window.history.pushState(null, null, path);
        renderIntoRoot(root, constructorInfo);
    });
}

export default initRouter;
