import { updateEventLocation } from "../api/eventApi.js";
import eventProgressBar from "../components/eventProgressBar.js";
import getHeader from "../components/header.js";
import showToast from "../components/toast.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import apiLoading from "../utils/load/apiLoading.js";
import { setButtonAfterInLoadState } from "../utils/load/buttonLoadState.js";
import cepModal from "./modal/cepModal.js";

function getUserLocation(div, callbackFn) {
	const controller = document.createElement("p");
	const apiLoadedEvent = new CustomEvent("apiLoaded", {});
	const finishApiLoad = () => {
		controller.dispatchEvent(apiLoadedEvent);
	}
	
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
			callbackFn()
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
	})
}

function dispatchSelectLatLng(htmlElement, latLng) {
	if (htmlElement instanceof HTMLDivElement) {
		const event = new CustomEvent("selectLatLng", {
			detail: latLng,
		});
		htmlElement.dispatchEvent(event);
	}
}

function initMap(htmlElement) {
	const defaultLat = -13.473684350806952;
	const defaultLng = -49.5703125;
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

function getMap(main) {
	const div = document.createElement("div");
	const button = document.createElement("button");
	const buttonCep = document.createElement("button");

	button.textContent = "Usar minha localização";
	buttonCep.textContent = "Usar meu cep";
	button.addEventListener("click", () => {
		setButtonAfterInLoadState(button, true);
		getUserLocation(div, () => {
			setButtonAfterInLoadState(button, false);
		})
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
		initMap(div);
	}, 200);

	return div;
}

function getMain() {
	const main = document.createElement("main");
	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	const div = getMap(main);

	main.id = "newEventLocal";
	h1.textContent = "Local";
	p.textContent = "Todo espetáculo precisa de um palco!";

	main.appendChild(h1);
	main.appendChild(p);
	main.appendChild(div);
	return main;
}

function getFooter(eventId, href) {
	const footer = document.createElement("footer");
	const a = document.createElement("a");
	const latLng = {
		lat: null,
		lng: null,
	};

	footer.id = "newEventLocal-footer";
	a.href = href;
	a.textContent = "Decidir mais tarde";
	a.addEventListener("click", async (e) => {
		e.preventDefault();
		const constructorInfo = {
			event: {
				id: eventId,
			},
			stage: {
				current: 3,
				last: 2,
			},
		};
		if (latLng.lat && latLng.lng) {
			const { lat, lng } = latLng;
			const result = await updateEventLocation(eventId, {
				location: `${lat},${lng}`,
			});
			dispatchOnStateChange(href, constructorInfo);
			return;
		}
		dispatchOnStateChange(href, constructorInfo);
	});

	footer.addEventListener("selectLatLng", (e) => {
		latLng.lat = e.detail.lat;
		latLng.lng = e.detail.lng;
		a.removeAttribute("style");
		a.textContent = "Salvar e continuar";
	});

	footer.appendChild(a);
	return footer;
}

export default function newEventLocalPage(constructorInfo) {
	if(!constructorInfo || !constructorInfo.event || !constructorInfo.event.id) {
		showToast("O ID do evento é inválido");
		dispatchOnStateChange("/home");
	}
	const event = constructorInfo.event.id;
	const stage = constructorInfo?.stage || {
		current: 2,
		last: 1,
	};

	const header = getHeader(false, false);
	const eventProgress = eventProgressBar(
		false,
		true,
		stage.last,
		stage.current
	);

	const main = getMain();
	const footer = getFooter(event, "/home/create/guest");
	const wrapper = document.createDocumentFragment();
	main.addEventListener("selectLatLng", (e) => {
		footer.dispatchEvent(new CustomEvent("selectLatLng", e));
	});

	wrapper.appendChild(header);
	wrapper.appendChild(eventProgress);
	wrapper.appendChild(main);
	wrapper.appendChild(footer);
	return wrapper;
}
