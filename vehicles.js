
/* Vehicle Catalogue Page */

// Get the search elements
const vehicleSearchInput = document.getElementById("vehicleSearch");
const vehicleTypeFilter = document.getElementById("vehicleTypeFilter");
const filterButton = document.getElementById("filterButton");
const vehicleCards = document.querySelectorAll(".vehicle-card");
const vehicleCount = document.getElementById("vehicleCount");
const noVehiclesMessage = document.getElementById("noVehiclesMessage");

// Filter vehicles
function filterVehicles() {
    if (!vehicleSearchInput || !vehicleTypeFilter) {
        return;
    }

    const searchText = vehicleSearchInput.value.toLowerCase().trim();
    const selectedType = vehicleTypeFilter.value;

    let visibleCount = 0;

    vehicleCards.forEach(function (card) {
        const vehicleName = card.dataset.name.toLowerCase();
        const vehicleType = card.dataset.type;

        const matchesName = vehicleName.includes(searchText);
        const matchesType =
            selectedType === "all" || vehicleType === selectedType;

        if (matchesName && matchesType) {
            card.style.display = "";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (vehicleCount) {
        vehicleCount.textContent = visibleCount + " vehicles";
    }

    if (noVehiclesMessage) {
        noVehiclesMessage.hidden = visibleCount !== 0;
    }
}

// Search button
if (filterButton) {
    filterButton.addEventListener("click", filterVehicles);
}

// Search when typing
if (vehicleSearchInput) {
    vehicleSearchInput.addEventListener("input", filterVehicles);
}

// Filter when category changes
if (vehicleTypeFilter) {
    vehicleTypeFilter.addEventListener("change", filterVehicles);
}

// Read the category selected from the Home page
const pageParams = new URLSearchParams(window.location.search);
const selectedCategory = pageParams.get("type");

if (vehicleTypeFilter && selectedCategory) {
    const validCategories = ["economy", "suv", "van", "luxury"];

    if (validCategories.includes(selectedCategory)) {
        vehicleTypeFilter.value = selectedCategory;
    }
}

// Apply the filter when the page opens
if (vehicleSearchInput && vehicleTypeFilter) {
    filterVehicles();
}
