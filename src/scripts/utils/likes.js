export const likesTools = () => {
    getTotalLikes();
    addEventDelegation();
};

export const getTotalLikes = () => {
    const likes = document.querySelectorAll(".media__likes");
    const insertLikes = document.querySelector(".insert__like");
    let totalLikes = 0;
    likes.forEach((like) => {
        const actualLikes = parseInt(like.textContent);
        totalLikes += actualLikes;
    });
    insertLikes.innerHTML = `${totalLikes} <i class="fas fa-heart insert__heart" aria-hidden="true"></i>`;
};

const addEventDelegation = () => {
    const photographerPortfolio = document.querySelector(".photographer-portfolio");

    photographerPortfolio.addEventListener("click", function(event) {
        const initElem = event.target;

        if (initElem.matches(".media__heart")) {
            likeMedia(initElem);
        } else {
            return;
        }
    });
};

const likeMedia = (likeBtn) => {
    const totalLikesArea = document.querySelector(".insert__like");
    let actualTotalLikes = parseInt(totalLikesArea.textContent);
    let nbrLikesMedia = parseInt(likeBtn.previousElementSibling.textContent);

    likeBtn.classList.toggle("liked");

    if (likeBtn.matches(".liked")) {
        const likeNbr = nbrLikesMedia + 1;
        likeBtn.previousElementSibling.textContent = likeNbr;
        likeBtn.setAttribute("aria-label", `${likeNbr} likes`);
        const newTotalLikes = actualTotalLikes + 1;
        totalLikesArea.innerHTML = `${newTotalLikes} <i class="fas fa-heart insert__heart" aria-hidden="true"></i>`;
    } else {
        const likeNbr = nbrLikesMedia - 1;
        likeBtn.previousElementSibling.textContent = likeNbr;
        likeBtn.setAttribute("aria-label", `${likeNbr} likes`);
        const newTotalLikes = actualTotalLikes - 1;
        totalLikesArea.innerHTML = `${newTotalLikes} <i class="fas fa-heart insert__heart" aria-hidden="true"></i>`;
    }
};
