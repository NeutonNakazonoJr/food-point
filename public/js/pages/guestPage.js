import getHeader from "../components/header.js";
import eventProgressBar from "../components/eventProgressBar.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import showToast from "../components/toast.js";

//page builder
const createGuestPage = (
	constructorInfo = {
		animation: true,
		stage: {
			current: 0,
			last: 0,
		},
		event: {
			id: "",
		},
	}
) => {
	if (
		!constructorInfo.stage ||
		!constructorInfo.event ||
		constructorInfo.event.id === ""
	) {
		showToast("O evento passado para essa página não é válido!");
		dispatchOnStateChange("/home", { animation: true });
		return document.createDocumentFragment();
	}

	const body = document.createElement("div");
	body.classList.add("guest-page");

	const header = getHeader(false, false);
	body.appendChild(header);

	const progress = eventProgressBar(
		constructorInfo.animation,
		constructorInfo.animation,
		constructorInfo.stage.last,
		constructorInfo.stage.current
	);
	body.appendChild(progress);

	const guestList = document.createElement("div");
	guestList.id = "guest-body";
	body.appendChild(guestList);

	const title = document.createElement("h1");
	title.textContent = "Convidados";
	guestList.appendChild(title);

	const addguest = document.createElement("form");
	addguest.id = "add-guest";
	guestList.appendChild(addguest);

	const label = document.createElement("label");
	label.id = "guest-label";
	label.textContent = "Digite o nome do convidado: ";
	addguest.appendChild(label);

	const inputdiv = document.createElement("div");
	inputdiv.id = "input-div";
	addguest.appendChild(inputdiv);

	const input = document.createElement("input");
	input.id = "add-input";
	inputdiv.appendChild(input);

	const error = document.createElement("p");
	error.style.display = "none";
	error.textContent = "O campo não pode estar vazio";
	addguest.appendChild(error);

	const button = document.createElement("button");
	button.id = "add-button";
	button.textContent = "Adicionar";
	inputdiv.appendChild(button);

	const guestBox = document.createElement("div");
	guestBox.id = "guest-box";
	guestList.appendChild(guestBox);

	const endPage = document.createElement("div");
	endPage.id = "end-page";
	guestList.appendChild(endPage);

	const skipButton = document.createElement("button");
	skipButton.id = "skip";
	skipButton.textContent = "Deixar pra depois";

	const later = document.createElement("img");
	later.id = "later";
	later.src = "/assets/icons/send-latter.svg";
	later.alt = "Carta com relogio";

	skipButton.appendChild(later);
	endPage.appendChild(skipButton);

	const finish = document.createElement("button");
	finish.id = "disabled";
	finish.textContent = "Salvar e Continuar";
	finish.disabled = "true";

	const wineIcon = document.createElement("img");
	wineIcon.id = "finish-icon";
	wineIcon.src = "/assets/icons/glass-of-wine-white.svg";
	wineIcon.alt = "Icone de taça de vinho na cor branca";
	finish.appendChild(wineIcon);
	endPage.appendChild(finish);

	//setting localStorage backup of the data
	const guests = JSON.parse(localStorage.getItem("guests")) || [];

	if (guests.length > 0) {
		guests.forEach((guest) => {
			buildCard(guest);
		});
	}

	//logic to control the input
	input.addEventListener("input", (event) => {
		let name = input.value;
		input.value = name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
	});

	//logic to create a new card and send the guest into local storage
	addguest.addEventListener("submit", (event) => {
		const guest = input.value;
		event.preventDefault();
		if (guest == "") {
			error.style.display = "block";
			setTimeout(() => {
				error.style.display = "none";
			}, 500);
		} else {
			buildCard(guest);
			guests.push(guest);
			const local = JSON.stringify(guests);
			localStorage.setItem("guests", local);
			document.getElementById("add-input").value = "";
			finish.id = "finish";
			finish.disabled = false;
		}
	});

	//card builder
	function buildCard(guest) {
		const guestCard = document.createElement("div");
		guestCard.id = "guest-card";

		const guestImg = document.createElement("img");
		guestImg.id = "guest-img";
		guestImg.src = "/assets/icons/person.svg";
		guestImg.alt = "imagem genérica de uma pessoa";

		const guestName = document.createElement("p");
		guestName.textContent = guest;
		guestName.id = "guest-name";

		const deleteButton = document.createElement("div");
		deleteButton.id = "delete-button";

		const trash = document.createElement("img");
		trash.src = "/assets/icons/trash.svg";
		trash.alt = "icone de lixeira";

		deleteButton.appendChild(trash);
		guestCard.appendChild(deleteButton);
		guestCard.appendChild(guestImg);
		guestCard.appendChild(guestName);
		guestBox.appendChild(guestCard);
		guestBox.style.display = "flex";

		//listener to remove the guest card and the data from the localStorage
		deleteButton.addEventListener("click", () => {
			guestCard.remove();

			const guestIndex = guests.indexOf(guest);
			if (guestIndex !== -1) {
				guests.splice(guestIndex, 1);
			}

			const local = JSON.stringify(guests);
			localStorage.setItem("guests", local);

			if (guests.length === 0) {
				guestBox.style.display = "none";
				finish.id = "disabled";
				finish.disabled = "true";
			}
		});
	}

	skipButton.addEventListener("click", (e) => {
		dispatchOnStateChange("/home");
	});
	//logic that sends the array with the guest list to the api
	finish.addEventListener("click", () => {
		console.log(guests);
		dispatchOnStateChange("/home");
	});
	return body;
};

export default createGuestPage;
