/* ==========================================================
   Sort tools for photographer page after create DOM of sort
   ========================================================== */

export const sortTools = (data) => {
    sortPortfolio(data);
};

/* ==========
   Controller
   ========== */

/**
 * Sort the portfolio data according to the selected option
 * @param {Array.<Object>} - portfolio data
 */
const sortPortfolio = (data) => {
    const sortSelect = document.querySelector(".sort-filter__select");
    let dataResults = [];

    sortSelect.addEventListener("change", () => {
        let optionValue = sortSelect.value;

        if (optionValue === "popularite" || optionValue === null) {
            dataResults = sortDataByPopular(data);
        } else if (optionValue === "date") {
            dataResults = sortDataByDate(data);
        } else if (optionValue === "titre") {
            dataResults = sortDataByTitle(data);
        }
        newMediaReorganization(dataResults);
    });
};

/**
 * Sort the data by the number of likes.
 * @param {Array.<Object>} - portfolio data
 * @returns {Array.<Object>} - The sorted array.
 */
export const sortDataByPopular = (datas) => {
    return datas.sort((a, b) => {
        // b > a
        return b.likes - a.likes;
    });
};

/**
 * Sort the data by the date.
 * @param {Array.<Object>} - portfolio data
 * @returns {Array.<Object>} - The sorted array.
 */
const sortDataByDate = (datas) => {
    return datas.slice().sort((a, b) => {
        // a < b
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
};

/**
 * Sort the data by the title.
 * @param {Array.<Object>} - portfolio data
 * @returns {Array.<Object>} - The sorted array.
 */
const sortDataByTitle = (datas) => {
    return datas.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
};

/**
 * Reorganize the DOM after sorting the portfolio
 * @param {Array.<Object>} - The sorted array
 */
const newMediaReorganization = (mediasSortBy) => {
    const medias = document.querySelectorAll(".media");
    const photographerPortfolio = document.querySelector(".photographer-portfolio");

    mediasSortBy.forEach((m) => {
        medias.forEach((node) => {
            const id = node.querySelector("input").value;
            if (m.id === parseInt(id)) {
                photographerPortfolio.appendChild(node);
            }
        });
    });
};