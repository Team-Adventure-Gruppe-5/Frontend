const employeeData = sessionStorage.getItem("employee");
if (!employeeData) {
    window.location.href = "login.html";
}

const employee = JSON.parse(employeeData);

document.getElementById("dashboardName").textContent = `${employee.firstname}'s Dashboard`;
document.getElementById("role").textContent = `${employee.role}`

const employeeImg = document.getElementById("employeeImg");
employeeImg.src = `/images/employees/${employee.firstname}.png`;
employeeImg.onerror = () => employeeImg.src = "/images/employees/default.jpg";


document.getElementById("signOutBtn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "login.html";
});

if (employee.role === "ADMIN") {
    document.getElementById("adminSection").style.display = "block";
} else if (employee.role === "ACTIVITY_EMPLOYEE") {
    document.getElementById("activitySection").style.display = "block";

    fetch("http://localhost:8080/bookings")
        .then(response => response.json())
        .then(bookings => {
            const myBookings = bookings.filter(booking=>
            booking.employees?.some(e => e.id === employee.id)
            );


            const container = document.getElementById("bookingsContainer");
            container.innerHTML = "";
            if (myBookings.length === 0) {
                container.innerHTML = "<p>No bookings assigned to you</p>";
                return;
            }




            myBookings.forEach((booking, index) => {
                const activityName = booking.activity?.name || `Activity ID ${booking.activity}`;
                const userName = booking.user?.firstname
                    ? `${booking.user.firstname} ${booking.user.lastname}`
                    : `User ID ${booking.user}`;


                const card = document.createElement("div");
                card.classList.add("booking-card");
                card.innerHTML = `
                <p><strong>Booking ${index + 1}</strong></p>
                <p>Activity: ${activityName}</p>
                <p>Participents: ${booking.participents}</p>
                <p>Date: ${booking.date}</p>
                <p>Time: ${booking.time}</p>
                <p>Booked by: ${userName}</p>`;

                container.appendChild(card);
            })
        })
        .catch(error => console.error("Couldn't load bookings:", error));
} else {
    document.body.innerHTML = "<h2>Access denied</h2>";
}

