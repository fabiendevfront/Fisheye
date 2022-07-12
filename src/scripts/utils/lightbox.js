/*
* Display and hide lightbox
*/

export const lightboxTools = () => {
    documentEvents();
    addLightboxEventDelegation();
    addTriggersEventDelegation();
};

// Dom selection
const mediaLightbox = document.querySelector(".media-lightbox");
const main = document.querySelector(".main");
const lightboxFocusSelector = "button";
let lightboxFocusElements = [];

// Ouvrir ou fermer la lightbox
const toggleLightbox = () => {
    mediaLightbox.classList.toggle("active");

    if (mediaLightbox.matches(".active")) {
        mediaLightbox.style.animation = "open-modal 0.8s";
        mediaLightbox.style.display = "block";
        lightboxFocusElements = Array.from(mediaLightbox.querySelectorAll(lightboxFocusSelector));
        lightboxFocusElements.forEach((elem) => {
            elem.setAttribute("tabindex", "-1");
        });
        mediaLightbox.setAttribute("aria-hidden", "false");
        mediaLightbox.setAttribute("aria-modal", "true");
        mediaLightbox.setAttribute("tabindex", "0");
        main.setAttribute("aria-hidden", "true");
    } else {
        mediaLightbox.style.display = "none";
        mediaLightbox.style.animation = "close-modal 0.8s";
        mediaLightbox.setAttribute("aria-hidden", "true");
        mediaLightbox.setAttribute("aria-modal", "false");
        main.setAttribute("aria-hidden", "false");
    }
};

// Garder le focus dans la modale
const focusInLightbox = (event) => {
    event.preventDefault();
    let indexCurrentFocus = lightboxFocusElements.findIndex((index) => index === mediaLightbox.querySelector(":focus"));
    if (!event.shiftKey) {
        indexCurrentFocus++;
    } else {
        indexCurrentFocus--;
    }
    if (indexCurrentFocus >= lightboxFocusElements.length) {
        indexCurrentFocus = 0;
    }
    if (indexCurrentFocus < 0) {
        indexCurrentFocus = lightboxFocusElements.length -1;
    }
    lightboxFocusElements[indexCurrentFocus].focus();
};


// Events
const addLightboxEventDelegation = () => {
    const photographerPortfolio = document.querySelector(".photographer-portfolio");

    photographerPortfolio.addEventListener("click", function(event) {
        event.preventDefault();
        const initElem = event.target;
        console.log(initElem);

        if (initElem.matches("img")) {
            toggleLightbox(initElem);
        } else {
            return;
        }
    });
};

const addTriggersEventDelegation = () => {
    const lightbox = document.querySelector(".lightbox");

    lightbox.addEventListener("click", (event) => {
        const initElem = event.target;

        if (initElem.matches(".lightbox-trigger")) {
            toggleLightbox();
        } else {
            return;
        }
    });

    lightbox.addEventListener("keydown", (event) => {
        const initElem = event.target;

        if (event.code === "Enter" && initElem.matches(".lightbox-trigger")) {
            toggleLightbox();
        } else {
            return;
        }
    });
};

const documentEvents = () => {

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && mediaLightbox.matches(".active")) {
            toggleLightbox();
        }

        if (event.code === "Tab" && mediaLightbox.matches(".active")) {
            console.log("tab dans la lightbox");
            focusInLightbox(event);
        }
    });
};