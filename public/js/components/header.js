/** @param {HTMLElement} header
 * @param {boolean} animation
 */
function setAnimationForHeader(header, animation) {
	if (!animation) return;

	const headerAnimation = "animationMainHeaderV2";
	header.style.animationName = headerAnimation;
}

/** @param {HTMLElement} anchor
 * @param {boolean} animation
 */
function setANimationForAnchor(anchor, animation) {
	if (!animation) return;

	const buttonAnimation = "spawnHeaderButton";
	anchor.style.animationName = buttonAnimation;
}

/** Generates the main header of Food Point.
 * All params are optional
 *
 * @param {string} profilePageUrl
 * @param {string} userImg
 * @param {boolean} animation
 * @returns {HTMLElement}
 */
export default function getHeader(
	animation = true,
	userIsLogged = true,
	profilePageUrl = "#",
	userImg = "./assets/icons/profile-placeholder.svg"
) {
	const header = document.createElement("header");
	header.id = "mainHeader";
	setAnimationForHeader(header, animation);

	const h1 = document.createElement("h1");
	h1.textContent = "Food Point";
	header.appendChild(h1);

	if(userIsLogged) {
		const a = document.createElement("a");
		const img = document.createElement("img");
		const span = document.createElement("span");

		a.href = profilePageUrl;
		img.src = userImg;
		setANimationForAnchor(a, animation);

		a.appendChild(img);
		a.appendChild(span);
		header.appendChild(a);
	}

	return header;
}
