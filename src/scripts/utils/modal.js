/* ==========================================================
   Modal tools for photographer page after create DOM of modal
   ========================================================== */

export const modalTools = () => {
    const btnContact = document.querySelector(".profil__btn");
    btnContact.addEventListener("click", toggleModal);
    documentEvents();
    addModalEventDelegation();
};

/* ======================
   DOM elements selection
   ====================== */
const modalItem = document.querySelector(".contact-modal");
const main = document.querySelector(".main");

const modalFocusSelector = "h1, label, input, textarea, button.form__btn, img.modal-form__close";
let modalFocusElements = [];
const modalSuccessFocusSelector = "img.modal-success__close, button.modal-success__btn";
let modalSuccessFocusElements = [];

/* ==========
   Controller
   ========== */

// Add or remove class active that display the modal and go to top of page.
const toggleModal = (event) => {
    event.preventDefault();
    const modalForm = document.querySelector(".modal-form");
    const modalSuccess = document.querySelector(".modal-success");

    modalItem.classList.toggle("active");
    document.documentElement.scrollTop = 0;

    if (modalItem.matches(".active")) {
        modalItem.style.animation = "open-modal 0.8s";
        modalForm.style.display = "flex";
        modalFocusElements = Array.from(modalItem.querySelectorAll(modalFocusSelector));
        modalFocusElements.forEach((elem) => {
            elem.setAttribute("tabindex", "-1");
        });
        modalItem.setAttribute("aria-hidden", "false");
        modalItem.setAttribute("aria-modal", "true");
        modalItem.setAttribute("tabindex", "0");
        main.setAttribute("aria-hidden", "true");
        modalSuccess.style.display = "none";
    } else {
        modalItem.style.animation = "close-modal 0.8s";
        modalItem.setAttribute("aria-hidden", "true");
        modalItem.setAttribute("aria-modal", "false");
        main.setAttribute("aria-hidden", "false");
    }
};

// Keep the focus in the modal
const focusInModal = (event) => {
    event.preventDefault();
    let indexCurrentFocus = modalFocusElements.findIndex((index) => index === modalItem.querySelector(":focus"));
    if (!event.shiftKey) {
        indexCurrentFocus++;
    } else {
        indexCurrentFocus--;
    }
    if (indexCurrentFocus >= modalFocusElements.length) {
        indexCurrentFocus = 0;
    }
    if (indexCurrentFocus < 0) {
        indexCurrentFocus = modalFocusElements.length -1;
    }
    modalFocusElements[indexCurrentFocus].focus();
};

// Keep the focus in the success modal
const focusInModalSuccess = (event) => {
    event.preventDefault();
    const modalSuccess = document.querySelector(".modal-success");
    let indexCurrentFocus = modalSuccessFocusElements.findIndex((index) => index === modalSuccess.querySelector(":focus"));
    if (!event.shiftKey) {
        indexCurrentFocus++;
    } else {
        indexCurrentFocus--;
    }
    if (indexCurrentFocus >= modalSuccessFocusElements.length) {
        indexCurrentFocus = 0;
    }
    if (indexCurrentFocus < 0) {
        indexCurrentFocus = modalSuccessFocusElements.length -1;
    }
    modalSuccessFocusElements[indexCurrentFocus].focus();
};

/* =============
   Success modal
   ============= */

// Hide the form and display the success modal on validation
export const displaySuccessModal = () => {
    const modalForm = document.querySelector(".modal-form");
    const modalSuccess = document.querySelector(".modal-success");
    modalForm.style.display = "none";
    modalSuccess.style.display = "flex";
    modalSuccessFocusElements = Array.from(modalSuccess.querySelectorAll(modalSuccessFocusSelector));
    modalSuccessFocusElements.forEach((elem) => {
        elem.setAttribute("tabindex", "-1");
    });
};

/* ======
   Events
   ====== */

/* Hide modal when clicking on "echap key" with "toggleModal" function
Tab in contact modal and capture the focus */
const documentEvents = () => {
    const modalSuccess = document.querySelector(".modal-success");

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalItem.matches(".active")) {
            toggleModal(event);
        }

        if (event.code === "Tab" && modalItem.matches(".active")) {

            if (modalSuccess.style.display === "flex") {
                focusInModalSuccess(event);
            } else {
                focusInModal(event);
            }
        }
    });
};


// Delegation of events to click and keyboard for triggers
const addModalEventDelegation = () => {
    const contactModal = document.querySelector(".contact-modal");

    contactModal.addEventListener("click", (event) => {
        const initElem = event.target;

        if (initElem.matches(".modal-trigger")) {
            toggleModal(event);
        } else {
            return;
        }
    });

    contactModal.addEventListener("keydown", (event) => {
        const initElem = event.target;

        if (event.code === "Enter" && initElem.matches(".modal-trigger")) {
            toggleModal(event);
        } else {
            return;
        }
    });
};