export const photographerFactory = (data) => {
    const { id, name, city, country, tagline, price, portrait } = data;

    // Elements communs entre les cards de la page d'accueil et de la page du photographe
    const picture = `assets/images/photographers/${portrait}`;

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
                <div class="photographer__infos">
                    <p class="photographer__location">${city}, ${country}</p>
                    <p class="photographer__tagline">${tagline}</p>
                    <p class="photographer__price">${price}€/jour</p>
                </div>
        `;
        photographerCard.innerHTML = photographerInfos;
        return photographerCard;
    };

    const createPhotographerProfil = () => {
        // Template de la page du profil des photographes
    };

    return { createPhotographerCard, createPhotographerProfil };
};
