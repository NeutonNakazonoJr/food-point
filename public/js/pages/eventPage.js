import getHeader from "../components/header.js";
import { getEventById } from "../api/eventApi.js";
import htmlCreator from "../utils/htmlCreator.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import modalUpdateInfosComponent from "./modal/basicInfoModal.js";
import showToast from "../components/toast.js";
import menuUpdateModalComponent from "./modal/menuModal.js";
import cancelThisEventModal from "./modal/deleteEventModal.js";
import locationStrToCityName from "../utils/locationStrToCityName.js";
import modalLocationComponent from "./modal/locationModal.js";
import apiLoading from "../utils/load/apiLoading.js";
import guestList from "./modal/guestModal.js";

const createEventMainTitleDiv = () => {
	const mainTitle = htmlCreator.createTitle("h1", "Evento");
	const eventIcon = htmlCreator.createImg("./assets/icons/glass-of-wine.svg");
	const divInitial = htmlCreator.createDiv("initial-div-events");
	divInitial.classList.add("none-to-download");
	divInitial.appendChild(mainTitle);
	divInitial.appendChild(eventIcon);
	return divInitial;
};

export function createSectionBasicInfos(basicInfos, eventID, editMode) {
	const basicInfosSection = htmlCreator.createSection("basic-infos-section");

	const interestingInfos = {
		eventDate: basicInfos.eventDate,
		eventDescription: basicInfos.eventDescription,
		eventName: basicInfos.eventName,
		eventTheme: basicInfos.eventTheme,
		eventTime: basicInfos.eventTime,
	};
	if (Object.values(interestingInfos).every((value) => value === null)) {
		const divUndefinedBasicInfos = htmlCreator.createDiv(
			"div-undefined-basic-infos"
		);
		const undefinedInfoImg = htmlCreator.createImg(
			"./assets/images/undefined-basic-info.svg"
		);
		const titleUndefinedBasicInfos = htmlCreator.createTitle(
			"h3",
			"Aguardando a definição das informações do evento ..."
		);

		divUndefinedBasicInfos.appendChild(titleUndefinedBasicInfos);
		divUndefinedBasicInfos.appendChild(undefinedInfoImg);

		basicInfosSection.classList.add("menu-undefined");
		basicInfosSection.appendChild(divUndefinedBasicInfos);

		const editBtn = htmlCreator.createImg("./assets/images/edit-btn.svg");
		editBtn.classList.add("edit-event-btn");
		editBtn.classList.add("edit-hidden");

		editBtn.addEventListener("click", () => {
			const modalUpdate = modalUpdateInfosComponent(basicInfos, eventID);
			const mainContainer = document.getElementById(
				"event-main-container"
			);
			mainContainer.appendChild(modalUpdate);
		});

		basicInfosSection.appendChild(editBtn);
		return basicInfosSection;
	}

	const divCalendar = htmlCreator.createDiv("div-calendar");
	if (basicInfos.eventDate) {
		const calendarIcon = htmlCreator.createImg(
			"./assets/icons/calendar-red.svg"
		);
		const eventDate = htmlCreator.createSpan(basicInfos.eventDate);
		const divDate = htmlCreator.createDiv("div-date");
		divDate.appendChild(calendarIcon);
		divDate.appendChild(eventDate);
		divCalendar.appendChild(divDate);
	}

	if (basicInfos.eventTime) {
		const clockIcon = htmlCreator.createImg("./assets/icons/clock.svg");
		const eventTime = htmlCreator.createSpan(basicInfos.eventTime);
		const divTime = htmlCreator.createDiv("div-time");
		divTime.appendChild(clockIcon);
		divTime.appendChild(eventTime);
		divCalendar.appendChild(divTime);
	}

	const divPresentation = htmlCreator.createDiv("div-presentation");
	if (basicInfos.eventName) {
		const eventName = htmlCreator.createTitle("h1", basicInfos.eventName);
		divPresentation.appendChild(eventName);
		basicInfosSection.appendChild(divPresentation);
	}

	if (basicInfos.eventDate || basicInfos.eventTime) {
		divPresentation.appendChild(divCalendar);
		basicInfosSection.appendChild(divPresentation);
	}

	const divTextContent = htmlCreator.createDiv("div-text-content-event");
	if (basicInfos.eventTheme) {
		const eventTheme = htmlCreator.createParagraph(
			`Tema: ${basicInfos.eventTheme}`
		);
		divTextContent.appendChild(eventTheme);
		basicInfosSection.appendChild(divTextContent);
	}

	if (basicInfos.eventDescription) {
		const eventDescription = htmlCreator.createParagraph(
			basicInfos.eventDescription
		);
		divTextContent.appendChild(eventDescription);
		basicInfosSection.appendChild(divTextContent);
	}

	const editBtn = htmlCreator.createImg(
		"./assets/images/edit-btn.svg",
		"edit-btn-basic"
	);
	editBtn.classList.add("edit-event-btn");

	if (!editMode) {
		editBtn.classList.add("edit-hidden");
	}

	editBtn.addEventListener("click", () => {
		const modalUpdate = modalUpdateInfosComponent(basicInfos, eventID);
		const rootContainer = document.getElementById("root");
		rootContainer.appendChild(modalUpdate);
	});

	basicInfosSection.appendChild(editBtn);

	return basicInfosSection;
}

export async function createMenuSection(dishInfos, eventID, editMode) {
	const menuIcon = htmlCreator.createImg("./assets/icons/menu-icon.svg");
	const menuTitle = htmlCreator.createTitle("h1", "Cardápio");

	const divTitle = htmlCreator.createDiv(".div-title");
	divTitle.classList.add("line-pseudo-element");
	divTitle.appendChild(menuIcon);
	divTitle.appendChild(menuTitle);

	const divCard = await createCardDiv(dishInfos, eventID, editMode);

	const menuSection = htmlCreator.createSection("menu-event-section");

	const registeredDishesGroupedByType = groupDishesByType(dishInfos);
	const alldishTypes = [
		"Entrada",
		"Salada",
		"Acompanhamento",
		"Principal",
		"Sobremesa",
		"Drink",
	];
	const dishTypeWithoutDefinition = alldishTypes.filter(
		(dishType) => !registeredDishesGroupedByType.hasOwnProperty(dishType)
	);

	if (dishTypeWithoutDefinition.length > 0) {
		const selectToDishType = createSelectForUndefinedTypes(
			dishTypeWithoutDefinition,
			eventID
		);

		if (!editMode) {
			selectToDishType.classList.add("edit-hidden");
		}

		menuSection.appendChild(selectToDishType);
	}

	menuSection.appendChild(divTitle);
	menuSection.appendChild(divCard);

	return menuSection;
}

export function groupDishesByType(dishes) {
	const groupedDishes = {};

	dishes.forEach((dish) => {
		if (!groupedDishes[dish.type]) {
			groupedDishes[dish.type] = [];
		}
		groupedDishes[dish.type].push(dish);
	});
	return groupedDishes;
}

const createSelectForUndefinedTypes = (undefinedTypes, eventID) => {
	const selectToDishType = document.createElement("select");
	selectToDishType.id = "select-dish-type";

	const icons = {
		Entrada: "./assets/icons/enter-type-icon.svg",
		Salada: "./assets/icons/salad-type-icons.svg",
		Acompanhamento: "./assets/icons/accompaniment-type-icon.svg",
		Principal: "./assets/icons/main-type-icon.svg",
		Sobremesa: "./assets/icons/dessert-type-icon.svg",
		Drink: "./assets/icons/drink-event.svg",
	};

	for (const dishType of undefinedTypes) {
		const option = document.createElement("option");
		option.value = dishType;
		option.innerText = dishType;
		selectToDishType.appendChild(option);
	}

	const defaultOption = document.createElement("option");
	defaultOption.text = "Novo tipo de prato";

	selectToDishType.add(defaultOption, 0);
	defaultOption.selected = true;
	defaultOption.disabled = true;

	selectToDishType.addEventListener("change", async (e) => {
		const dishType = e.target.value;
		const modalMenu = await menuUpdateModalComponent(eventID, dishType);
		const rootContainer = document.getElementById("root");
		rootContainer.appendChild(modalMenu);
	});

	return selectToDishType;
};

const createCardDiv = async (dishInfos, eventID, editMode) => {
	const menuSection = htmlCreator.createSection("menu-section");
	const registeredDishesGroupedByType = groupDishesByType(dishInfos);

	if (dishInfos.length === 0) {
		const imgMenu = htmlCreator.createImg(
			"./assets/images/big-menu-img.svg",
			"img-menu-event"
		);
		const text = htmlCreator.createTitle(
			"h3",
			"Aguardando definição do cardápio ..."
		);

		const divWaitingMenu = htmlCreator.createDiv("wait-menu-event");
		divWaitingMenu.appendChild(text);
		divWaitingMenu.appendChild(imgMenu);

		menuSection.classList.add("menu-undefined");
		menuSection.appendChild(divWaitingMenu);

		return menuSection;
	}

	const icons = {
		Entrada: "./assets/icons/enter-type-icon.svg",
		Salada: "./assets/icons/salad-type-icons.svg",
		Acompanhamento: "./assets/icons/accompaniment-type-icon.svg",
		Principal: "./assets/icons/main-type-icon.svg",
		Sobremesa: "./assets/icons/dessert-type-icon.svg",
		Drink: "./assets/icons/drink-event.svg",
	};

	for (const [dishType, dishGroup] of Object.entries(
		registeredDishesGroupedByType
	)) {
		const cardTitle = htmlCreator.createTitle("h3", dishType);
		const icon = htmlCreator.createImg(icons[dishType]);

		const card = htmlCreator.createDiv(".card-dishes");
		card.id = dishType;
		card.appendChild(cardTitle);
		card.appendChild(icon);

		dishGroup.forEach((dish) => {
			const dishName = htmlCreator.createTitle(
				"h4",
				`• ${dish.dishName}`,
				dish.dishId
			);
			card.appendChild(dishName);
		});

		const editBtn = htmlCreator.createImg("./assets/images/edit-btn.svg");
		editBtn.classList.add("edit-event-dishes");

		if (!editMode) {
			editBtn.classList.add("edit-hidden");
		}

		card.appendChild(editBtn);

		editBtn.addEventListener("click", async (e) => {
			const dishType = e.target.parentNode.id;
			const modalMenu = await menuUpdateModalComponent(
				eventID,
				dishType,
				dishGroup
			);
			const rootContainer = document.getElementById("root");
			rootContainer.appendChild(modalMenu);
		});

		menuSection.appendChild(card);
	}

	return menuSection;
};

const createLocationSection = async (eventLocation, eventID) => {
	const locationIcon = htmlCreator.createImg(
		"./assets/icons/location-event-page-icon.svg"
	);
	const locationTitle = htmlCreator.createTitle("h1", "Localização");

	const divTitle = htmlCreator.createDiv(".div-title");
	divTitle.classList.add("line-pseudo-element");
	divTitle.appendChild(locationIcon);
	divTitle.appendChild(locationTitle);

	const locationSecondIcon = htmlCreator.createImg(
		"./assets/icons/location-event.svg"
	);
	const legibleAddress = await locationStrToCityName(eventLocation);
	const textContent = htmlCreator.createParagraph(
		legibleAddress || eventLocation || "Aguardando definição ..."
	);
	const divLocation = htmlCreator.createDiv("div-location");

	divLocation.appendChild(locationSecondIcon);
	divLocation.appendChild(textContent);

	const editBtn = htmlCreator.createImg("./assets/images/edit-btn.svg");
	editBtn.classList.add("edit-event-btn");
	editBtn.classList.add("edit-hidden");
	editBtn.addEventListener("click", () => {
		const modalUpdate = modalLocationComponent(eventLocation, eventID);
		const mainContainer = document.getElementById("event-main-container");
		mainContainer.appendChild(modalUpdate);
	});
	divLocation.appendChild(editBtn);

	const locationSection = htmlCreator.createSection("location-section");
	locationSection.appendChild(divTitle);
	locationSection.appendChild(divLocation);

	return locationSection;
};

const createButtonSection = (eventID, modal) => {
	const guestButton = htmlCreator.createButton(
		"Lista de convidados",
		null,
		"btn-section"
	);
	guestButton.id = "guest-button-event-page";
	const guestIcon = htmlCreator.createImg(
		"./assets/icons/guest-list-icon.svg"
	);
	guestButton.appendChild(guestIcon);
	guestButton.addEventListener("click", () => {
		const guestModal = guestList(eventID);
		const rootContainer = document.getElementById("root");
		rootContainer.appendChild(guestModal);
	});

	const homeButton = htmlCreator.createButton(
		"Página inicial",
		null,
		"btn-section"
	);
	homeButton.id = "home-button-event-page";
	homeButton.src = homeButton.addEventListener("click", () => {
		dispatchOnStateChange("/home");
	});

	const homeIcon = htmlCreator.createImg("./assets/icons/home-vermelho.svg");
	homeButton.appendChild(homeIcon);

	guestButton.addEventListener("mouseover", () => {
		guestIcon.src = "/assets/icons/guest-list-icon-white.svg";
	});

	guestButton.addEventListener("mouseout", () => {
		guestIcon.src = "/assets/icons/guest-list-icon.svg";
	});

	homeButton.addEventListener("mouseover", () => {
		homeIcon.src = "/assets/icons/home.svg";
	});

	homeButton.addEventListener("mouseout", () => {
		homeIcon.src = "/assets/icons/home-vermelho.svg";
	});

	const buttonSection = htmlCreator.createSection("btn-section");
	buttonSection.classList.add("none-to-download");

	const downloadPngBtn = htmlCreator.createButton("download", "download-png");
	const downloadIcon = htmlCreator.createImg(
		"./assets/icons/download-icon-png.svg"
	);
	downloadPngBtn.appendChild(downloadIcon);

	downloadPngBtn.classList.add("none-to-download");
	downloadPngBtn.classList.add("btn-section");
	downloadPngBtn.addEventListener("click", handleDownloadPNG);

	const deleteEventBtn = htmlCreator.createButton(
		"Deletar Evento",
		"event-page-delete-this-event",
		null
	);
	deleteEventBtn.classList.add("none-to-download");
	deleteEventBtn.classList.add("btn-section");
	deleteEventBtn.addEventListener("click", (e) => {
		e.preventDefault();
		if (modal instanceof HTMLElement) {
			modal.style.display = "flex";
		}
	});

	buttonSection.appendChild(downloadPngBtn);
	buttonSection.appendChild(guestButton);
	buttonSection.appendChild(homeButton);
	buttonSection.appendChild(deleteEventBtn);
	return buttonSection;
};

const createHeaderEvent = () => {
	const toggleContainer = htmlCreator.createDiv("toggle-container");
	const toggleBtn = htmlCreator.createDiv("toggle-edit-btn");

	toggleContainer.addEventListener("click", () => {
		toggleContainer.classList.toggle("active-toggle-btn");

		const editDishesBtn = document.querySelectorAll(".edit-event-dishes");
		const editInfosEvent = document.querySelectorAll(".edit-event-btn");
		const selectDishType = document.getElementById("select-dish-type");

		if (toggleContainer.classList.contains("active-toggle-btn")) {
			editDishesBtn.forEach((btn) => btn.classList.remove("edit-hidden"));
			editInfosEvent.forEach((btn) =>
				btn.classList.remove("edit-hidden")
			);
			if (selectDishType) {
				selectDishType.classList.remove("edit-hidden");
			}
		} else {
			editDishesBtn.forEach((btn) => btn.classList.add("edit-hidden"));
			editInfosEvent.forEach((btn) => btn.classList.add("edit-hidden"));
			if (selectDishType) {
				selectDishType.classList.add("edit-hidden");
			}
		}
	});

	toggleContainer.appendChild(toggleBtn);

	const toggleText = htmlCreator.createSpan("Modo Edição");
	const divToggleBtn = htmlCreator.createDiv("div-toggle-btn");
	divToggleBtn.appendChild(toggleText);
	divToggleBtn.appendChild(toggleContainer);

	const header = getHeader(false, true);
	const profileIcon = header.children[1];
	header.removeChild(profileIcon);

	header.appendChild(divToggleBtn);
	return header;
};

function handleDownloadPNG() {
	apiLoading(true);
	const main = document.getElementById("main-page-event");
	const cardDishes = document.querySelectorAll(".card-dishes");

	for (const card of cardDishes) {
		card.classList.add("clean-to-download");
	}

	const containersToClean = document.querySelectorAll(".none-to-download");
	for (const container of containersToClean) {
		container.classList.add("clean-to-dowload");
	}

	main.classList.add("clean-to-download");
	main.style.width = "1100px";

	html2canvas(main).then(function (canvas) {
		const imgData = canvas.toDataURL("image/png");
		const a = document.createElement("a");
		a.href = imgData;
		a.download = "evento.png";
		a.click();

		main.classList.remove("clean-to-download");
		main.style.width = "";

		for (const card of cardDishes) {
			card.classList.remove("clean-to-download");
		}
		apiLoading(false);
	});
}

const createEventPageComponent = async (constructorInfo = { eventID: "" }) => {
	const eventID = constructorInfo.eventID;
	if (eventID) {
		localStorage.setItem("eventInfo", JSON.stringify({ eventID }));
	}

	const storageEventID = JSON.parse(localStorage.getItem("eventInfo"));

	const requestEventInfos = await getEventById(
		eventID || storageEventID.eventID
	);

	if (requestEventInfos.error) {
		showToast(requestEventInfos.error);
		dispatchOnStateChange("/home", { animation: false });
		return document.createDocumentFragment();
	}

	const { eventInfos } = requestEventInfos;

	const header = createHeaderEvent();
	const initialDiv = createEventMainTitleDiv();
	const basicInfosSection = createSectionBasicInfos(
		eventInfos.basicInfos,
		eventID || storageEventID.eventID
	);
	const menuSection = await createMenuSection(
		eventInfos.dishes,
		eventID || storageEventID.eventID
	);
	const locationSection = await createLocationSection(
		eventInfos.basicInfos?.eventLocation,
		eventID || storageEventID.eventID
	);

	const modal = cancelThisEventModal(
		eventID || storageEventID.eventID,
		"Continuar edição",
		"Deletar evento",
		"Deletar evento?"
	);
	const buttonSection = createButtonSection(eventID, modal);

	const mainContainer = htmlCreator.createSection("event-main-container");
	mainContainer.appendChild(basicInfosSection);
	mainContainer.appendChild(menuSection);
	mainContainer.appendChild(locationSection);
	mainContainer.appendChild(buttonSection);
	mainContainer.appendChild(modal);

	const main = document.createElement("main");
	main.id = "main-page-event";
	main.appendChild(initialDiv);
	main.appendChild(mainContainer);

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(main);

	return wrapper;
};

export default createEventPageComponent;
