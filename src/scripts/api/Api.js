class Api {

    constructor(url) {
        this.url = url;
    }

    // Méthode qui récupère les données JSON des photographes avec Fetch asynchrone
    async getPhotographersData() {
        try {
            const response = await fetch(this.url);
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            await sleep(2000);
            const data = await response.json();
            return data.photographers;
        } catch(error) {
            throw new Error("Erreur à la récupération des données : ", error);
        }
    }
    // Méthode qui récupère les données JSON d'un photographe en utilisant son ID avec Fetch asynchrone
    async getPhotographerProfil(id) {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data.photographers.filter(photographer => photographer.id === id)[0];
        } catch(error) {
            throw new Error("Erreur à la récupération des données : ", error);
        }
    }
}

export { Api };