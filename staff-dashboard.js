

document.addEventListener("DOMContentLoaded", function () {
    const todayDate = document.getElementById("todayDate");
    const bookingTableBody = document.getElementById("bookingTableBody");
    const bookingMessage = document.getElementById("bookingMessage");
    const logoutLink = document.getElementById("logoutLink");

    // Display today's date
    if (todayDate) {
        todayDate.textContent = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    // Show sample booking details
    if (bookingTableBody && bookingMessage) {
        bookingTableBody.addEventListener("click", function (event) {
            const button = event.target.closest("[data-booking]");

            if (!button) {
                return;
            }

            const bookingId = button.dataset.booking;
            const row = button.closest("tr");

            if (!row) {
                return;
            }

            const cells = row.querySelectorAll("td");

            const customer = cells[1].textContent.trim();
            const vehicle = cells[2].textContent.trim();
            const pickupDate = cells[3].textContent.trim();
            const returnDate = cells[4].textContent.trim();
            const status = cells[5].textContent.trim();

            bookingMessage.textContent =
                "Booking ID: " + bookingId +
                " | Customer: " + customer +
                " | Vehicle: " + vehicle +
                " | Pickup: " + pickupDate +
                " | Return: " + returnDate +
                " | Status: " + status;

            bookingMessage.classList.add("visible");
        });
    }

    // Demo logout navigation
    // Actual session logout will be implemented with the backend.
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();

            const confirmed = window.confirm(
                "Do you want to leave the staff dashboard?"
            );

            if (confirmed) {
                window.location.href = "login.html";
            }
        });
    }
});
