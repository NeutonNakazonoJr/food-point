const apiUrl = "https://cep.awesomeapi.com.br/json/";

/**
 * Retrieves address information based on the given CEP (Brazilian postal code).
 * @param {number} cep The CEP (postal code) to lookup.
 */
export default async function getCep(cep) {
    if (typeof cep === "number" && cep.toString().length === 8) {
        const response = await fetch(apiUrl + cep.toString());
        const userCep = await response.json();

        if (!response.ok || userCep.code) {
            return userCep.message;
        }
        return userCep;
    }
    return null;
}
