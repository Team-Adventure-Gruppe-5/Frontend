const urlParams = new URLSearchParams(window.location.search)
const bookingID = urlParams.get('id')

fetch(`http://localhost:8080/booking-confirmation/${bookingID}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Booking not found")
        }
        return response.json()
    })
    .then(booking => {
        const container = document.getElementById('content')

        container.innerHTML = `
    <div class="button-container">
 <button type="button" onclick="history.back()" class="back-button">Back</button>
 </div>
 <div class="booking-container">
 <h1>Booking confirmation</h1>
 <p><strong>Booking ID: </strong>${bookingID}</p>
 <p>Firstname: ${booking.user.firstname}</p>
 <p>Lastname: ${booking.user.lastname}</p>
 <p>Mail: ${booking.user.mail}</p>
 <p>Phone number: ${booking.user.phoneNumber}</p> 
 <p>Participents: ${booking.participents}</p>
 <p>Date: ${booking.date}</p>
 <p>Time: ${booking.time}</p>
</div>
    `;
    })
    .catch(error => console.log("No booking provided", error))
