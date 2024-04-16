import { patchEvent } from "../api/eventApi.js";
import eventProgressBar from "../components/eventProgressBar.js";
import getHeader from "../components/header.js";
import modalBuilder from "../components/modalBuilder.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import { activeButton, disableButton } from "../utils/disableButton.js";

const fieldsBuilderInfo = [
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Nome do evento",
		labelText: "Vamos pôr um nome nesse espetáculo?",
		inputType: "text",
		placeholder: "ex: Churrasco do Claudinho",
		inputID: "newEvent-basic-name",
		pattern: "^[a-zA-ZÀ-ÖØ-öø-ÿs']+$",
		title: "Este campos deve possuir somente letras",
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Tema do evento",
		labelText: "Seria legal colocar o tema do evento!",
		inputType: "text",
		placeholder: "ex: Churrasco brasileiro",
		inputID: "newEvent-basic-theme",
		pattern: "^[a-zA-ZÀ-ÖØ-öø-ÿs']+$",
		title: "Este campos deve possuir somente letras",
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Descrição do evento",
		labelText: "Me conta mais, o vai rolar?",
		inputType: "text",
		placeholder: "ex: Vamos servir picanha e fraldinha com molho barbecue",
		inputID: "newEvent-basic-description",
		pattern: "^[a-zA-ZÀ-ÖØ-öø-ÿ\\s']+$",
		title: "Este campos deve possuir somente letras",
	},
	{
		fieldClassName: "newEvent-basic-genericInput",
		legend: "Data do evento",
		labelText: "Por favor não coloque 17/09/2024",
		inputType: "date",
		inputID: "newEvent-basic-date",
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
		input.value = inputValue.replace("/", "-");
	}

	input.addEventListener("blur", (e) => {
		if (input.value !== "") {
			if (input.checkValidity()) {
				input.style.outline = "none";
				form.dispatchEvent(new CustomEvent("bluroninput"));
			} else {
				input.style.outline = "2px solid red";
				input.focus();
				form.dispatchEvent(new CustomEvent("badinput"));
			}
		}
	});

	if (legendField) {
		fieldset.appendChild(legend);
	}
	fieldset.appendChild(label);
	fieldset.appendChild(input);

	return fieldset;
}

function getCancelBtn() {
	const btn = document.createElement("button");
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		modalBuilder();
		dispatchOnStateChange("/home", { animation: false });
	});

	btn.textContent = "Cancelar";

	return btn;
}

function appendContinueBtn(form, div) {
	if (form instanceof HTMLFormElement && div instanceof HTMLDivElement) {
		const saveBtn = document.createElement("button");
		const skipBtn = document.createElement("button");

		saveBtn.id = "newEvent-basic-btns-save";
		saveBtn.textContent = "Salvar e Continuar";
		skipBtn.textContent = "Decidir mais tarde";

		saveBtn.addEventListener("click", (e) => {
			e.preventDefault();
			saveInfoAndMoveOn(form);
		});
		skipBtn.addEventListener("click", (e) => {
			e.preventDefault();
			skipThisStep();
		});

		form.addEventListener("bluroninput", () => {
			if (form.reportValidity()) {
				activeButton(saveBtn);
				activeButton(skipBtn);
				saveBtn.classList.remove("newEvent-basic-btns-disabled");

				skipBtn.remove();
				div.appendChild(saveBtn);
			}
		});
		form.addEventListener("badinput", () => {
			if (!form.reportValidity()) {
				disableButton(saveBtn);
				disableButton(skipBtn);
				saveBtn.classList.add("newEvent-basic-btns-disabled");
			}
		});

		div.appendChild(skipBtn);
	}
}

async function saveInfoAndMoveOn(form) {
	if (form instanceof HTMLFormElement) {
		const fields = {
			description: "newEvent-basic-description",
			date: "newEvent-basic-date",
			name: "newEvent-basic-name",
			theme: "newEvent-basic-theme",
			time: "newEvent-basic-time",
		};
		const dateFormatted = new Date(
			form.elements[fields.date].value
		).toLocaleDateString();

		const eventInfos = {
			name: form.elements[fields.name].value,
			theme: form.elements[fields.theme].value,
			description: form.elements[fields.description].value,
			date: dateFormatted.replace(/\//g, "-"),
			time: form.elements[fields.time].value,
		};
		const result = await patchEvent(eventInfos);
		if (result.success) {
			const constructorInfo = {};
			dispatchOnStateChange("/home/create/menu", constructorInfo);
		} else {
			modalBuilder();
		}
	} else {
		throw new Error("Erro no tratamento do formulário!!!!");
	}
}

function skipThisStep() {
	const constructorInfo = {};
	dispatchOnStateChange("/home/create/menu", constructorInfo);
}

export default function newEventBasicPage(
	constructorInfo = {
		stage: {
			current: 0,
			last: 0,
		},
		event: {
			name: "",
			theme: "",
			description: "",
			date: "",
			time: "",
		},
	}
) {
	const header = getHeader(false, true);
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
		const eventKeys = Object.keys(constructorInfo.event);

		if (info.inputType !== "text") {
			const fieldset = getFieldset(
				form,
				"",
				info.legend,
				info.labelText,
				info.inputID,
				info.inputType,
				constructorInfo.event[eventKeys[index]]
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

	const cancelBtn = getCancelBtn();
	divBtns.appendChild(cancelBtn);
	appendContinueBtn(form, divBtns);

	form.appendChild(divInfo);
	form.appendChild(divBtns);

	main.appendChild(h2);
	main.appendChild(form);

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(header);
	wrapper.appendChild(timeline);
	wrapper.appendChild(main);

	return wrapper;
}
