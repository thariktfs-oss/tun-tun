

document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const license = document.getElementById("license");
    const city = document.getElementById("city");

    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const profileAvatar = document.getElementById("profileAvatar");
    const message = document.getElementById("profileMessage");

    // Display a default customer profile
    fullName.value = "Customer Name";
    email.value = "customer@example.com";
    phone.value = "";
    address.value = "";
    license.value = "";
    city.value = "";

    function updateProfileHeader() {
        const name = fullName.value.trim() || "Customer Name";

        displayName.textContent = name;
        displayEmail.textContent =
            email.value.trim() || "customer@example.com";

        profileAvatar.textContent = name.charAt(0).toUpperCase();
    }

    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!profileForm.checkValidity()) {
            profileForm.reportValidity();
            return;
        }

        updateProfileHeader();

        message.textContent =
            "Demo only: changes are not permanently saved. Database integration will be added later.";

        message.className = "profile-message success";
    });

    profileForm.addEventListener("reset", function () {
        setTimeout(function () {
            updateProfileHeader();
            message.textContent = "";
            message.className = "profile-message";
        }, 0);
    });

    fullName.addEventListener("input", updateProfileHeader);
    email.addEventListener("input", updateProfileHeader);
});