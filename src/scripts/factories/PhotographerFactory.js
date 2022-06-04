// eslint-disable-next-line no-unused-vars
const photographerFactory = (data) => {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/images/photographers/${portrait}`;
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");

    const getUserCardDOM = () => {
        img.setAttribute("src", picture);
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return article;
    };

    return { id, name, city, country, tagline, price, picture, getUserCardDOM };
};
