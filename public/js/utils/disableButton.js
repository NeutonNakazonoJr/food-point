export function disableButton(button) {
	if(button instanceof HTMLButtonElement) {
		button.disabled = true;
		button.style.cursor = "not-allowed";
	}
};
export function activeButton(button) {
	if(button instanceof HTMLButtonElement) {
		button.disabled = false;
		button.style.cursor = "pointer";
	}
};
