import getHeader from "../components/header.js";

const createProfile = () => {
    const page = document.createElement("div");
    page.id = "profile"
    const header = getHeader();
    page.appendChild(header);
    const body = document.createElement("div");
    body.id = "profile-body"
    page.appendChild(body)

    const leftBar = document.createElement("div");
    leftBar.id = "left-bar"
    body.appendChild(leftBar);
    const buttonArea = document.createElement("div");
    buttonArea.id = "button-area";
    const back = document.createElement("button");
    back.id = "back";
    back.textContent = "Voltar";
    leftBar.appendChild(buttonArea)
    buttonArea.appendChild(back);
    return page;
}
export default createProfile