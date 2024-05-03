import getCep from "../../api/cepApi.js";
import showToast from "../../components/toast.js";
import { activeButton, disableButton } from "../../utils/disableButton.js";

export default function cepModal() {
	const wrapper = document.createElement("div");
	wrapper.id = "cepModal";
	const content = document.createElement("div");

	const img = document.createElement("img");
	const form = document.createElement("form");
	const fieldset = document.createElement("fieldset");
	const legend = document.createElement("legend");
	const label = document.createElement("label");
	const input = document.createElement("input");
	const button = document.createElement("button");

	content.id = "cepModalContent";
	img.src = "../../../../assets/svg-backgrounds/map-red.svg";
	form.id = "cepModalForm";
	legend.textContent = "Buscar cep";

	label.htmlFor = "cepModalFormInput";
	label.textContent = "Insira o seu cep aqui";
	input.pattern = "^\\d{5}-\\d{3}$";
	input.title = "Digite somente números no formato XXXXX-XXX";
	input.placeholder = "XXXXX-XXX";
	input.id = "cepModalFormInput";

	button.textContent = "Buscar cep";
	disableButton(button);

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (form.reportValidity()) {
			const res = await getCep(parseInt(input.value.replace("-", "")));
			if (typeof res !== "object") {
				showToast(res.message || res || "CEP não encontrado.");
				return;
			}
			if (!res.lat || !res.lng) {
				showToast("CEP existe, mas não possui coordenadas corretas.");
				return;
			}
			const event = new CustomEvent("publishCep", {
				detail: {
					lat: res.lat,
					lng: res.lng,
				},
			});
			wrapper.dispatchEvent(event);
		}
	});
	input.addEventListener("input", () => {
		if (input.validity) {
			activeButton(button);
		}
	});

	fieldset.appendChild(legend);
	fieldset.appendChild(label);
	fieldset.appendChild(input);
	fieldset.appendChild(button);
	form.appendChild(fieldset);

	content.appendChild(img);
	content.appendChild(form);
	content.addEventListener("click", (e) => {
		e.stopPropagation();
	});

	wrapper.appendChild(content);
	return wrapper;
}
