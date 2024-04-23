import homePage from "../pages/homePage.js";
import landingPageComponent from "../pages/landingPage.js";
import newEventBasicPage from "../pages/newEventBasic.js";
import createLoginForm from "../pages/loginPage.js";
import createGuestPage from "../pages/guestPage.js";
import createRegisterForm from "../pages/RegisterPage.js";
import createErrorPage from "../pages/errorPage.js";

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
		description: "Veja e crie eventos gastronômicos!",
	},
	"/login": {
		html: createLoginForm,
		title: "Login | " + title,
		description: "Logar na plataforma Food Point",
	},
	"/register": {
		html: createRegisterForm,
		title: "Cadastre-se | " + title,
		description: "Cadastre-se no Food Point", 
  },
	"/home/create": {
		html: newEventBasicPage,
		title: "Novo evento | " + title,
		description: "Crie um novo evento gastronômico.",
	},
	"/home/create/guest": {
		html: createGuestPage,
		title: "Guests | " + title,
		description: "Planeje sua lista de convidados!"
	},
	"/error": {
		html: createErrorPage,
		title: "Error | " + title,
		description: "Algo deu errado"
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
	let currentPath = window.location.pathname;
	if (currentPath.length == 0) {
		currentPath = "/";
	}

	// validates if the route exist, if doesn't, returns 404 page.
	//return routes[currentPath] || routes["404"];

	return routes[currentPath] || routes["404"];
}

/** overrides root innerHTML with html from router
 * @param {HTMLElement} root
 * @param {object} constructorInfo
 */
async function renderIntoRoot(root, constructorInfo) {
	const routeObj = router();
	const HTMLElement = await routeObj.html(constructorInfo);

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
