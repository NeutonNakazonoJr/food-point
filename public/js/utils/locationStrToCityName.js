import { coordinateToAddress } from "../api/nominatimApi.js";

export default async function locationStrToCityName(
	location = "",
	completeObject = false
) {
	if (location && typeof location === "string" && location.includes(",")) {
		const spitedLocation = location.split(",");
		if (spitedLocation && spitedLocation.length === 2) {
			const latLng = {
				lat: spitedLocation[0],
				lng: spitedLocation[1],
			};
			const res = await coordinateToAddress(latLng.lat, latLng.lng);
			if (!completeObject) {
				let str = "";
				if (res.city) {
					str += res.city;
				} else if (res.municipality) {
					str += res.municipality;
				}
				if (res.state) {
					str === "" ? (str = "") : (str += " - " + res.state);
				}
				if (str !== "") return str;
				else {
					if (res.state) {
						str += res.state;
					}
					if (
						res.country_code &&
						typeof res.country_code === "string"
					) {
						str += " - " + res.country_code.toUpperCase();
					}
					return str !== "" ? str : null;
				}
			}
			return res;
		}
	}
	return null;
}
