class Api {

    constructor(url) {
        this.url = url;
    }

    // Méthode qui récupère les données JSON des photographes avec Fetch asynchrone
    async getPhotographersData() {
        try {
            const response = await fetch(this.url);
            console.log(response);
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            await sleep(2000);
            const data = await response.json();
            console.log(data);
            console.log(data.photographers);
            return data.photographers;
        } catch(error) {
            throw new Error("Erreur à la récupération des données : ", error);
        }
    }
}

export { Api };