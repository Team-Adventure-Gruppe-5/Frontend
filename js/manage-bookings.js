document.addEventListener("DOMContentLoaded", () => {
    const employeeData = sessionStorage.getItem("employee");
    if (!employeeData) {
        window.location.href = "login.html"
        return;
    }

    const employee = JSON.parse(employeeData);

    if (employee.role !== "ADMIN") {
        document.body.innerHTML = "<h2>Access denied</h2>";
        return;
    }

    const container = document.getElementById("bookingsContainer");

    Promise.all([
        fetch("http://localhost:8080/bookings").then(res => res.json()),
        fetch("http://localhost:8080/employees").then(res => res.json())
    ])
        .then(([bookings, employees]) => {
            const activityEmployees = employees.filter(e => e.role === "ACTIVITY_EMPLOYEE");
            container.innerHTML = "";

            if (bookings.length === 0) {
                container.innerHTML = "<p>No bookings found</p>";
                return;
            }

            bookings.forEach(booking => {
                const assigned = booking.employees?.map(e => `${e.firstname} ${e.lastname}`).join(", ") || "None";

                const card = document.createElement("div");
                card.classList.add("booking-card");
                card.innerHTML = `
<h3>Booking #${booking.id}</h3>
<p><strong>Activity:</strong> ${booking.name}</p>
<p><strong>Date:</strong>${booking.date} </p>
<p><strong>Time:</strong>${booking.time} </p>
<p><strong>Participants:</strong>${booking.participents} </p>
<p><strong>Assigned employees:</strong>${assigned} </p>
<label><strong>assign new employee:</strong></label>
<select id="select-${booking.id}">
<option value="">--Select employee --</option>
</select>
<button onclick="assignEmployee(${booking.id})">Assign</button>`;

                const select = card.querySelector(`#select-${booking.id}`);
                activityEmployees.forEach(emp => {
                    const option = document.createElement("option");
                    option.value = emp.id;
                    option.textContent = `${emp.firstname} ${emp.lastname}`;
                    select.appendChild(option);
                });
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error loading data:", err);
            container.innerHTML = "<p>Failed to load bookings or employees.</p>";
        });
});


function assignEmployee(bookingId) {
    const select = document.getElementById(`select-${bookingId}`);
    const employeeId = select.value;
    if (!employeeId) {
        alert("please select an employee first");
        return;
    }

    fetch(`http://localhost:8080/booking/${bookingId}/employees/${employeeId}`, {
        method: "PUT"
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to assign employee");
            return res.json();
        })
        .then(data => {
            alert(data.message || "Employee assigned successfully");

            location.reload();

        })
        .catch(err => console.error("Error:", err));
}




