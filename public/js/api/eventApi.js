/** Connects to food point API and returns the events of a
 * specific user
 *
 */
export async function getEvents() {
	try {
		const url = "/api/event";
		const res = await fetch(url);
		const result = await res.json();

		if (res.status !== 200 || result.error) {
			throw new Error(
				result.error || "Erro ao buscar os eventos para o usuário."
			);
		}

		return result;
	} catch (error) {
		return error;
	}
}

export async function putEvent(eventId, eventInfo) {
	try {
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(eventInfo),
		};
		const url = `/api/event/${eventId}/basic-infos`;
		const res = await fetch(url, requestOptions);
		const result = await res.json();
		if (res.status !== 200 || result.error) {
			throw new Error(result.error);
		}

		return result;
	} catch (error) {
		return error;
	}
}
