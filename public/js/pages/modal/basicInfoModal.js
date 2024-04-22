import  htmlCreator  from '../../utils/htmlCreator.js';

//  (formTitle = "", formInputs = [{ type: '', id: '', placeholder: '', className: '', labelName: '' }], submitBtnName = '')
const createFormUpdateInfos = (basicInfos, eventID) => {

    const inputsOptions = [
        {
            type: 'text',
            placeholder: 'Ex: Evento Gastronômico Internacional',
            className: 'input-update-basic-infos',
            labelText: 'Nome do Evento',
            value: basicInfos.eventName || null,
        },
        {
            type: 'text',
            placeholder: 'Ex: Explorando Sabores Globais',
            className: 'input-update-basic-infos',
            labelText: 'Tema do Evento',
            value: basicInfos.eventTheme || null
        },
        {
            type: 'text',
            placeholder: 'Ex: Um evento imperdível para os amantes da gastronomia, onde você poderá experimentar uma ampla variedade de pratos de diferentes partes do mundo. Venha saborear e descobrir novos aromas e texturas conosco',
            className: 'input-update-basic-infos',
            labelText: 'Descrição do Evento',
            value: basicInfos.eventDescription || null
        },
        {
            type: 'date',
            placeholder: '22/08/24',
            className: 'input-update-basic-infos',
            labelText: 'Data do Evento',
            value: basicInfos.eventDescription || null
        },
        {

        }

    ]

    const form = htmlCreator.createForm('Editar Evento', inputsOptions, 'Atualizar');

    return form;
}





const modalUpdateInfosComponent = (basicInfos, eventID) => {
    const form = createFormUpdateInfos(basicInfos);

    const mainTag = document.querySelector('main');
    mainTag.appendChild(form);
}

export default modalUpdateInfosComponent;