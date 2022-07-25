import { templateFactory } from "../factories/TemplateFactory.js";
import { mediasPhotographers } from "../pages/photographer";
import { lightboxContainer } from "./tools.js";
import { Picture, Video } from "./Media.js";

// Class Lightbox controller : init lightbox, load media, events on click and keyboard
export class Lightbox {
    /**
     * @param {Number} - The id of the open media
     * @param {String} - The name of current photographer
     */
    constructor(id, photographerName) {
        this.id = parseInt(id);
        this.photographer = photographerName;
        this.template = templateFactory(this.url, "lightbox");
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    // Init lightbox
    init () {
        lightboxContainer.classList.remove("fadeOut");
        lightboxContainer.style.display = "block";
        lightboxContainer.setAttribute("aria-hidden", "false");
        lightboxContainer.setAttribute("tabindex", "0");
        this.loadMedia(this.getCurrentMedia(this.id));
        lightboxContainer.appendChild(this.template);
        document.addEventListener("keydown", this.onKeyDown);
        this.template.close.addEventListener("click", this.close.bind(this));
        this.template.prev.addEventListener("click", this.prev.bind(this));
        this.template.next.addEventListener("click", this.next.bind(this));
    }

    /**
     * Define if the media is a photo or a video and load it
     * @param {Object} - The current media to load
     */
    loadMedia (currentMedia) {

        if (currentMedia.image) {
            this.id = null;
            const media = new Picture(currentMedia, this.photographer);
            const image = new Image();
            image.src = media.imagePath;
            image.alt = media.title;
            image.classList.add("lightbox__media-element");
            image.setAttribute("tabindex", "0");
            const containerIMG = this.template.querySelector(".lightbox__media");
            const loader = document.createElement("div");
            loader.classList.add("lightbox__loader");
            containerIMG.innerHTML = "";
            containerIMG.appendChild(loader);
            const titleMedia = document.createElement("h2");
            titleMedia.classList.add("lightbox__title");
            titleMedia.setAttribute("tabindex", "0");
            titleMedia.innerHTML = media.title;
            image.onload = () => {
                containerIMG.removeChild(loader);
                containerIMG.appendChild(image);
                containerIMG.appendChild(titleMedia);
                this.id = media.id;
            };
        } else if (currentMedia.video) {
            this.id = null;
            const media = new Video(currentMedia, this.photographer);
            const video = document.createElement("video");
            video.classList.add("lightbox__media-element");
            video.setAttribute("autoplay", "true");
            video.setAttribute("controls", "");
            video.setAttribute("tabindex", "0");
            const source = document.createElement("source");
            source.setAttribute("src", media.videoPath);
            source.setAttribute("type", "video/mp4");
            const error = document.createElement("span");
            error.textContent = "Désolé, votre navigateur ne prend pas en charge les videos HTML5";
            const containerVID = this.template.querySelector(".lightbox__media");
            containerVID.innerHTML = "";
            const titleMedia = document.createElement("h2");
            titleMedia.classList.add("lightbox__title");
            titleMedia.setAttribute("tabindex", "0");
            titleMedia.innerHTML = media.title;
            containerVID.appendChild(video);
            video.appendChild(source);
            source.appendChild(error);
            containerVID.appendChild(titleMedia);
            this.id = media.id;
        }
    }

    /*
    * Methods
    */

    /**
     * Get the current media of the photographer with the given id.
     * @param {Number} - id of the photographer
     * @returns The current media object.
     */
    getCurrentMedia (id) {
        const indexCurrentMedia = this.getIndexCurrentMedia(id);
        return mediasPhotographers[indexCurrentMedia];
    }

    /**
     * Return the index of the current media in the mediasPhotographers array.
     * @param {Number} - id of the media
     * @returns The index of the media in the array.
     */
    getIndexCurrentMedia (id) {
        return mediasPhotographers.findIndex((index) => parseInt(index.id) === id);
    }

    /**
     * If the user presses the tab key, the focus will move to the next focusable element in the
     * lightbox, and if the user presses the shift + tab keys, the focus will move to the previous
     * focusable element in the lightbox.
     * @param {KeyboardEvent} - event
     */
    focusInLightbox (event) {
        event.preventDefault();
        const lightboxFocusSelector = "button, h2, .lightbox__media-element";
        let lightboxFocusElements = [];
        lightboxFocusElements = Array.from(lightboxContainer.querySelectorAll(lightboxFocusSelector));
        let indexCurrentFocus = lightboxFocusElements.findIndex((index) => index === lightboxContainer.querySelector(":focus"));
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

    /**
     * If the user presses the escape key, the lightbox closes. If the user presses the left arrow key,
     * the previous image is displayed. If the user presses the right arrow key, the next image is
     * displayed. If the user presses the tab key, the focus is set to the lightbox.
     * @param {MouseEvent|KeyboardEvent} - event
     */
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

    /**
     * Lightbox close: It adds a class to the containerDOM, then after 500ms, it removes the template from the
     * containerDOM and hides the containerDOM.
     * @param {MouseEvent|KeyboardEvent} - event
     */
    close (event) {
        event.preventDefault();
        lightboxContainer.classList.add("fadeOut");
        window.setTimeout(() => {
            lightboxContainer.style.display = "none";
            lightboxContainer.setAttribute("aria-hidden", "true");
            lightboxContainer.setAttribute("tabindex", "-1");
            lightboxContainer.removeChild(this.template);
        }, 500);
        document.removeEventListener("keydown", this.onKeyDown);
    }

    /**
     * Go to previous media
     * @param {MouseEvent|KeyboardEvent} - event
     */
    prev (event) {
        event.preventDefault();
        let indexImage = this.getIndexCurrentMedia(this.id);
        if (indexImage === 0) {
            indexImage = mediasPhotographers.length;
        }
        this.loadMedia(mediasPhotographers[indexImage - 1]);
    }

    /**
     * Go to next media
     * @param {MouseEvent|KeyboardEvent} - event
     */
    next (event) {
        event.preventDefault();
        let indexImage = this.getIndexCurrentMedia(this.id);
        if (indexImage === mediasPhotographers.length - 1) {
            indexImage = -1;
        }
        this.loadMedia(mediasPhotographers[indexImage + 1]);
    }
}