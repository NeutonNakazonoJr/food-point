import dispatchOnStateChange from "../events/onStateChange.js";
import htmlCreator from "../utils/htmlCreator.js";

const createHeader = () => {
	const headerLogo = htmlCreator.createImg(
		"/assets/icons/logo.svg",
		"header-logo"
	);

	const chefHatIcon = htmlCreator.createImg("/assets/icons/chef-hat.svg");

	const headerTitleFirstPart = htmlCreator.createTitle("h3", "Food");
	const headerTitleSecondPart = htmlCreator.createTitle("h3", "Point");
	const titleDiv = htmlCreator.createDiv("header-title-div");
	titleDiv.appendChild(headerTitleFirstPart);
	titleDiv.appendChild(headerTitleSecondPart);

	const forkKnifeIcon = htmlCreator.createImg(
		"/assets/icons/fork-knife.svg"
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
		dispatchOnStateChange("/register");
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
		dispatchOnStateChange("/register");
	});

	contentSection.appendChild(h1);
	contentSection.appendChild(p);
	contentSection.appendChild(registerButton);

	return contentSection;
};

const createMiddleContainer = () => {
	const contentSection = createContentSection();
	const mainLogo = htmlCreator.createImg("/assets/icons/main-logo.svg");

	const middleContainer = htmlCreator.createSection("middle-container");
	middleContainer.appendChild(contentSection);
	middleContainer.appendChild(mainLogo);

	return middleContainer;
};

const createCardSection = () => {
	const cardSection = htmlCreator.createSection("card-section-landing");
	const cardInfos = [
		{
			cardTitle: "Construa seus Pratos",
			cardText:
				"Planeje seu menu de forma detalhada separando cada prato por um propósito específico na progressão do jantar e específicando os ingredientes relacionados.",
			id: 'title-first-card'
		},
		{
			cardTitle: "lista de Compras Dinâmica",
			cardText:
				"Após a definição dos pratos, tenha acesso à sua lista de compras com o total de ingredientes necessários, podendo atualizar e fazer download em PDF.",
			id: 'title-second-card'
		},
		{
			cardTitle: "Personalização do Evento",
			cardText:
				"Registre seus eventos e mantenha-os salvos para reutilizá-los sempre que desejar! Atualize suas informações a qualquer momento para manter seus eventos sempre atualizados.",
			id: 'title-third-card'
		},
	];

	cardInfos.forEach(cardInfo => {
		const cardContainer = htmlCreator.createDiv(".card-landing");
		const title = htmlCreator.createTitle("h4", cardInfo.cardTitle);
		title.id = cardInfo.id;
		const text = htmlCreator.createParagraph(cardInfo.cardText);

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
	const containerLanding = htmlCreator.createDiv('container-landing');
	containerLanding.style.backgroundImage =
		"url(/assets/images/background-landing.webp)";

	const header = createHeader();
	const main = createMain();

	const imgsDefinition = [
		{
			url: "/assets/icons/side-ball.svg",
			id: "side-ball-one",
			class: 'ornament'
		},
		{
			url: "/assets/icons/side-ball.svg",
			id: "side-ball-two",
			class: 'ornament'
		},
		{
			url: "/assets/icons/side-ball.svg",
			id: "side-ball-three",
			class: 'ornament'
		},
		{
			url: "/assets/icons/side-ball.svg",
			id: "side-ball-four",
			class: 'ornament'
		}
	]

	const mainContainer = htmlCreator.createSection("main-container-landing");

	for (const img of imgsDefinition) {
		const ballOrnament = htmlCreator.createImg(img.url, img.id);
		ballOrnament.classList.add(img.class);
		mainContainer.appendChild(ballOrnament);	
	}

	const sideTableOrnament = htmlCreator.createImg("/assets/icons/side-table.svg", "side-table-ornament");
	sideTableOrnament.classList.add('ornament');
	mainContainer.appendChild(sideTableOrnament);
	

	mainContainer.appendChild(header);
	mainContainer.appendChild(main);

	containerLanding.appendChild(mainContainer);


	return containerLanding;
}

export default landingPageComponent;
