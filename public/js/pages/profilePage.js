import getHeader from "../components/header.js";

const createProfile = () => {
    const page = document.createElement("div");
    page.id = "profile"
    const header = getHeader();
    page.appendChild(header);
    const body = document.createElement("div");
    body.id = "profile-body"
    page.appendChild(body)

    const leftSide = document.createElement("div");
    leftSide.id = "left-side"
    body.appendChild(leftSide);
    const buttonArea = document.createElement("div");
    buttonArea.id = "button-area";
    const back = document.createElement("button");
    back.id = "back";
    back.textContent = "Voltar";
    const backIcon = document.createElement("img");
    backIcon.className = "profile-icon"
    backIcon.src = "./assets/icons/flag-back.svg";
    backIcon.alt = "icone de flecha para voltar"
    leftSide.appendChild(buttonArea);
    buttonArea.appendChild(back);
    back.appendChild(backIcon);

    const rightSide = document.createElement("div");
    rightSide.id = "right-side";
    body.appendChild(rightSide);

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
    return page;
}
export default createProfile