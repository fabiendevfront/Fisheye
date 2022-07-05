import { getPhotographerName } from "../utils/tools.js";

export const mediaTemplate = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { date, id, image, video, likes, photographerId, price, title } = data;

    // Utilise la fonction getPhotographerName pour récupèrer le nom du photographe et le formate correctement
    const name = getPhotographerName();

    const typeMedia = (image) => {
        if (image !==  undefined) {
            const mediaFile = `dist/assets/images/works/${name}/${image}`;
            return `<div class="media__picture">
                        <img src="${mediaFile}" alt=""/>
                    </div>`;
        } else {
            const mediaFile = `dist/assets/images/works/${name}/${video}`;
            return `<div class="media__video">
                        <video>
                            <source src="${mediaFile}" type="video/mp4"></source>
                            <p>Votre navigateur ne prend pas en charge les vidéos HTML5 en format mp4.</p>
                        </video>
                    </div>`;
        }
    };

    const mediaFile = typeMedia(image);

    const createMediaCard = () => {
        const mediaCard = document.createElement("article");
        mediaCard.classList.add("media");
        const mediaInfos =  `
                <a href="#" class="media__link" aria-label="Voir le media: ${title}">
                    ${mediaFile}
                    <i class="fas fa-search media__magnifier" aria-hidden="true"></i>
                </a>
                <div class="media__infos">
                    <h2 class="media__title">${title}</h2>
                    <div class="media__content">
                        <p class="media__likes" aria-label="Nombre de j'aime: ${likes}">${likes}</p>
                        <i class="media__heart" aria-label="likes" role="button" tabindex="0"></i>
                    </div>
                </div>
        `;
        mediaCard.innerHTML = mediaInfos;
        return mediaCard;
    };

    return { createMediaCard };
};
