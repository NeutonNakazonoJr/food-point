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

    const nav = htmlCreator.createNav("nav-landing");
    nav.appendChild(loginButton);
    nav.appendChild(registerButton);

    const header = document.createElement("header");
    header.id = "landing-header";

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
    para <span class="content-span">planejar eventos gastronômicos extraordinários</span>. Desde festas íntimas até grandes celebrações,
    estamos aqui para tornar cada momento culinário memorável e delicioso.`;

    const h1 = document.createElement("h1");
    h1.innerHTML = titleText;

    const p = document.createElement("p");
    p.innerHTML = text;

    const registerButton = htmlCreator.createButton(
        "Cadastre-se",
        "main-register-button"
    );

    contentSection.appendChild(h1);
    contentSection.appendChild(p);
    contentSection.appendChild(registerButton);

    return contentSection;
};

const createMain = () => {
    const main = document.createElement("main");
    const contentSection = createContentSection();
    main.appendChild(contentSection);

    return main;
};

/** Gets landing page
 *
 * @returns {HTMLElement}
 */
function landingPageComponent() {
    document.body.style.backgroundImage =
        "url(./assets/images/background-landing.png)";
    const header = createHeader();
    const main = createMain();

    const mainContainer = htmlCreator.createSection("main-container-landing");
    mainContainer.appendChild(header);
    mainContainer.appendChild(main);

    return mainContainer;
}

export default landingPageComponent;
