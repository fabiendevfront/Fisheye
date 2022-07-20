import { displaySuccessModal } from "./modal.js";

/* =========================================================
   Form tools for photographer page after create DOM of form
   ========================================================= */

export const formTools = () => {
    const form = document.querySelector(".form");
    const formFields = document.querySelectorAll(".form__field");
    formSubmit(form, formFields);
    formFields.forEach((field) =>{
        field.addEventListener("focus", () => {
            resetField(field);
        });
        field.addEventListener("blur", () => {
            validateField(field, errorMsg);
        });
    });
};

/* =====================================
   Objects for errors messages and Regex
   =====================================*/

// Object contain the errors messages
const errorMsg = {
    name: "Veuillez saisir au moins 2 lettres",
    email: "Veuillez renseigner un email valide",
    message: "Veuillez saisir votre message, 2 à 500 caractères"
};

/* Object contain regex for inputs test
Regex name:
* ^ = start of sequence
* [\p{L}] = unicode category, "L" = any kind of letter from any language
* {2,25} = must contain between 2 and 25 characters
* $ = end of sequence
* u = match unicode characters
* i = case insensitive
Regex email:
* () = group
* \d = numbers from 0 to 9
* [._-] = accepts special characters . _ -
* ? = zero or one occurrence
* * = zero or multiple occurrences
* \. = escaping the . symbol so that it is interpreted and searched in the chain
Regex message:
* \s = spaces gestion
*/
const regexPatterns = {
    name: /^[\p{L}]{2,25}$/ui,
    email: /^[a-z\d]([._-]?[a-z\d])*@[a-z\d]([-.]?[a-z\d])*\.([a-z]{2,4})$/i,
    message: /^[\p{L}\s\d,;._-]{2,500}$/ui,
};

/* ==========
   Controller
   ========== */

// Check if inputs values is valid
const validateField = (formField, error) => {
    if (formField.type === "text") {
        if (!regexPatterns.name.test(formField.value)) {
            formField.classList.add("form__input--error");
            formField.previousElementSibling.insertAdjacentHTML("beforeend", `
                <span id="errorname" class="form__error">${error.name}</span>`);
            formField.setAttribute("aria-invalid", "true");
            formField.setAttribute("aria-describedby", "errorname");
            return false;
        } else {
            return true;
        }
    } else if (formField.type === "email") {
        if (!regexPatterns.email.test(formField.value)) {
            formField.classList.add("form__input--error");
            formField.previousElementSibling.insertAdjacentHTML("beforeend", `<span id="erroremail" class="form__error">${error.email}</span>`);
            formField.setAttribute("aria-invalid", "true");
            formField.setAttribute("aria-describedby", "erroremail");
            return false;
        } else {
            return true;
        }
    } else if (formField.type === "textarea") {
        if (!regexPatterns.message.test(formField.value)) {
            formField.classList.add("form__input--error");
            formField.previousElementSibling.insertAdjacentHTML("beforeend", `<span id="errormsg" class="form__error">${error.message}</span>`);
            formField.setAttribute("aria-invalid", "true");
            formField.setAttribute("aria-describedby", "errormsg");
            return false;
        } else {
            return true;
        }
    }
};

// Remove error class and span with error message
export const resetField = (field) => {
    let fieldLabel = field.previousElementSibling;
    field.classList.remove("form__input--error");
    field.removeAttribute("aria-invalid", "true");
    while(fieldLabel.firstElementChild) {
        fieldLabel.removeChild(fieldLabel.firstElementChild);
    }
};

// Remove all values in inputs text, radio, checkbox
const removeAllValues = (fields) => {
    fields.forEach((field) => {
        field.value = "";
    });
};

/* ===============
   Form validation
   =============== */

/* Check if all form values is valid on submit:
* If not valid: validation is false
* If valid: display success modal and remove all values form
*/

const formValidation = (formFields) => {
    let valid = true;

    formFields.forEach((formField) => {
        if(!validateField(formField, errorMsg)) {
            valid = false;
        } else {
            console.log(`${formField.previousElementSibling.textContent} : ${formField.value}`);
        }
    });

    if (valid) {
        displaySuccessModal();
        removeAllValues(formFields);
    } else {
        console.log("Le formulaire n'est pas correctement remplis !");
    }
};

/* Event on form submit:
* Disable default comportement of submit
* Reset all fields before new submit
* Launch form validation function
*/
const formSubmit = (form, formFields) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formFields.forEach((formField) => {
            resetField(formField);
        });
        formValidation(formFields);
    });
};