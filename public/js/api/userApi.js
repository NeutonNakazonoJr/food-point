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
