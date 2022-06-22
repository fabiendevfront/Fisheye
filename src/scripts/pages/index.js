import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";

// Récupère les données des photographes dans le fichier JSON avec l'API
const getDataJSON = async () => {
    // Chemin du fichier JSON
    const JSON = "../../src/data/photographers.json";
    // Instanciation de la class PhotographerApi avec le chemin du fichier JSON
    const data = new PhotographerApi(JSON);
    // Récupération des données des photographes
    const photographers = await data.getPhotographersData();
    return photographers;
};

// Affiche le skeleton loader pour simuler les cards des photographes
const displaySkeleton = async (photographers) => {
    // Noeud HTML dans lequel on insere les cards du skeleton
    const photographersSection = document.querySelector(".photographer_section");
    // Parcours les photographes
    await photographers.forEach((photographer) => {
        // Creer une card du skeleton par photographe avec la factory function
        const skeletonCard = templateFactory(photographer, "skeletonCard");
        // Ajoute la card du skeleton au DOM
        photographersSection.appendChild(skeletonCard);
    });
};

// Supprime les cards du skeleton
const removeSkeleton = async () => {
    // Récupère les cards du skeleton
    const listSkeleton = document.querySelectorAll(".skeleton-card");
    // Parcours les cards du skeleton
    listSkeleton.forEach((skeleton) => {
        // Supprime la card du skeleton parcourue
        skeleton.remove();
    });
};

// Affiche les cards des photographes
const displayPhotographers = async (photographers) => {
    // Noeud HTML dans lequel on insere les cards des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // Parcours les photographes
    await photographers.forEach((photographer) => {
        // Creer une card par photographe avec toutes ses infos avec la factory function
        const photographerModel = templateFactory(photographer, "photographerCard");
        // Ajoute la card du photographe au DOM
        photographersSection.appendChild(photographerModel);
    });
};

// Fonction qui initialise l'App en affichant les cards photographes
const init = async (data) => {
    displayPhotographers(data);
};

/* Event au chargement de la page:
* Récupère les données
* Affiche le skeleton
* Simulation d'un délai de chargement des données d'une API lente
* Supprime le skeleton
* Initialise l'App
*/
window.addEventListener("load", async () => {
    const photographers = await getDataJSON();
    await displaySkeleton(photographers);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(2000);
    await removeSkeleton(photographers);
    await init(photographers);
});