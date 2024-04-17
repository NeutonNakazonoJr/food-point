import getHeader from "../components/header.js";
import eventProgressBar from "../components/eventProgressBar.js";

const createMenu = () => {
    const page = document.createElement("div");
    page.id = "body";

    //basic body page builder
    const header = getHeader();
    const progress = eventProgressBar(true, true, 0, 1);
    const menu = document.createElement("div");
    menu.id = "menu"

    page.appendChild(header)
    page.appendChild(progress)
    page.appendChild(menu)

    //dishes type menu builder
    const typeDish = document.createElement("div");
    typeDish.id = "dish-menu"
    menu.appendChild(typeDish)
    //appetizer button
    const appetizer = document.createElement("button");
    appetizer.className = "dish-type";
    appetizer.textContent = "Entrada";
    const appetizerIcon = document.createElement("img");
    appetizerIcon.className = "dish-icon";
    appetizerIcon.src = "./assets/icons/appetizer.svg";
    appetizerIcon.alt = "Icone de bebida;"
    typeDish.appendChild(appetizer)
    appetizer.appendChild(appetizerIcon)
    setTimeout(icon, 1)
    return page;
}
function icon() {
    let dishes = document.querySelectorAll(".dish-type");
    dishes.forEach(dish => {
        let img = dish.querySelector(".dish-icon");
        let icon = img.src;
        let iconHover = icon.replace(/(.+)\.svg$/, "$1-hover.svg");
        event(dish, img, icon, iconHover)
    });
}

function event(dish, img, icon, iconHover) {
    dish.addEventListener("mouseenter", () => {
        img.src = iconHover;
    })
    dish.addEventListener("mouseout", () => {
        if(dish.id == ""){
            img.src = icon;
        }else{
            img.src = iconHover;
        }  
        })
    dish.addEventListener("click", () => {
        let selected = document.querySelector("#select");
        if (!selected == null){
            selected.removeAttribute("id");
        }
        dish.id = "selected"
        })
    }

export default createMenu