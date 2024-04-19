export default function showToast(message, duration = 3000) {
	const toast = document.createElement("div");
	toast.classList.add("toast");
	toast.textContent = message;

	document.body.appendChild(toast);

	setTimeout(() => {
		toast.classList.add("hide");
		setTimeout(() => {
			toast.remove();
		}, 500);
	}, duration);
}
