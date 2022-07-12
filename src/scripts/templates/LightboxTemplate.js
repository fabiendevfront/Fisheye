export const lightboxTemplate = () => {

    const createLightbox = () => {
        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");
        lightbox.setAttribute("role", "dialog");
        const lightboxContent =  `
            <button class="lightbox__close lightbox-trigger" aria-label="Fermer la lightbox">Fermé</button>
            <div class="lightbox__container">
                <button class="lightbox__prev" aria-label="Media précédent"><-</button>
                <div class="lightbox__content">
                    <div class="lightbox__media"></div>
                </div>
                <button class="lightbox__next" aria-label="Media suivant">-></button>
            </div>
        `;
        lightbox.innerHTML = lightboxContent;
        return lightbox;
    };

    return { createLightbox };
};