
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("vehicleSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const statusFilter = document.getElementById("statusFilter");
    const resetButton = document.getElementById("resetFilters");

    const tableBody = document.getElementById("vehicleTableBody");
    const vehicleCount = document.getElementById("vehicleCount");
    const emptyMessage = document.getElementById("emptyMessage");

    const detailsPanel = document.getElementById("vehicleDetails");
    const detailsContent = document.getElementById("vehicleDetailsContent");
    const closeDetails = document.getElementById("closeDetails");
    const logoutLink = document.getElementById("logoutLink");

    const rows = Array.from(tableBody.querySelectorAll("tr"));

    // Search and filter the vehicle table
    function filterVehicles() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedStatus = statusFilter.value;

        let visibleCount = 0;

        rows.forEach(function (row) {
            const vehicleName = row.dataset.name.toLowerCase();
            const vehicleBrand = row.dataset.brand.toLowerCase();
            const vehicleId = row.dataset.id.toLowerCase();
            const category = row.dataset.category;
            const status = row.dataset.status;

            const matchesSearch =
                vehicleName.includes(searchTerm) ||
                vehicleBrand.includes(searchTerm) ||
                vehicleId.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;

            const shouldShow =
                matchesSearch && matchesCategory && matchesStatus;

            row.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        vehicleCount.textContent =
            visibleCount + (visibleCount === 1 ? " vehicle" : " vehicles");

        emptyMessage.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener("input", filterVehicles);
    categoryFilter.addEventListener("change", filterVehicles);
    statusFilter.addEventListener("change", filterVehicles);

    // Reset filters
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        categoryFilter.value = "all";
        statusFilter.value = "all";

        filterVehicles();
    });

    // View vehicle details
    tableBody.addEventListener("click", function (event) {
        const button = event.target.closest(".view-button");

        if (!button) {
            return;
        }

        const row = button.closest("tr");

        if (!row) {
            return;
        }

        const details = [
            ["Vehicle Name", row.dataset.name],
            ["Vehicle ID", row.dataset.id],
            ["Brand", row.dataset.brand],
            ["Category", row.dataset.category],
            ["Transmission", row.dataset.transmission],
            ["Daily Rental Rate", "LKR " + Number(row.dataset.rate).toLocaleString("en-LK")],
            ["Availability", row.dataset.status]
        ];

        detailsContent.replaceChildren();

        details.forEach(function (item) {
            const detailItem = document.createElement("div");
            detailItem.className = "detail-item";

            const label = document.createElement("span");
            label.textContent = item[0];

            const value = document.createElement("strong");
            value.textContent = item[1];

            detailItem.append(label, value);
            detailsContent.appendChild(detailItem);
        });

        detailsPanel.hidden = false;
        detailsPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    // Close vehicle details
    closeDetails.addEventListener("click", function () {
        detailsPanel.hidden = true;
    });

    // Demo logout navigation
    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();

            if (window.confirm("Do you want to leave the vehicle management page?")) {
                window.location.href = "login.html";
            }
        });
    }

    // Initial table count
    filterVehicles();
});