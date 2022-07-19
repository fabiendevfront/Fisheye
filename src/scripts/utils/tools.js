// Récupère l'id d'une URL et le transforme en nombre
const getUrlID = (urlID) => {
    const params = new URLSearchParams(urlID);
    const photographerID = parseInt(params.get("id"));
    return photographerID;
};

// Recupère le nom du photographe dans le DOM, supprime les espaces si il y en a, met toutes les lettres en minuscule
const getPhotographerName = () => {
    const photographerName = document.querySelector(".profil__title").textContent.replace(/ /g,"-").toLowerCase();
    return photographerName;
};

function getExtension(link) {
    const regex = /[^.]*$/i;
    return link.match(regex)[0];
}

export { getUrlID, getPhotographerName, getExtension };