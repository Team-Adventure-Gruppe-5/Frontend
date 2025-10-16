const urlParams = new URLSearchParams(window.location.search)
const packageId = urlParams.get('id')


const images = {
    "Adult Birthday Package": "/images/packages/adultBirthday.jpg",
    "Child Birthday Package": "/images/packages/childBirthday.jpg",
    "Family event": "/images/packages/familyEvent.jpg",
    "Company event": "/images/packages/companyEvent.jpg"
}

fetch(`http://localhost:8080/packages/${packageId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("package not found");
        }
        return response.json()
    })
    .then(data => {
        showPackage(data);
    }).catch(error => console.log("error", error))

function showPackage(package){
    const container = document.getElementById('content')
    const image = images[package.name] || "/images/default.jpg"

    container.innerHTML = `
<div class="button-container">
 <button type="button" onclick="history.back()" class="back-button">Back</button>
 </div>
<div class="box-container">
    <img src="${image}" alt="${package.name}" class="imageContainer">
    <div class="box-info">
    <h1>${package.name}</h1>
    <p>${package.description}</p>
    <p><strong>Price: </strong>${package.price} DKK per person</p>
`;
}