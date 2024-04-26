import { updateEventLocation } from "../api/eventApi.js";
import eventProgressBar from "../components/eventProgressBar.js";
import getHeader from "../components/header.js";
import showToast from "../components/toast.js";
import dispatchOnStateChange from "../events/onStateChange.js";

function getUserLocation() {
	if (navigator && navigator.geolocation) {
		function publishPosition(position) {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;

			const event = new CustomEvent("postUserGeoLocation", {
				detail: {
					lat: latitude,
					lng: longitude,
				},
			});
			window.dispatchEvent(event);
		}
		function informError(error) {
			showToast("Usuário recusou o pedido.");
		}
		navigator.geolocation.getCurrentPosition(publishPosition, informError);
	} else {
		showToast("Geolocalização não suportada pelo navegador.");
	}
}

function dispatchSelectLatLng(latLng) {
	const event = new CustomEvent("selectLatLng", {
		detail: latLng,
	});
	window.dispatchEvent(event);
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
		dispatchSelectLatLng(latLng);
	}

	map.on("click", onMapClick);
	window.addEventListener("postUserGeoLocation", (e) => {
		const latLng = {
			lat: e.detail?.lat || defaultLat,
			lng: e.detail?.lng || defaultLng,
		};
		map.setView(latLng, 15);
		marker.setLatLng(latLng).addTo(map);
		dispatchSelectLatLng(latLng);
	});
}

function getMap() {
	const div = document.createElement("div");
	const button = document.createElement("button");

	button.textContent = "Usar minha localização";
	button.addEventListener("click", getUserLocation);

	div.id = "newEventLocal-map";
	div.appendChild(button);
	div.addEventListener("selectLatLng", (e) => {
		console.log(e.detail);
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
	const div = getMap();

	main.id = "newEventLocal";
	h1.textContent = "Local";
	p.textContent = "Todo espetáculo precisa de um palco!";

	main.appendChild(h1);
	main.appendChild(p);
	main.appendChild(div);
	return main;
}

function getFooter(href, callBackFunction) {
	const footer = document.createElement("footer");
	const a = document.createElement("a");
	const latLng = {
		lat: null,
		lng: null
	}

	footer.id = "newEventLocal-footer";
	a.href = href;
	a.textContent = "Decidir mais tarde";
	a.addEventListener("click", async (e) => {
		e.preventDefault();
		const constructorInfo = {
			event: {
				id: null,
			},
			stage: {
				current: 3,
				last: 2,
			},
		};
		if(latLng.lat && latLng.lng && constructorInfo.event.id) {
			// await updateEventLocation(constructorInfo.event.id)
		}
		// dispatchOnStateChange(href, constructorInfo);
	});

	window.addEventListener("selectLatLng", (e) => {
		latLng.lat = e.detail.lat;
		latLng.lng = e.detail.lng;
		console.log(latLng);
	});

	footer.appendChild(a);
	return footer;
}

export default function newEventLocalPage(constructorInfo) {
	const event = null || constructorInfo?.event?.id;
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
	const footer = getFooter("/home/create/guest");
	const wrapper = document.createDocumentFragment();

	wrapper.appendChild(header);
	wrapper.appendChild(eventProgress);
	wrapper.appendChild(main);
	wrapper.appendChild(footer);
	return wrapper;
}
