const url = "https://149.28.40.46";

export async function getLogged(
	user = {
		email: "teste@teste.com",
		password: "Abc123!!",
	}
) {
	const loginUrl = url + "/login";
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	};

	const result = await fetch(loginUrl, requestOptions);
	return result;
}
