import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";


// Get the data from the photographers in the JSON file with the API
const getDataJSON = async () => {
    // JSON file path
    const JSON = "src/data/photographers.json";
    // Instantiation of the PhotographerApi class with the JSON file path
    const data = new PhotographerApi(JSON);
    // Retrieves data from photographers
    const photographers = await data.getPhotographersData();
    return photographers;
};

// Display the skeleton loader
const displaySkeleton = async (photographers) => {
    // HTML node in which the skeleton cards are inserted
    const photographersSection = document.querySelector(".photographer_section");
    // Browse the photographers
    await photographers.forEach(() => {
        // Create a skeleton card by photographer
        const skeletonCard = templateFactory("skeletonCard");
        // Add the skeleton card to the DOM
        photographersSection.appendChild(skeletonCard);
    });
};

// Remove the skeleton cards
const removeSkeleton = async () => {
    // Recover the skeleton cards
    const listSkeleton = document.querySelectorAll(".skeleton-card");
    // Browse through the skeleton cards
    listSkeleton.forEach((skeleton) => {
        // Deletes the skeleton card that has been traveled
        skeleton.remove();
    });
};

// Display the cards of the photographers
const displayPhotographers = async (photographers) => {
    // HTML node in which we insert the cards of the photographers
    const photographersSection = document.querySelector(".photographer_section");
    // Browse the photographers
    await photographers.forEach((photographer) => {
        // Create a card by photographer with all his info
        const photographerModel = templateFactory("photographerCard", photographer);
        // Add the photographer's card to the DOM
        photographersSection.appendChild(photographerModel);
    });
};

// Init App by displaying the photographer cards
const init = async (photographers) => {
    displayPhotographers(photographers);
};

/* Event at page load:
* Retrieves data
* Displays the skeleton
* Simulation of a slow API data loading delay
* Remove the skeleton
* Init App
*/
window.addEventListener("load", async () => {
    const photographers = await getDataJSON();
    await displaySkeleton(photographers);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(2000);
    await removeSkeleton(photographers);
    await init(photographers);
});