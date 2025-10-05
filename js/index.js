const container = document.getElementById("elementContainer")

function loadFragment(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        }).catch(error => console.log("Failed to load fragment", error))
}

loadFragment("header", "/html/fragments/header.html")
loadFragment("footer", "/html/fragments/footer.html")

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
            button.textContent = "Wants to know more?"
            button.addEventListener('click', () => {
                window.location.href = `/activity/${activity.id}` //TODO: fikses hvis endpoint bliver anderledes
            })
            textSection.append(button)

            //layout changes every other img
            if (index % 2 !== 0) {
                section.classList.add("reverse");
            }
            section.appendChild(image);
            section.appendChild(textSection);

            container.appendChild(section)
        })

    }).catch(error => console.log("Error with fetching: ", error))

