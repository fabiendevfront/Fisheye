/**
 * Creates a lightbox element and returns it.
 * @returns {Function} - Create HTML Element
 */
export const lightboxTemplate = () => {

    /**
     * LightBox template
     * @returns {HTMLElement}
     */
    const createLightbox = () => {
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");
        const lightboxContent =  `
            <button class="lightbox__close lightbox-trigger" aria-label="Fermer l'affichage plein écran du média">Fermer</button>
                <button class="lightbox__prev" aria-label="Media précédent">Précédent</button>
                <button class="lightbox__next" aria-label="Media suivant">Suivant</button>
                <div class="lightbox__container">
                    <div class="lightbox__media">
                    <div>
                </div>
            </div>
        `;
        lightbox.innerHTML = lightboxContent;
        lightbox.close = lightbox.querySelector(".lightbox__close");
        lightbox.prev = lightbox.querySelector(".lightbox__prev");
        lightbox.next = lightbox.querySelector(".lightbox__next");
        return lightbox;
    };

    return { createLightbox };
};