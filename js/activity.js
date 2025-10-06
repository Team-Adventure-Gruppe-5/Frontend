const urlParams = new URLSearchParams(window.location.search);
const activityId = urlParams.get('id')

const images = {
    "Go-karting": "/images/gokart.jpeg",
    "Paintball": "/images/paintball.jpg",
    "Sumo-wrestling": "/images/sumowrestling.jpg",
    "Mini golf": "/images/mingolf.jpg"
}

fetch(`http://localhost:8080/activity/${activityId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("activity not found");
        }
        return response.json()
    })
    .then(data => {
        showActivity(data);
    }).catch(error => console.log("error", error))

function showActivity(activity) {
    const container = document.getElementById('content')
    const image = images[activity.name] || "/images/default.jpg"

    container.innerHTML = `
<div class="button-container">
 <button type="button" onclick="history.back()" class="back-button">Back</button>
 </div>
<div class="activity-container">
    <img src="${image}" alt="${activity.name}" class="imageContainer">
    <div class="activity-info">
    <h1>${activity.name}</h1>
    <p>${activity.description}</p>
    <p><strong>Price: </strong>${activity.price} DKK per person</p>
    <p><strong>Duration: </strong>${activity.duration} hour</p></div></div>
`;
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById("bookingForm")

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
            time: parseInt(document.getElementById("time").value),
            activityId: activityId
        };

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





