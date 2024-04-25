import createProfileDesktop from "./profileDesktop.js";
import createProfileMobile from "./profileMobile.js";

const createProfile = () => {
    const page = document.createElement("div");
    page.id = "profile-page";

    function updateProfile() {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const isDesktop = screenWidth >= 769;
        
        page.innerHTML = '';

        if (isDesktop) {
            page.appendChild(createProfileDesktop());
        } else {
            page.appendChild(createProfileMobile());
        }
    }

    window.onload = updateProfile;
    window.onresize = updateProfile;

    return page;
};

export default createProfile;
