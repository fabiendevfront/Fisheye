import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";
import { getUrlID } from "../utils/tools.js";
import { modalTools } from "../utils/modal.js";
import { formTools } from "../utils/form.js";
import { likesTools } from "../utils/likes.js";
import { sortDataByPopular, sortTools } from "../utils/sorts.js";
import { Lightbox } from "../utils/lightbox.js";

// Stocke les datas du portfolio après l'initialisation
export let mediasPhotographers = [];

// Récupère les data du JSON avec l'API
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

// Affiche le profil et le portfolio du photographe
const displayData = (photographer, portfolio) => {
    // Creation du profil du photographe
    const photographerHeader = document.querySelector(".photographer-header");
    const profil = templateFactory(photographer, "photographerProfil");
    photographerHeader.appendChild(profil);

    // Parcours le tableau et creer des cartes média
    const photographerPortfolio = document.querySelector(".photographer-portfolio");
    const portfolioSortByPopular = sortDataByPopular(portfolio);
    portfolioSortByPopular.forEach((media) => {
        const mediaCard = templateFactory(media, "portfolio");
        photographerPortfolio.appendChild(mediaCard);
    });

    // Tools : fonctions de controle des likes une fois que le DOM est chargé
    likesTools();
};

// Affichage du tri du portfolio du photographe
const sortData = (portfolio) => {
    // Creation des filtres avec le méthode createSortFilter() de SortTemplate et l'ajoute au DOM
    const sortMedias = document.querySelector(".media-sorting");
    const sortFilter = templateFactory(portfolio, "sortFilter");
    sortMedias.appendChild(sortFilter);

    // Tools : fonctions de controle du tri une fois que le DOM est chargé
    sortTools(portfolio);
};

// Création de la modale de contact qui contient le formulaire de contact
const displayModal = (photographer) => {
    const contactModal = document.querySelector(".contact-modal");
    const modalForm = templateFactory(photographer, "modalForm");
    contactModal.appendChild(modalForm);
    const modalSuccess = templateFactory(photographer, "modalSuccess");
    contactModal.appendChild(modalSuccess);

    // Tools : fonctions de controle de la modale et du form une fois que le DOM est chargé
    modalTools();
    formTools();
};

// Création de la lightbox
const displayLightbox = (photographer) => {

    // Récupère et reformate le nom du photographe
    const photographerName = photographer.name.replace(/ /g,"-").toLowerCase();

    // Délégation d'évènements pour l'initialisation de la lightbox
    const photographerPortfolio = document.querySelector(".photographer-portfolio");

    photographerPortfolio.addEventListener("click", function(event) {
        event.preventDefault();
        const initElem = event.target;

        if (initElem.matches("a")) {
            const mediaId = initElem.previousElementSibling.value;
            const lightbox = new Lightbox(mediaId, photographerName);
            lightbox.init();
        } else {
            return;
        }
    });
};

/* Fonction qui initialise l'App en récupérant les datas JSON du photographe et chargeant les fonctions d'affichage des données,
le tri, la modale et la lightbox */
const init = async () => {
    // Récupère les datas du photographe
    const data = await getDataJSON();
    // Créer une copie des datas du portfolio du photographe
    mediasPhotographers = [...data.portfolio];
    // Affiche le photographe et le portfolio
    displayData(data.photographer, mediasPhotographers);
    // Créer le tri
    sortData(mediasPhotographers);
    // Créer la modale
    displayModal(data.photographer);
    // Créer la lightbox
    displayLightbox(data.photographer);
};

// Initialise l'App
init();