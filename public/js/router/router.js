import homePage from "../pages/homePage.js";
import landingPageComponent from "../pages/landingPage.js";
import createLoginForm from "../components/loginPage.js";
import newEventBasicPage from "../pages/newEventBasic.js";

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
	"/login": {
		html: createLoginForm,
		title: "Login | " + title,
		description: "",
	},
	"/home": {
		html: homePage,
		title: "Home | " + title,
		description: "Veja e crie eventos gastronômicos!",
	},
	"/home/create": {
		html: () => newEventBasicPage(),
		title: "Novo evento | " + title,
		description: "Crie um novo evento gastronômico.",
	},
};

/** Check the current path and returns according with it
 * @returns {{
 *      html: Function,
 *      title: String,
 *      description: String
 * }}
 */
function router() {
	let currentPath = window.location.pathname;
	if (currentPath.length == 0) {
		currentPath = "/";
	}

	return routes[currentPath] || routes["404"];
}

/** overrides root innerHTML with html from router
 * @param {HTMLElement} root
 * @param {object} constructorInfo
 */
function renderIntoRoot(root, constructorInfo) {
	const routeObj = router();
	const HTMLElement = routeObj.html(constructorInfo);

	window.document.title = routeObj.title;
	window.document
		.querySelector('meta[name="description"]')
		.setAttribute("content", routeObj.description);

	root.innerHTML = "";
	root.appendChild(HTMLElement);

	window.scrollTo(0, 0);
}

/** Starts router listener
 * @param {HTMLElement} root
 */
function initRouter(root) {
	let constructorInfo = { animation: true };
	renderIntoRoot(root, constructorInfo);

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
