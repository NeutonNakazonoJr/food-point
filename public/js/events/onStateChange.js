/** Dispatch onStateChange custom event |
 * Use in collaboration with a listener to change the current URL of SPA
 * @param {string} path exemple: "/home" 
 */
export default function dispatchOnStateChange(path) {
    const event = new CustomEvent("onStateChange", {
        detail: path
    });
    window.dispatchEvent(event);
};
