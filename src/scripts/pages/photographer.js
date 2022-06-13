import { Api } from "../api/Api.js";
import { photographerFactory } from "../factories/PhotographerFactory.js";

// Affiche les données des photographes
const displayData = async (photographer) => {
    // Noeud HTML dans lequel on insere le profil du photographes
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerProfil = photographerFactory(photographer).createPhotographerProfil();
    // Ajoute la profil au DOM
    photographerHeader.appendChild(photographerProfil);
    // On parcours les photographes
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async () => {
    // Instanciation de la class Api avec le chemin du fichier JSON
    const data = new Api("../../src/data/photographers.json");
    // Récupère l'ID du photographe dans l'URL
    const urlID = window.location.search;
    const params = new URLSearchParams(urlID);
    const photographerID = parseInt(params.get("id"));
    // Récupère les données du photographe grace à son ID
    const photographer = await data.getPhotographerProfil(photographerID);
    // Affiche le photographe
    displayData(photographer);
};

// Initialise l'App
init();