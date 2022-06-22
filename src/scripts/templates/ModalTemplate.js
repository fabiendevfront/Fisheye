export const modalTemplate = (data) => {

    const createModalForm = () => {
        const name = data.name;
        const modal = document.createElement("div");
        modal.classList.add("modal-form");
        const modalContent =  `
            <header class="modal-form__header">
                <h2 class="modal-form__title">Contactez-moi ${name}</h2>
                <img src="assets/icons/close.svg" class="modal-form__close modal-trigger"/>
            </header>
            <form class="form">
                <div class="form__group">
                    <label for="first" class="form__label">Prénom</label>
                    <input
                        class="form__input"
                        type="text"
                        id="first"
                        name="first"
                    />
                </div>
                <div class="form__group">
                    <label for="last" class="form__label">Nom</label>
                    <input
                        class="form__input"
                        type="text"
                        id="last"
                        name="last"
                    />
                </div>
                <div class="form__group">
                    <label for="email" class="form__label">Email</label>
                    <input
                        class="form__input"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>
                <div class="form__group">
                    <label for="message" class="form__label">Votre message</label>
                    <textarea
                        class="form__textarea"
                        id="message"
                        name="message"
                        rows="10"
                    >
                    </textarea>
                </div>
                <button type="submit" class="form__btn btn btn--form">Envoyer</button>
            </form>
        `;
        modal.innerHTML = modalContent;
        return modal;
    };

    const createModalSuccess = () => {
        const modalSuccess = document.createElement("div");
        modalSuccess.classList.add("modal-success");
        const modalSuccessContent =  `
            <img src="assets/icons/close.svg" class="modal-success__close modal-trigger"/>
            <div class="modal-success__content">
                <p class="modal-success__send">Votre message a bien été envoyé.</p>
                <p class="modal-success__thanks">Merci !</p>
            </div>
            <button class="modal-success__btn btn btn--form modal-trigger">Fermer</button>
        `;
        modalSuccess.innerHTML = modalSuccessContent;
        return modalSuccess;
    };

    return { createModalForm, createModalSuccess };
};