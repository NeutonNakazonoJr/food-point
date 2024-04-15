import getHeader from "../components/header.js";
import eventProgressBar from "../components/eventProgressBar.js";

//page builder
const createGuestPage = () => {
	const body = document.createElement("div");
	body.classList.add("guest-page");

	const header = getHeader(true);
	body.appendChild(header);

	const progress = eventProgressBar(true, true, 2, 3)
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

	const button = document.createElement("button");
	button.id = "add-button";
	button.textContent = "Adicionar";
	inputdiv.appendChild(button);

	const guestBox = document.createElement("div");
	guestBox.id = "guest-box";
	guestList.appendChild(guestBox);

	const endPage = document.createElement("div");
	endPage.id = "end-page";
	guestList.appendChild(endPage)
	
	const backward = document.createElement("button");
	backward.id = "back-button";
	backward.textContent = "Voltar";

	const backIcon = document.createElement("img");
	backIcon.id = "back-icon";
	backIcon.src = "./assets/icons/back.svg";
	backIcon.alt = "Icone de seta voltando vermelha";

	backward.appendChild(backIcon)
	endPage.appendChild(backward)

	const finish = document.createElement("button");
	finish.id = "finish"
	finish.textContent = "Concluir Evento"

	const wineIcon = document.createElement("img");
	wineIcon.id = "finish-icon";
	wineIcon.src = "./assets/icons/glass-of-wine-white.svg";
	wineIcon.alt = "Icone de taça de vinho na cor branca";
	finish.appendChild(wineIcon)
	endPage.appendChild(finish)

//setting localStorage backup of the data
	const guests = JSON.parse(localStorage.getItem("guests")) || [];

	if(guests.length > 0) {
		guests.forEach(guest => {
			buildCard(guest)
		});
	}

	//logic to create a new card and send the guest into local storage
	addguest.addEventListener("submit", (event) => {
		const guest = input.value;
		event.preventDefault()
		buildCard(guest)
		guests.push(guest)
		const local = JSON.stringify(guests);
		localStorage.setItem("guests", local);	
		 document.getElementById("add-input").value = "";
	})

	//card builder
	function buildCard(guest) {
		const guestCard = document.createElement("div");
		guestCard.id = "guest-card"
		
		const guestImg = document.createElement("img");
		guestImg.id = "guest-img"
		guestImg.src = "./assets/icons/person.svg";
		guestImg.alt = "imagem genérica de uma pessoa";
		
		const guestName = document.createElement("p");
		guestName.textContent = guest;
		guestName.id = "guest-name";
		
		const deleteButton = document.createElement("div");
		deleteButton.id = "delete-button"; 
		
		const trash = document.createElement("img");
		trash.src = "./assets/icons/trash.svg";
		trash.alt = "icone de lixeira"
		
		deleteButton.appendChild(trash);
		guestCard.appendChild(deleteButton);
		guestCard.appendChild(guestImg);
		guestCard.appendChild(guestName);
		guestBox.appendChild(guestCard);
		guestBox.style.display = "flex";

		//listener to remove the guest card and from the localStorage
		deleteButton.addEventListener("click", () => {
			
			guestCard.remove();
			
			const guestIndex = guests.indexOf(guest)
			if(guestIndex !== -1){
				guests.splice(guestIndex, 1)
			}

			const local = JSON.stringify(guests);
			localStorage.setItem("guests", local);
			
			if(guests.length === 0){
				guestBox.style.display = "none";
			}
			});
	}
	return body;
};

export default createGuestPage;