const daysOfWeek = {
	0: "Domingo",
	1: "Segunda",
	2: "Terça",
	3: "Quarta",
	4: "Quinta",
	5: "Sexta",
	6: "Sábado",
};
/** Returns a string representation of the day in Brazilian portuguese
 * @param {number} day
 * @returns {string}
 */
export function friendlyDayOfWeek(day) {
	return daysOfWeek[day];
}
