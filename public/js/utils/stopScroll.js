/** Stops the page scroll for a period of time
 * @param {number} [xPos=0]
 * @param {number} [yPos=0]
 * @param {number} [ms=1000]
 */
export default function stopScroll(xPos = 0, yPos = 0, ms = 1000) {
	const fixScroll = () => {
		window.scrollTo(xPos, yPos);
	};
	window.addEventListener("scroll", fixScroll);
	setTimeout(() => {
		window.removeEventListener("scroll", fixScroll);
	}, ms);
}
