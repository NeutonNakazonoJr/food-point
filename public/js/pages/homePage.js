import getHeader from "../components/header.js";
import { friendlyDayOfWeek } from "../utils/friendlyDayOfWeek.js";
import stringLimiter from "../utils/stringLimiter.js";
import { getEvents } from "../api/eventApi.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import showToast from "../components/toast.js";

const defaultCardValues = {
	width780: {
		charLimit: 20,
		title: "Evento não definido",
		local: "Local não definido",
		theme: "Tema não definido",
		date: null,
		time: null,
	},
	width300: {
		charLimit: 11,
		title: "Evento vazio",
		local: "Local vazio",
		theme: "Tema vazio",
		date: null,
		time: null,
	},
	getValue: (isDesktop, targetInfo) => {
		if (isDesktop) {
			return defaultCardValues.width780[targetInfo] ?? null;
		}
		return defaultCardValues.width300[targetInfo] ?? null;
	},
};

/**
 * @param {HTMLAnchorElement} anchor
 * @param {string} href
 * @param {object} constructorInfo
 */
function setListenerToAnchor(anchor, href, constructorInfo) {
	anchor.addEventListener("click", (e) => {
		e.preventDefault();
		dispatchOnStateChange(href, constructorInfo);
	});
}

/** @param {HTMLElement} card
 * @param {boolean} animation
 * @returns
 */
function setAnimationForCard(
	card,
	multiplayer = 0,
	delay = 100,
	animation = true
) {
	if (!animation) {
		return;
	}
	card.style.animationName = "homeCardAnimation";
	card.style.animationDelay = `${multiplayer * delay}ms`;
}

function setTextContent(html, text, targetTextValue) {
	if (html instanceof HTMLElement) {
		const isDesktopNow = isDesktop();
		const textLengthLimit =
			defaultCardValues.getValue(isDesktopNow, "charLimit") ?? 11;

		const textIsValid = text && typeof text === "string" && text.length > 1;

		const targetText = textIsValid
			? text
			: defaultCardValues.getValue(isDesktopNow, targetTextValue);

		if (typeof targetText !== "string") {
			return;
		}
		const finalText = stringLimiter(targetText, textLengthLimit);
		html.textContent = finalText;
	}
}

function isDesktop() {
	const currentWidth =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	return currentWidth > 780;
}

function generateMainCard(
	eventID,
	eventUrl,
	billUrl,
	cardInfo = {},
	cardImg = {
		src: "https://img.freepik.com/fotos-gratis/massa-fresca-com-farto-queijo-a-bolonhesa-e-parmesao-gerado-por-ia_188544-9469.jpg?t=st=1712773655~exp=1712777255~hmac=0711228877b295d6f4609d4c9d99870f5cb24ab212798119badc04d1adb9381c&w=826",
		alt: "prato com macarrão. um garfo está levantando uma porção do macarrão",
	}
) {
	let lastResizeWasDesktop = isDesktop();
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

	setListenerToAnchor(anchorMyEvent, eventUrl, {
		eventID: eventID,
		animation: false,
	});
	setListenerToAnchor(anchorBillList, billUrl, {
		eventID: eventID,
		animation: false,
	});

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
	const spanTheme = document.createElement("span");

	h3.classList.add("home__card__info__title");
	spanLocal.classList.add("home__card__info__local");
	spanTheme.classList.add("home__card__info__theme");

	setTextContent(h3, cardInfo.title, "title");
	setTextContent(spanLocal, cardInfo.local, "local");
	setTextContent(spanTheme, cardInfo.theme, "theme");

	// creating and defining the information for
	// the items of basicDate
	const spanDate = document.createElement("span");
	const spanDateDay = document.createElement("span");
	const spanHours = document.createElement("span");

	spanDate.classList.add("home__card__info__date");
	spanHours.classList.add("home__card__info__hours");

	if (typeof cardInfo.date !== "string") {
		spanDate.style.display = "none";
	}
	if (typeof cardInfo.time !== "string") {
		spanHours.style.display = "none";
	}

	setTextContent(spanDate, cardInfo.date, "date");
	setTextContent(spanHours, cardInfo.time, "time");

	if (
		cardInfo.date &&
		typeof cardInfo.date === "string" &&
		/^(\d{2})\/(\d{2})\/(\d{4})$/.test(cardInfo.date)
	) {
		const splicedStr = cardInfo.date.split("/");
		const correctDate = `${splicedStr[2]}-${splicedStr[1]}-${splicedStr[0]}T00:00:00`;
		const eventDate = new Date(correctDate);
		const eventDay = eventDate.getDay();
		spanDateDay.textContent = `(${stringLimiter(
			friendlyDayOfWeek(eventDay),
			3,
			false
		)})`;
	}
	spanDate.appendChild(spanDateDay);

	// CONNECTING ALL
	divBasicInfo.appendChild(h3);
	divBasicInfo.appendChild(spanLocal);
	divBasicInfo.appendChild(spanTheme);

	divDateInfo.appendChild(spanDate);
	divDateInfo.appendChild(spanHours);

	divInfo.appendChild(divBasicInfo);
	divInfo.appendChild(divDateInfo);

	anchorMyEvent.appendChild(img);
	anchorMyEvent.appendChild(divInfo);

	article.appendChild(anchorMyEvent);
	article.appendChild(anchorBillList);

	window.addEventListener("resize", () => {
		const isDesktopNow = isDesktop();
		if (isDesktopNow !== lastResizeWasDesktop) {
			setTextContent(h3, cardInfo.title, "title");
			setTextContent(spanLocal, cardInfo.local, "local");
			setTextContent(spanTheme, cardInfo.theme, "theme");

			setTextContent(spanDate, cardInfo.date, "date");
			setTextContent(spanHours, cardInfo.time, "time");
			lastResizeWasDesktop = isDesktopNow;
		}
	});

	return article;
}

function generateCreateEventCard(
	createEventUrl,
	callToActionText = "Adicionar novo Evento"
) {
	const a = document.createElement("a");
	a.href = createEventUrl;
	a.id = "homeBtnNewEvent";

	a.addEventListener("click", async (e) => {
		e.preventDefault();
		try {
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			};
			const res = await fetch("/api/event", requestOptions);
			const result = await res.json();
			if (res.status !== 201) {
				throw new Error(result);
			}

			const event = {
				id: result.event_id,
				name: "",
				theme: "",
				description: "",
				date: "",
				time: "",
			};
			dispatchOnStateChange("/home/create", {
				animation: false,
				stage: {
					current: 0,
					last: 0,
				},
				event: event,
			});
		} catch (error) {
			showToast(error.message, 500);
		}
	});

	const spanImg = document.createElement("span");
	const spanText = document.createElement("span");
	spanText.textContent = callToActionText;

	a.appendChild(spanImg);
	a.appendChild(spanText);

	return a;
}

/** Connects to food point API and returns the
 * @param {number} userID
 * @returns
 */
export default async function homePage(constructorInfo = { animation: true }) {
	const header = getHeader(constructorInfo.animation);
	const main = document.createElement("main");
	main.id = "homeMain";
	main.style.animationName = constructorInfo.animation ? "fadeIn" : "";

	const h1 = document.createElement("h1");
	h1.textContent = "Meus eventos";
	setAnimationForCard(h1, 0, 100, constructorInfo.animation);
	main.appendChild(h1);

	const span = document.createElement("span");
	span.textContent =
		"Clique em um evento para ver mais detalhes ou crie um novo evento.";
	setAnimationForCard(span, 0, 100, constructorInfo.animation);
	main.appendChild(span);

	const result = await getEvents();

	console.log(result.events);

	const events = Array.isArray(result.events) ? result.events : [];
	if (result instanceof Error) {
		showToast(JSON.stringify(result.message));
	}

	const cards = events.map((event, index) => {
		const myCard = generateMainCard(event.event_id, `/event`, `/list`, {
			title: event.event_name,
			local: event.event_location,
			theme: event.theme,
			date: event.event_date,
			time: event.event_time,
		});
		setAnimationForCard(myCard, index, 100, constructorInfo.animation);
		return myCard;
	});

	const createEventCard = generateCreateEventCard("/home/create");
	setAnimationForCard(
		createEventCard,
		events.length + 1,
		100,
		constructorInfo.animation
	);

	cards.forEach((card) => {
		main.appendChild(card);
	});
	main.appendChild(createEventCard);

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(main);
	return wrapper;
}
