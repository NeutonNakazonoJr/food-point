
export default function getContentLoading() {
	const div = document.createElement("div");
	div.id = "loadingContentDisplay";

	const spoon = document.createElement("img");
	spoon.src = "/assets/svg-animated/spoon-white.svg";
	const fork = document.createElement("img");
	fork.src = "/assets/svg-animated/fork-white.svg";

	div.appendChild(spoon);
	div.appendChild(fork);
	return div;
};
