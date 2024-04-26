import { getPurchaseList } from "../api/eventApi.js";
import getHeader from "../components/header.js";
import htmlCreator from "../utils/htmlCreator.js";
import dispatchOnStateChange from "../events/onStateChange.js";
// import jsPDF from 'jspdf';


const createDivLogo = () => {
    const logo = htmlCreator.createImg('./assets/images/Fav icon.png');

    const mainTitle = htmlCreator.createTitle('h1', 'Lista de Compras');
    const listIcon = htmlCreator.createImg('./assets/icons/list.svg');
    const divTItle = htmlCreator.createDiv('div-title-purchase-list');
    divTItle.appendChild(listIcon);
    divTItle.appendChild(mainTitle);


    const divLogo = htmlCreator.createDiv('div-purchase-list-logo');
    divLogo.appendChild(logo);
    divLogo.appendChild(divTItle);
    return divLogo;
}

const createListTable = (listInfos) => {
    const table = document.createElement('table');
    table.id = 'table-purchase-list';
    
    const thItem = document.createElement('th');
    thItem.innerText = 'Item';
    
    const thIngredient = document.createElement('th');
    thIngredient.innerText = 'Ingrediente';
    
    const thQuantity= document.createElement('th');
    thQuantity.innerText = 'Quantidade';

    const thCartIcon= document.createElement('th');
    const cartIcon = htmlCreator.createImg('./assets/icons/cart-icon.svg');
    thCartIcon.appendChild(cartIcon);
    
    const thead = document.createElement('thead');
    thead.appendChild(thItem);
    thead.appendChild(thIngredient);
    thead.appendChild(thQuantity);
    thead.appendChild(thCartIcon);
    
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    listInfos.forEach((ingredientInfo, index) => {
        const tr = createListRow(ingredientInfo, index);
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    return table;
}

const createListRow = (ingredientInfo, ingredientIndex) => {

    const tr = document.createElement('tr');

    const tdIndex = document.createElement('td');
    tdIndex.textContent = ingredientIndex + 1;

    const tdName = document.createElement('td');
    tdName.textContent = ingredientInfo.name;

    const tdQuantity = document.createElement('td');

    const unityMeasureAbreviation = ingredientInfo.unity_measure.split(' ')[1];

    tdQuantity.textContent = `${ingredientInfo.total_quantity} ${unityMeasureAbreviation}`;

    const tdCheckbox = document.createElement('td');
    const checkInput = htmlCreator.createInput({ type: 'checkbox', id: ingredientInfo.name, className: 'check-input-purchase-list'});
    tdCheckbox.appendChild(checkInput);

    tr.appendChild(tdIndex);
    tr.appendChild(tdName);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdCheckbox);

    return tr;
}


const createCentralContainer = (listInfos) => {
    const imgList = htmlCreator.createImg('./assets/images/Checklist-pana.svg', 'list-img');
    const table = createListTable(listInfos);
    const centralContainer = htmlCreator.createDiv('central-container-purchase');
    centralContainer.appendChild(imgList);
    centralContainer.appendChild(table);

    return centralContainer;
}

const createDivBtn = () => {
    const divBtn = htmlCreator.createDiv('div-btn-purchase');

    const homeButton = htmlCreator.createButton('Página inicial', null, 'btn-section');
    homeButton.addEventListener('click', () => {
        dispatchOnStateChange('/home');
    });

    const homeIcon = htmlCreator.createImg('./assets/icons/home-icon.svg');
    homeButton.appendChild(homeIcon);

    const downloadBtn  = htmlCreator.createButton('Download', 'download-btn', 'btn-section');
    const downloadIcon = htmlCreator.createImg('./assets/icons/download-icon.svg');

    downloadBtn.appendChild(downloadIcon);

    downloadBtn.addEventListener('click', () => {
        generatePDF();
    })

    divBtn.appendChild(homeButton);
    divBtn.appendChild(downloadBtn);

    return divBtn;
}

const createEmptyContentDiv = () => {
    const imgList = htmlCreator.createImg('./assets/images/Checklist-pana.svg', 'list-img-empty');
    const title = htmlCreator.createTitle('h2', 'Nenhum ingrediente cadastrado ...');

    const emptyContainer = htmlCreator.createDiv('div-empty');
    emptyContainer.appendChild(imgList);
    emptyContainer.appendChild(title);

    return emptyContainer;
}

function generatePDF() {
    const table = document.getElementById('table-purchase-list');
    table.querySelectorAll('img').forEach(img => img.remove());

    const pdf = new jsPDF({
        orientation: 'l',
        unit: 'pt',
        format: 'A4',
        putOnlyUsedFonts:true
    });
    
    pdf.html(table, {
        callback: function (pdf) {
            pdf.save('tabela-compras.pdf');
        }
    });


}

const createPurchaseListPage = async (constructorInfo =  { eventID: '' }) => {
    const eventID = constructorInfo.eventID;

    if (eventID) {
        localStorage.setItem('eventInfo', JSON.stringify({ eventID }));        
    }

    const storageEventID = JSON.parse(localStorage.getItem('eventInfo'));
    
    const main = document.createElement('main');
    const header = getHeader();
    const divLogo = createDivLogo();
    const divBtn = createDivBtn();
    main.appendChild(divLogo);
    
    const { list } = await getPurchaseList(eventID || storageEventID.eventID);
    
    let centalContainer;
    if (list.length !== 0) {
        centalContainer = createCentralContainer(list);
    } else {
        centalContainer = createEmptyContentDiv();
    }
    
    main.id = 'purchase-list-main';
    main.appendChild(centalContainer);
    main.appendChild(divBtn);        
    
    const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
    wrapper.appendChild(main);
    return wrapper;
}

export default createPurchaseListPage;