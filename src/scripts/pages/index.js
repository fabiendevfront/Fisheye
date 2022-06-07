import { photographerFactory } from "../factories/PhotographerFactory.js";

// Fonction qui récupère les données JSON avec Fetch asynchrone
const getPhotographers = async () => {
    try {
        const response = await fetch("../../src/data/photographers.json");
        const data = await response.json();
        return data.photographers;
    } catch(error) {
        throw new Error("Erreur à la récupération des données : ", error);
    }
};

// Affiche les données des photographes
const displayData = async (photographers) => {
    // Noeud HTML dans lequel on insere la liste des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // On parcours les photographes
    await photographers.forEach((photographer) => {
        // Creer un objet par photographe avec toutes ses infos avec la factory function
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer).createPhotographerCard();
        // Ajoute la card au DOM
        photographersSection.appendChild(photographerModel);
    });
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async () => {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    // Affiches les photographes
    displayData(photographers);
};
// Initialise l'App
init();