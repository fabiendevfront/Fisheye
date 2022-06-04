import { photographerFactory } from "../factories/PhotographerFactory.js";

// Fonction qui récupère les données JSON avec Fetch asynchrone
const getPhotographers = async () => {
    // 1ere méthode
    try {
        let response = await fetch("../../src/data/photographers.json");
        let data = await response.json();
        return ({photographers: [...data.photographers]});
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
        const photographerModel = photographerFactory(photographer);
        // Ajoute la card au DOM
        photographersSection.appendChild(photographerModel.createPhotographerCard());
    });
};

// Fonction qui initialise l'App en récuprérant les données du JSON et en affichant les cards photographes
const init = async () => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    // Affiches les photographes
    displayData(photographers);
};
// Initialise l'App
init();