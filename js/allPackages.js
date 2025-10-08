const container = document.getElementById("content")

const images = {
    "Adult Birthday Package": "/images/packages/adultBirthday.jpg",
    "Child Birthday Package": "/images/packages/childBirthday.jpg",
    "Family event": "/images/packages/familyEvent.jpg",
    "Company event": "/images/packages/companyEvent.jpg"
}

fetch("http://localhost:8080/packages")
    .then(response => response.json())
    .then(data => {

        container.innerHTML = `<div class="button-container">
 <button type="button" onclick="history.back()" class="back-button">Back</button>
 </div>`

        data.forEach((eventPackage, index) => {
            //create section for packages
            const section = document.createElement("div")
            section.className = "activity-section"

            //add image
            const image = document.createElement("img")
            image.src = images[eventPackage.name] || "/images/packages/default.jpg"
            image.className = "imageContainer"
            section.appendChild(image)

            //create text section
            const textSection = document.createElement("div")
            textSection.className = "text-container"

            const title = document.createElement("h3")
            title.textContent = eventPackage.name
            textSection.appendChild(title)

            const description = document.createElement("p")
            description.textContent = eventPackage.description
            textSection.appendChild(description)

            //add button
            const button = document.createElement("button")
            button.textContent = "Want to know more?"
            const baseUrl = "http://localhost:63342/Frontend/AdventureXpFrontend/html/package.html?_ijt=pgcoo7f18pg6osg0hshevt53p8&_ij_reload=RELOAD_ON_SAVE"
            button.addEventListener('click', () => {
                window.location.href = `${baseUrl}&id=${eventPackage.id}`
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
