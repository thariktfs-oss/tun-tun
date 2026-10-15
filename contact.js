

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (!contactForm || !formMessage) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formMessage.className = "form-message success";
        formMessage.textContent =
            "Your form has been validated successfully. Message delivery will be available after backend integration.";

        // Frontend demonstration only.
        // The message is not stored or sent to an email address yet.
        contactForm.reset();
    });
});