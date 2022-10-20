
document.addEventListener('DOMContentLoaded', function () {
    handleFloatingLabel();
    handlePasswordSwitcher();
    getDOMElements();
    enableListeners();
});

function handleFloatingLabel() {
    const label = document.querySelector('.js-label__floating-label')
    const input = document.querySelector('.js-input__floating-label')
    input.addEventListener('focusout', () => {
        if (input.value.length >= 1) {
            label.classList.add('is-floating');
            return
        }
        label.classList.remove('is-floating');
    })
}

function handlePasswordSwitcher() {
    const passwordToggleCheckbox = document.querySelector('.js-password-toggle-checkbox')
    const passwordInput = document.querySelector('.js-password-input');
    passwordToggleCheckbox.checked = false;

    passwordToggleCheckbox.addEventListener('change', function () {
        if (this.checked) {
            passwordInput.setAttribute('type', 'text');
            return;
        }
        passwordInput.setAttribute('type', 'password');
    })
}

const isEmpty = function (fieldValue) {
    return !fieldValue || !fieldValue.length;
};

const isValidEmailAddress = function (emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidPassword = function (password) {
    return (password.length > 1)
}

function getDOMElements() {
    email = {
        errorMessage: '',
        field: document.querySelector('.js-email-form-field'),
        input: document.querySelector('.js-email-input'),
    };

    password = {
        errorMessage: '',
        field: document.querySelector('.js-password-form-field'),
        input: document.querySelector('.js-password-input'),
    }

    signInButton = document.querySelector('.js-submit-button');


}

function addErrors(fieldWithErrors) {
    fieldWithErrors.classList.add("has-error");
}

function removeErros(fieldWithErrors) {
    fieldWithErrors.classList.remove("has-error");
}


function enableListeners() {
    email.input.addEventListener('input', () => {
        if (!isValidEmailAddress(email.input.value)) {

            if (isEmpty(email.input.value)) {
                email.errorMessage = "This field is required"
                addErrors(email.field);
                return;
            }

            email.errorMessage = "Invalid email-address"
            addErrors(email.field);

            email.input.addEventListener('input', function doubleCheckEmail() {
                if (isValidEmailAddress(email.input.value)) {
                    removeErros(email.field);
                    email.input.removeEventListener('input', doubleCheckEmail);
                }
            });
        }
    });


    password.input.addEventListener('input', () => {
        if (!isValidPassword(password.input.value)) {

            password.errorMessage = "Password should be longer then 1"
            addErrors(password.field);

            password.input.addEventListener('input', function doubleCheckPassword() {
                if (isValidPassword(password.input.value)) {
                    removeErros(password.field);
                    password.input.removeEventListener('input', doubleCheckPassword)
                }
            })
        }
    })

    // signInButton.addEventListener('click',)
}