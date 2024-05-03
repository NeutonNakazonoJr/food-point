import homePage from "../pages/homePage.js";
import landingPageComponent from "../pages/landingPage.js";
import newEventBasicPage from "../pages/newEventBasic.js";
import createLoginForm from "../pages/loginPage.js";
import createGuestPage from "../pages/guestPage.js";
import createRegisterForm from "../pages/RegisterPage.js";
import createEventPageComponent from "../pages/eventPage.js";
import menuPage from "../pages/menu/menuPage.js";
import createErrorPage from "../pages/errorPage.js";
import createProfile from "../pages/profilePage.js";
import createSuccessEventPage from "../pages/sucessEvent.js";
import { getMyLogin } from "../api/userApi.js";
import showToast from "../components/toast.js";
import newEventLocalPage from "../pages/newEventLocal.js";
import createPurchaseListPage from "../pages/purchaseList.js";
import createForgetPasswordPage from "../pages/forgetPass.js";

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
		html: () =>
			createErrorPage({
				title: "Página não encontrada",
				subtitle: "Essa página não existe",
				error: "tente acessar outra página!",
			}),
		title: title,
		description: "Esta página não existe!",
		needLogin: false,
	},
	"/error": {
		html: createErrorPage,
		title: "Error | " + title,
		description: "Algo deu errado",
		needLogin: false,
	},
	"/": {
		html: landingPageComponent,
		title: title,
		description: "Conheça o Food Point!",
		needLogin: false,
	},
	"/register": {
		html: createRegisterForm,
		title: "Cadastre-se | " + title,
		description: "Cadastre-se no Food Point",
		needLogin: false,
	},
	"/login": {
		html: createLoginForm,
		title: "Login | " + title,
		description: "Logar na plataforma Food Point",
		needLogin: false,
	},
	"/home": {
		html: homePage,
		title: "Home | " + title,
		description: "Veja e crie eventos gastronômicos!",
		needLogin: true,
	},
	"/home/create": {
		html: newEventBasicPage,
		title: "Novo evento | " + title,
		description: "Crie um novo evento gastronômico.",
		needLogin: true,
	},
	"/home/create/menu": {
		html: menuPage,
		title: "Menu | " + title,
		description: "Crie o seu cardápio.",
		needLogin: true,
	},
	"/home/create/local": {
		html: newEventLocalPage,
		title: "Localização | " + title,
		description: "Defina a localização do seu evento gastronômico.",
		needLogin: true,
	},
	"/home/create/guest": {
		html: createGuestPage,
		title: "Convidados | " + title,
		description: "Planeje sua lista de convidados!",
		needLogin: true,
	},
	"/event": {
		html: createEventPageComponent,
		title: "Evento | " + title,
		description: "Informações do evento",
		needLogin: true,
	},
	"/home/create/success": {
		html: createSuccessEventPage,
		title: "Evento criado com sucesso | " + title,
		description: "Evento criado com sucesso!",
	},
	"/error": {
		html: createErrorPage,
		title: "Error | " + title,
		description: "Algo deu errado",
	},
	"/profile": {
		html: createProfile,
		title: "Perfil | " + title,
		description: "Edite seu perfil",
		needLogin: true,
	},
	"/list": {
		html: createPurchaseListPage,
		title: "Lista de compras | " + title,
		description: "Lista de compras de ingredientes relacionadas ao evento",
		needLogin: true,
	},
	"/forget-password": {
		html: createForgetPasswordPage,
		title: "Recuperar senha | " + title,
		description: "recuperação de senha",
		needLogin: false,
	},
};

/** Check the current path and returns according with it
 * @returns {{
 *      html: Function,
 *      title: String,
 *      description: String,
 *      needLogin: boolean,
 * }}
 */
async function router() {
	let currentPath = window.location.pathname;
	if (currentPath.length == 0) {
		currentPath = "/";
	}

	const route = routes[currentPath] || routes["404"];
	if (route.needLogin) {
		const res = await getMyLogin();
		if (res.error || res instanceof Error) {
			showToast("Usuário não está logado.");
			window.history.pushState(null, null, "/login");
			return routes["/login"];
		}
	}
	return route;
}

/** overrides root innerHTML with html from router
 * @param {HTMLElement} root
 * @param {object} constructorInfo
 */
async function renderIntoRoot(root, constructorInfo) {
	const routeObj = await router();
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
	renderIntoRoot(root, constructorInfo);;

	window.addEventListener("popstate", (e) => {
		const location = window.location.pathname;
		const notAllowedPop = [
			"/home/create",
			"/home/create/menu",
			"/home/create/local",
			"/home/create/guest",
			"/home/create/success",
		];
		if (notAllowedPop.includes(location)) {
			constructorInfo = { animation: true };
		}
		renderIntoRoot(root, constructorInfo);
	});
	window.addEventListener("onstatechange", (e) => {
		const path = e.detail.path;
		constructorInfo = e.detail.constructorInfo;

		window.history.pushState(null, null, path);
		renderIntoRoot(root, constructorInfo);
	});
}

export default initRouter;
