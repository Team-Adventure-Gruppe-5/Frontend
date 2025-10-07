const container = document.getElementById("elementContainer")

const images = {
    "Go-karting": "/images/gokart.jpeg",
    "Paintball": "/images/paintball.jpg",
    "Sumo-wrestling": "/images/sumowrestling.jpg",
    "Mini golf": "/images/mingolf.jpg"
}

fetch("http://localhost:8080/index")
    .then(response => response.json())
    .then(data => {
        data.forEach((activity, index) => {
            //create section for activity
            const section = document.createElement("div")
            section.className = "activity-section"

            //add image
            const image = document.createElement("img")
            image.src = images[activity.name] || "/images/default.jpg"
            image.className = "imageContainer"
            section.appendChild(image)

            //create text section
            const textSection = document.createElement("div")
            textSection.className = "text-container"

            const title = document.createElement("h3")
            title.textContent = activity.name
            textSection.appendChild(title)

            const description = document.createElement("p")
            description.textContent = activity.description
            textSection.appendChild(description)

            //add button
            const button = document.createElement("button")
            button.textContent = "Want to know more?"
            const baseUrl = "http://localhost:63342/Frontend/AdventureXpFrontend/html/activity.html?_ijt=qvccfjjjrcmshvf0o6qukp6gid&_ij_reload=RELOAD_ON_SAVE"
            button.addEventListener('click', () => {
                window.location.href = `${baseUrl}&id=${activity.id}` //TODO: fikses hvis endpoint bliver anderledes
            })
            textSection.append(button)

            //layout changes every other img
            if (index % 2 !== 0) {
                section.classList.add("reverse");
            }
            section.appendChild(textSection);

            container.appendChild(section)
        })

    }).catch(error => console.log("Error with fetching: ", error))

document.addEventListener('DOMContentLoaded',()=>{
    const packagesButton = document.getElementById("packages-button")

    if(packagesButton){
        packagesButton.addEventListener('click',()=>{
            window.location.href="http://localhost:63342/Frontend/AdventureXpFrontend/html/allPackages.html?_ijt=oo8b9fn1kj0i3tcqieb7n0g2ib&_ij_reload=RELOAD_ON_SAVE"
        })
    }

})

document.addEventListener('DOMContentLoaded', ()=>{
    const requestButton = document.getElementById("request-button")

    if(requestButton){
        requestButton.addEventListener('click', ()=>{
            window.location.href="http://localhost:63342/Frontend/AdventureXpFrontend/html/request.html?_ijt=35nqa0cca9l6r1293i2lh86bn0&_ij_reload=RELOAD_ON_SAVE"
        })
    }
})