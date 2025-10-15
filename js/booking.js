
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById("bookingForm")

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')

    const isPackagePage = window.location.pathname.includes("package");
    const idKey = isPackagePage ? "packageId" : "activityId";

    const baseURL = "http://localhost:63342/Frontend/AdventureXpFrontend/html/bookingConfirmation.html?_ijt=j2o8cvjquttsv0d27nnvqj3bds&_ij_reload=RELOAD_ON_SAVE"

    // Generate time options in 30-minute intervals
    const timeSelect = document.getElementById("time");
    if (timeSelect) {
        const startHour = 9;  // 09:00
        const endHour = 17;   // 17:00
        for (let hour = startHour; hour <= endHour; hour++) { //Loops over all hours between the start (9) and the end (17)
            for (let minute of [0, 30]) { //30 min between
                if (hour === endHour && minute > 0) break; // stops after 17:00
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`; //Ensures that numbers below 10 get a leading zero
                const option = document.createElement("option");
                option.value = timeString;
                option.textContent = timeString;
                timeSelect.appendChild(option);
            }
        }
    }

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault(); //make sure reload doesn't happen

        //get data from form
        const bookingData = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            mail: document.getElementById("mail").value,
            phoneNumber: parseInt(document.getElementById("phoneNumber").value),
            participents: parseInt(document.getElementById("participents").value),
            date: document.getElementById("date").value,
            time: parseInt(document.getElementById("time").value)
        };

        bookingData[idKey] = parseInt(id)

        //send data to backend
        fetch("http://localhost:8080/booking", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bookingData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Booking failed")
                }
                return response.json()
            })
            .then(data => {
                window.location.href = `${baseURL}&id=${data.id}` //TODO kan være & skal ændres til ? hvis vi depolyer
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })
    })
})
