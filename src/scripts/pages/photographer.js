import { PhotographerApi } from "../api/Api.js";
import { templateFactory } from "../factories/TemplateFactory.js";
import { getUrlID } from "../utils/tools.js";
import { modalTools } from "../utils/modal.js";
import { formTools } from "../utils/form.js";
import { likesTools } from "../utils/likes.js";
import { sortDataByPopular, sortTools } from "../utils/sorts.js";
import { Lightbox } from "../utils/Lightbox.js";

// Stores portfolio data during initialization
export let mediasPhotographers = [];

// Retrieve JSON data with the API
const getDataJSON = async () => {
    // JSON file path
    const JSON = "src/data/photographers.json";
    // Instantiation of the PhotographerApi class with the JSON file path
    const data = new PhotographerApi(JSON);
    // Get the photographer's ID in the URL
    const photographerID = getUrlID(window.location.search);
    // Recover the data of the photographer and his portfolio to his ID
    const photographer = await data.getPhotographerProfil(photographerID);
    const portfolio = await data.getPhotographerMedias(photographerID);
    return { photographer, portfolio };
};

// Displays the photographer's profile and portfolio
const displayData = (photographer, portfolio) => {
    // Creation of photographer's profile
    const photographerHeader = document.querySelector(".photographer-header");
    const profil = templateFactory("photographerProfil", photographer);
    photographerHeader.appendChild(profil);

    // Creation of photographer's portfolio
    const photographerPortfolio = document.querySelector(".photographer-portfolio");
    const portfolioSortByPopular = sortDataByPopular(portfolio);
    portfolioSortByPopular.forEach((media) => {
        const mediaCard = templateFactory("portfolio", media);
        photographerPortfolio.appendChild(mediaCard);
    });

    // Tools : likes control functions once the DOM is loaded
    likesTools();
};

// Displaying the sorting of the photographer's portfolio
const sortData = (portfolio) => {
    // Creating filters and adding them to the DOM
    const sortMedias = document.querySelector(".media-sorting");
    const sortFilter = templateFactory("sortFilter");
    sortMedias.appendChild(sortFilter);

    // Tools : sorting control functions once the DOM is loaded
    sortTools(portfolio);
};

// Creation of the contact modal which contains the contact form
const displayModal = (photographer) => {
    // Creation of the modal
    const contactModal = document.querySelector(".contact-modal");
    const modalForm = templateFactory("modalForm", photographer);
    contactModal.appendChild(modalForm);

    // Creation of the success modal
    const modalSuccess = templateFactory("modalSuccess");
    contactModal.appendChild(modalSuccess);

    // Tools : modal and form control functions once the DOM is loaded
    modalTools();
    formTools();
};

// Creation of the lightbox
const displayLightbox = (photographer) => {

    // Recover and reformat the photographer's name
    const photographerName = photographer.name.replace(/ /g,"-").toLowerCase();

    // Delegation of events for the initialization of the lightbox
    const photographerPortfolio = document.querySelector(".photographer-portfolio");

    photographerPortfolio.addEventListener("click", function(event) {
        event.preventDefault();
        const initElem = event.target;

        if (initElem.matches("a")) {
            const mediaId = initElem.previousElementSibling.value;
            const lightbox = new Lightbox(mediaId, photographerName);
            lightbox.init();
        } else {
            return;
        }
    });
};

/* Init App by retrieving the JSON data from the photographer and loading the data display functions,
sorting, modal and lightbox */
const init = async () => {
    // Retrieves data from the photographer
    const data = await getDataJSON();
    // Create a copy of the photographer's portfolio data
    mediasPhotographers = [...data.portfolio];
    // Display the photographer and the portfolio
    displayData(data.photographer, mediasPhotographers);
    // Create sorting
    sortData(mediasPhotographers);
    // Create modal
    displayModal(data.photographer);
    // Create the lightbox
    displayLightbox(data.photographer);
};

// Init App
init();