import createModal from "./createModal.js";
import htmlCreator from "../../utils/htmlCreator.js";
import notification from "../../components/notification.js";

const guestList = (eventID) => {
    const guestModalContent = htmlCreator.createSection("guestlist-modal");//caixa branca
    const modal = createModal(guestModalContent);

    const guestTitle = htmlCreator.createTitle("h2", "Convidados");
    guestModalContent.appendChild(guestTitle);
    guestModalContent.appendChild(form(eventID));
    guestModalContent.appendChild(guestBox(eventID));
    guestModalContent.appendChild(endPage());



    modal.addEventListener('click', async (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    return modal
}
export default guestList

const guests = []
console.log(guests)

function form(eventID) {
    const addguest = document.createElement("form");
    addguest.id = "add-guest";
    const label = document.createElement("label");
    label.id = "guest-label";
    label.textContent = "Adicionar um novo convidado: ";
    const inputdiv = document.createElement("div");
    inputdiv.className = "input-div";
    const input = document.createElement("input");
    input.id = "add-input"
    input.className = "guest-input";
    const error = document.createElement("p");
    error.style.display = "none";
    error.textContent = "O campo não pode estar vazio";
    const button = document.createElement("button");
    button.className = "guest-button";
    button.textContent = "Adicionar";
    addguest.appendChild(label);
    addguest.appendChild(inputdiv);
    inputdiv.appendChild(input);
    addguest.appendChild(error);
    inputdiv.appendChild(button);

    input.addEventListener("input", () => {
        let name = input.value;
        input.value = name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
    });

    addguest.addEventListener("submit", (event) => {
        const guestName = input.value.trim().toLowerCase();
        event.preventDefault()
        if (guestName == "") {
            error.style.display = "block";
            setTimeout(() => {
                error.style.display = "none";
            }, 500)
        } else {
            async function submitGuest() {
                const guest = guestName.replace(/\b\w/g, (c) => c.toUpperCase())
                const sendGuest = { name: guestName }

                fetch(`/api/guest/${eventID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sendGuest)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error()
                        }
                        return response.json();
                    })
                    .then(data => {
                        document.getElementById("add-input").value = "";
                        const id = data[0].id
                        createCard(guest, id);
                        guests.push(guest);
                        console.log(guests);
                        notification("Convidado adicionado!")
                        document.getElementById("guest-box-modal").style.display = "flex"
                    })
                    .catch(error => {
                        console.error("Erro interno", error)
                        notification("Ocorreu um problema ao adicionar o convidado, tente novamente mais tarde!")
                    })
            }
            submitGuest();
        }
    })

    return addguest
}

function guestBox(eventID) {
    const box = htmlCreator.createDiv("guest-box-modal");

    fetch(`/api/guest/${eventID}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error()
        })
        .then(data => {
            if (data.length > 0) {
                box.style.display = "flex"
                data.forEach(guest => {
                    createCard(guest.name, guest.id)
                    guests.push(guest.name)
                    console.log(guest)
                });
            }
        })

    return box
}
function createCard(guest, id) {
    const guestCard = htmlCreator.createDiv("guest-card");

    const guestImg = htmlCreator.createImg("/assets/icons/person.svg", "guest-img")
    const name = guest.replace(/\b\w/g, (c) => c.toUpperCase());
    const guestName = htmlCreator.createParagraph(name)
    guestName.id = "guest-name";
    const deleteButton = htmlCreator.createDiv("delete-button");
    const trash = htmlCreator.createImg("/assets/icons/trash.svg");
    const editButton = htmlCreator.createDiv("edit-button");
    const pencil = htmlCreator.createImg("/assets/icons/pencil-white.svg")

    guestCard.appendChild(guestImg);
    guestCard.appendChild(guestName);
    deleteButton.appendChild(trash);
    guestCard.appendChild(deleteButton);
    editButton.appendChild(pencil);
    guestCard.appendChild(editButton);
    document.getElementById("guest-box-modal").appendChild(guestCard)

    editButton.addEventListener("click", () => {
        console.log(guests)
        const guestModalContent = document.getElementById("guestlist-modal")
        const addguest = document.getElementById("add-guest")
        const endpage = document.getElementById("end-page")
        guestModalContent.removeChild(endpage)
        addguest.style.display = "none"

        const content = document.createElement("div");
        content.id = "edit-guest-in-modal";
        const formEdit = document.createElement("form");
        formEdit.id = "form-edit-in-modal"
        const label = document.createElement("h4");
        label.textContent = "Editando convidado:"
        const div = document.createElement("div");
        div.className = "input-div";
        div.id = "edit-modal-input-div"
        const editInput = document.createElement("input");
        editInput.className = "guest-input";
        editInput.id = "teste"
        editInput.value = guest;
        const save = document.createElement("button");
        save.className = "guest-button"
        save.textContent = "Salvar";
        const cancel = document.createElement("button");
        cancel.className = "guest-button"
        cancel.textContent = "Cancelar Edição";
        cancel.id = "cancel-edit"
        const editError = document.createElement("p");
        editError.style.display = "none";
        editError.textContent = "O campo não pode estar vazio";

        formEdit.appendChild(label);
        div.appendChild(editInput);
        div.appendChild(save);
        formEdit.appendChild(div);
        formEdit.appendChild(cancel);
        formEdit.appendChild(editError);
        content.appendChild(formEdit);
        guestModalContent.appendChild(content)

        editInput.addEventListener("input", () => {
            const input = editInput.value;
            editInput.value = input.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
        })

        cancel.addEventListener("click", () => {
            guestModalContent.removeChild(content)
            guestModalContent.appendChild(endpage)
        })

        formEdit.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValue = editInput.value.trim().toLowerCase();
            if (inputValue == "") {
                editError.style.display = "block";
                setTimeout(() => {
                    editError.style.display = "none";
                }, 500)
            } else {
                async function editGuest() {
                    const newName = inputValue.replace(/\b\w/g, (c) => c.toUpperCase());
                    guestName.textContent = newName;
                    const fixedGuest = { name: inputValue }

                    fetch(`/api/guest/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(fixedGuest)
                    })
                        .then(response => {
                            if (response.ok) {
                                notification("Convidado Atualizado!")
                                guestModalContent.removeChild(content)
                                addguest.style.display = "flex";
                                guestModalContent.appendChild(endpage);

                            }
                            else {
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
    })

    deleteButton.addEventListener("click", () => {
        const box = document.getElementById("guest-box-modal")
        fetch(`/api/guest/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error()
                }
                else {
                    notification("Convidado Removido!")
                    guestCard.remove();
                    const guestIndex = guests.indexOf(guest);
                    if (guestIndex !== -1) {
                        guests.splice(guestIndex, 1);
                        console.log(guests)
                    }
                    if (guests.length === 0) {
                        box.style.display = "none";
                    }

                }
            })
            .catch(error => {
                console.error("Erro interno", error);
                notification("Ocorreu um problema ao remover o convidado, tente novamente mais tarde!")
            })

    });

    return guestCard
}

function endPage() {
    const endpage = htmlCreator.createDiv("end-page");
    const save = htmlCreator.createButton("Salvar", "finish", "guest-button")
    endpage.appendChild(save);

    save.addEventListener("click", () => {
        const modal = document.getElementById("modal")
        modal.remove()
    })
    return endpage
}