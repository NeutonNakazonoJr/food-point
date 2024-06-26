import getHeader from "../../components/header.js";
import dispatchOnStateChange from "../../events/onStateChange.js";
import notification from "../../components/notification.js";
import { getMyLogin } from "../../api/userApi.js";
import apiLoading from "../../utils/load/apiLoading.js";

const createProfileDesktop = () => {
    const page = document.createElement("div");
    page.id = "profile"
    const header = getHeader(false, false);
    page.appendChild(header);

    //menu bar
    const leftSide = document.createElement("div");
    leftSide.id = "left-side";
    page.appendChild(leftSide);

    const buttonArea = document.createElement("div");
    buttonArea.className = "button-area";
    const back = document.createElement("button");
    back.id = "back";
    back.textContent = "Voltar";
    const backIcon = document.createElement("img");
    backIcon.id = "back-icon"
    backIcon.src = "/assets/icons/flag-back.svg";
    backIcon.alt = "icone de flecha para voltar"
    leftSide.appendChild(buttonArea);
    buttonArea.appendChild(back);
    back.appendChild(backIcon);

    const menuArea = document.createElement("div");
    menuArea.id = "menu-area";
    leftSide.appendChild(menuArea)

    const editProfileMenu = document.createElement("div");
    editProfileMenu.className = "link";
    const editText = document.createElement("h3");
    editText.textContent = "Editar Perfil";
    editProfileMenu.appendChild(editText);
    menuArea.appendChild(editProfileMenu);

    const editPasswordMenu = document.createElement("div");
    editPasswordMenu.className = "link";
    const editPasswordText = document.createElement("h3");
    editPasswordText.textContent = "Segurança";
    editPasswordMenu.appendChild(editPasswordText);
    menuArea.appendChild(editPasswordMenu);

    const helpMenu = document.createElement("div");
    helpMenu.className = "link";
    const helpText = document.createElement("h3");
    helpText.textContent = "Central de Ajuda";
    helpMenu.appendChild(helpText);
    menuArea.appendChild(helpMenu);

    //content side
    const rightSide = document.createElement("div");
    rightSide.id = "right-side";
    page.appendChild(rightSide);

    //content - edit profile

    const editProfile = document.createElement("div");
    editProfile.className = "content"

    const background = document.createElement("div");
    background.className = "background";
    rightSide.appendChild(editProfile)
    editProfile.appendChild(background)

    //profile image area
    const headerProfile = document.createElement("div");
    headerProfile.id = "header-profile";
    editProfile.appendChild(headerProfile);
    const containerImage = document.createElement("div");
    const profileImage = document.createElement("div")
    profileImage.className = "profile-image";
    getImage();
    headerProfile.appendChild(containerImage);
    containerImage.appendChild(profileImage)

    //username and image edit anchor
    const textarea = document.createElement("div");
    textarea.className = "name-area";
    const name = document.createElement("h2");
    async function userName() {
        const data = await getMyLogin();
        name.textContent = data.fullname;
    }
    userName()
    const inputImg = document.createElement("input");
    inputImg.type = "file";
    inputImg.id = "image-input";
    inputImg.accept = "image/*";
    const anchor = document.createElement("a");
    anchor.id = "anchor"
    anchor.href = "#"
    anchor.textContent = "Editar foto de perfil"
    const aIcon = document.createElement("img");
    aIcon.className = "profile-icon"
    aIcon.src = "/assets/icons/pencil.svg";
    aIcon.alt = "Icone de um lápis;"
    textarea.appendChild(name);
    textarea.appendChild(anchor);
    textarea.appendChild(inputImg)
    anchor.appendChild(aIcon)
    headerProfile.appendChild(textarea)

    //form area
    const formPublic = document.createElement("form");
    formPublic.className = "form";
    editProfile.appendChild(formPublic)

    //user full name input
    const nameForm = document.createElement("div");
    nameForm.className = "div-form";
    const namediv = document.createElement("div");
    namediv.className = "div-label";
    const personIcon = document.createElement("img");
    personIcon.className = "form-icon"
    personIcon.src = "/assets/icons/userLogin.svg";
    personIcon.alt = "Icone de pessoa";
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Nome Completo: "
    const nameInput = document.createElement("input");
    nameInput.className = "profile-input"
    nameInput.type = "text";
    nameInput.placeholder = "Digite seu nome completo";
    nameInput.alt = "Digite seu nome completo";
    formPublic.appendChild(nameForm)
    namediv.appendChild(personIcon)
    namediv.appendChild(nameLabel)
    nameForm.appendChild(namediv)
    nameForm.appendChild(nameInput)

    //user email input
    const emailForm = document.createElement("div");
    emailForm.className = "div-form";
    const emailDiv = document.createElement("div");
    emailDiv.className = "div-label"
    const emailIcon = document.createElement("img");
    emailIcon.className = "form-icon";
    emailIcon.src = "/assets/icons/email-symbol.svg";
    emailIcon.alt = "Icone de carta";
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email: "
    const emailInput = document.createElement("input");
    emailInput.className = "profile-input";
    emailInput.type = "email";
    emailInput.placeholder = "Digite seu email";
    emailInput.alt = "Digite seu email";
    formPublic.appendChild(emailForm)
    emailDiv.appendChild(emailIcon)
    emailDiv.appendChild(emailLabel);
    emailForm.appendChild(emailDiv);
    emailForm.appendChild(emailInput)

    //endpage
    const endpage = document.createElement("div");
    endpage.className = "endpage";
    editProfile.appendChild(endpage)

    const save = document.createElement("button");
    save.className = "save"
    save.textContent = "Salvar Informações"
    const saveIcon = document.createElement("img");
    saveIcon.className = "save-icon"
    saveIcon.src = "/assets/icons/save.svg"
    saveIcon.alt = "Icone de disquete"
    save.appendChild(saveIcon);
    endpage.appendChild(save)

    //content - Security
    const editSecurity = document.createElement("div");
    editSecurity.className = "content"

    const securityBackground = document.createElement("div");
    securityBackground.className = "background";
    editSecurity.appendChild(securityBackground)

    const securityHeader = document.createElement("div");
    securityHeader.className = "tab-header";
    securityHeader.id = "security-header";
    const securityIcon = document.createElement("img");
    securityIcon.className = "tab-icon";
    securityIcon.src = "/assets/icons/password-symbol.svg"
    securityIcon.alt = "Icone de Cadeado"
    const securityTitle = document.createElement("h2");
    securityTitle.textContent = "Edite sua senha";
    securityHeader.appendChild(securityIcon);
    securityHeader.appendChild(securityTitle);
    editSecurity.appendChild(securityHeader);

    const formSecurity = document.createElement("form");
    formSecurity.className = "form";
    editSecurity.appendChild(formSecurity)
    //user password input
    const passwordForm = document.createElement("div");
    passwordForm.className = "div-form";
    const passworddiv = document.createElement("div");
    passworddiv.className = "div-label"
    const passwordIcon = document.createElement("img");
    passwordIcon.className = "form-icon";
    passwordIcon.src = "/assets/icons/password-symbol.svg";
    passwordIcon.alt = "Icone de cadeado";
    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Senha: "
    const passwordInput = document.createElement("input");
    passwordInput.className = "profile-input";
    passwordInput.type = "password";
    passwordInput.placeholder = "Digite sua senha";
    passwordInput.alt = "Digite sua senha";
    formSecurity.appendChild(passwordForm)
    passworddiv.appendChild(passwordIcon)
    passworddiv.appendChild(passwordLabel)
    passwordForm.appendChild(passworddiv)
    passwordForm.appendChild(passwordInput)

    //confirm password input
    const confirmForm = document.createElement("div");
    confirmForm.className = "div-form";
    const confirmDiv = document.createElement("div");
    confirmDiv.className = "div-label";
    const confirmIcon = document.createElement("img");
    confirmIcon.className = "form-icon";
    confirmIcon.src = "/assets/icons/password-symbol.svg";
    confirmIcon.alt = "Icone de cadeado";
    const confirmLabel = document.createElement("label");
    confirmLabel.textContent = "Confirmar Senha: "
    const confirmInput = document.createElement("input");
    confirmInput.className = "profile-input";
    confirmInput.type = "password";
    confirmInput.placeholder = "Digite sua senha";
    confirmInput.alt = "Digite sua senha";
    formSecurity.appendChild(confirmForm)
    confirmDiv.appendChild(confirmIcon)
    confirmDiv.appendChild(confirmLabel)
    confirmForm.appendChild(confirmDiv)
    confirmForm.appendChild(confirmInput)

    //security endpage
    const securityEndpage = document.createElement("div");
    securityEndpage.className = "endpage";
    editSecurity.appendChild(securityEndpage);

    const savePassword = document.createElement("button");
    savePassword.className = "save"
    savePassword.textContent = "Salvar Senha"
    const buttonIcon = document.createElement("img");
    buttonIcon.className = "save-icon"
    buttonIcon.src = "/assets/icons/save.svg"
    buttonIcon.alt = "Icone de disquete"
    savePassword.appendChild(buttonIcon);
    securityEndpage.appendChild(savePassword)

    //content - help
    const helpTab = document.createElement("div");
    helpTab.className = "content"
    const helpHeader = document.createElement("div");
    helpHeader.className = "tab-header"
    const helpIcon = document.createElement("img");
    helpIcon.className = "tab-icon";
    helpIcon.src = "/assets/icons/support.svg"
    helpIcon.alt = "Icone de ajuda e suporte"
    const helpTitle = document.createElement("h1");
    helpTitle.textContent = "Central de Ajuda";
    helpHeader.appendChild(helpIcon)
    helpHeader.appendChild(helpTitle)
    helpTab.appendChild(helpHeader)

    const helpBody = document.createElement("div");
    helpBody.id = "help-body";
    const subtitle = document.createElement("h2");
    subtitle.textContent = "Em que podemos te ajudar? Entre em contato conosco! "
    const helpIntr = document.createElement("p");
    helpIntr.className = "p";
    helpIntr.textContent = "Abaixo listamos as nossas formas de contato disponiveis. Estamos ansiosos em lhe atender da melhor maneira possivel.";
    const emails = document.createElement("div");
    emails.id = "help-mails";
    const topic = document.createElement("h3");
    topic.className = "help-topic";
    topic.textContent = "Entre em contato conosco através de um dos endereços de email abaixo: "
    const e1 = document.createElement("h4");
    e1.textContent = "carlos13bem@gmail.com";
    const e2 = document.createElement("h4");
    e2.textContent = "kevineduardoferreira@gmail.com";
    const e3 = document.createElement("h4");
    e3.textContent = "junior_nakazono@hotmail.com";
    const e4 = document.createElement("h4");
    e4.textContent = "santiago.ligia.751@gmail.com";
    const repositoryTitle = document.createElement("h3");
    repositoryTitle.className = "help-topic";
    repositoryTitle.textContent = "Quer saber mais sobre o nosso projeto? Visite nosso repositorio no GitHub: "
    const respositoryAddress = document.createElement("a");
    respositoryAddress.id = "repository-link"
    respositoryAddress.textContent = "https://github.com/NeutonNakazonoJr/food-point";
    respositoryAddress.href = "https://github.com/NeutonNakazonoJr/food-point"
    helpTab.appendChild(helpBody)
    helpBody.appendChild(subtitle)
    helpBody.appendChild(helpIntr)
    helpBody.appendChild(emails)
    helpBody.appendChild(repositoryTitle)
    helpBody.appendChild(respositoryAddress)
    emails.appendChild(topic)
    emails.appendChild(e1)
    emails.appendChild(e2)
    emails.appendChild(e3)
    emails.appendChild(e4)

    //logic of the page

    back.addEventListener("click", () => {
        dispatchOnStateChange("/home")
    })
    //change tabs
    editProfileMenu.addEventListener("click", () => {
        if (rightSide.contains(helpTab)) {
            rightSide.removeChild(helpTab)
        } else if (rightSide.contains(editSecurity)) {
            rightSide.removeChild(editSecurity)
        }
        rightSide.appendChild(editProfile)
    })
    editPasswordMenu.addEventListener("click", () => {
        if (rightSide.contains(editProfile)) {
            rightSide.removeChild(editProfile)
        } else if (rightSide.contains(helpTab)) {
            rightSide.removeChild(helpTab)
        }
        rightSide.appendChild(editSecurity)
    })
    helpMenu.addEventListener("click", () => {
        if (rightSide.contains(editProfile)) {
            rightSide.removeChild(editProfile);
        } else if (rightSide.contains(editSecurity)) {
            rightSide.removeChild(editSecurity)
        }
        rightSide.appendChild(helpTab)
    })

    //logic to display the image on database
    async function getImage() {
		apiLoading(true);
        try {
            fetch("/api/upload")
                .then(response => {
                    if (!response.status == 200) {
                        throw new Error()
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length == 0) {
                        profileImage.style.backgroundImage = `none`;
                    } else {
                        const profileImg = data[0].hash_name;
                        profileImage.style.backgroundImage = `url("/assets/uploads/${profileImg}")`;
                    }
                })
        }
        catch (error) {
            console.error("Erro ao buscar imagem no servidor!", error)
        };
		apiLoading(false);
    }

    //input image logic and send to API
    anchor.addEventListener("click", (event) => {
        event.preventDefault();
        inputImg.click()
    })

    inputImg.addEventListener("change", async (event) => {
		apiLoading(true)
        const picture = event.target.files[0];
        if (picture) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPicture = e.target.result;
                const formData = new FormData();
                formData.append("image", picture);

                fetch("/api/upload", {
                    method: "PUT",
                    body: formData
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error();
                        }
                        profileImage.style.backgroundImage = `url("${newPicture}")`;
                        notification("Imagem Atualizada!")
                    })
                    .catch(error => {
                        notification("Erro ao enviar imagem", error)
                    })
            }
            reader.readAsDataURL(picture);
        }
		apiLoading(false);
    })

    //edit profile informations
    save.addEventListener("click", () => {
        if (validateInfo()) {
            submitUserInfo();
        };
    })
    nameInput.addEventListener("input", () => {
        let name = nameInput.value;
        nameInput.value = name.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
    });

    function validateInfo() {
        const email = emailInput.value.trim();
        const fullName = nameInput.value.trim();
        const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
        const emailValid = regex.test(email);

        if (fullName == "" && email == "") {
            notification("Insira suas novas informações!");
            return false;
        }
        else if (emailValid === false) {
            notification("Insira um endereço de email valido!");
            return false;
        }
        else if (fullName == "") {
            notification("O nome não pode estar vazio!");
            return false;
        }
        return true;
    }
    function submitUserInfo() {
		apiLoading(true);
        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();

        fetch("/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: fullName,
                email: email
            }),
        })
            .then(response => {
                if (response.ok) {
                    notification("Dados Atualizados com Sucesso!");
                    userName()
                } else if (response.status === 400) {
                    return response.json().then(data => {
                        console.error(data.error);
                    });
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                notification("Erro ao atualizar os dados!");
                console.error(error.message)
            });
			apiLoading(false);
    }

    savePassword.addEventListener("click", () => {
        if (validatePassword()) {
            submitNewPassword();
        }
    })
    function validatePassword() {
        const password = passwordInput.value;
        const confirmation = confirmInput.value;

        if (password !== confirmation) {
            notification("As senhas não conferem!");
            return false;
        } else if (password === "") {
            notification("O campo senha não pode estar vazio!")
            return false
        }
        return true
    }

    function submitNewPassword() {
		apiLoading(true);
        const password = passwordInput.value;

        fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    notification("Senha Atualizada com sucesso!");
                } else if (response.status === 400) {
                    return response.json().then(data => {
                        notification(data.error);
                    });
                } else {
                    throw new Error("Erro ao atualizar a nova senha!")
                }
            })
            .catch(error => {
                notification("Erro ao atualizar a senha! Tente Novamente mais tarde!");
                console.error(error.message)
            });
			apiLoading(false);
    }

    return page;
}

export default createProfileDesktop