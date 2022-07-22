import { getPhotographerName } from "../utils/tools.js";

/**
 * Creates a media card with a picture or a video.
 * @param {Object} - portfolio data
 * @returns {Function} - Create DOM Element
 */
export const mediaTemplate = (data) => {
    const { id, image, video, likes, title } = data;

    // Retrieve and format the photographer's name
    const name = getPhotographerName();

    // Define the media type and create the DOM
    const typeMedia = (image) => {
        if (image !==  undefined) {
            const mediumMedia = `dist/assets/images/works/${name}/medium/${image}`;
            const originalMedialink = `dist/assets/images/works/${name}/original/${image}`;
            return ` <a href="${originalMedialink}" class="media__link" aria-label="${title}, voir l'image en grand">
                        <div class="media__picture">
                            <img src="${mediumMedia}" alt="${title}"/>
                            <span class="fas fa-search media__magnifier" aria-hidden="true"></span>
                        </div>
                    </a>`;
        } else {
            const videoMedia = `dist/assets/images/works/${name}/${video}`;
            return `<a href="${videoMedia}" class="media__link" aria-label="${title}, voir la vidéo en grand">
                        <div class="media__video">
                            <video>
                                <source src="${videoMedia}" type="video/mp4"></source>
                                <p>Votre navigateur ne prend pas en charge les vidéos HTML5 en format mp4.</p>
                            </video>
                            <span class="fas fa-play media__magnifier" aria-hidden="true"></span>
                        </div>
                    </a>`;
        }
    };

    const mediaBox = typeMedia(image);

    /**
     * Portfolio card template
     * @returns {HTMLElement}
     */
    const createMediaCard = () => {
        const mediaCard = document.createElement("article");
        mediaCard.classList.add("media");
        const mediaInfos =  `<input type="hidden" value="${id}" />
                            ${mediaBox}
                            <div class="media__infos">
                                <h2 class="media__title" tabindex="0">${title}</h2>
                                <div class="media__content">
                                    <p class="media__likes" tabindex="0">${likes}</p>
                                    <span class="media__heart" aria-label="likes: ${likes}" role="button" tabindex="0"></span>
                                </div>
                            </div>`;

        mediaCard.innerHTML = mediaInfos;
        return mediaCard;
    };

    return { createMediaCard };
};
