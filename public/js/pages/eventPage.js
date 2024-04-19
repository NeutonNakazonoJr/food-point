import getHeader from "../components/header.js";


const eventInfosMock =  {
    "eventName": "Sabores da Diáspora: Uma Jornada Gastronômica Afro-brasileira",
    // "theme": "Junte-se a nós nesta jornada culinária enquanto exploramos os segredos, os aromas e os sabores da culinária afro-brasileira",
    // "eventDate": "26/04/2024",
    // "eventTime": "20:30",
    "eventLocation": null,
    "eventDescription": " O evento Sabores da Diáspora é uma oportunidade única para os participantes mergulharem na rica diversidade gastronômica dos afro-brasileiros. Desde os pratos tradicionais passados de geração em geração até interpretações modernas, este evento oferece uma imersão completa na cultura e na história por trás da comida que define parte da identidade brasileira. Junte-se a nós nesta jornada culinária enquanto exploramos os segredos, os aromas e os sabores da culinária afro-brasileira",
    "dishes": [
        {
            "dishId": "f6dc7aee-d2bc-4649-8ca5-5321386ff2df",
            "type": "Entrada",
            "dishName": "Pastel de Angu com Carne-Seca"
        },
        {
            "dishId": "7eb9de73-eb22-406a-9e19-561bddd05909",
            "type": "Principal",
            "dishName": "Moqueca de Peixe"
        },
        {
            "dishId": "fa407efb-d452-4a2c-b7cf-e9b505a1d584",
            "type": "Principal",
            "dishName": "Feijoada Completa"
        },
        {
            "dishId": "39cad7ec-46c5-4e89-a70b-6ce6e7ef7e4e",
            "type": "Sobremesa",
            "dishName": "Bolo de Fubá Cremoso"
        },
        {
            "dishId": "4267ec20-36de-4fb0-b3e9-bc99dec63997",
            "type": "Acompanhamento",
            "dishName": "Farofa de Dendê"
        },
        {
            "dishId": "4267ec20-36de-4fb0-b3e9-bc99dec63997",
            "type": "Salada",
            "dishName": "Farofa de Dendê"
        },
    ]
}


import htmlCreator from '../utils/htmlCreator.js';

const createEventMainTitleDiv = () => {
    const mainTitle = htmlCreator.createTitle('h1','Evento');
    const eventIcon = htmlCreator.createImg('./assets/icons/glass-of-wine.svg');
    const divInitial = htmlCreator.createDiv('initial-div-events');
    divInitial.appendChild(mainTitle);
    divInitial.appendChild(eventIcon);

    return divInitial;
} 


const createSectionBasicInfos = (basicInfos) => {

    const calendarIcon = htmlCreator.createImg('./assets/icons/calendar-red.svg');
    const eventDate = htmlCreator.createSpan(eventInfosMock.eventDate || 'Data a definir');
    const divDate = htmlCreator.createDiv('div-date');
    divDate.appendChild(calendarIcon);
    divDate.appendChild(eventDate);
    

    const clockIcon = htmlCreator.createImg('./assets/icons/clock.svg');
    const eventTime = htmlCreator.createSpan(eventInfosMock.eventTime || 'Horário a definir');
    const divTime = htmlCreator.createDiv('div-time');
    divTime.appendChild(clockIcon);
    divTime.appendChild(eventTime);

    
    const divCalendar = htmlCreator.createDiv('div-calendar');
    divCalendar.appendChild(divDate);
    divCalendar.appendChild(divTime);
    
    const eventName = htmlCreator.createTitle('h1', eventInfosMock.eventName || 'Nome do Evento a definir.');

    const divPresentation = htmlCreator.createDiv('div-presentation');
    divPresentation.appendChild(eventName);
    divPresentation.appendChild(divCalendar);
    

    let eventTheme = document.createElement('p');
    if (eventInfosMock.theme) {
        eventTheme.innerText = `Tema: ${eventInfosMock.theme}`;
    } else {
        eventTheme.innerText = 'Tema: A definir.';
    }
    
    const eventDescription = htmlCreator.createParagraph(eventInfosMock.eventDescription);
    const divTextContent = htmlCreator.createDiv('div-text-content-event');
    divTextContent.appendChild(eventTheme);
    divTextContent.appendChild(eventDescription);
    
    
    const basicInfosSection = htmlCreator.createSection('basic-infos-section');
    basicInfosSection.appendChild(divPresentation);
    basicInfosSection.appendChild(divTextContent);

    return basicInfosSection;
}

 // substituir por eventDishes do fetch
const createMenuSection = (dishInfos) => {
    const menuIcon = htmlCreator.createImg('./assets/icons/menu-icon.svg');
    const menuTitle = htmlCreator.createTitle('h1', 'Cardápio');
    
    const divTitle = htmlCreator.createDiv('.div-title');
    divTitle.classList.add('line-pseudo-element');
    divTitle.appendChild(menuIcon);
    divTitle.appendChild(menuTitle);

    const divDishesCard = createCardDiv(eventInfosMock.dishes);

    const menuSection = htmlCreator.createSection('menu-event-section');
    menuSection.appendChild(divTitle);
    menuSection.appendChild(divDishesCard);
    
    return menuSection;
}

function groupDishesByType(dishes) {
    const groupedDishes = {};

     // substituir por eventDishes do fetch
    dishes.forEach(dish => {
        if (!groupedDishes[dish.type]) {
            groupedDishes[dish.type] = [];
        }
        groupedDishes[dish.type].push(dish);
    });
    return groupedDishes;
}

const createCardDiv = (eventDishes) => {
    const icons = {
        'Entrada': './assets/icons/enter-type-icon.svg',
        'Salada': './assets/icons/salad-type-icons.svg',
        'Acompanhamento': './assets/icons/accompaniment-type-icon.svg',
        'Principal': './assets/icons/main-type-icon.svg',
        'Sobremesa': './assets/icons/dessert-type-icon.svg'
    }


    const menuSection = htmlCreator.createSection('menu-section');
    // substituir por eventDishes do fetch
    const dishList = groupDishesByType(eventDishes);

    for (const [ dishType, dishGroup ] of Object.entries(dishList)) {
        
        const divTitle = htmlCreator.createDiv();
        const cardTitle = htmlCreator.createTitle('h3',dishType);

        const icon = htmlCreator.createImg(icons[dishType]);
        const divIcon = htmlCreator.createDiv('.div-icon');
        divIcon.appendChild(icon);

        divTitle.appendChild(cardTitle);
        divTitle.appendChild(divIcon);

        const card = htmlCreator.createDiv('.card-dishes');
        card.appendChild(divTitle);

        dishGroup.forEach(dish => {
            const dishName = htmlCreator.createTitle('h4', `. ${dish.dishName}`, dish.dishId);
            card.appendChild(dishName);
        });

        menuSection.appendChild(card);
    }

    return menuSection;
}

// substituir pela localização do fetch
const createLocationSection = () => {
    const locationIcon = htmlCreator.createImg('./assets/icons/location-event-page-icon.svg');
    const locationTitle = htmlCreator.createTitle('h1', 'Localização');
    
    const divTitle = htmlCreator.createDiv('.div-title');
    divTitle.classList.add('line-pseudo-element');
    divTitle.appendChild(locationIcon);
    divTitle.appendChild(locationTitle);

    const locationSecondIcon = htmlCreator.createImg('./assets/icons/location-event.svg');

    const textContent = htmlCreator.createParagraph(eventInfosMock.eventLocation || 'Localização a definir');
    const divLocation = htmlCreator.createDiv('div-location');
    divLocation.appendChild(locationSecondIcon);
    divLocation.appendChild(textContent);

    const locationSection = htmlCreator.createSection('location-section');
    locationSection.appendChild(divTitle);
    locationSection.appendChild(divLocation);

    return locationSection;
}

const createButtonSection = () => {
    const guestButton = htmlCreator.createButton('Lista de convidados', null, 'btn-section');
    const guestIcon = htmlCreator.createImg('./assets/icons/guest-list-icon.svg');
    guestButton.appendChild(guestIcon);

    const homeButton = htmlCreator.createButton('Página inicial', null, 'btn-section');
    const homeIcon = htmlCreator.createImg('./assets/icons/home-icon.svg');
    homeButton.appendChild(homeIcon);

    const buttonSection = htmlCreator.createSection('btn-section');
    buttonSection.appendChild(guestButton);
    buttonSection.appendChild(homeButton);

    return buttonSection;
}




const createEventPageComponent = () => {
    const header = getHeader(false, true);
    const initialDiv = createEventMainTitleDiv();
    const basicInfosSection = createSectionBasicInfos();
    const menuSection = createMenuSection();
    const locationSection = createLocationSection();
    const buttonSection = createButtonSection();

    const mainContainer = htmlCreator.createSection('main-event-container');
    mainContainer.appendChild(basicInfosSection);
    mainContainer.appendChild(menuSection);
    mainContainer.appendChild(locationSection);
    mainContainer.appendChild(buttonSection);

    const main = document.createElement('main');
    main.appendChild(initialDiv);
    main.appendChild(mainContainer);
    
    const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(main);

    return wrapper;
}

export default createEventPageComponent;