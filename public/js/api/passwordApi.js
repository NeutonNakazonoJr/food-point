export async function postRecoverPasswordEmail(userEmail) {
	try {
		const url = '/api/recover-pass';
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userEmail),
		};

		const res = await fetch(url, requestOptions);
		if (!res.ok) {
			const error = await res.json();
			throw error;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
}

export async function putRecoverPassword(requestInfo) {
	try {
		const url = '/api/recover-pass';

		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestInfo),
		};

		const res = await fetch(url, requestOptions);
		if (!res.ok) {
			const error = await res.json();
			throw error;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
}