// API : Retrieves the data in the JSON file with the fetch method
class Api {
    /**
     * @param {string} - url
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Fetches the data from the API, then returns the data in JSON format
     * @returns The data is being returned.
     */
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

// Photographer API : Return the data with API function getData()
export class PhotographerApi extends Api {
    /**
     * @param {string} - url
     */
    constructor(url) {
        super(url);
    }

    /**
     * Returns the photographers data from the data object.
     * @returns The data.photographers object.
     */
    async getPhotographersData() {
        const data = await this.getData();
        return data.photographers;
    }

    /**
     * Takes an id as an argument and returns the photographer
     * object that has the same id as the argument.
     * @param {Number} - id
     * @returns The first element of the array returned by the filter method.
     */
    async getPhotographerProfil(id) {
        const data = await this.getData();
        return data.photographers.filter(photographer => photographer.id === id)[0];
    }

    /**
     * Returns a filtered array of media objects based on the photographerId.
     * @param {Number} - The id of the photographer you want to get the media for.
     * @returns The media array filtered by the photographerId.
     */
    async getPhotographerMedias(id) {
        const data = await this.getData();
        return data.media.filter(media => media.photographerId === id);
    }
}