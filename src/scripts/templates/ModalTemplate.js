/**
 * Creates modal and form element.
 * @returns {Function} - Create DOM Element
 */
export const modalTemplate = (data) => {
    /**
     * Modal and form template
     * @returns {HTMLElement}
     */
    const createModalForm = () => {
        const name = data.name;
        const modal = document.createElement("div");
        modal.classList.add("modal-form");
        modal.setAttribute("role", "document");
        const modalContent =  `
            <header class="modal-form__header">
                <h1 id="modalTitle" class="modal-form__title">Contactez-moi ${name}</h1>
                <img
                    src="dist/assets/icons/close.svg"
                    class="modal-form__close modal-trigger"
                    type="button"
                    aria-label="Fermer cette fenêtre modale"
                />
            </header>
            <form class="form" action="#" method="post" novalidate>
                <div class="form__group">
                    <label for="first" class="form__label">Prénom</label>
                    <input
                        class="form__input form__field"
                        type="text"
                        id="first"
                        name="first"
                        aria-required="true"
                    />
                </div>
                <div class="form__group">
                    <label for="last" class="form__label">Nom</label>
                    <input
                        class="form__input form__field"
                        type="text"
                        id="last"
                        name="last"
                        aria-required="true"
                    />
                </div>
                <div class="form__group">
                    <label for="email" class="form__label">Email</label>
                    <input
                        class="form__input form__field"
                        type="email"
                        id="email"
                        name="email"
                        aria-required="true"
                    />
                </div>
                <div class="form__group">
                    <label for="message" class="form__label">Votre message</label>
                    <textarea
                        class="form__textarea form__field"
                        id="message"
                        name="message"
                        aria-required="true"
                    ></textarea>
                </div>
                <button type="submit" class="form__btn btn btn--form">Envoyer</button>
            </form>
        `;
        modal.innerHTML = modalContent;
        return modal;
    };

    /**
     * Success modal template
     * @returns {HTMLElement}
     */
    const createModalSuccess = () => {
        const modalSuccess = document.createElement("div");
        modalSuccess.classList.add("modal-success");
        const modalSuccessContent =  `
            <img src="dist/assets/icons/close.svg" class="modal-success__close modal-trigger"/>
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