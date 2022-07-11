export const sortTemplate = () => {

    const createSortFilter = () => {
        const sortFilter = document.createElement("form");
        sortFilter.classList.add("sort-filter");
        const sortFilterContent =  `
        <label class="sort-filter__label" for="tri">Trier par</label>
        <div class="sort-filter__style">
            <select class="sort-filter__select" id="tri" name="tri">
                <option class="sort-filter__option" value="popularite">Popularité</option>
                <option class="sort-filter__option" value="date">Date</option>
                <option class="sort-filter__option" value="titre">Titre</option>
            </select>
        </div>
        `;
        sortFilter.innerHTML = sortFilterContent;
        return sortFilter;
    };

    return { createSortFilter };
};