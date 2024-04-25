/** Dispatch onStateChange custom event |
 * Use in collaboration with a listener to change the current URL of SPA
 * @param {string} path exemple: "/home"
 * @param {Object} constructorInfo optional param
 */
export default function dispatchOnStateChange(path, constructorInfo) {
    console.log(constructorInfo);
    const event = new CustomEvent("onstatechange", {
        detail: {
            path: path,
            constructorInfo: constructorInfo,
        },
    });
    window.dispatchEvent(event);
}
