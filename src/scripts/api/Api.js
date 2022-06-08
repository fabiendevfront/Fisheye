class Api {

    constructor(url) {
        this.url = url;
    }

    // Méthode qui récupère les données JSON des photographes avec Fetch asynchrone
    async getPhotographersData() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data.photographers;
        } catch(error) {
            throw new Error("Erreur à la récupération des données : ", error);
        }
    }
}

export { Api };