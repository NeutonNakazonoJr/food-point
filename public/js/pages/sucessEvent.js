import dispatchOnStateChange from "../events/onStateChange.js";
import getHeader from "../components/header.js";
import eventProgressBar from "../components/eventProgressBar.js";

const createSuccessEventPage = (constructorInfo =  { eventID: '' }) => {
    // console.log (constructorInfo.eventID);

    const successEventContainer = document.createElement('section');
    successEventContainer.id = 'sucess-event-container';
    successEventContainer.setAttribute('alt', 'Evento criado com sucesso');

    const successEvent = document.createElement('div');
    successEvent.id = 'sucess-event';

    const headerSuccessEvent = getHeader(true, true);
    successEventContainer.appendChild(headerSuccessEvent);

    const constructorInfor = {
        stage: {
            last: 3,
            current: 4
        }
    };

    const progressBarSuccessEvent = eventProgressBar(
        true,
        true,
        constructorInfor.stage.last,
        constructorInfor.stage.current
    );

    successEventContainer.appendChild(progressBarSuccessEvent);

    const successEventTitle = document.createElement('div');
    successEventTitle.id = 'sucess-event-title';

    const h1 = document.createElement('h1');
    h1.textContent = 'Evento criado com sucesso';

    const h3First = document.createElement('h3');
    h3First.textContent = 'Agora é só chamar a galera!';

    const h3Second = document.createElement('h3');
    h3Second.textContent = 'Gere um convite agora ou vá para página inicial';

    successEventTitle.appendChild(h1);
    successEventTitle.appendChild(h3First);
    successEventTitle.appendChild(h3Second);

    const successEventImage = document.createElement('div');
    successEventImage.id = 'sucess-event-image';

    const img = document.createElement('img');
    img.src = '/assets/images/sucess-event-image.webp';

    successEventImage.appendChild(img);

    const successEventButtonContainer = document.createElement('div');
    successEventButtonContainer.id = 'sucess-event-button-container';

    const homePageButton = document.createElement('button');
    homePageButton.id = 'home-page-button-sucess-event';

    const imgHomePageButton = document.createElement('img');
    imgHomePageButton.id = 'image-home-button-success';
    imgHomePageButton.src = '/assets/icons/home-vermelho.svg';

    homePageButton.appendChild(imgHomePageButton);
    homePageButton.innerHTML += 'Página Inicial';

    homePageButton.addEventListener('mouseover', () => {
        const imgHomePageButton2 = document.getElementById('image-home-button-success');
        imgHomePageButton2.src = '/assets/icons/home.svg';
    });

    homePageButton.addEventListener('mouseout', () => {
        const imgHomePageButton2 = document.getElementById('image-home-button-success');
        imgHomePageButton2.src = '/assets/icons/home-vermelho.svg';
    });

    homePageButton.addEventListener('click', (e) => {
        e.preventDefault();
        dispatchOnStateChange("/home");
    });

    const inviteEventButton = document.createElement('button');
    inviteEventButton.id = 'invite-event-event';
    inviteEventButton.setAttribute('alt', 'Ver meu evento');

    const imgInviteEventButton = document.createElement('img');
    imgInviteEventButton.src = '/assets/icons/glass-of-wine-white.svg';

    inviteEventButton.appendChild(imgInviteEventButton);
    inviteEventButton.innerHTML += 'Ver meu evento';

    inviteEventButton.addEventListener('click', (e) => {
        e.preventDefault();
    });

    successEventButtonContainer.appendChild(homePageButton);
    successEventButtonContainer.appendChild(inviteEventButton);

    successEvent.appendChild(successEventTitle);
    successEvent.appendChild(successEventImage);
    successEvent.appendChild(successEventButtonContainer);

    successEventContainer.appendChild(successEvent);

    return successEventContainer;
};

export default createSuccessEventPage;
