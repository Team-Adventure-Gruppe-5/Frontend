const employeeData = sessionStorage.getItem("employee");
if (!employeeData) {
    window.location.href = "login.html";
}

const employee = JSON.parse(employeeData);

document.getElementById("dashboardName").textContent = `${employee.firstname}'s Dashboard`;

const employeeImg = document.getElementById("employeeImg");
employeeImg.src = `/images/employees/${employee.firstname}.png`;
employeeImg.onerror = () => employeeImg.src = "/images/default.jpg";


document.getElementById("signOutBtn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "login.html";
});

fetch("http://localhost:8080/bookings")
    .then(response => response.json())
    .then(bookings => {
        const container = document.getElementById("bookingsContainer");
        container.innerHTML = "";
        if (bookings.length === 0) {
            container.innerHTML = "<p>No bookings found</p>";
            return;
        }

        bookings.forEach(booking => {
            const card = document.createElement("div");
            card.classList.add("booking-card");
            card.innerHTML =
                `<p><strong>${booking.activity.name}</strong><p>` +
                `<p>Participants: ${booking.participents}</p>` +
                `<p>Date: ${booking.date}</p>` +
                `<p>Time: ${booking.time}</p>` +
                `<p>Booked by: ${booking.user.firstname} ${booking.user.lastname}</p>`;

            container.appendChild(card)
        });
    })
    .catch(error => console.error("Couldn't load bookings:", error));