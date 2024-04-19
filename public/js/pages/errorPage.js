import dispatchOnStateChange from "../events/onStateChange.js";
import getHeader from "../components/header.js";

const createErrorPage = () => {
    const errorContainer = document.createElement("section");
    errorContainer.id = "error-container";

    const errorPage = document.createElement('div')
    errorPage.id = 'error-page'
    errorContainer.appendChild(errorPage);

    const headerError = getHeader(true, true);
    errorPage.appendChild(headerError);

    const errorMessageTitle = document.createElement("div");
    errorMessageTitle.id = "error-message-title";

    const h1 = document.createElement("h1");
    h1.textContent = "Algo deu errado...";
    errorMessageTitle.appendChild(h1);

    const h3 = document.createElement("h3");
    h3.textContent = "mas não foi culpa sua.";
    errorMessageTitle.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = "O que aconteceu: não foi possível salvar o seu evento no banco de dados.";
    const span = document.createElement("span");
    span.id = "type-of-error";
    p.appendChild(span);
    errorMessageTitle.appendChild(p);

    errorPage.appendChild(errorMessageTitle);

    const imageOfError = document.createElement("div");
    imageOfError.id = "image-of-error";

    const img = document.createElement("img");
    img.src = "../images/error-image.png";
    imageOfError.appendChild(img);

    errorPage.appendChild(imageOfError);

    const homeButtonErrorPage = document.createElement("div");
    homeButtonErrorPage.id = "home-button-error-page";

    const button = document.createElement("button");
    button.id = "error-btn";
    const imgButton = document.createElement("img");
    imgButton.src = "../icons/home.svg";
    button.appendChild(imgButton);
    button.innerHTML += "Página inicial";
    homeButtonErrorPage.appendChild(button);

    errorContainer.appendChild(homeButtonErrorPage);

    return errorContainer;
};

document.body.appendChild(createErrorPage());
