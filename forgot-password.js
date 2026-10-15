

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("forgotPasswordForm");
    const emailInput = document.getElementById("email");
    const message = document.getElementById("formMessage");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const email = emailInput.value.trim();

        if (!email) {
            message.textContent = "Please enter your email address.";
            message.className = "form-message error";
            return;
        }

        message.textContent =
            "This is a demo only. Password reset emails will work after backend integration.";

        message.className = "form-message success";
    });
});
