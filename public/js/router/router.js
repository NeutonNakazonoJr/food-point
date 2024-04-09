import landingPageComponent from "../pages/landingPage.js";

const routes = [
    { path: "/", page: landingPageComponent,}
];

/** Check the current path and returns according with it
 * @returns {HTMLElement}
 */
function router() {
    const currentPath = window.location.pathname;
    const matches = routes.filter(item => item.path === currentPath);
    if(matches.length > 0) {
        return matches[0].page();
    }
    
    //if no matches, the path doesn't exist, so returns home page.
    return routes[0].page();
}


export default router;