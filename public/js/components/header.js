import dispatchOnStateChange from "../events/onStateChange.js";

/** @param {HTMLElement} header
 * @param {boolean} animation
 */
function setAnimationForHeader(header, animation) {
	if (!animation) return;

	const headerAnimation = "animationMainHeaderV2";
	header.style.animationName = headerAnimation;
}

function redirectToHome(html) {
	if (html instanceof HTMLElement) {
		html.style.cursor = "pointer";
		html.addEventListener("click", () => {
			dispatchOnStateChange("/home", { animation: true });
		});
	}
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
	profilePageUrl = "/profile",
	userImg = "/assets/icons/profile-placeholder.svg"
) {
	const header = document.createElement("header");
	header.id = "mainHeader";
	setAnimationForHeader(header, animation);

	const h1 = document.createElement("h1");
	h1.textContent = "Food Point";
	header.appendChild(h1);

	redirectToHome(h1);

	if (userIsLogged) {
		const a = document.createElement("a");
		const img = document.createElement("img");

		redirectToHome(h1);

		a.href = profilePageUrl;
		getImage();
		function getImage() {
			fetch("/api/upload")
				.then(response => {
					if (!response.ok) {
						throw new Error()
					}
					return response.json();
				})
				.then(data => {
					if (data.length == 0) {
						img.src = userImg;
					} else {
						const hash = data[0].hash_name;
						img.src = `/assets/uploads/${hash}`;
					}
				})
				.catch(error => {
					img.src = userImg;
					console.error('Erro ao solicitar a imagem de perfil:', error);
				});
		}
		// setANimationForAnchor(a, animation);
		a.addEventListener("click", (e) => {
			e.preventDefault();
			dispatchOnStateChange(a.href, { animation: false });
		});

		a.appendChild(img);
		header.appendChild(a);
	}

	return header;
}
