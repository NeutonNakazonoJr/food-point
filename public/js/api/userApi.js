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

	const res = await fetch(loginUrl, requestOptions);
	const result = res.json();
	return result;
}
