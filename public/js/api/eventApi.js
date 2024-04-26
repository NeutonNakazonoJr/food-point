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
		const url = `/api/event/${eventId}/basic-infos`;
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(eventInfo),
		};
		const res = await fetch(url, requestOptions);
	
		if (res.status !== 200) {
			const error = await res.json();
			throw error;
		}
		
		const result = await res.json();
		return result;
	} catch (error) {
		return error;
	}
}

export async function getEventById(eventId) {
	try {
		const url = `/api/event/${eventId}`;
		const res = await fetch(url);

		if(!res.ok) {
			const error = await res.json();
			throw error;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
}

export async function getPurchaseList(eventId) {
	try {
		const url = `/api/event/${eventId}/purchase-list`;
		const res = await fetch(url);

		if (!res.ok) {
			const error = await res.json();
			throw error;
		}

		return await res.json();
	} catch (error) {
		return error;
	}
}

//-----------------DISH ENDPOINTS-----------------

export async function postDish(eventID, dish) {
	try {
		const url = `/api/event/${eventID}/dish`;
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dish),
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

export async function updateDishName(eventID, dishID, dishName) {
	try {
		const url = `/api/event/${eventID}/dish/${dishID}`;
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dishName),
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

export async function deleteDish(eventID, dishID) {
	try {
		const url = `/api/event/${eventID}/dish/${dishID}`;
		const requestOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
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

//-----------------INGREDIENT ENDPOINTS-----------------

export async function postIngredient(eventID, dishID, ingredient) {
	try {
		const url = `/api/event/${eventID}/dish/${dishID}/ingredient/`;
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(ingredient),
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

export async function updateIngredient(
	eventID,
	dishID,
	ingredientID,
	ingredient
) {
	try {
		const url = `/api/event/${eventID}/dish/${dishID}/ingredient/${ingredientID}`;
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(ingredient),
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

export async function deleteIngredient(eventID, dishID, ingredientID) {
	try {
		const url = `/api/event/${eventID}/dish/${dishID}/ingredient/${ingredientID}`;
		const requestOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
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
