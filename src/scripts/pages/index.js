import { Api } from "../api/Api.js";
import { photographerFactory } from "../factories/PhotographerFactory.js";

// Affiche les données des photographes
const displayData = async (photographers) => {
    // Noeud HTML dans lequel on insere la liste des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // On parcours les photographes
    await photographers.forEach((photographer) => {
        // Creer un objet par photographe avec toutes ses infos avec la factory function
        const photographerModel = photographerFactory(photographer).createPhotographerCard();
        // Ajoute la card au DOM
        photographersSection.appendChild(photographerModel);
    });
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async () => {
    // Instanciation de la class Api avec le chemin du fichier JSON
    const data = new Api("../../src/data/photographers.json");
    // Récupère les datas des photographes
    const photographers = await data.getPhotographersData();
    // Affiches les photographes
    displayData(photographers);
};

// Initialise l'App
init();