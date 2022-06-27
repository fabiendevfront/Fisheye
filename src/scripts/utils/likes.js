export const likesTools = () => {
    getTotalLikes();
    addLikeBtnEvent();
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

const addLikeBtnEvent = () => {
    const likesContainers = document.querySelectorAll(".media__content");
    likesContainers.forEach((likeContainer) => {
        likeContainer.children[1].addEventListener("click", () => {
            likeMedia(likeContainer);
        });
        likeContainer.children[1].addEventListener("keydown", (event) => {
            if (event.code == "Enter") {
                likeMedia(likeContainer);
            }
        });
    });
};

const likeMedia = (likeContainer) => {
    const totalLikesArea = document.querySelector(".insert__like");
    let actualTotalLikes = parseInt(totalLikesArea.textContent);
    let nbrLikesMedia = parseInt(likeContainer.children[0].textContent);
    let likeBtn = likeContainer.children[1];

    likeBtn.classList.toggle("liked");

    if (likeBtn.matches(".liked")) {
        const likeNbr = nbrLikesMedia + 1;
        likeContainer.children[0].textContent = likeNbr;
        likeBtn.setAttribute("aria-label", `${likeNbr} likes`);
        const newTotalLikes = actualTotalLikes + 1;
        totalLikesArea.innerHTML = `${newTotalLikes} <i class="fas fa-heart insert__heart" aria-hidden="true"></i>`;
    } else {
        const likeNbr = nbrLikesMedia - 1;
        likeContainer.children[0].textContent = likeNbr;
        likeBtn.setAttribute("aria-label", `${likeNbr} likes`);
        const newTotalLikes = actualTotalLikes - 1;
        totalLikesArea.innerHTML = `${newTotalLikes} <i class="fas fa-heart insert__heart" aria-hidden="true"></i>`;
    }
};
