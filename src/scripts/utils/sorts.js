export const sortTools = (data) => {
    sortPortfolio(data);
};

// Tri les données du portfolio suivant l'option du select choisie
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

// Tri les données par popularité
export const sortDataByPopular = (datas) => {
    console.log("Tri par popularitée");
    return datas.sort((a, b) => {
        // 'b' sera comparé à 'a', qui sera l'élément suivant
        // b > a
        return b.likes - a.likes;
    });
};

// Tri les données par date
const sortDataByDate = (datas) => {
    console.log("Tri par date");
    return datas.slice().sort((a, b) => {
        // a < b
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
};

// Tri les données par titre
const sortDataByTitle = (datas) => {
    console.log("Tri par titre");
    return datas.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
};

const newMediaReorganization = (mediasSortBy) => {
    const medias = document.querySelectorAll(".media");
    const photographerPortfolio = document.querySelector(".photographer-portfolio");

    mediasSortBy.forEach((m) => {
        console.log(m.id);
        medias.forEach((node) => {
            const id = node.querySelector("input").value;
            console.log(id);
            console.log(m.id === parseInt(id));
            if (m.id === parseInt(id)) {
                console.log("Elément ajouté au Dom");
                photographerPortfolio.appendChild(node);
            }
        });
    });
};