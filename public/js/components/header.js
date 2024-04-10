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
	profilePageUrl = "#",
	userImg = "./assets/icons/profile-placeholder.svg",
	animation = true
) {
	const header = document.createElement("header");
	header.id = "mainHeader";
	setAnimationForHeader(header, animation);

	const h1 = document.createElement("h1");
	const a = document.createElement("a");
	const img = document.createElement("img");
	const span = document.createElement("span");

	h1.textContent = "Food Point";
	a.href = profilePageUrl;
	img.src = userImg;
	setANimationForAnchor(a, animation);
	
	a.appendChild(img);
	a.appendChild(span);

	header.appendChild(h1);
	header.appendChild(a);

	return header;
}