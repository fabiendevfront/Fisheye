import { photographerTemplate } from "../templates/PhotographerTemplate.js";
import { mediaTemplate } from "../templates/MediaTemplate.js";
import { skeletonTemplate } from "../templates/SkeletonTemplate.js";
import { modalTemplate } from "../templates/ModalTemplate.js";
import { sortTemplate } from "../templates/SortTemplate.js";
import { lightboxTemplate } from "../templates/LightboxTemplate.js";

/**
 * It takes a data object and a type string as arguments and returns a template.
 * @param {Object} - data
 * @param {String} - type
 * @returns {Function} - Returns a function that generates an HTML element
 */
export const templateFactory = (data, type) => {
    if (type === "photographerCard") {
        return photographerTemplate(data).createPhotographerCard();
    } else if (type === "photographerProfil")  {
        return photographerTemplate(data).createPhotographerProfil();
    } else if (type === "portfolio") {
        return mediaTemplate(data).createMediaCard();
    } else if (type === "modalForm") {
        return modalTemplate(data).createModalForm();
    } else if (type === "skeletonCard") {
        return skeletonTemplate().createSkeletonCard();
    } else if (type === "modalSuccess") {
        return modalTemplate().createModalSuccess();
    } else if (type === "sortFilter") {
        return sortTemplate().createSortFilter();
    } else if (type === "lightbox") {
        return lightboxTemplate().createLightbox();
    } else {
        throw "Unknown type format";
    }
};