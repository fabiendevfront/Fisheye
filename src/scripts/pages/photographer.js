import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";
import { getUrlID } from "../utils/tools.js";
import { modalTools } from "../utils/modal.js";
import { formTools } from "../utils/form.js";
import { likesTools } from "../utils/likes.js";
import { initSortByPopular, sortsTools2 } from "../utils/sorts.js";


const getDataJSON = async () => {
    // Chemin du fichier JSON
    const JSON = "../../src/data/photographers.json";
    // Instanciation de la class PhotographerApi avec le chemin du fichier JSON
    const data = new PhotographerApi(JSON);
    // Récupère l'ID du photographe dans l'URL
    const photographerID = getUrlID(window.location.search);
    // Récupère les données du photographe et de son portfolio grace à son ID
    const photographer = await data.getPhotographerProfil(photographerID);
    const portfolio = await data.getPhotographerMedias(photographerID);
    return { photographer, portfolio };
};

// Affiche les données des photographes
const displayData = (photographer, portfolio) => {
    // Creation du profil avec le méthode createPhotographerProfil() de PhotographerTemplate et l'ajoute au DOM
    const photographerHeader = document.querySelector(".photographer-header");
    const profil = templateFactory(photographer, "photographerProfil");
    photographerHeader.appendChild(profil);

    // Parcours le tableau et creer des cartes média avec le méthode createMediaCard() de la MediaFactory et l'ajoute au DOM
    const photographerPortfolio = document.querySelector(".photographer-portfolio");
    const portfolioSortByPopular = initSortByPopular(portfolio);
    portfolioSortByPopular.forEach((media) => {
        const medias = templateFactory(media, "portfolio");
        photographerPortfolio.appendChild(medias);
    });

    // Tools
    likesTools();
};

const sortData = (portfolio) => {
    // Creation des filtres avec le méthode createSortFilter() de SortTemplate et l'ajoute au DOM
    const sortMedias = document.querySelector(".media-sorting");
    const sortFilter = templateFactory(portfolio, "sortFilter");
    sortMedias.appendChild(sortFilter);

    // Selection des éléments du DOM qui serviront pour le tri
    const portfolioContainer = document.querySelector(".photographer-portfolio");
    const portfolioCards = document.querySelectorAll(".media");
    // Tools: Tri des éléments suivant les options
    sortsTools2(portfolioContainer, portfolioCards);
};

// Création de la modale de contact
const displayModal = (photographer) => {
    const contactModal = document.querySelector(".contact-modal");
    const modalForm = templateFactory(photographer, "modalForm");
    contactModal.appendChild(modalForm);
    const modalSuccess = templateFactory(photographer, "modalSuccess");
    contactModal.appendChild(modalSuccess);
    modalTools();
    formTools();
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async () => {
    // Affiche le photographe et le portfolio
    const data = await getDataJSON();
    // Affiche le photographe et le portfolio
    displayData(data.photographer, data.portfolio);
    sortData(data.portfolio);
    displayModal(data.photographer);
};

// Initialise l'App
init();