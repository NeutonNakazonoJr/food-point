import { deleteEvent } from "../../api/eventApi.js";
import showToast from "../../components/toast.js";
import dispatchOnStateChange from "../../events/onStateChange.js";
import apiLoading from "../../utils/load/apiLoading.js";

export default function cancelThisEventModal(
	eventID,
	continueBtnText = "Continuar criação",
	cancelBtnText = "Cancelar evento",
	modalTitle = "Cancelar evento?"
) {
	if (!eventID || eventID === "" || typeof eventID !== "string") {
		return document.createDocumentFragment();
	}
	const modal = document.createElement("div");
	const container = document.createElement("div");
	modal.id = "newEvent-basic-modal";
	container.id = "newEvent-basic-modal-container";

	const h2 = document.createElement("h2");
	const p = document.createElement("p");
	const img = document.createElement("img");
	const divBtn = document.createElement("div");
	const btnCancel = document.createElement("button");
	const btnReturn = document.createElement("button");

	h2.textContent = modalTitle;
	p.textContent =
		"ALERTA: Essa ação irá apagar todos os dados escritos até agora!";
	img.src = "/assets/svg-backgrounds/doubt.svg";
	btnCancel.textContent = cancelBtnText;
	btnReturn.textContent = continueBtnText;

	btnCancel.addEventListener("click", async () => {
		apiLoading(true);
		const res = await deleteEvent(eventID);
		if (res.error) {
			showToast(res.error);
			apiLoading(false);
			return;
		} else {
			showToast("Evento deletado com sucesso");
		}
		dispatchOnStateChange("/home", { animation: false });
	});
	btnReturn.addEventListener("click", () => {
		modal.style.display = "none";
	});

	divBtn.appendChild(btnCancel);
	divBtn.appendChild(btnReturn);

	container.appendChild(h2);
	container.appendChild(p);
	container.appendChild(img);
	container.appendChild(divBtn);

	modal.appendChild(container);
	modal.style.display = "none";
	return modal;
}
