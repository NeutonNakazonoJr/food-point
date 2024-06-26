
import { deleteDish, getAllDishes, getIngredientsByDishID, postDish } from "../../api/eventApi.js";
import showToast from "../../components/toast.js";
import htmlCreator from "../../utils/htmlCreator.js";
import { createMenuSection } from "../eventPage.js";
import createModal from "./createModal.js";

const createInsertDishSection = async (eventID, dishType) => {
    const insertSection = htmlCreator.createSection('insert-dish-section');
    const sectionTitle = htmlCreator.createTitle('h3', 'Adicionar novo prato');

    const divInputDishName = await createDivDishName(eventID, dishType);
    
    const ingredientSection = createIngredientSection();
    
    insertSection.appendChild(sectionTitle);
    insertSection.appendChild(divInputDishName);
    insertSection.appendChild(ingredientSection);
    
    return insertSection;
}

const handleSaveNewDish = async (eventID, dishType) => {
    const divIngredientsInput = document.querySelectorAll('.div-new-ingredient-input');
    const dishName = document.getElementById('input-dish-Name');

    if (!dishName.value) {
        showToast('O nome do prato precisa ser definido');
        return;
    }

    if (divIngredientsInput.length === 0) {
        showToast('Pelo menos um ingrediente deve estar associado a um prato');
        return;
    }

    const ingredients = [];

    let invalidIngredientName;
    divIngredientsInput.forEach(input => {
        const inputName = input.children[0].value;
        const inputQuantity = input.children[1].value;
        const inputUnityMeasure = input.children[2].value;

        if (!inputName || Number(inputQuantity) === 0) {
            showToast('O nome do ingrediente e a quantidade precisa ser definido');
            invalidIngredientName = true;
            return;
        }

        const newIngredient = {
            'name': inputName,
            'unityMeasure': inputUnityMeasure,
            'quantity': inputQuantity
        };

        ingredients.push(newIngredient);
    });

    if (ingredients.length === 0 || invalidIngredientName) {
        showToast('O nome do ingrediente e a quantidade precisa ser definido');
        return;
    }

    const newDishInfos = {
        dishName: dishName.value,
        type: dishType,
        ingredients
    };

    const dishEditMode = document.querySelector('.edit-mode');
    let newDish;
    if (dishEditMode) {
        const deleteRequest = await deleteDish(eventID, dishEditMode.id);

        if (!deleteRequest.error) {
            newDish = await postDish(eventID, newDishInfos);
            const cardDishButtons = document.querySelectorAll('#div-button-update-modal button');
            cardDishButtons.forEach(btn => (btn.disabled = false));
            dishEditMode.remove();
        } else {
            return showToast(deleteRequest.error.message);
        }
    } else {
        newDish = await postDish(eventID, newDishInfos);
    }

    if (newDish.error) {
        showToast(newDish.error);
        return;
    } else {
        showToast('Prato adicionado com sucesso');
    }

    const newCardDish = createCardDish({ dishName: dishName.value, dishId: newDish.dishId });
    const dishRegisteredDishes = document.getElementById('div-registered-dishes');
    dishRegisteredDishes.appendChild(newCardDish);

    const ingredientDiv = document.querySelectorAll('.div-new-ingredient-input');
    ingredientDiv.forEach(ingredient => ingredient.remove());

    dishName.value = '';
};

const createDivDishName = async (eventID, dishType) => {
    const inputDishNameOptions = {
        type: 'text',
        id: 'input-dish-Name',
        className: 'input-edit-dish',
        labelText: 'Nome do prato',
        classNameDiv: 'div-input-update-dish',
    };

    const saveNewDishBtn = htmlCreator.createButton('Salvar prato', 'save-edit-dish-btn');

    saveNewDishBtn.addEventListener('click', async () => {
        await handleSaveNewDish(eventID, dishType);
    });

    const divInput = htmlCreator.createInput(inputDishNameOptions);

    const inputIcon = htmlCreator.createImg('./assets/icons/restaurant-sharp.svg');
    divInput.appendChild(inputIcon);

    const divDishName = htmlCreator.createDiv('div-dish-name');
    divDishName.appendChild(divInput);
    divDishName.appendChild(saveNewDishBtn);

    return divDishName;
};

 
const createIngredientSection = () => {
    const ingredientTitle = htmlCreator.createTitle('h5', 'Ingredientes');
    const addNewIngredientBtn = htmlCreator.createButton('adicionar ingrediente', 'add-new-ingredient-modal');
    
    const ingredientSection = htmlCreator.createSection('ingredient-section-modal');
    ingredientSection.appendChild(ingredientTitle);
    ingredientSection.appendChild(addNewIngredientBtn);
    
    addNewIngredientBtn.addEventListener('click', () => {
        const divNewIngredientInput = createDivNewIngredientInput();
        ingredientSection.insertBefore(divNewIngredientInput, addNewIngredientBtn);

        const modalMenu = document.getElementById('menu-update-modal');

        if (modalMenu.scrollHeight > modalMenu.clientHeight) {
            modalMenu.classList.add('has-scrollbar');
          }
    });


    return ingredientSection;
}

const createDivNewIngredientInput = (registeredIngredient) => {
    const divNewIngredientInput = htmlCreator.createDiv();
    divNewIngredientInput.classList.add('div-new-ingredient-input');

    const inputIngredientNameOptions = {
        type: 'text',
        placeholder: 'ingrediente sem nome',
        className: 'input-ingredient-modal'
    }
    const newIngredientNameInput = htmlCreator.createInput(inputIngredientNameOptions);
    newIngredientNameInput.classList.add('input-name-ingredient-modal');
    registeredIngredient ? newIngredientNameInput.value = registeredIngredient.name : null;


    const inputIngredientQuantityOptions = {
        type: 'number',
        className: 'input-ingredient-modal',
        value: 1
    }
    const newIngredientQuantityInput = htmlCreator.createInput(inputIngredientQuantityOptions);
    newIngredientQuantityInput.classList.add('input-quantity-ingredient-modal')
    newIngredientQuantityInput.min = 1;
    registeredIngredient ? newIngredientQuantityInput.value = registeredIngredient.quantity : null;


    const unityMeasureSelect = createUnityMeasureSelect(registeredIngredient);
    const deleteBtn = htmlCreator.createButton('', 'delete-ingredient-btn-modal');
    const deleteIcon = htmlCreator.createImg('./assets/icons/trash.svg');
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener('click', () => {
        divNewIngredientInput.remove();
    })

    divNewIngredientInput.appendChild(newIngredientNameInput);
    divNewIngredientInput.appendChild(newIngredientQuantityInput);
    divNewIngredientInput.appendChild(unityMeasureSelect);
    divNewIngredientInput.appendChild(deleteBtn);

    return divNewIngredientInput;
}


const createUnityMeasureSelect = (registeredIngredient) => {
    const firstOption = document.createElement('option');
    firstOption.value = 0;
    firstOption.innerText = 'selecione uma unidade de medida';
    firstOption.disabled = true;
    
    const secondOption = document.createElement('option');
    secondOption.value = 'Quilogramas (kg)';
    secondOption.innerText = 'Quilogramas (kg)';
    
    const thirdOption = document.createElement('option');
    thirdOption.value = 'Gramas (g)';
    thirdOption.innerText = 'Gramas (g)';
    
    const fourthOption = document.createElement('option');
    fourthOption.value = 'Mililitros (ml)';
    fourthOption.innerText = 'Mililitros (ml)';
    
    const fifthOption = document.createElement('option');
    fifthOption.value = 'Litros (L)';
    fifthOption.innerText = 'Litros (L)';
    
    const sixthOption = document.createElement('option');
    sixthOption.value = 'Unidades (u)';
    sixthOption.innerText = 'Unidades (u)';
    
    const unityMeasureSelectModal = document.createElement('select');
    unityMeasureSelectModal.classList.add('select-unity-measure-modal');

    unityMeasureSelectModal.appendChild(firstOption);
    unityMeasureSelectModal.appendChild(secondOption);
    unityMeasureSelectModal.appendChild(thirdOption);
    unityMeasureSelectModal.appendChild(fourthOption);
    unityMeasureSelectModal.appendChild(fifthOption);
    unityMeasureSelectModal.appendChild(sixthOption);

    registeredIngredient ? unityMeasureSelectModal.value = registeredIngredient.unity_measure : null;
    return unityMeasureSelectModal;
}

const createRegisteredDishesSection = (dishList, dishType, eventID) => {

    const sectionTitle = htmlCreator.createTitle('h3', `Pratos criados (${dishType})`);
    const registeredDishesDiv = htmlCreator.createDiv('div-registered-dishes');
    registeredDishesDiv.appendChild(sectionTitle);

    if (dishList) {
        dishList.forEach(dishInfo => {
            const card = createCardDish(dishInfo, eventID);
            registeredDishesDiv.appendChild(card);
        });
    }

    const registeredDishesSection = htmlCreator.createSection('registered-dishes-section');
    registeredDishesSection.appendChild(registeredDishesDiv);

    return registeredDishesDiv;
}

const handleDeleteButtonClick = async (eventID, dishInfo, cardDish) => {
    const storageEventID = JSON.parse(localStorage.getItem('eventInfo'));
    const deletedDish = await deleteDish(eventID || storageEventID.eventID, dishInfo.dishId);
    
    if (deletedDish.error) {
        showToast(deletedDish.error.message);
    } else {
        showToast('Prato deletado com sucesso');
        cardDish.remove();
    }
};

const handleEditButtonClick = async (eventID, dishInfo, cardDish, editBtn, deleteBtn) => {
    const storageEventID = JSON.parse(localStorage.getItem('eventInfo'));
    const { ingredientList } = await getIngredientsByDishID(eventID || storageEventID.eventID, dishInfo.dishId);

    cardDish.classList.toggle('edit-mode');
    editBtn.remove();
    deleteBtn.remove();

    if (ingredientList.error) {
        showToast(ingredientList.error.message);
        return;
    }

    const cardTitle = htmlCreator.createSpan(' (Editando)');
    const inputDishName = document.getElementById('input-dish-Name');
    inputDishName.value = dishInfo.dishName
    
    cardDish.appendChild(cardTitle)
    const cardDishButtons = document.querySelectorAll('#div-button-update-modal button');
    cardDishButtons.forEach(btn => btn.disabled = true);

    const renderedIngredients = document.querySelectorAll('.div-new-ingredient-input');

    if (renderedIngredients.length > 0) {
        renderedIngredients.forEach(ingredient => ingredient.remove());
    }

    const ingredientSection = document.getElementById('ingredient-section-modal'); 
    const addNewIngredientBtn = document.getElementById('add-new-ingredient-modal');
    
    ingredientList.forEach(ingredient => {
        const registeredIngredient = createDivNewIngredientInput(ingredient);
        ingredientSection.insertBefore(registeredIngredient, addNewIngredientBtn);
    });
};

const createCardDish = (dishInfo, eventID) => {
    const cardDish = htmlCreator.createDiv('card-dish-modal');
    cardDish.id = dishInfo.dishId;
    cardDish.classList.add('card-dish-modal');
    
    const cardTitle = htmlCreator.createParagraph(dishInfo.dishName);
    
    const deleteBtn = htmlCreator.createButton('', 'delete-dish-btn-modal');
    const deleteIcon = htmlCreator.createImg('./assets/icons/trash.svg');
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.addEventListener('click', () => {
        handleDeleteButtonClick(eventID, dishInfo, cardDish);
    });

    const editBtn = htmlCreator.createButton('', 'edit-dish-modal');
    const editIcon = htmlCreator.createImg('./assets/icons/pen.svg');
    editBtn.appendChild(editIcon);

    editBtn.addEventListener('click',function () {
        handleEditButtonClick(eventID, dishInfo, cardDish, editBtn, deleteBtn)
    });

    const divBtn = htmlCreator.createDiv('div-button-update-modal');
    divBtn.appendChild(editBtn);
    divBtn.appendChild(deleteBtn);
    
    cardDish.appendChild(cardTitle);
    cardDish.appendChild(divBtn);

    return cardDish;
};

const updateMenuSection = async (eventID) => {
    const getDishesRequest = await getAllDishes(eventID);
    const modal = document.getElementById('modal');

    if (getDishesRequest.error) {
        modal.remove();
        return
    } else {
        const menuSection = document.getElementById('menu-event-section');
        menuSection.remove();
 
        const basicInfosSection = document.getElementById('basic-infos-section');
        const updatedMenuSection = await createMenuSection(getDishesRequest.dishes, eventID, true);
        basicInfosSection.insertAdjacentElement('afterend', updatedMenuSection);
        modal.remove();
    }
}



async function menuUpdateModalComponent (eventID, dishType, dishes) {
    const icons = {
        'Entrada': './assets/icons/enter-type-icon.svg',
        'Salada': './assets/icons/salad-type-icons.svg',
        'Acompanhamento': './assets/icons/accompaniment-type-icon.svg',
        'Principal': './assets/icons/main-type-icon.svg',
        'Sobremesa': './assets/icons/dessert-type-icon.svg',
        'Drink': './assets/icons/drink-event.svg'
    }

    const divTitle = htmlCreator.createDiv('div-title-update-menu');
    const title = htmlCreator.createTitle('h2', dishType);
    const titleIcon = htmlCreator.createImg(icons[dishType]);
    divTitle.appendChild(titleIcon);
    divTitle.appendChild(title);

    const insertDishSection = await createInsertDishSection(eventID, dishType);
    const registeredDishesSection = createRegisteredDishesSection(dishes, dishType, eventID);
    const innerContainer = htmlCreator.createDiv('inner-container-dish-modal');
    innerContainer.appendChild(insertDishSection);
    innerContainer.appendChild(registeredDishesSection);
    
    const containerMenuUpdate = htmlCreator.createSection('menu-update-modal');
    containerMenuUpdate.appendChild(divTitle);
    containerMenuUpdate.appendChild(innerContainer);
    
    const closeModalBtn = htmlCreator.createButton('', 'close-modal-btn');
    const closeIcon = htmlCreator.createImg('./assets/icons/close-icon.svg');
    closeModalBtn.appendChild(closeIcon);
    containerMenuUpdate.appendChild(closeModalBtn);
    
    const modal = createModal(containerMenuUpdate);

    modal.addEventListener('click', async (e) => {
        if (e.target === modal) {
            await updateMenuSection(eventID);
            modal.remove();
        }
    });

    closeModalBtn.addEventListener('click', async () => {
        await updateMenuSection(eventID);
    });
    

    return modal;
}

export default menuUpdateModalComponent;