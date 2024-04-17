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
    appetizerIcon.src = "/assets/icons/appetizer.svg";
    appetizerIcon.alt = "Icone de bebida";
    typeDish.appendChild(appetizer);
    appetizer.appendChild(appetizerIcon);

    //salad button
    const salad = document.createElement("button");
    salad.className = "dish-type";
    salad.textContent = "Salada";
    const saladIcon = document.createElement("img");
    saladIcon.className = "dish-icon";
    saladIcon.src = "/assets/icons/salad.svg";
    saladIcon.alt = "Icone de bebida";
    typeDish.appendChild(salad);
    salad.appendChild(saladIcon);


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
        if (dish.className === "selected") {
            img.src = iconHover;
        } else {
            img.src = icon;
        }
    })
    dish.addEventListener("click", () => {
        let selected = document.querySelector(".selected");
        if (selected === null) {
            dish.className = "selected"
        } else {
            selected.className = "dish-type";
            dish.className = "selected";
            const imgs = document.querySelectorAll(".dish-icon")

            imgs.forEach(i => {
                let iHover = i.src
                if (iHover != img.src) {
                    let noHover = iHover.replace(/-hover\.svg$/, ".svg");
                    i.src = noHover;
                }
            })
        }
    })
}
/*falta verificar pq some quando seleciona a imagem*/

export default createMenu