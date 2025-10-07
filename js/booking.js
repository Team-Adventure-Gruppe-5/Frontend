
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById("bookingForm")

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')

    const isPackagePage = window.location.pathname.includes("package");
    const idKey = isPackagePage ? "packageId" : "activityId";
    //TODO: url skal måske ændres
    const baseURL = "http://localhost:63342/Frontend/AdventureXpFrontend/html/bookingConfirmation.html?_ijt=j2o8cvjquttsv0d27nnvqj3bds&_ij_reload=RELOAD_ON_SAVE"

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
