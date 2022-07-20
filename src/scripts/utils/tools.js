/**
 * Get the id of a URL and transform it into a number.
 * @param {string} - urlID
 * @returns the photographerID.
 */
export const getUrlID = (urlID) => {
    const params = new URLSearchParams(urlID);
    const photographerID = parseInt(params.get("id"));
    return photographerID;
};

// Retrieves the name of the photographer in the DOM, replaces spaces with dashes, puts all letters in lower case
export const getPhotographerName = () => {
    const photographerName = document.querySelector(".profil__title").textContent.replace(/ /g,"-").toLowerCase();
    return photographerName;
};