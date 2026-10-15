

const registerForm = document.getElementById("registerForm");

const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const registerMessage =
    document.getElementById("registerMessage");

// Check registration form
registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Check required fields
    if (!registerForm.checkValidity()) {
        registerForm.reportValidity();
        return;
    }

    // Check whether both passwords match
    if (passwordInput.value !== confirmPasswordInput.value) {

        registerMessage.textContent =
            "Passwords do not match. Please try again.";

        confirmPasswordInput.focus();
        return;
    }

    // Display demo message
    registerMessage.textContent =
        "Registration form validated successfully. " +
        "This is a demo page. Your account has not been created.";

});
