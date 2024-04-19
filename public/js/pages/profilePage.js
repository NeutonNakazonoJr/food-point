import getHeader from "../components/header.js";

const createProfile = () => {
    const page = document.createElement("div");
    page.id = "profile"
    const header = getHeader();
    page.appendChild(header);

    const leftSide = document.createElement("div");
    leftSide.id = "left-side"
    page.appendChild(leftSide);
    const buttonArea = document.createElement("div");
    buttonArea.id = "button-area";
    const back = document.createElement("button");
    back.id = "back";
    back.textContent = "Voltar";
    const backIcon = document.createElement("img");
    backIcon.id = "back-icon"
    backIcon.src = "./assets/icons/flag-back.svg";
    backIcon.alt = "icone de flecha para voltar"
    leftSide.appendChild(buttonArea);
    buttonArea.appendChild(back);
    back.appendChild(backIcon);



    const rightSide = document.createElement("div");
    rightSide.id = "right-side";
    page.appendChild(rightSide);

    const background = document.createElement("div");
    background.id = "background";
    rightSide.appendChild(background)

    //profile image area
    const headerProfile = document.createElement("div");
    headerProfile.id = "header-profile";
    rightSide.appendChild(headerProfile);
    const profileImage = document.createElement("div");
    profileImage.id = "profile-image";
    headerProfile.appendChild(profileImage);

    //username and image edit anchor
    const textarea = document.createElement("div");
    textarea.id = "name-area";
    const name = document.createElement("h2");
    name.textContent = "Name Complete";
    const anchor = document.createElement("a");
    anchor.id = "anchor"
    anchor.href = ""
    anchor.textContent = "Editar foto de perfil"
    const aIcon = document.createElement("img");
    aIcon.className = "profile-icon"
    aIcon.src = "./assets/icons/pencil.svg";
    aIcon.alt = "Icone de um lápis;"
    textarea.appendChild(name);
    textarea.appendChild(anchor);
    anchor.appendChild(aIcon)
    headerProfile.appendChild(textarea)

    //form area
    const form = document.createElement("form");
    form.id = "form";
    rightSide.appendChild(form)

    //user full name input
    const nameForm = document.createElement("div");
    nameForm.className = "div-form"
    const personIcon = document.createElement("img");
    personIcon.className = "form-icon"
    personIcon.src = "./assets/icons/userLogin.svg";
    personIcon.alt = "Icone de pessoa";
    const nameLabel = document.createElement("label");
    nameLabel.className = "label"
    nameLabel.textContent = "Nome Completo: "
    const nameInput = document.createElement("input");
    nameInput.className = "profile-input"
    form.appendChild(nameForm)
    nameForm.appendChild(personIcon)
    nameForm.appendChild(nameLabel)
    nameForm.appendChild(nameInput)

    //user email input
    const emailForm = document.createElement("div");
    emailForm.className = "div-form"
    const emailIcon = document.createElement("img");
    emailIcon.className = "form-icon";
    emailIcon.src = "./assets/icons/email-symbol.svg";
    emailIcon.alt = "Icone de carta";
    const emailLabel = document.createElement("label");
    emailLabel.className = "label";
    emailLabel.textContent = "Email: "
    const emailInput = document.createElement("input");
    emailInput.className = "profile-input";
    form.appendChild(emailForm)
    emailForm.appendChild(emailIcon)
    emailForm.appendChild(emailLabel)
    emailForm.appendChild(emailInput)
    
    //user password input
    const passwordForm = document.createElement("div");
    passwordForm.className = "div-form"
    const passwordIcon = document.createElement("img");
    passwordIcon.className = "form-icon";
    passwordIcon.src = "./assets/icons/password-symbol.svg";
    passwordIcon.alt = "Icone de cadeado";
    const passwordLabel = document.createElement("label");
    passwordLabel.className = "label";
    passwordLabel.textContent = "Senha: "
    const passwordInput = document.createElement("input");
    passwordInput.className = "profile-input";
    form.appendChild(passwordForm)
    passwordForm.appendChild(passwordIcon)
    passwordForm.appendChild(passwordLabel)
    passwordForm.appendChild(passwordInput)

    //confirm password input
    const confirmForm = document.createElement("div");
    confirmForm.className = "div-form"
    const confirmIcon = document.createElement("img");
    confirmIcon.className = "form-icon";
    confirmIcon.src = "./assets/icons/password-symbol.svg";
    confirmIcon.alt = "Icone de cadeado";
    const confirmLabel = document.createElement("label");
    confirmLabel.className = "label";
    confirmLabel.textContent = "Confirmar Senha: "
    const confirmInput = document.createElement("input");
    confirmInput.className = "profile-input";
    form.appendChild(confirmForm)
    confirmForm.appendChild(confirmIcon)
    confirmForm.appendChild(confirmLabel)
    confirmForm.appendChild(confirmInput)

    //endpage
    const endpage = document.createElement("div");
    endpage.id = "endpage";
    rightSide.appendChild(endpage)

    const save = document.createElement("button");
    save.id = "save"
    save.textContent = "Salvar"
    const saveIcon = document.createElement("img");
    saveIcon.id = "save-icon"
    saveIcon.src = "./assets/icons/save.svg"
    saveIcon.alt = "Icone de disquete"
    save.appendChild(saveIcon);
    endpage.appendChild(save)
    return page;
}
export default createProfile