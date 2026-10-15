

document.addEventListener("DOMContentLoaded", function () {
    const bookingCards = document.querySelectorAll(".booking-card");
    const statusFilter = document.getElementById("statusFilter");
    const emptyBookings = document.getElementById("emptyBookings");

    const totalBookings = document.getElementById("totalBookings");
    const pendingBookings = document.getElementById("pendingBookings");
    const confirmedBookings = document.getElementById("confirmedBookings");
    const completedBookings = document.getElementById("completedBookings");

    // Calculate the booking summary from the sample data.
    totalBookings.textContent = bookingCards.length;

    pendingBookings.textContent =
        document.querySelectorAll('.booking-card[data-status="pending"]').length;

    confirmedBookings.textContent =
        document.querySelectorAll('.booking-card[data-status="confirmed"]').length;

    completedBookings.textContent =
        document.querySelectorAll('.booking-card[data-status="completed"]').length;

    // Filter bookings by status.
    statusFilter.addEventListener("change", function () {
        const selectedStatus = statusFilter.value;
        let visibleCount = 0;

        bookingCards.forEach(function (card) {
            const bookingStatus = card.dataset.status;

            const shouldShow =
                selectedStatus === "all" ||
                bookingStatus === selectedStatus;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        emptyBookings.hidden = visibleCount !== 0;
    });

    // Display booking details when a button is clicked.
    document.querySelectorAll(".view-booking-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const bookingId = button.dataset.booking;
            const bookingCard = button.closest(".booking-card");

            const vehicleName =
                bookingCard.querySelector("h3").textContent;

            const status =
                bookingCard.dataset.status;

            alert(
                "Booking Details\n\n" +
                "Booking ID: " + bookingId + "\n" +
                "Vehicle: " + vehicleName + "\n" +
                "Status: " + status.charAt(0).toUpperCase() +
                status.slice(1) +
                "\n\nThese are sample booking details."
            );
        });
    });
});