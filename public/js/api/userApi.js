// const url = "https://localhost";

export async function getLogged(
	user = {
		email: "",
		password: "",
	}
) {
	const loginUrl = "/api/login";
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	};

	const res = await fetch(loginUrl, requestOptions);
	const result = res.json();
	return result;
}

export async function getMyLogin() {
	try {
		const url = "/api/user";
		const res = await fetch(url);
		if (!res.ok) {
			const err = await res.json();
			throw err;
		}
		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
}

export async function logout() {
	try {
		const url = "/api/logout";
		const headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await fetch(url, headers);
		if (!res.ok) {
			const err = await res.json();
			throw err;
		}
		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
}
