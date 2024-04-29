const root = document.getElementById("root");
const display = document.createElement("div");
display.id = "apiLoadingScreen";
export default function apiLoading(alive= true) {
	if(alive) {
		root.appendChild(display);
	} else {
		display.remove();
	}
};
