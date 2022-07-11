export const sortsTools2 = (portfolioContainer, portfolioCards) => {
    sortPortfolio2(portfolioContainer, portfolioCards);
};

// Premier tri des données JSON par popularité à l'initialisation de la page
export const initSortByPopular = (datas) => {
    console.log("Trier par popularitée1");
    return datas.sort((a, b) => {
        // 'b'(par sa position) sera la reference et sera comparé à 'a', qui sera l'élément suivant
        // b > a
        return b.likes - a.likes;
    });
};


const sortPortfolio2 = (portfolioContainer, portfolioCards) => {
    const sortSelect = document.querySelector(".sort-filter__select");
    const cards = [...portfolioCards];

    sortSelect.addEventListener("change", () => {
        let optionValue = sortSelect.value;

        if (optionValue === "popularite") {
            const sortPopular = sortDataByPopular2(cards);
            newMediaReorganization2(portfolioContainer, sortPopular);
        } else if (optionValue === "date") {
            const sortDate = sortDataByDate2(cards);
            newMediaReorganization2(portfolioContainer, sortDate);
        } else if (optionValue === "titre") {
            const sortTitle = sortDataByTitle2(cards);
            newMediaReorganization2(portfolioContainer, sortTitle);
        }
    });
};

// tri les données par popularité
const sortDataByPopular2 = (cards) => {
    console.log("Trier par popularitée2");

    return cards.sort((a, b) => {
        // 'b'(par sa position) sera la reference et sera comparé à 'a', qui sera l'élément suivant
        // b > a
        return b.dataset.likes - a.dataset.likes;
    });
};

// tri les données par date
const sortDataByDate2 = (cards) => {
    console.log("Trier par date");
    return cards.slice().sort((a, b) => {
        // a < b
        const valueA = new Date(a.dataset.date);
        const valueB = new Date(b.dataset.date);
        return valueB - valueA;
    });
};

// tri les données par titre
const sortDataByTitle2 = (cards) => {
    console.log("Trier par titre");
    return cards.sort((a, b) => {
        return a.dataset.title.localeCompare(b.dataset.title);
    });
};

// Réorganisation du DOM après le tri
const newMediaReorganization2 = (portfolioContainer, cardsSortBy) => {
    cardsSortBy.forEach((card) => {
        portfolioContainer.appendChild(card);
    });
};


// Prémière méthode (modifiée car ne gardé pas les likes)

// import { templateFactory } from "../factories/TemplateFactory.js";

// export const sortTools = (data) => {
//     sortPortfolio(data);
// };

// const sortPortfolio = (data) => {
//     const sortSelect = document.querySelector(".sort-filter__select");

//     sortSelect.addEventListener("change", () => {
//         let optionValue = sortSelect.value;

//         if (optionValue === "popularite" || optionValue === null) {
//             const sortPopular = sortDataByPopular(data);
//             newMediaReorganization(sortPopular);
//         } else if (optionValue === "date") {
//             const sortDate = sortDataByDate(data);
//             newMediaReorganization(sortDate);
//         } else if (optionValue === "titre") {
//             const sortTitle = sortDataByTitle(data);
//             newMediaReorganization(sortTitle);
//         }
//     });
// };

// // tri les données par popularité
// const sortDataByPopular = (datas) => {
//     console.log("Trier par popularitée1");
//     return datas.sort((a, b) => {
//         // 'b'(par sa position) sera la reference et sera comparé à 'a', qui sera l'élément suivant
//         // b > a
//         return b.likes - a.likes;
//     });
// };

// // tri les données par date
// const sortDataByDate = (datas) => {
//     console.log("Trier par date");
//     return datas.slice().sort((a, b) => {
//         // a < b
//         const valueA = new Date(a.date);
//         const valueB = new Date(b.date);
//         return valueB - valueA;
//     });
// };

// // tri les données par titre
// const sortDataByTitle = (datas) => {
//     console.log("Trier par titre");
//     return datas.sort((a, b) => {
//         return a.title.localeCompare(b.title);
//     });
// };

// const newMediaReorganization = (mediasSortBy) => {
//     const photographerPortfolio = document.querySelector(".photographer-portfolio");
//     const medias = document.querySelectorAll(".media");

//     medias.forEach((media) => {
//         media.remove();
//     });

//     mediasSortBy.forEach((card) => {
//         const medias = templateFactory(card, "portfolio");
//         // photographerPortfolio.appendChild(medias);
//         photographerPortfolio.insertBefore(medias, photographerPortfolio.firstChild);
//     });
// };

