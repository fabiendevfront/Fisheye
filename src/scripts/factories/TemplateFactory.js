import { photographerTemplate } from "../templates/PhotographerTemplate.js";
import { mediaTemplate } from "../templates/MediaTemplate.js";

export const templateFactory = (data, type) => {
    if (type === "photographerCard") {
        return photographerTemplate(data).createPhotographerCard();
    } else if (type === "photographerProfil")  {
        return photographerTemplate(data).createPhotographerProfil();
    } else if (type === "portfolio") {
        return mediaTemplate(data).createMediaCard();
    } else {
        throw "Unknown type format";
    }
};