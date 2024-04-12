import dispatchOnStateChange from "../events/onStateChange.js";
import htmlCreator from "../utils/htmlCreator.js";

const createHeader = () => {
	const headerLogo = htmlCreator.createImg(
		"./assets/icons/logo.svg",
		"header-logo"
	);

	const chefHatIcon = htmlCreator.createImg("./assets/icons/chef-hat.svg");

	const headerTitleFirstPart = htmlCreator.createTitle("h3", "Food");
	const headerTitleSecondPart = htmlCreator.createTitle("h3", "Point");
	const titleDiv = htmlCreator.createDiv("header-title-div");
	titleDiv.appendChild(headerTitleFirstPart);
	titleDiv.appendChild(headerTitleSecondPart);

	const forkKnifeIcon = htmlCreator.createImg(
		"./assets/icons/fork-knife.svg"
	);

	const headerCentralContainer = htmlCreator.createDiv(
		"header-central-container"
	);
	headerCentralContainer.appendChild(chefHatIcon);
	headerCentralContainer.appendChild(titleDiv);
	headerCentralContainer.appendChild(forkKnifeIcon);

	const loginButton = htmlCreator.createButton(
		"login",
		"login-btn",
		"header-button"
	);
	const registerButton = htmlCreator.createButton(
		"cadastrar",
		"register-btn",
		"header-button"
	);

	loginButton.addEventListener("click", (e) => {
		e.preventDefault();
		document.body.style.backgroundImage = "";
		document.body.classList.remove("body-landing");
		dispatchOnStateChange("/login");
	});
	registerButton.addEventListener("click", (e) => {
		e.preventDefault();
		document.body.style.backgroundImage = "";
		document.body.classList.remove("body-landing");
		dispatchOnStateChange("/login");
	});

	const nav = htmlCreator.createNav("nav-landing");
	nav.appendChild(loginButton);
	nav.appendChild(registerButton);

	const header = document.createElement("header");
	header.classList.add("header-landing");

	header.appendChild(headerLogo);
	header.appendChild(headerCentralContainer);
	header.appendChild(nav);

	return header;
};

const createContentSection = () => {
	const contentSection = htmlCreator.createSection("content-section");

	const titleText =
		'<span class="content-span">Planeje</span> e Compartilhe Momentos de Sabor!';

	const text = `Profissional ou um entusiasta da culinária, nosso aplicativo é seu parceiro perfeito
    para <span class="content-span">planejar eventos gastronômicos extraordinários</span>. Estamos aqui para tornar cada momento culinário memorável e delicioso.`;

	const h1 = document.createElement("h1");
	h1.innerHTML = titleText;

	const p = document.createElement("p");
	p.innerHTML = text;

	const registerButton = htmlCreator.createButton(
		"Cadastre-se",
		"main-register-button"
	);

	registerButton.addEventListener("click", (e) => {
		e.preventDefault();
		document.body.style.backgroundImage = "";
		document.body.classList.remove("body-landing");
		dispatchOnStateChange("/login");
	});

	contentSection.appendChild(h1);
	contentSection.appendChild(p);
	contentSection.appendChild(registerButton);

	return contentSection;
};

const createMiddleContainer = () => {
	const contentSection = createContentSection();
	const mainLogo = htmlCreator.createImg("./assets/icons/main-logo.svg");

	const middleContainer = htmlCreator.createSection("middle-container");
	middleContainer.appendChild(contentSection);
	middleContainer.appendChild(mainLogo);

	return middleContainer;
};

const createCardSection = () => {
	const cardSection = htmlCreator.createSection("card-section-landing");
	const cardInfos = [
		{
			urlImg: "./assets/icons/bandeja.svg",
			cardTitle: "Construa seus Pratos",
			cardText:
				"Crie suas pratos únicos e memoráveis, adicionando ingredientes, instruções e imagens",
		},
		{
			urlImg: "./assets/icons/gg_list.svg",
			cardTitle: "lista de Compras Dinâmica",
			cardText:
				"Deixe nosso sistema calcular automaticamente a quantidade dos ingredientes necessários para suas receitas.",
		},
		{
			urlImg: "./assets/icons/calendar.svg",
			cardTitle: "Personalização do Evento",
			cardText:
				"Dê vida ao seu evento com convites personalizados, E sugestões de cardápio de acordo com seu estilo de comida preferido.",
		},
	];

	cardInfos.forEach((cardInfo) => {
		const cardContainer = htmlCreator.createDiv(".card-landing");
		const cardIcon = htmlCreator.createImg(cardInfo.urlImg);
		const title = htmlCreator.createTitle("h4", cardInfo.cardTitle);
		const text = htmlCreator.createParagraph(cardInfo.cardText);

		cardContainer.appendChild(cardIcon);
		cardContainer.appendChild(title);
		cardContainer.appendChild(text);

		cardSection.appendChild(cardContainer);
	});

	setTimeout(() => {
		const cards = document.querySelectorAll(".card-landing");
		cards.forEach((card) => {
			card.classList.add("card-animation");
		});
	}, 200);

	return cardSection;
};

const createMain = () => {
	const main = document.createElement("main");
	main.classList.add("main-landing");
	const middleContainer = createMiddleContainer();
	const cardSection = createCardSection();

	main.appendChild(middleContainer);
	main.appendChild(cardSection);

	return main;
};

function landingPageComponent() {
	document.body.style.backgroundImage =
		"url(./assets/images/background-landing.png)";
	document.body.classList.add("body-landing");
	const header = createHeader();
	const main = createMain();

	const mainContainer = htmlCreator.createSection("main-container-landing");
	const ballOrnamentOne = htmlCreator.createImg(
		"./assets/icons/side-ball.svg",
		"side-ball-one"
	);
	const ballOrnamentTwo = htmlCreator.createImg(
		"./assets/icons/side-ball.svg",
		"side-ball-two"
	);
	const ballOrnamentThree = htmlCreator.createImg(
		"./assets/icons/side-ball.svg",
		"side-ball-three"
	);
	const ballOrnamentFour = htmlCreator.createImg(
		"./assets/icons/side-ball.svg",
		"side-ball-four"
	);
	const sideTableOrnament = htmlCreator.createImg(
		"./assets/icons/side-table.svg",
		"side-table-ornament"
	);

	mainContainer.appendChild(ballOrnamentOne);
	mainContainer.appendChild(ballOrnamentTwo);
	mainContainer.appendChild(ballOrnamentThree);
	mainContainer.appendChild(ballOrnamentFour);
	mainContainer.appendChild(sideTableOrnament);

	mainContainer.appendChild(header);
	mainContainer.appendChild(main);

	return mainContainer;
}

export default landingPageComponent;
