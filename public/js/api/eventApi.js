/** Connects to food point API and returns the events of a
 * specific user
 *
 */
export function getEvents(userID) {
	// this is just a test information for developers
	return [];
}

export async function patchEvent(event) {
	const p = new Promise((res, rej) => {
		setTimeout(() => {
			res({ success: true });
		}, 1000);
	});

	return await p;
}
