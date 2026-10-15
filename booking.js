
const bookingForm = document.getElementById("bookingForm");
const vehicleSelect = document.getElementById("vehicle");
const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

const rentalDays = document.getElementById("rentalDays");
const totalPrice = document.getElementById("totalPrice");

const summaryVehicle = document.getElementById("summaryVehicle");
const summaryPrice = document.getElementById("summaryPrice");
const summaryDays = document.getElementById("summaryDays");
const summaryTotal = document.getElementById("summaryTotal");

const bookingMessage = document.getElementById("bookingMessage");

if (bookingForm && vehicleSelect && pickupDate && returnDate) {

    // Set today's date
    const today = new Date();

    const todayText =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    pickupDate.min = todayText;
    returnDate.min = todayText;

    // Calculate rental days and price
    function calculateBooking() {
        const selectedOption =
            vehicleSelect.options[vehicleSelect.selectedIndex];

        const dailyPrice = Number(
            selectedOption.dataset.price || 0
        );

        let days = 0;

        if (pickupDate.value && returnDate.value) {
            const startDate = new Date(pickupDate.value + "T00:00:00");
            const endDate = new Date(returnDate.value + "T00:00:00");

            if (endDate > startDate) {
                days = Math.round(
                    (endDate - startDate) / (1000 * 60 * 60 * 24)
                );
            }
        }

        const total = dailyPrice * days;
        const formattedPrice = "Rs. " + total.toLocaleString("en-LK");

        rentalDays.textContent =
            days + (days === 1 ? " day" : " days");

        totalPrice.textContent = formattedPrice;

        if (summaryVehicle) {
            summaryVehicle.textContent =
                vehicleSelect.value || "Not selected";
        }

        if (summaryPrice) {
            summaryPrice.textContent =
                "Rs. " + dailyPrice.toLocaleString("en-LK");
        }

        if (summaryDays) {
            summaryDays.textContent =
                days + (days === 1 ? " day" : " days");
        }

        if (summaryTotal) {
            summaryTotal.textContent = formattedPrice;
        }

        return {
            days: days,
            total: total,
            dailyPrice: dailyPrice
        };
    }

    // Update return date
    pickupDate.addEventListener("change", function () {
        returnDate.min = pickupDate.value || todayText;

        if (returnDate.value && returnDate.value <= pickupDate.value) {
            returnDate.value = "";
        }

        calculateBooking();
    });

    returnDate.addEventListener("change", calculateBooking);
    vehicleSelect.addEventListener("change", calculateBooking);

    // Confirm booking
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        if (
            !pickupDate.value ||
            !returnDate.value ||
            returnDate.value <= pickupDate.value
        ) {
            bookingMessage.textContent =
                "Please select a valid return date.";
            return;
        }

        const booking = calculateBooking();

        if (booking.days <= 0 || booking.dailyPrice <= 0) {
            bookingMessage.textContent =
                "Please select a vehicle and valid rental dates.";
            return;
        }

        // Get customer details
        const nameInput = document.getElementById("customerName");
        const emailInput = document.getElementById("customerEmail");
        const phoneInput = document.getElementById("customerPhone");
        const locationInput = document.getElementById("pickupLocation");

        // Save booking information
        localStorage.setItem(
            "customerName",
            nameInput ? nameInput.value : ""
        );

        localStorage.setItem(
            "customerEmail",
            emailInput ? emailInput.value : ""
        );

        localStorage.setItem(
            "customerPhone",
            phoneInput ? phoneInput.value : ""
        );

        localStorage.setItem("vehicleName", vehicleSelect.value);
        localStorage.setItem("pickupDate", pickupDate.value);
        localStorage.setItem("returnDate", returnDate.value);

        localStorage.setItem(
            "pickupLocation",
            locationInput ? locationInput.value : ""
        );

        localStorage.setItem("rentalDays", booking.days);
        localStorage.setItem("totalPrice", booking.total);

        localStorage.setItem(
            "bookingId",
            "BK" + Date.now().toString().slice(-6)
        );

        // Go to confirmation page
        window.location.href = "confirmation.html";
    });

    // Calculate when the page opens
    calculateBooking();
}
