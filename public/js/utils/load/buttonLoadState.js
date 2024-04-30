/**
 *
 * @param {HTMLButtonElement} button
 * @param {boolean} loading
 * @param {"fork-white" | "spoon-white"} svgIcon
 */
export default function buttonLoadState(
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
