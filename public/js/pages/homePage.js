import getHeader from "../components/header.js";
import { friendlyDayOfWeek } from "../utils/friendlyDayOfWeek.js";
import stringLimiter from "../utils/stringLimiter.js";

function generateMainCard(
	eventID,
	eventUrl,
	billUrl,
	cardImg = {
		src: "https://img.freepik.com/fotos-gratis/massa-fresca-com-farto-queijo-a-bolonhesa-e-parmesao-gerado-por-ia_188544-9469.jpg?t=st=1712773655~exp=1712777255~hmac=0711228877b295d6f4609d4c9d99870f5cb24ab212798119badc04d1adb9381c&w=826",
		alt: "prato com macarrão. um garfo está levantando uma porção do macarrão",
	},
	cardInfo = {
		title: "Evento vazio",
		local: "Indefinido",
		mainFood: "Indefinido",
		date: "01/01/2000",
		hours: "00:00",
	},
	textLengthLimit = 11
) {
	// my article, the card
	const article = document.createElement("article");
	article.classList.add("home__card");

	// two <a> tags being create and defined with theirs
	// links and classes
	const anchorMyEvent = document.createElement("a");
	const anchorBillList = document.createElement("a");
	anchorMyEvent.href = eventUrl;
	anchorBillList.href = billUrl;
	anchorMyEvent.classList.add("home__card__my-event");
	anchorBillList.classList.add("home__card__my-bill");
	anchorBillList.textContent = "Ver lista de compras";

	// img tag. it have src and alt atributes
	const img = document.createElement("img");
	img.classList.add("home__card__img");
	img.src = cardImg.src;
	img.alt = cardImg.alt;

	// divInfo is the main wrapper of the texts
	const divInfo = document.createElement("div");
	divInfo.classList.add("home__card__info");


	// CHILDREN OF DIV INFO 
	// divInfo have two children: basicInfo and dateInfo
	// these two div's are wrappers of information
	const divBasicInfo = document.createElement("div");
	const divDateInfo = document.createElement("div");

	// creating and defining the information for
	// the items of basicInfo
	const h3 = document.createElement("h3");
	const spanLocal = document.createElement("span");
	const spanMainFood = document.createElement("span");

	h3.classList.add("home__card__info__title");
	spanLocal.classList.add("home__card__info__local");
	spanMainFood.classList.add("home__card__info__main-food");

	h3.textContent = stringLimiter(cardInfo.title, textLengthLimit);
	spanLocal.textContent = stringLimiter(cardInfo.local, textLengthLimit);
	spanMainFood.textContent = stringLimiter(cardInfo.local, textLengthLimit);

	// creating and defining the information for
	// the items of basicDate
	const spanDate = document.createElement("span");
	const spanDateDay = document.createElement("span");
	const spanHours = document.createElement("span");

	spanDate.classList.add("home__card__info__date");
	spanHours.classList.add("home__card__info__hours");

	const eventDay = new Date(cardInfo.date).getDay();
	spanDate.textContent = cardInfo.date;
	spanDateDay.textContent = stringLimiter(friendlyDayOfWeek(eventDay), 3);
	spanDate.appendChild(spanDateDay);
	spanHours.textContent = cardInfo.hours;

	// CONNECTING ALL
	divBasicInfo.appendChild(h3);
	divBasicInfo.appendChild(spanLocal);
	divBasicInfo.appendChild(spanMainFood);
	
	divDateInfo.appendChild(spanDate);
	divDateInfo.appendChild(spanHours);

	divInfo.appendChild(divBasicInfo);
	divInfo.appendChild(divDateInfo);

	anchorMyEvent.appendChild(img);
	anchorMyEvent.appendChild(divInfo);

	article.appendChild(anchorMyEvent);
	article.appendChild(anchorBillList);

	return article;
}

function generateCreateEventCard(createEventUrl, callToActionText) {
	const a = document.createElement("a");
	a.href = createEventUrl;
	a.id = "homeBtnNewEvent";

	const spanImg = document.createElement("span");
	const spanText = document.createElement("span");
	spanText.textContent = callToActionText;

	a.appendChild(spanImg);
	a.appendChild(spanText);

	return a;
}

export default function homePage() {
	const main = document.createElement("main");
	main.id = "homeMain";

	main;

	return main;
}
