import { logout } from "../api/userApi.js";
import dispatchOnStateChange from "../events/onStateChange.js";
import showToast from "./toast.js";

/** @param {HTMLElement} header
 * @param {boolean} animation
 */
function setAnimationForHeader(header, animation) {
	if (!animation) return;

	const headerAnimation = "animationMainHeaderV2";
	header.style.animationName = headerAnimation;
}

function redirectToHome(html, homeLink) {
	if (html instanceof HTMLElement) {
		html.style.cursor = "pointer";
		html.addEventListener("click", () => {
			dispatchOnStateChange(homeLink, { animation: true });
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

function getLogoutButton() {
	const button = document.createElement("button");
	button.id = "mainHeader-buttonLogout";
	button.addEventListener("click", async (e) => {
		e.preventDefault();
		const res = await logout();
		if (res.success) {
			showToast("Usuário deslogou");
			dispatchOnStateChange("/");
		} else {
			showToast("Erro ao realizar a ação...");
		}
	});

	return button;
}

/** Generates the main header of Food Point.
 * All params are optional
 *
 * @param {boolean} animation
 * @param {boolean} [userIsLogged=true]
 * @param {"/home" | "/"} [homeLink="/home"]
 * @param {string} profilePageUrl
 * @param {string} userImg
 * @returns {HTMLElement}
 */
export default function getHeader(
	animation = true,
	userIsLogged = true,
	homeLink = "/home",
	profilePageUrl = "/profile",
	userImg = "/assets/icons/profile-placeholder.svg"
) {
	const header = document.createElement("header");
	header.id = "mainHeader";
	setAnimationForHeader(header, animation);

	const h1 = document.createElement("h1");
	h1.textContent = "Food Point";
	header.appendChild(h1);

	redirectToHome(h1, homeLink);

	if (userIsLogged) {
		const div = document.createElement("div");

		const a = document.createElement("a");
		const img = document.createElement("img");

		redirectToHome(h1);

		a.href = profilePageUrl;
		getImage();
		function getImage() {
			fetch("/api/upload")
				.then((response) => {
					if (!response.ok) {
						throw new Error();
					}
					return response.json();
				})
				.then((data) => {
					if (data.length == 0) {
						img.src = userImg;
					} else {
						const hash = data[0].hash_name;
						img.src = `/assets/uploads/${hash}`;
					}
				})
				.catch((error) => {
					img.src = userImg;
					console.error(
						"Erro ao solicitar a imagem de perfil:",
						error
					);
				});
		}
		// setANimationForAnchor(a, animation);
		a.addEventListener("click", (e) => {
			e.preventDefault();
			dispatchOnStateChange(a.href, { animation: false });
		});

		const logoutButton = getLogoutButton();

		a.appendChild(img);
		div.appendChild(a);
		div.appendChild(logoutButton);
		header.appendChild(div);
	}

	return header;
}
