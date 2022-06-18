import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";
import { getUrlID } from "../utils/tools.js";

// Chemin du fichier JSON
const JSON = "../../src/data/photographers.json";

// Instanciation de la class Api avec le chemin du fichier JSON
const data = new PhotographerApi(JSON);

// Récupère l'ID du photographe dans l'URL
const photographerID = getUrlID(window.location.search);

// Affiche les données des photographes
const displayData = async (photographer, portfolio) => {
    // Creation du profil avec le méthode createPhotographerProfil() de la PhotographerFactory et l'ajoute au DOM
    const photographerHeader = document.querySelector(".photographer-header");
    const profil = templateFactory(photographer, "photographerProfil");
    photographerHeader.appendChild(profil);

    // Parcours le tableau et creer des cartes média avec le méthode createMediaCard() de la MediaFactory et l'ajoute au DOM
    const photographerPortfolio = document.querySelector(".photographer-portfolio");
    await portfolio.forEach((media) => {
        const medias = templateFactory(media, "portfolio");
        photographerPortfolio.appendChild(medias);
    });
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async (data, photographerID) => {
    // Récupère les données du photographe et de son portfolio grace à son ID
    const photographer = await data.getPhotographerProfil(photographerID);
    const portfolio = await data.getPhotographerMedias(photographerID);

    // Affiche le photographe et le portfolio
    displayData(photographer, portfolio);
};

// Initialise l'App
init(data, photographerID);