import { templateFactory } from "../factories/TemplateFactory.js";
import { mediasPhotographers } from "../pages/photographer";
import { Picture, Video } from "./Media.js";

/*
* Première méthode avec une class
*/

export class Lightbox {

    /**
     * @param {id} - The id of the open media
     * @param {photographerName} - The name of current photographer
     */
    constructor(id, photographerName) {
        this.mediasPhotographers = mediasPhotographers;
        this.photographer = photographerName;
        this.id = parseInt(id);
        this.currentMedia = null;
        this.template = templateFactory(this.url, "lightbox");
        this.containerDOM = document.querySelector(".media-lightbox");
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    // Init lightbox
    init () {
        this.containerDOM.classList.remove("fadeOut");
        this.containerDOM.style.display ="block";
        this.currentMedia = this.getCurrentMedia(this.id);
        this.loadMedia(this.currentMedia);
        this.containerDOM.appendChild(this.template);
        document.addEventListener("keydown", this.onKeyDown);
        this.template.close.addEventListener("click", this.close.bind(this));
        this.template.prev.addEventListener("click", this.prev.bind(this));
        this.template.next.addEventListener("click", this.next.bind(this));
    }

    /**
     * Define if the media is a photo or a video and load it
     * @param {currentMedia} - The current media to load
     */
    loadMedia (currentMedia) {

        if (currentMedia.image) {
            this.id = null;
            const media = new Picture(currentMedia, this.photographer);
            const image = new Image();
            const containerIMG = this.template.querySelector(".lightbox__media");
            const loader = document.createElement("div");
            loader.classList.add("lightbox__loader");
            containerIMG.innerHTML = "";
            containerIMG.appendChild(loader);
            const titleMedia = document.createElement("h2");
            titleMedia.classList.add("lightbox__title");
            titleMedia.setAttribute("tabindex", 0);
            titleMedia.innerHTML = media.title;
            image.onload = () => {
                containerIMG.removeChild(loader);
                containerIMG.appendChild(image);
                containerIMG.appendChild(titleMedia);
                this.id = media.id;
            };
            image.src = media.imagePath;
        } else if (currentMedia.video) {
            this.id = null;
            const media = new Video(currentMedia, this.photographer);
            const video = document.createElement("video");
            video.setAttribute("autoplay", "true");
            video.setAttribute("controls", "");
            const source = document.createElement("source");
            source.setAttribute("src", media.videoPath);
            source.setAttribute("type", "video/mp4");
            const error = document.createElement("span");
            error.textContent = "Désolé, votre navigateur ne prend pas en charge les videos HTML5";
            const containerVID = this.template.querySelector(".lightbox__media");
            containerVID.innerHTML = "";
            const titleMedia = document.createElement("h2");
            titleMedia.classList.add("lightbox__title");
            titleMedia.setAttribute("tabindex", 0);
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
     * @param {id} - the id of the photographer
     * @returns The current media object.
     */
    getCurrentMedia (id) {
        const indexCurrentMedia = this.getIndexCurrentMedia(id);
        return this.mediasPhotographers[indexCurrentMedia];
    }

    /**
     * Return the index of the current media in the mediasPhotographers array.
     * @param id - the id of the media
     * @returns The index of the media in the array.
     */
    getIndexCurrentMedia (id) {
        return this.mediasPhotographers.findIndex((index) => parseInt(index.id) === id);
    }

    /**
     * If the user presses the tab key, the focus will move to the next focusable element in the
     * lightbox, and if the user presses the shift + tab keys, the focus will move to the previous
     * focusable element in the lightbox.
     * @param {KeyboardEvent} - event
     */
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
        this.containerDOM.classList.add("fadeOut");
        window.setTimeout(() => {
            this.containerDOM.style.display = "none";
            this.containerDOM.removeChild(this.template);
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
            indexImage = this.mediasPhotographers.length;
        }
        this.loadMedia(this.mediasPhotographers[indexImage - 1]);
    }

    /**
     * Go to next media
     * @param {MouseEvent|KeyboardEvent} - event
     */
    next (event) {
        event.preventDefault();
        let indexImage = this.getIndexCurrentMedia(this.id);
        if (indexImage === this.mediasPhotographers.length - 1) {
            indexImage = -1;
        }
        this.loadMedia(this.mediasPhotographers[indexImage + 1]);
    }
}