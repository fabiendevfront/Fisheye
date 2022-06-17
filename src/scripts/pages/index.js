import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";

// Chemin du fichier JSON
const JSON = "../../src/data/photographers.json";
// Instanciation de la class Api avec le chemin du fichier JSON
const data = new PhotographerApi(JSON);

// Affiche les données des photographes
const displayData = async (photographers) => {
    // Noeud HTML dans lequel on insere la liste des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // On parcours les photographes
    await photographers.forEach((photographer) => {
        // Creer un objet par photographe avec toutes ses infos avec la factory function
        const photographerModel = templateFactory(photographer, "photographerCard");
        // Ajoute la card au DOM
        photographersSection.appendChild(photographerModel);
    });
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async (data) => {
    // Récupère les datas des photographes
    const photographers = await data.getPhotographersData();
    // Affiches les photographes
    displayData(photographers);
};

// Initialise l'App
init(data);