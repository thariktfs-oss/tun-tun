
"use strict";

// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the mobile menu after selecting a link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Display the current year in the footer
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Set the earliest selectable pickup date to today
const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const today = getLocalDateString(new Date());

if (pickupDate) {
    pickupDate.min = today;
}

if (returnDate) {
    returnDate.min = pickupDate && pickupDate.value
        ? pickupDate.value
        : today;
}

// Update the minimum return date when pickup date changes
if (pickupDate && returnDate) {
    pickupDate.addEventListener("change", function () {
        returnDate.min = pickupDate.value || today;

        if (returnDate.value && returnDate.value < returnDate.min) {
            returnDate.value = "";
        }
    });
}

// Validate the vehicle search form
const vehicleSearchForm = document.getElementById("vehicleSearchForm");
const searchMessage = document.getElementById("searchMessage");

if (vehicleSearchForm) {
    vehicleSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const location = document.getElementById("pickupLocation").value;
        const pickup = pickupDate.value;
        const returnDay = returnDate.value;

        if (!location || !pickup || !returnDay) {
            searchMessage.textContent =
                "Please complete all search fields.";
            return;
        }

        if (pickup < today) {
            searchMessage.textContent =
                "Pickup date cannot be in the past.";
            return;
        }

        if (returnDay <= pickup) {
            searchMessage.textContent =
                "Return date must be after the pickup date.";
            return;
        }

        // Pass the search criteria to the vehicle catalogue page.
        const searchParams = new URLSearchParams({
            location: location,
            pickup: pickup,
            return: returnDay
        });

        window.location.href =
            "vehicles.html?" + searchParams.toString();
    });
}
