export const photographerTemplate = (data) => {
    const { id, name, city, country, tagline, price, portrait } = data;

    // Chemin de la photo du photographe
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
        const photographerProfil = document.createElement("div");
        photographerProfil.classList.add("profil");
        const photographerInfos =  `
                <div class="profil__infos">
                    <h1 class="profil__title">${name}</h1>
                    <p class="profil__location">${city}, ${country}</p>
                    <p class="profil__tagline">${tagline}</p>
                </div>
                <button
                    class="profil__btn btn modal-trigger"
                    aria-label="Contactez ${name}"
                    aria-haspopup="dialog"
                    aria-controls="contact-modal"
                >Contactez-moi</button>
                <div class="profil__picture">
                    <img src="${picture}" alt="Photo du photographe ${name}"/>
                </div>
                <aside class="photographer-insert">
                    <div class="insert">
                        <span class="insert__like" aria-label="Nombre de j'aime = ">297 081 <i class="fas fa-heart insert__heart" aria-hidden="true"></i></span>
                        <span class="insert__price" aria-label="Prix à la journée ${price}€">${price}€ / jour</span>
                    </div>
                </aside>
        `;
        photographerProfil.innerHTML = photographerInfos;
        return photographerProfil;
    };

    return { createPhotographerCard, createPhotographerProfil };
};
