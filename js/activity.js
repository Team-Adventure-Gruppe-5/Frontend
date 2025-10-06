const urlParams = new URLSearchParams(window.location.search);
const activityId = urlParams.get('id')

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

    container.innerHTML = `
    <h1>${activity.name}</h1>
    <p>${activity.description}</p>
    <p>${activity.price}</p>
    <p>${activity.duration}</p>
`;

}

