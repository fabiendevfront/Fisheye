import { Api } from "../api/Api.js";
import { photographerFactory } from "../factories/PhotographerFactory.js";
import { mediaFactory } from "../factories/MediaFactory.js";

// Affiche les données des photographes
const displayData = async (photographer, portfolio) => {

    // Creation du profil avec le méthode createPhotographerProfil() de la PhotographerFactory et l'ajoute au DOM
    const photographerHeader = document.querySelector(".photographer-header");
    const profil = photographerFactory(photographer).createPhotographerProfil();
    photographerHeader.appendChild(profil);

    // Creation de l'insert (likes et price) avec le méthode createPhotographerInsert() de la PhotographerFactory et l'ajoute au DOM
    const photographerInsert = document.querySelector(".photographer-insert");
    const insert = photographerFactory(photographer).createPhotographerInsert();
    photographerInsert.appendChild(insert);

    // Recupère dans le DOM le nom du photographe, supprime les espaces si il y en a, met toutes les lettres en minuscule
    const photographerName = document.querySelector(".profil__title").textContent.replace(/ /g,"-").toLowerCase();
    // Parcours le tableau et creer des cartes média avec le méthode createMediaCard() de la MediaFactory et l'ajoute au DOM
    const photographerPortfolio = document.querySelector(".photographer-portfolio");
    await portfolio.forEach((media) => {
        const medias = mediaFactory(media, photographerName).createMediaCard();
        photographerPortfolio.appendChild(medias);
    });
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async () => {
    // Instanciation de la class Api avec le chemin du fichier JSON
    const data = new Api("../../src/data/photographers.json");
    // Récupère l'ID du photographe dans l'URL
    const urlID = window.location.search;
    const params = new URLSearchParams(urlID);
    const photographerID = parseInt(params.get("id"));
    // Récupère les données du photographe et de son portfolio grace à son ID
    const photographer = await data.getPhotographerProfil(photographerID);
    const portfolio = await data.getPhotographerMedias(photographerID);
    // Affiche le photographe et le portfolio
    displayData(photographer, portfolio);
};

// Initialise l'App
init();