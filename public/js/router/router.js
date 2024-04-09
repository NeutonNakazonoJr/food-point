import landingPageComponent from "../pages/landingPage.js";

const router = {
    "/": landingPageComponent,
    /** Returns the HTML page equals to path received
     * @param {string} path 
     * @returns {HTMLElement}
     */
    getRoute: (path) => router[path](),
};

export default router;