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

    // 2ème méthode
    // const photographers = await fetch("../../src/data/photographers.json")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         return data.photographers;
    //     })
    //     .catch((error) => {
    //         throw new Error("Erreur à la récupération des données : ", error);
    //     });
    // return ({photographers: [...photographers]});
};

// Affiche les données des photographes
const displayData = async (photographers) => {
    // Noeud HTML dans lequel on insere la liste des photographes
    const photographersSection = document.querySelector(".photographer_section");
    // On parcours les photographes
    photographers.forEach((photographer) => {
        // Creer un objet par photographe avec la factory function avec toutes ses infos
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        // Utilise "getUserCardDOM" pour générer le HTML de la card
        const userCardDOM = photographerModel.getUserCardDOM();
        // Ajoute la card au DOM
        photographersSection.appendChild(userCardDOM);
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