/**
 *
 * @param {HTMLButtonElement} button
 * @param {boolean} loading
 * @param {"fork-white" | "spoon-white"} svgIcon
 */
export function buttonLoadState(
	button,
	loading = true,
	svgIcon = "fork-white"
) {
	if (button && button instanceof HTMLButtonElement) {
		if (loading) {
			button.disabled = true;
			button.style.cursor = "not-allowed";
			button.style.backgroundImage =
				'url("/assets/svg-animated/' + svgIcon + '.svg")';
		} else {
			button.removeAttribute("style");
			button.disabled = false;
		}
	}
}
/**
 * @param {HTMLButtonElement} button
 * @param {boolean} loading
 * @param {"fork-white" | "spoon-white"} svgIcon
 */
export function setButtonAfterInLoadState(
	button,
	loading = true,
	svgIcon = "fork-white"
) {
	if (button && button instanceof HTMLButtonElement) {
		const className = "button__loading-pseudoElements-" + svgIcon;
		if (loading) {
			button.disabled = true;
			button.style.cursor = "not-allowed";
			button.classList.add(className);
		} else {
			button.disabled = false;
			button.removeAttribute("style");
			button.classList.remove(className);
		}
	}
}
