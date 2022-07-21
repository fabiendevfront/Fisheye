/**
 * Creates a photographer card or profil.
 * @param {Object} - photographers data
 * @returns {Function} - Create DOM Element
 */
export const photographerTemplate = (data) => {
    const { id, name, city, country, tagline, price, portrait } = data;

    // Path of the photographer's photo
    const picture = `dist/assets/images/photographers/${portrait}`;

    /**
     * Photographer card template
     * @returns {HTMLElement}
     */
    const createPhotographerCard = () => {
        const photographerCard = document.createElement("article");
        photographerCard.classList.add("photographer");
        const photographerInfos =  `
                <a href="photographer.html?id=${id}" aria-label="Lien vers la page du photographe ${name}" class="photographer__link">
                    <div class="photographer__picture">
                        <img src="${picture}" alt=""/>
                    </div>
                    <h2 class="photographer__title">${name}</h2>
                </a>
                <div class="photographer__infos" tabindex="0">
                    <p class="photographer__location">${city}, ${country}</p>
                    <p class="photographer__tagline">${tagline}</p>
                    <p class="photographer__price">${price}€/jour</p>
                </div>
        `;
        photographerCard.innerHTML = photographerInfos;
        return photographerCard;
    };

    /**
     * Photographer profil template
     * @returns {HTMLElement}
     */
    const createPhotographerProfil = () => {
        const photographerProfil = document.createElement("div");
        photographerProfil.classList.add("profil");
        const photographerInfos =  `
                <div class="profil__infos">
                    <h1 class="profil__title" tabindex="0">${name}</h1>
                    <div class="profil__subinfos" tabindex="0">
                        <p class="profil__location">${city}, ${country}</p>
                        <p class="profil__tagline">${tagline}</p>
                    </div>
                </div>
                <button
                    class="profil__btn btn modal-trigger"
                    aria-label="Contactez ${name}"
                    aria-haspopup="dialog"
                    aria-controls="contact-modal"
                >Contactez-moi</button>
                <div class="profil__picture" tabindex="0">
                    <img src="${picture}" alt="Photo du photographe ${name}"/>
                </div>
                <aside class="photographer-insert" tabindex="0">
                    <div class="insert">
                        <span class="insert__like" aria-label="Nombre de j'aime"></span>
                        <span class="insert__price" aria-label="Prix à la journée ${price}€">${price}€ / jour</span>
                    </div>
                </aside>
        `;
        photographerProfil.innerHTML = photographerInfos;
        return photographerProfil;
    };

    return { createPhotographerCard, createPhotographerProfil };
};
