import getHeader from "../components/header.js";
import eventProgressBar from "../components/eventProgressBar.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import showToast from "../components/toast.js";
import { getEvents } from "../api/eventApi.js";
import notification from "../components/notification.js";

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
	inputdiv.className = "input-div";
	addguest.appendChild(inputdiv);

	const input = document.createElement("input");
	input.id = "add-input"
	input.className = "guest-input";
	inputdiv.appendChild(input);

	const error = document.createElement("p");
	error.style.display = "none";
	error.textContent = "O campo não pode estar vazio";
	addguest.appendChild(error);

	const button = document.createElement("button");
	button.id = 'add-button';
	button.className = "guest-button";
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


	const guests = [];

	//logic to control the input
	input.addEventListener("input", (event) => {
		let name = input.value;
		input.value = name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
	});

	//logic to create a new card
	addguest.addEventListener("submit", (event) => {
		const guestName = input.value.trim().toLowerCase();
		event.preventDefault();
		if (guestName == ""){
			error.style.display = "block";
			setTimeout( () => {
				error.style.display = "none";
			}, 500)

		} else {
			async function submitGuest() {
				const guest = guestName.replace(/\b\w/g, (c) => c.toUpperCase())
				const data = await getEvents();
				const lastEvent = data.events[data.events.length - 1];
				const eventId = lastEvent.event_id;
				const sendGuest = { name: guestName }

				fetch(`/api/guest/${eventId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(sendGuest)
				})
					.then(response => {
						if(!response.ok){
							throw new Error()
						} 
						return response.json();
					})
					.then(data => {
						document.getElementById("add-input").value = "";
							finish.id = "finish";
							finish.disabled = false;
							const id = data[0].id
							buildCard(guest, id);
							guests.push(guest);
					})
					.catch(error => {
						console.error("Erro interno", error)
						notification("Ocorreu um problema ao adicionar o convidado, tente novamente mais tarde!")
					})
			}
			submitGuest();
		}
	});

	//card builder
	function buildCard(guest, id) {
		const guestCard = document.createElement("div");
		guestCard.id = "guest-card";

		const guestId = id;

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

		const editButton = document.createElement("div");
		editButton.id = "edit-button";

		const pencil = document.createElement("img");
		pencil.src = "/assets/icons/pencil-white.svg";
		pencil.alt = "icone de lápis";

		deleteButton.appendChild(trash);
		editButton.appendChild(pencil);

		guestCard.appendChild(deleteButton);
		guestCard.appendChild(editButton);
		guestCard.appendChild(guestImg);
		guestCard.appendChild(guestName);
		guestBox.appendChild(guestCard);
		guestBox.style.display = "flex";

		const modal = document.createElement("div");
		modal.id = "guest-modal";
		const content = document.createElement("div");
		content.id = "edit-guest-modal";
		const close = document.createElement("div");
		close.id = "close-div"
		const closeIcon = document.createElement("h2");
		closeIcon.id = "X"
		closeIcon.textContent = "X"
		const formEdit = document.createElement("form");
		const label = document.createElement("h3");
		label.textContent = "Editar convidado: "
		const div = document.createElement("div");
		div.className = "input-div";
		const editInput = document.createElement("input");
		editInput.className = "guest-input";
		editInput.value = guest;
		const save = document.createElement("button");
		save.className = "guest-button"
		save.textContent = "Salvar";
		const editError = document.createElement("p");
		editError.style.display = "none";
		editError.textContent = "O campo não pode estar vazio";

		formEdit.appendChild(label);
		div.appendChild(editInput);
		div.appendChild(save);
		formEdit.appendChild(div);
		formEdit.appendChild(editError);
		close.appendChild(closeIcon);
		content.appendChild(close);
		content.appendChild(formEdit);
		modal.appendChild(content);
		body.appendChild(modal);

		//listener to remove the guest card and the data from the localStorage
		deleteButton.addEventListener("click", () => {
			fetch(`/api/guest/${guestId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
			})
			.then(response => {
				if(!response.ok){
					throw new Error()
				}
				else{
					notification("Convidado Removido!")
					guestCard.remove();
					const guestIndex = guests.indexOf(guest);
					if (guestIndex !== -1) {
						guests.splice(guestIndex, 1);
					}
					if (guests.length === 0) {
						guestBox.style.display = "none";
						finish.id = "disabled";
						finish.disabled = "true";
					}
				}
			})
			.catch(error => {
				console.error("Erro interno", error);
				notification("Ocorreu um problema ao remover o convidado, tente novamente mais tarde!")
			})

		});

		//listener to open an edit modal for guest
		editButton.addEventListener("click", () => {
			modal.style.display = "block"
		})
		
		//close modal
		window.onclick = function (event){
			if(event.target == modal){
				modal.style.display = "none"
			}
		}
		closeIcon.addEventListener("click", () => {
			modal.style.display = "none"
		})


		//control edit input and submit new value
		editInput.addEventListener("input", (event) => {
			const input = editInput.value;
			editInput.value = input.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
		})
		save.addEventListener("click", (event) => {
			event.preventDefault();
			const inputValue = editInput.value.trim().toLowerCase();
			if (inputValue == ""){
				editError.style.display = "block";
				setTimeout( () => {
					editError.style.display = "none";
				}, 500)
			} else {
				async function editGuest() {
					const newName = inputValue.replace(/\b\w/g, (c) => c.toUpperCase());
					guestName.textContent = newName;
					const fixedGuest = {name: inputValue}
					modal.style.display = "none";
					
					fetch(`/api/guest/${guestId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(fixedGuest)
					})
					.then(response => {
						if(response.ok){
							notification("Convidado Atualizado!")
						}
						else{
							throw new Error()
						}
					})
					.catch(error => {
						console.error("Erro interno", error)
						notification("Ocorreu um problema ao atualizar o convidado, tente novamente mais tarde!")
					})
				}
				editGuest();
			}
		})
	}


	skipButton.addEventListener("click", (e) => {
		dispatchOnStateChange("/home");
	});
	//logic that sends the array with the guest list to the api
	finish.addEventListener("click", () => {
		console.log(guests);
		dispatchOnStateChange("/home/create/success");
		dispatchOnStateChange("/home");
	});
	return body;
};

export default createGuestPage;
