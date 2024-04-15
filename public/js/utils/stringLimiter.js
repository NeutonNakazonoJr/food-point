/** Returns the string sliced in the lengthLimit |
 * Ex: string = "James Saladas" | lengthLimit = 3 => "Jam..." |
 * If useDots, the return will have "..." in the end.
 *
 * @param {string} string
 * @param {number} lengthLimit
 */
export default function stringLimiter(string, lengthLimit, useDots = true) {
	if (typeof string === "string" && string.length >= lengthLimit) {
		const slicedString = string.substring(0, lengthLimit);
		return useDots ? slicedString.trim() + "..." : slicedString;
	}
	return string;
}
