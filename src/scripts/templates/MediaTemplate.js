import { getPhotographerName } from "../utils/tools.js";

export const mediaTemplate = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { date, id, image, video, likes, photographerId, price, title } = data;

    // Utilise la fonction getPhotographerName pour récupèrer le nom du photographe et le formate correctement
    const name = getPhotographerName();

    const typeMedia = (image) => {
        if (image !==  undefined) {
            const mediaFile = `assets/images/works/${name}/${image}`;
            return `<div class="media__picture">
                        <img src="${mediaFile}" alt=""/>
                    </div>`;
        } else {
            const mediaFile = `assets/images/works/${name}/${video}`;
            return `<video class="media__video">
                        <source src="${mediaFile}" type="video/mp4"></source>
                    </video>`;
        }
    };

    const mediaFile = typeMedia(image);

    const createMediaCard = () => {
        const mediaCard = document.createElement("article");
        mediaCard.classList.add("media");
        const mediaInfos =  `
               ${mediaFile}
                <div class="media__infos">
                    <h2 class="media__title">${title}</h2>
                    <div class="media__form-group">
                        <form>
                            <label for="like" aria-label="Nombre de j'aime: ${likes}">${likes}</label>
                            <input
                                class="media__form-input"
                                type="checkbox"
                                id="like"
                                name="like"
                            />
                        </form>
                    </div>
                </div>
        `;
        mediaCard.innerHTML = mediaInfos;
        return mediaCard;
    };

    return { createMediaCard };
};
