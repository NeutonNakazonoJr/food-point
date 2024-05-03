
function notification(message) {
    const alert = document.createElement("div");
    alert.className = "notification";
    alert.textContent = message;
    document.getElementById("root").appendChild(alert);

    setTimeout(() => {
        alert.classList.add("show");
        setTimeout(() => {
            alert.classList.remove("show");
            alert.classList.add("return");
            setTimeout(() => {
                document.getElementById("root").removeChild(alert);
            }, 500);
        }, 2400);
    }, 100);
}

export default notification;