import { updateEventLocation } from "../../api/eventApi.js";
import showToast from "../../components/toast.js";
import apiLoading from "../../utils/load/apiLoading.js";
import { setButtonAfterInLoadState } from "../../utils/load/buttonLoadState.js";
import locationStrToCityName from "../../utils/locationStrToCityName.js";
import cepModal from "./cepModal.js";
import createModal from "./createModal.js";

function getUserLocation(div, callbackFn) {
	const controller = document.createElement("p");
	const apiLoadedEvent = new CustomEvent("apiLoaded", {});
	const finishApiLoad = () => {
		controller.dispatchEvent(apiLoadedEvent);
	};

	if (navigator && navigator.geolocation) {
		const options = {
			timeout: 10000,
			maximumAge: 0,
		};
		apiLoading(true);
		function publishPosition(position) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;

			if (div instanceof HTMLDivElement) {
				const event = new CustomEvent("postUserGeoLocation", {
					detail: {
						lat: latitude,
						lng: longitude,
					},
				});
				div.dispatchEvent(event);
			}
			finishApiLoad();
			callbackFn();
		}
		function informError(error) {
			if (error instanceof GeolocationPositionError) {
				if (error.code === 1) {
					showToast("O usuário recusou informar a localização.");
				} else if (error.code === 2) {
					showToast(
						"Não foi possível adquirir a localização porque uma ou mais fontes retornaram erro."
					);
				} else if (error.code === 3) {
					showToast(
						"Tempo limite para processar a localização atingido."
					);
				}
			} else {
				showToast(
					"Ocorreu um erro inesperado durante o processamento da localização."
				);
			}
			finishApiLoad();
			callbackFn();
		}
		navigator.geolocation.getCurrentPosition(
			publishPosition,
			informError,
			options
		);
	} else {
		showToast("Geolocalização não suportada pelo navegador.");
	}
	controller.addEventListener("apiLoaded", () => {
		apiLoading(false);
	});
}

function dispatchSelectLatLng(htmlElement, latLng) {
	if (htmlElement instanceof HTMLDivElement) {
		const event = new CustomEvent("selectLatLng", {
			detail: latLng,
		});
		htmlElement.dispatchEvent(event);
	}
}

function initMap(htmlElement, latLng) {
	const defaultLat = latLng?.lat || -13.473684350806952;
	const defaultLng = latLng?.lng || -49.5703125;
	const defaultMinZoom = 3;
	const defaultMaxZoom = 19;
	const map = L.map(htmlElement).setView(
		[defaultLat, defaultLng],
		defaultMinZoom
	);

	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: defaultMaxZoom,
		minZoom: defaultMinZoom,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	const marker = L.marker();
	function onMapClick(e) {
		const latLng = e.latlng;
		marker.setLatLng(latLng).addTo(map);
		dispatchSelectLatLng(htmlElement, latLng);
	}

	if (latLng && latLng.lat && latLng.lng) {
		map.setView(latLng, 10);
		marker.setLatLng(latLng).addTo(map);
	}

	map.on("click", onMapClick);
	if (htmlElement instanceof HTMLDivElement) {
		htmlElement.addEventListener("postUserGeoLocation", (e) => {
			const latLng = {
				lat: e.detail?.lat || defaultLat,
				lng: e.detail?.lng || defaultLng,
			};
			map.setView(latLng, 15);
			marker.setLatLng(latLng).addTo(map);
			dispatchSelectLatLng(htmlElement, latLng);
		});
	}
}

function getMap(main, latLng) {
	const div = document.createElement("div");
	const button = document.createElement("button");
	const buttonCep = document.createElement("button");

	button.textContent = "Usar minha localização";
	buttonCep.textContent = "Usar meu cep";
	button.addEventListener("click", () => {
		setButtonAfterInLoadState(button, true);
		getUserLocation(div, () => {
			setButtonAfterInLoadState(button, false);
		});
	});
	buttonCep.addEventListener("click", (e) => {
		e.preventDefault();
		setButtonAfterInLoadState(buttonCep, true);
		const modal = cepModal(div);
		const root = document.getElementById("root");
		root.appendChild(modal);
		modal.addEventListener("click", () => {
			modal.remove();
			setButtonAfterInLoadState(buttonCep, false);
		});
		modal.addEventListener("publishCep", (e) => {
			modal.remove();
			div.dispatchEvent(new CustomEvent("postUserGeoLocation", e));
			setButtonAfterInLoadState(buttonCep, false);
		});
	});

	div.id = "newEventLocal-map";
	div.appendChild(button);
	div.appendChild(buttonCep);
	div.addEventListener("selectLatLng", (e) => {
		main.dispatchEvent(new CustomEvent("selectLatLng", e));
	});

	setTimeout(() => {
		initMap(div, latLng);
	}, 200);

	return div;
}

function getMain(latLng) {
	const main = document.createElement("main");
	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	const div = getMap(main, latLng);

	main.id = "newEventLocal";
	h1.textContent = "Local";
	p.textContent = "Todo espetáculo precisa de um palco!";

	main.appendChild(h1);
	main.appendChild(p);
	main.appendChild(div);
	return main;
}

function getFooter(eventId, main) {
	const footer = document.createElement("footer");
	const button = document.createElement("button");
	const latLng = {
		lat: null,
		lng: null,
	};

	footer.id = "newEventLocal-footer";
	button.style.backgroundColor = "var(--blackberry)";
	button.textContent = "Cancelar ação";
	button.addEventListener("click", async (e) => {
		e.preventDefault();
		if (latLng.lat && latLng.lng) {
			const { lat, lng } = latLng;
			const str = `${lat},${lng}`;
			const result = await updateEventLocation(eventId, {
				location: str,
			});
			if (result.error || result instanceof Error) {
				showToast(result.error || "Erro ao atualizar localização");
				return;
			}
			if (main instanceof HTMLElement) {
				main.dispatchEvent(new CustomEvent("locationPosted", {}));
				const divLocation = document.getElementById("div-location");
				const paragraph = divLocation.querySelector("p");
				if (paragraph && paragraph instanceof HTMLParagraphElement) {
					paragraph.textContent = await locationStrToCityName(str);
				}
			}
			showToast(result.message || result.success || "Evento atualizado");
			return;
		} else {
			if (main instanceof HTMLElement) {
				main.dispatchEvent(new CustomEvent("locationPosted", {}));
			}
		}
	});

	footer.addEventListener("selectLatLng", (e) => {
		latLng.lat = e.detail.lat;
		latLng.lng = e.detail.lng;
		button.removeAttribute("style");
		button.textContent = "Salvar e continuar";
	});

	footer.appendChild(button);
	return footer;
}

function extractLatLng(eventLocation) {
	if (
		eventLocation &&
		typeof eventLocation === "string" &&
		eventLocation.includes(",")
	) {
		const spitedLocation = eventLocation.split(",");
		if (spitedLocation && spitedLocation.length === 2) {
			const latLng = {
				lat: spitedLocation[0],
				lng: spitedLocation[1],
			};
			return latLng;
		}
	}
	return null;
}

let latLng = {
	lat: null,
	lng: null,
};
const modalLocationComponent = (eventLocation, eventID) => {
	let latLngTemp = extractLatLng(eventLocation);
	if (latLng.lat && latLng.lng) {
		latLngTemp = latLng;
	}
	const main = getMain(latLngTemp || null);
	const footer = getFooter(eventID, main);
	main.addEventListener("selectLatLng", (e) => {
		latLng.lat = e.detail.lat;
		latLng.lng = e.detail.lng;
		footer.dispatchEvent(new CustomEvent("selectLatLng", e));
	});
	main.addEventListener("locationPosted", () => {
		modal.remove();
	});

	const container = document.createElement("div");
	container.id = "eventPage-locationModal";
	container.appendChild(main);
	container.appendChild(footer);
	container.addEventListener("click", (e) => {
		e.stopPropagation();
	});
	const modal = createModal(container);

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.remove();
		}
	});

	return modal;
};

export default modalLocationComponent;
