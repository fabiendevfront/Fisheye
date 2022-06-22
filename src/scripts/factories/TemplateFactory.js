import { photographerTemplate } from "../templates/PhotographerTemplate.js";
import { mediaTemplate } from "../templates/MediaTemplate.js";
import { skeletonTemplate } from "../templates/SkeletonTemplate.js";
import { modalTemplate } from "../templates/ModalTemplate.js";

export const templateFactory = (data, type) => {
    if (type === "photographerCard") {
        return photographerTemplate(data).createPhotographerCard();
    } else if (type === "photographerProfil")  {
        return photographerTemplate(data).createPhotographerProfil();
    } else if (type === "portfolio") {
        return mediaTemplate(data).createMediaCard();
    } else if (type === "skeletonCard") {
        return skeletonTemplate().createSkeletonCard();
    } else if (type === "modalForm") {
        return modalTemplate(data).createModalForm();
    } else if (type === "modalSuccess") {
        return modalTemplate().createModalSuccess();
    } else {
        throw "Unknown type format";
    }
};