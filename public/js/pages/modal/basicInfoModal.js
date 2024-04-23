import  htmlCreator  from '../../utils/htmlCreator.js';
import createModal from './createModal.js';
import { putEvent } from '../../api/eventApi.js';
import showToast from '../../components/toast.js';
import { createSectionBasicInfos } from '../eventPage.js';

const createAndValidateInputDate = (eventDate) => {

    let formattedDate;
    if (eventDate) {
        const splitDate = eventDate.split('/');
        const day = splitDate[0];
        const month = splitDate[1];
        const year = splitDate[2];
        formattedDate = year + '-' + month + '-' + day;
    }

    const divInputDate = htmlCreator.createInput({
        type: 'date',
        id: 'date-input-edit',
        classNameDiv: 'div-input-form',
        labelText: 'Data do Evento',
        value: formattedDate || null
    });

    let blurListenerAdded = false;
    divInputDate.addEventListener('click', () => {
        if (!blurListenerAdded) {
            const input = document.getElementById('date-input-edit');
            input.addEventListener('blur', () => {
                const sendBtn = document.getElementById('save-edit-btn');

                if (!input.checkValidity()) {
                    showToast('Data inválida');
                    sendBtn.disabled = true;
                } else {
                    sendBtn.disabled = false;
                }
            });
            blurListenerAdded = true;
        }
    });

    return divInputDate;
};

const createFormUpdateInfos = (basicInfos, eventID) => {

    const inputOptions = [
        {
            type: 'text',
            id: 'event-input-edit',
            placeholder: 'Ex: Evento Gastronômico Internacional',
            classNameDiv: 'div-input-form',
            labelText: 'Nome do Evento',
            value: basicInfos.eventName || null,
        },
        {
            type: 'text',
            id: 'theme-input-edit',
            placeholder: 'Ex: Explorando Sabores Globais ...',
            classNameDiv: 'div-input-form',
            labelText: 'Tema do Evento',
            value: basicInfos.eventTheme || null,
        },
        {
            type: 'text',
            id: 'description-input-edit',
            placeholder: 'Ex: Um evento imperdível para os amantes da gastronomia ...',
            classNameDiv: 'div-input-form',
            labelText: 'Descrição do Evento',
            value: basicInfos.eventDescription || null,
        }
    ];

    const form = htmlCreator.createForm('form-update-basic-info', 'Editar Evento', inputOptions);

    const divInputDate = createAndValidateInputDate(basicInfos.eventDate);

    const inputTime = htmlCreator.createInput({
        type: 'time',
        id: 'time-input-edit',
        classNameDiv: 'div-input-form',
        labelText: 'Data do Evento',
        value: basicInfos.eventTime || null
    });

    form.appendChild(divInputDate);
    form.appendChild(inputTime);

    const cancelUpdateBtn = htmlCreator.createButton('Cancelar', 'cancel-edit-btn');
    const cancelIcon = htmlCreator.createImg('./assets/icons/x-icon.svg');
    cancelUpdateBtn.appendChild(cancelIcon);

    const sendUpdateBasicInfos = htmlCreator.createButton('Confirmar', 'save-edit-btn');
    const sendIcon = htmlCreator.createImg('./assets/icons/v-icon.svg');
    sendUpdateBasicInfos.appendChild(sendIcon);

    sendUpdateBasicInfos.addEventListener('click', async (e) => {
        e.preventDefault();

        let formattedDate;
        if (form.elements['date-input-edit'].value) {
            const inputDateValue = form.elements['date-input-edit'].value;
            const splitDate = inputDateValue.split('-');
            const day = splitDate[2];
            const month = splitDate[1];
            const year = splitDate[0];
            formattedDate = day + '/' + month + '/' + year;
        }

        const newInfos = {
            name: form.elements['event-input-edit'].value,
            theme: form.elements['theme-input-edit'].value,
            eventDescription: form.elements['description-input-edit'].value,
            eventDate: formattedDate,
            eventTime: form.elements['time-input-edit'].value
        };

        const updateRequest = await putEvent(eventID, newInfos);

        if (updateRequest.error) {
            showToast(updateRequest.error);
        } else {
            showToast('Informações atualizadas com sucesso.');

            const basicInfosSection = document.getElementById('basic-infos-section');
            const eventMainContainer = document.getElementById('event-main-container');
            eventMainContainer.removeChild(basicInfosSection);

            const updatedBasicInfos = updateRequest.basicInfos;
            const newBasicInfoSection = createSectionBasicInfos(updatedBasicInfos, eventID);

            eventMainContainer.insertBefore(newBasicInfoSection, eventMainContainer.firstChild);
            const modal = document.getElementById('modal');

            modal.remove();
        }
    });

    const divBtnUpdateBasicInfos = htmlCreator.createDiv('div-update-basic');
    divBtnUpdateBasicInfos.appendChild(cancelUpdateBtn);
    divBtnUpdateBasicInfos.appendChild(sendUpdateBasicInfos);

    form.appendChild(divBtnUpdateBasicInfos);
    return form;
};

// isolar as logicas
// verificar logica de atualização de theme e description
const modalUpdateInfosComponent = (basicInfos, eventID) => {
    const form = createFormUpdateInfos(basicInfos, eventID);
    const modal = createModal(form);
    return modal;
}

export default modalUpdateInfosComponent;