import { Api } from "../api/Api.js";
import { photographerFactory } from "../factories/PhotographerFactory.js";

// Affiche les données des photographes
const displayData = (photographer) => {
    // Noeuds HTML dans lequel on insere les différents éléments
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerInsert = document.querySelector(".photographer-insert");
    // Creation à l'aide au méthodes de la factory des différents éléments
    const profil = photographerFactory(photographer).createPhotographerProfil();
    const insert = photographerFactory(photographer).createPhotographerInsert();
    // Ajoute les éléments au DOM
    photographerHeader.appendChild(profil);
    photographerInsert.appendChild(insert);
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