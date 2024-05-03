import { putEvent } from "../api/eventApi.js";
import eventProgressBar from "../components/eventProgressBar.js";
import getHeader from "../components/header.js";
import showToast from "../components/toast.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import { activeButton, disableButton } from "../utils/disableButton.js";
import cancelThisEventModal from "./modal/deleteEventModal.js";

const regex = `^[a-zA-ZÀ-ÖØ-öø-ÿ\\s"^\\\`\\~\\:\\.\\,\\?\\!\\-]+$`;
const regexTitle =
	'Este campos deve possuir somente letras, espaço, e estes símbolos: [" ^ ` ~ : . , ? ! - ]';

const fieldsBuilderInfo = [
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Nome do evento",
		labelText: "Vamos pôr um nome nesse espetáculo?",
		inputType: "text",
		placeholder: "ex: Churrasco do Claudinho",
		inputID: "newEvent-basic-name",
		pattern: regex,
		title: regexTitle,
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Tema do evento",
		labelText: "Seria legal colocar o tema do evento!",
		inputType: "text",
		placeholder: "ex: Churrasco brasileiro",
		inputID: "newEvent-basic-theme",
		pattern: regex,
		title: regexTitle,
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Descrição do evento",
		labelText: "Me conta mais, o vai rolar?",
		inputType: "text",
		placeholder: "ex: Vamos servir picanha e fraldinha com molho barbecue",
		inputID: "newEvent-basic-description",
		pattern: regex,
		title: regexTitle,
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Data do evento",
		labelText: "Recomendamos ser no final de semana!",
		inputType: "date",
		inputID: "newEvent-basic-date",
		title: "Por favor insira uma data válida.",
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Horário do evento",
		labelText: "Não precisa especificar os segundos.",
		inputType: "time",
		inputID: "newEvent-basic-time",
	},
];

function getFieldset(
	form,
	className,
	legendField,
	labelText,
	inputID,
	type,
	inputValue,
	placeholder,
	pattern,
	title
) {
	const fieldset = document.createElement("fieldset");
	if (className && typeof className === "string") {
		fieldset.classList.add(className);
	}

	const legend = document.createElement("legend");
	legend.textContent = legendField;

	const label = document.createElement("label");
	label.textContent = labelText;
	label.htmlFor = inputID;

	const input = document.createElement("input");
	input.id = inputID;
	input.type = type;
	input.placeholder = placeholder ?? "";
	input.pattern = pattern ?? "";
	input.title = title ?? "";
	input.value = inputValue ?? "";

	if (
		type !== "text" &&
		inputValue !== "" &&
		typeof inputValue === "string"
	) {
		input.value = inputValue.replace(/\//g, "-");
	}
	if (input.type === "date") {
		input.min = new Date().toISOString().split("T")[0];
	}

	const dateTimeInput = input.type === "date" || input.type === "time";
	const eventListener = dateTimeInput ? "blur" : "input";

	input.addEventListener(eventListener, () => {
		const valueCheck = dateTimeInput ? false : input.value === "";
		const dateTimeIsWrong = dateTimeInput
			? input.valueAsDate === null
			: false;

		if (dateTimeIsWrong) {
			input.style.outline = "2px solid red";
			input.setCustomValidity("A data está incompleta.");
			form.dispatchEvent(new CustomEvent("badinput"));
			return;
		} else {
			input.setCustomValidity("");
		}

		if (
			input.type === "text" &&
			!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s"^`~:.,?!-]+$/.test(input.value)
		) {
			input.setCustomValidity(regexTitle);
			input.style.outline = "2px solid red";
			form.dispatchEvent(new CustomEvent("badinput"));
			return;
		} else {
			input.setCustomValidity("");
		}

		if (input.reportValidity() || valueCheck) {
			input.style.outline = "none";
			form.dispatchEvent(new CustomEvent("bluroninput"));
		} else {
			input.style.outline = "2px solid red";
			input.focus();
			form.dispatchEvent(new CustomEvent("badinput"));
		}
	});

	if (legendField) {
		fieldset.appendChild(legend);
	}
	fieldset.appendChild(label);
	fieldset.appendChild(input);

	return fieldset;
}

function getCancelBtn(modal) {
	const btn = document.createElement("button");
	btn.addEventListener("click", async (e) => {
		e.preventDefault();
		if (modal instanceof HTMLElement) {
			modal.style.display = "flex";
		}
	});

	btn.textContent = "Cancelar";

	return btn;
}

function appendContinueBtn(eventId, form, div) {
	if (form instanceof HTMLFormElement && div instanceof HTMLDivElement) {
		const saveBtn = document.createElement("button");
		const skipBtn = document.createElement("button");
		skipBtn.id = "skip-button-new-event-page";

		const checkForm = () => {
			if (form.reportValidity()) {
				activeButton(saveBtn);
				activeButton(skipBtn);
				saveBtn.classList.remove("newEvent-basic-btns-disabled");

				skipBtn.remove();
				div.appendChild(saveBtn);
				return;
			}
			disableButton(saveBtn);
			disableButton(skipBtn);
			saveBtn.classList.add("newEvent-basic-btns-disabled");
		};

		saveBtn.id = "newEvent-basic-btns-save";
		saveBtn.textContent = "Salvar e Continuar";
		skipBtn.textContent = "Decidir mais tarde";

		saveBtn.addEventListener("click", (e) => {
			e.preventDefault();
			saveInfoAndMoveOn(eventId, form);
		});
		skipBtn.addEventListener("click", (e) => {
			e.preventDefault();
			skipThisStep(eventId);
		});

		form.addEventListener("bluroninput", checkForm);
		form.addEventListener("badinput", checkForm);

		div.appendChild(skipBtn);
	}
}

async function saveInfoAndMoveOn(eventId, form) {
	if (form instanceof HTMLFormElement) {
		const fields = {
			description: "newEvent-basic-description",
			date: "newEvent-basic-date",
			name: "newEvent-basic-name",
			theme: "newEvent-basic-theme",
			time: "newEvent-basic-time",
		};

		const dateInputValue = form.elements[fields.date].value;
		const hours = form.elements[fields.time].value;
		let date = "";
		if (dateInputValue !== "") {
			const myHours = hours !== "" ? hours : "00:00";
			date = new Date(
				dateInputValue + "T" + myHours
			).toLocaleDateString();
		}

		const eventInfos = {
			name: form.elements[fields.name].value,
			theme: form.elements[fields.theme].value,
			eventDescription: form.elements[fields.description].value,
			eventDate: date,
			eventTime: hours,
		};
		const result = await putEvent(eventId, eventInfos);
		if (result instanceof Error) {
			showToast(result);
		} else {
			const constructorInfo = {
				event: {
					id: eventId,
				},
				stage: {
					current: 1,
					last: 0,
				},
			};
			dispatchOnStateChange("/home/create/menu", constructorInfo);
		}
	} else {
		throw new Error("Erro no tratamento do formulário!!!!");
	}
}

function skipThisStep(eventId) {
	const constructorInfo = {
		event: {
			id: eventId,
		},
		stage: {
			current: 1,
			last: 0,
		},
	};
	dispatchOnStateChange("/home/create/menu", constructorInfo);
}

export default function newEventBasicPage(
	constructorInfo = {
		stage: {
			current: 0,
			last: 0,
		},
		event: {
			id: "",
			name: "",
			theme: "",
			description: "",
			date: "",
			time: "",
		},
	}
) {
	if (
		!constructorInfo ||
		!constructorInfo.event ||
		constructorInfo.event.id === "" ||
		!constructorInfo.event.id
	) {
		showToast("O evento passado para essa página não é válido!");

		const main = document.getElementById("newEvent-basic");
		dispatchOnStateChange("/home", { animation: true });
		return document.createDocumentFragment();
	}
	const header = getHeader(false, false);
	const timeline = eventProgressBar(
		true,
		true,
		constructorInfo.stage.last,
		constructorInfo.stage.current
	);

	const main = document.createElement("main");
	main.id = "newEvent-basic";

	const h2 = document.createElement("h2");
	h2.textContent = "Novo Evento";

	const form = document.createElement("form");
	form.id = "newEvent-basic-form";

	const divInfo = document.createElement("div");
	const divBtns = document.createElement("div");
	const divDate = document.createElement("div");
	divInfo.id = "newEvent-basic-info";
	divBtns.id = "newEvent-basic-btns";

	fieldsBuilderInfo.forEach((info, index) => {
		const eventKeys = ["name", "theme", "description", "date", "time"];

		if (info.inputType !== "text") {
			const fieldset = getFieldset(
				form,
				"",
				info.legend,
				info.labelText,
				info.inputID,
				info.inputType,
				constructorInfo.event[eventKeys[index]],
				"",
				"",
				info.title ?? ""
			);
			divDate.appendChild(fieldset);
			return;
		}

		const fieldset = getFieldset(
			form,
			info.fieldClassName,
			info.legend,
			info.labelText,
			info.inputID,
			info.inputType,
			constructorInfo.event[eventKeys[index]],
			info.placeholder,
			info.pattern,
			info.title
		);
		divInfo.appendChild(fieldset);
	});

	divInfo.appendChild(divDate);

	const modal = cancelThisEventModal(constructorInfo.event.id);
	const cancelBtn = getCancelBtn(modal);
	divBtns.appendChild(cancelBtn);
	appendContinueBtn(constructorInfo.event.id, form, divBtns);

	form.appendChild(divInfo);
	form.appendChild(divBtns);

	main.appendChild(h2);
	main.appendChild(form);

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(timeline);
	wrapper.appendChild(modal);
	wrapper.appendChild(main);

	return wrapper;
}
