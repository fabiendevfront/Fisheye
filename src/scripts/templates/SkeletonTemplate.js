export const skeletonTemplate = () => {

    const createSkeletonCard = () => {
        const skeletonCard = document.createElement("article");
        skeletonCard.classList.add("skeleton-card");
        const skeletonInfos =  `
            <div class="skeleton-card__picture photographer__picture"></div>
            <h2 class="skeleton-card__title"></h2>
            <div class="skeleton-card__infos">
                <p class="skeleton-card__location"></p>
                <p class="skeleton-card__tagline"></p>
                <p class="skeleton-card__price"></p>
            </div>
        `;
        skeletonCard.innerHTML = skeletonInfos;
        return skeletonCard;
    };

    return { createSkeletonCard };
};