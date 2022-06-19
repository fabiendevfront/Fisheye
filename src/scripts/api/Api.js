class Api {

    constructor(url) {
        this.url = url;
    }

    async getData() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch(error) {
            throw new Error("Erreur à la récupération des données : ", error);
        }
    }
}

class PhotographerApi extends Api {

    constructor(url) {
        super(url);
    }

    // Méthode qui récupère les données JSON des photographes avec Fetch asynchrone
    async getPhotographersData() {
        const data = await this.getData();
        return data.photographers;
    }

    // Méthode qui récupère les données JSON d'un photographe en utilisant son ID avec Fetch asynchrone
    async getPhotographerProfil(id) {
        const data = await this.getData();
        return data.photographers.filter(photographer => photographer.id === id)[0];
    }

    // Méthode qui récupère les données JSON des médias d'un photographe en utilisant son ID avec Fetch asynchrone
    async getPhotographerMedias(id) {
        const data = await this.getData();
        return data.media.filter(media => media.photographerId === id);
    }
}

export { PhotographerApi };