/*
* Display and hide modal
*/

/* ======================
   DOM elements selection
   ====================== */

const modalItem = document.querySelector(".contact-modal");

/* ======================
   Modal tools for photographer page after create DOM of modal
   ====================== */

export const modalTools = () => {
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    eventClickModalTriggers(modalTriggers);
    eventKeyModalTriggers(modalTriggers);
};

/* ======================
   Display and hide modal
   ====================== */

// Add or remove class active that display the modal and go to top of page.
const toggleModal = () => {
    const modalForm = document.querySelector(".modal-form");
    const modalSuccess = document.querySelector(".modal-success");

    modalItem.classList.toggle("active");
    document.documentElement.scrollTop = 0;

    if (modalItem.classList.length !== 1) {
        modalItem.style.animation = "open-modal 0.8s";
        modalForm.style.display = "flex";
        modalSuccess.style.display = "none";
    } else {
        modalItem.style.animation = "close-modal 0.8s";
        // modalSuccess.style.display = "flex";
    }
};

/* =============
   Success modal
   ============= */

// Hide the form and display the success modal on validation
// eslint-disable-next-line no-unused-vars
const displaySuccessModal = () => {
    const modalSuccess = document.querySelector(".modal-success");
    const formItem = document.querySelector(".form");
    formItem.style.display = "none";
    modalSuccess.style.display = "flex";
};

const whichKey = (event) => {
    if (event.code === "Enter") {
        console.log("Touche entrer");
    } else if (event.code === "Escape") {
        console.log("Touche echap");
    }
};

/* ======
   Events
   ====== */

const eventClickModalTriggers = (triggers) => {
    triggers.forEach((trigger) => {
        trigger.addEventListener("click", toggleModal);
    });
};

const eventKeyModalTriggers = (triggers) => {
    triggers.forEach((trigger) => {
        trigger.addEventListener("keydown", whichKey);
    });
};

// Hide modal when clicking on "echap key" with "toggleModal" function
document.addEventListener("keydown", (event) => {
    if (event.code == "Escape") {
        if (modalItem.classList.length !== 1) {
            toggleModal();
        }
    }
});

