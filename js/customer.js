const customerdata = sessionStorage.getItem("customer")

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

fetch(`http://localhost:8080/login-customer/${customer.id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Customer not found");
        }
        return response.json();
    })
    .then(updatedCustomer => {
        console.log("Fetched customer:", updatedCustomer);

        const bookingList = document.getElementById("bookingList");
        bookingList.innerHTML = "";

        if (updatedCustomer.bookings && updatedCustomer.bookings.length > 0) {
            updatedCustomer.bookings.forEach(booking => {
                const card = document.createElement("div");

                let actOrPack =""
                if(booking.activity){
                    actOrPack = `<p>Activity: ${booking.activity.name}</p>`
                } else if(booking.eventPackage){
                    actOrPack = `<p>Event package: ${booking.eventPackage.name}</p>`
                } else {
                    actOrPack ="<p>No bookings found</p>"
                }

                card.innerHTML = `
                    <p><strong>Booking #${booking.id}</strong></p>
                    ${actOrPack}
                    <p>Date: ${booking.date || "Ingen dato"}</p>
                    <p>Time: ${booking.time || "Ingen tid"}</p>
                    <p>Participants: ${booking.participents || 0}</p>
                `;
                bookingList.appendChild(card);
            });
        } else {
            bookingList.innerHTML = "<p>No bookings found</p>"
        }
    })
    .catch(error => {
        console.error("Error", error);
    });
