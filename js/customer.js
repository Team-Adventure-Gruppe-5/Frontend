const customerdata = sessionStorage.getItem("customer")
const bookingId = sessionStorage.getItem("bookingId")
console.log("fetched booking id:", bookingId)

if (!customerdata) {
    window.location.href = "login-customer.html";
}

const customer = JSON.parse(customerdata)
document.getElementById("customerFirstname").textContent = customer.firstname
document.getElementById("customerLastname").textContent = customer.lastname
document.getElementById("customerMail").textContent = customer.mail
document.getElementById("customerPhoneNumber").textContent = customer.phoneNumber

document.getElementById("signOutBtn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "login-customer.html";
});

fetch(`http://localhost:8080/login-customer/${customer.id}/booking/${bookingId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Customer not found");
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched data:", data);
        const booking = data.booking;

        const bookingInfo = document.getElementById("bookingInfo");
        bookingInfo.innerHTML = "";

            let actOrPack = ""
            if (booking.activity) {
                actOrPack = `<p>Activity: ${booking.activity.name}</p>`
            } else if (booking.eventPackage) {
                actOrPack = `<p>Event package: ${booking.eventPackage.name}</p>`
            } else {
                actOrPack = "<p>No bookings found</p>"
            }

            const card = document.createElement("div");
            card.innerHTML = `
                    <p><strong>Booking #${booking.id}</strong></p>
                    ${actOrPack}
                    <p>Date: ${booking.date || "No date"}</p>
                    <p>Time: ${booking.time || "No time"}</p>
                    <p>Participants: ${booking.participents || 0}</p>
                `;
            bookingInfo.appendChild(card);
    })
    .catch(error => {
        console.error("Error", error);
    });
