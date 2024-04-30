import dispatchOnStateChange from "../events/onStateChange.js";
import getHeader from "../components/header.js";

function createErrorPage(constructorInfo) {
    const errorPageSection = document.createElement('section');
    errorPageSection.id = 'error-page-container';

    const headerError = getHeader(true, true);
    errorPageSection.appendChild(headerError);

    const titleError = document.createElement('div');
    titleError.id = 'title-error';

    const titleH1 = document.createElement('h1');
    titleH1.textContent = 'Algo deu errado...';

    const titleH3 = document.createElement('h3');
    titleH3.textContent = 'mas não foi sua culpa';

    const titleH4 = document.createElement('h4');
    titleH4.textContent = 'O que aconteceu: ' + constructorInfo.error;

    titleError.appendChild(titleH1);
    titleError.appendChild(titleH3);
    titleError.appendChild(titleH4);

    const imageError = document.createElement('div');
    imageError.id = 'image-error';
    const errorImage = document.createElement('img');
    errorImage.alt = 'Imagem de error';
    errorImage.src = './assets/images/error-image.webp';
    imageError.appendChild(errorImage);

    const buttonErrorPageContainer = document.createElement('div');
    buttonErrorPageContainer.id = 'button-error-page-container';

    const buttonErrorPageDiv = document.createElement('div');
    buttonErrorPageDiv.id = 'button-error-page-div';

    const homeButtonErrorPage = document.createElement('button');
    homeButtonErrorPage.id = 'button-home-page-error';
    homeButtonErrorPage.type = 'button';
    homeButtonErrorPage.alt = 'Voltar para a página principal';
    homeButtonErrorPage.innerHTML = '<img src="../icons/home.svg" />Página Inicial';

    homeButtonErrorPage.addEventListener('click', function () {
        dispatchOnStateChange("/home");
    });

    buttonErrorPageDiv.appendChild(homeButtonErrorPage);
    buttonErrorPageContainer.appendChild(buttonErrorPageDiv);

    errorPageSection.appendChild(titleError);
    errorPageSection.appendChild(imageError);
    errorPageSection.appendChild(buttonErrorPageContainer);

    return errorPageSection;
}

export default createErrorPage;