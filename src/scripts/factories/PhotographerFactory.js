export const photographerFactory = (data) => {
    const { id, name, city, country, tagline, price, portrait } = data;

    // Elements communs entre les cars de la page d'accueil et  la page du photographe
    const picture = `assets/images/photographers/${portrait}`;

    const createPhotographerCard = () => {
        const photographerCard = document.createElement("article");
        photographerCard.classList.add("photographer");
        const photographerInfos =  `
                <div class="photographer__picture">
                    <img src="${picture}" alt="${name}"/>
                </div>
                <h2 class="photographer__title">${name}</h2>
                <div class="photographer__infos">
                    <p class="photographer__id">${id}</p>
                    <p class="photographer__location">${city}, ${country}</p>
                    <p class="photographer__tagline">${tagline}</p>
                    <p class="photographer__price">${price}€/jour</p>
                </div>
        `;
        photographerCard.innerHTML = photographerInfos;
        return photographerCard;
    };

    return { createPhotographerCard };
};
