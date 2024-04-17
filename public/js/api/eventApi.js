/** Connects to food point API and returns the events of a
 * specific user
 *
 */
export function getEvents(userID) {
	// this is just a test information for developers
	return [];
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
