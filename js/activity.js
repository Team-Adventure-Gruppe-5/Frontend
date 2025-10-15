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
<div class="box-container">
    <img src="${image}" alt="${activity.name}" class="imageContainer">
    <div class="box-info">
    <h1>${activity.name}</h1>
    <p>${activity.description}</p>
    <p><strong>Price: </strong>${activity.price} DKK per person</p>
    <p><strong>Duration: </strong>${activity.duration} hour</p></div></div>
`;
}





