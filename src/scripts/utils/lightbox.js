import { templateFactory } from "../factories/TemplateFactory.js";
import { getExtension } from "../utils/tools.js";

/*
* Première méthode avec une class
*/

export class Lightbox {

    constructor(url, gallery, title) {
        this.url = url;
        this.gallery = gallery;
        this.title = title;
        console.log(this.title);
        this.template = templateFactory(this.url, "lightbox");
        this.containerDOM = document.querySelector(".media-lightbox");
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    init () {
        this.containerDOM.classList.remove("fadeOut");
        this.containerDOM.style.display ="block";
        this.loadMedia(this.url, this.title);
        this.containerDOM.appendChild(this.template);
        document.addEventListener("keydown", this.onKeyDown);
        this.template.close.addEventListener("click", this.close.bind(this));
        this.template.prev.addEventListener("click", this.prev.bind(this));
        this.template.next.addEventListener("click", this.next.bind(this));
    }

    // Défini si le média est une photo ou un vidéo et le charge
    loadMedia (url, title) {
        const mediaExtension = getExtension(url);
        if (mediaExtension === "jpg") {
            this.url = null;
            const image = new Image();
            const containerIMG = this.template.querySelector(".lightbox__media");
            const loader = document.createElement("div");
            loader.classList.add("lightbox__loader");
            containerIMG.innerHTML = "";
            containerIMG.appendChild(loader);
            const titleMedia = document.createElement("h2");
            titleMedia.classList.add("lightbox__title");
            titleMedia.setAttribute("tabindex", 0);
            titleMedia.innerHTML = title;
            image.onload = () => {
                containerIMG.removeChild(loader);
                containerIMG.appendChild(image);
                containerIMG.appendChild(titleMedia);
                this.url = url;
            };
            image.src = url;
        } else if (mediaExtension === "mp4") {
            this.url = null;
            const video = document.createElement("video");
            video.setAttribute("autoplay", "true");
            video.setAttribute("controls", "");
            const source = document.createElement("source");
            source.setAttribute("src", url);
            source.setAttribute("type", "video/mp4");
            const error = document.createElement("span");
            error.textContent = "Désolé, votre navigateur ne prend pas en charge les videos HTML5";
            const containerVID = this.template.querySelector(".lightbox__media");
            containerVID.innerHTML = "";
            containerVID.appendChild(video);
            video.appendChild(source);
            source.appendChild(error);
            this.url = url;
        }
    }

    /*
    * Utils
    */

    getIndexCurrentMedia (url) {
        return this.gallery.findIndex((image) => image === url);
    }

    getMediaInfos () {
        let medias = [];
        this.mediaInfos.forEach((media) => {
            medias.push(this.factoryMedia(media));
        });
        return medias;
    }

    factoryMedia (media) {
        let mediaAttr = {};
        mediaAttr.url = media.getAttribute("href");
        mediaAttr.title = (media.getAttribute("aria-label"));
        return mediaAttr;
    }

    // Garder le focus dans la lightbox
    focusInLightbox (event) {
        event.preventDefault();
        const lightboxFocusSelector = "button";
        let lightboxFocusElements = [];
        lightboxFocusElements = Array.from(this.containerDOM.querySelectorAll(lightboxFocusSelector));
        let indexCurrentFocus = lightboxFocusElements.findIndex((index) => index === this.containerDOM.querySelector(":focus"));
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
    }

    /*
    * Events
    */

    // Events à la pression de touche du clavier
    onKeyDown (event) {
        if (event.code === "Escape") {
            this.close(event);
        } else if (event.code === "ArrowLeft") {
            this.prev(event);
        } else if (event.code === "ArrowRight") {
            this.next(event);
        } else if (event.code === "Tab") {
            this.focusInLightbox(event);
        }
    }

    /* Fermeture de la lightbox: Transition d'opacité, délai de fermeture, cache le container / supprime la lightbox,
    suppression du listener */
    close (event) {
        event.preventDefault();
        this.containerDOM.classList.add("fadeOut");
        window.setTimeout(() => {
            this.containerDOM.style.display = "none";
            this.containerDOM.removeChild(this.template);
        }, 500);
        document.removeEventListener("keydown", this.onKeyDown);
    }

    prev (event) {
        event.preventDefault();
        let indexImage = this.getIndexCurrentMedia(this.url);
        if (indexImage === 0) {
            indexImage = this.gallery.length;
        }
        this.loadMedia(this.gallery[indexImage - 1]);
    }

    next (event) {
        event.preventDefault();
        let indexImage = this.getIndexCurrentMedia(this.url);
        if (indexImage === this.gallery.length - 1) {
            indexImage = -1;
        }
        this.loadMedia(this.gallery[indexImage + 1]);
    }
}

/*
* Deuxième méthode
*/

// // Dom selection
// const mediaLightbox = document.querySelector(".media-lightbox");

// // Initialisation de la lightbox
// const initLightbox = () => {
//     const links = Array.from(document.querySelectorAll("a[href$=\".jpg\"], a[href$=\".mp4\"]"));
//     const gallery = links.map(link => link.getAttribute("href"));
//     links.forEach(link => link.addEventListener("click", (event) => {
//         event.preventDefault();
//         const urlImage = link.getAttribute("href");
//         createLightbox(urlImage, gallery);
//     }));
// };

// // Affiche le container et creer la lightbox
// const createLightbox = (urlImage, gallery) => {
//     mediaLightbox.classList.remove("fadeOut");
//     mediaLightbox.style.display ="block";
//     const lightboxTemplate = templateFactory(urlImage, "lightbox");
//     mediaLightbox.appendChild(lightboxTemplate);
//     loadMedia(urlImage);
//     addTriggersEventDelegation();
//     browseGallery(urlImage, gallery);
//     document.addEventListener("keydown", onKeyDown);
// };

// // Défini si le média est une photo ou un vidéo et le charge
// const loadMedia = (link) => {
//     const mediaExtension = getExtension(link);

//     if (mediaExtension === "jpg") {
//         const image = new Image();
//         image.src = link;
//         const container = document.querySelector(".lightbox__media");
//         const loader = document.createElement("div");
//         loader.classList.add("lightbox__loader");
//         container.innerHTML = "";
//         container.appendChild(loader);
//         image.onload = () => {
//             container.removeChild(loader);
//             container.appendChild(image);
//         };
//     } else if (mediaExtension === "mp4") {
//         const video = document.createElement("video");
//         video.setAttribute("autoplay", "true");
//         video.setAttribute("controls", "");
//         const source = document.createElement("source");
//         source.setAttribute("src", link);
//         source.setAttribute("type", "video/mp4");
//         const error = document.createElement("span");
//         error.textContent = "Désolé, votre navigateur ne prend pas en charge les videos HTML5";
//         const container = document.querySelector(".lightbox__media");
//         container.innerHTML = "";
//         container.appendChild(video);
//         video.appendChild(source);
//         source.appendChild(error);
//     }
// };

// const browseGallery = (urlImage, gallery) => {
//     document.querySelector(".lightbox__prev").addEventListener("click", () => {
//         console.log("prev");
//         console.log(urlImage);
//         console.log(gallery);
//         let indexImage = gallery.findIndex((image) => image === urlImage);
//         console.log(indexImage);
//         if (indexImage === 0) {
//             indexImage = gallery.length;
//         }
//         loadMedia(gallery[indexImage - 1]);
//     });
//     document.querySelector(".lightbox__next").addEventListener("click", () => {
//         console.log("next");
//         console.log(urlImage);
//         console.log(gallery);
//         let indexImage = gallery.findIndex((image) => image === urlImage);
//         console.log(indexImage);
//         if (indexImage === gallery.length -1) {
//             indexImage = -1;
//         }
//         loadMedia(gallery[indexImage + 1]);
//     });
// };

// // Cache le container et supprime la lightbox
// const removeLightbox = (lightbox) => {
//     mediaLightbox.classList.add("fadeOut");
//     window.setTimeout(() => {
//         mediaLightbox.style.display = "none";
//         mediaLightbox.removeChild(lightbox);
//     }, 500);
//     document.removeEventListener("keydown", onKeyDown);
// };



// // Garder le focus dans la lightbox
// const focusInLightbox = (event) => {
//     event.preventDefault();
//     const lightboxFocusSelector = "button";
//     let lightboxFocusElements = [];
//     lightboxFocusElements = Array.from(mediaLightbox.querySelectorAll(lightboxFocusSelector));
//     let indexCurrentFocus = lightboxFocusElements.findIndex((index) => index === mediaLightbox.querySelector(":focus"));
//     if (!event.shiftKey) {
//         indexCurrentFocus++;
//     } else {
//         indexCurrentFocus--;
//     }
//     if (indexCurrentFocus >= lightboxFocusElements.length) {
//         indexCurrentFocus = 0;
//     }
//     if (indexCurrentFocus < 0) {
//         indexCurrentFocus = lightboxFocusElements.length -1;
//     }
//     lightboxFocusElements[indexCurrentFocus].focus();
// };

// // Les intéractions clavier sur le document une fois que la lightbox est affichée
// const onKeyDown = (event) => {
//     const lightbox = document.querySelector(".lightbox");

//     if (event.code === "Escape") {
//         removeLightbox(lightbox);
//     }

//     if (event.code === "Tab") {
//         focusInLightbox(event);
//     }
// };


// /*
// * Events
// */

// // Creer une délégation d'évènements pour la fermeture de le lightbox
// const addTriggersEventDelegation = () => {
//     const lightbox = document.querySelector(".lightbox");
//     if (mediaLightbox.style.display === "block") {
//         lightbox.addEventListener("click", (event) => {
//             const initElem = event.target;

//             if (initElem.matches(".lightbox-trigger")) {
//                 removeLightbox(lightbox);
//             } else {
//                 return;
//             }
//         });

//         lightbox.addEventListener("keydown", (event) => {
//             const initElem = event.target;

//             if (event.code === "Enter" && initElem.matches(".lightbox-trigger")) {
//                 removeLightbox(lightbox);
//             } else {
//                 return;
//             }
//         });
//     }
// };





/*
* Troisième méthode (avec un système similaire à la modale contact)
*/

// // Ouvrir ou fermer la lightbox
// const toggleLightbox = () => {
//     mediaLightbox.classList.toggle("active");

//     if (mediaLightbox.matches(".active")) {
//         mediaLightbox.style.animation = "open-modal 0.8s";
//         mediaLightbox.style.display = "block";
//         lightboxFocusElements = Array.from(mediaLightbox.querySelectorAll(lightboxFocusSelector));
//         lightboxFocusElements.forEach((elem) => {
//             elem.setAttribute("tabindex", "-1");
//         });
//         mediaLightbox.setAttribute("aria-hidden", "false");
//         mediaLightbox.setAttribute("aria-modal", "true");
//         mediaLightbox.setAttribute("tabindex", "0");
//         main.setAttribute("aria-hidden", "true");
//     } else {
//         mediaLightbox.style.display = "none";
//         mediaLightbox.style.animation = "close-modal 0.8s";
//         mediaLightbox.setAttribute("aria-hidden", "true");
//         mediaLightbox.setAttribute("aria-modal", "false");
//         main.setAttribute("aria-hidden", "false");
//     }
// };

// // Garder le focus dans la modale
// const focusInLightbox = (event) => {
//     event.preventDefault();
//     let indexCurrentFocus = lightboxFocusElements.findIndex((index) => index === mediaLightbox.querySelector(":focus"));
//     if (!event.shiftKey) {
//         indexCurrentFocus++;
//     } else {
//         indexCurrentFocus--;
//     }
//     if (indexCurrentFocus >= lightboxFocusElements.length) {
//         indexCurrentFocus = 0;
//     }
//     if (indexCurrentFocus < 0) {
//         indexCurrentFocus = lightboxFocusElements.length -1;
//     }
//     lightboxFocusElements[indexCurrentFocus].focus();
// };

// // Events
// const addLightboxEventDelegation = () => {
//     const photographerPortfolio = document.querySelector(".photographer-portfolio");

//     photographerPortfolio.addEventListener("click", function(event) {
//         event.preventDefault();
//         const initElem = event.target;
//         console.log(initElem);

//         if (initElem.matches("img")) {
//             toggleLightbox(initElem);
//         } else {
//             return;
//         }
//     });
// };

// const addTriggersEventDelegation = () => {
//     const lightbox = document.querySelector(".lightbox");

//     lightbox.addEventListener("click", (event) => {
//         const initElem = event.target;

//         if (initElem.matches(".lightbox-trigger")) {
//             toggleLightbox();
//         } else {
//             return;
//         }
//     });

//     lightbox.addEventListener("keydown", (event) => {
//         const initElem = event.target;

//         if (event.code === "Enter" && initElem.matches(".lightbox-trigger")) {
//             toggleLightbox();
//         } else {
//             return;
//         }
//     });
// };

// const documentEvents = () => {

//     document.addEventListener("keydown", (event) => {
//         if (event.code === "Escape" && mediaLightbox.matches(".active")) {
//             toggleLightbox();
//         }

//         if (event.code === "Tab" && mediaLightbox.matches(".active")) {
//             console.log("tab dans la lightbox");
//             focusInLightbox(event);
//         }
//     });
// };