window.addEventListener("DOMContentLoaded", ()=> {
    const welcomeMessage = sessionStorage.getItem("welcomeMessage");
    if (welcomeMessage){
        document.getElementById("welcomeMessage").textContent = welcomeMessage;
        sessionStorage.removeItem("welcomeMessage");
    }
})


const container = document.getElementById("employeeContainer");

fetch("http://localhost:8080/employees")
    .then(response => response.json())
    .then(data => {
        data.forEach(employee => {
            const card = document.createElement("div");
            card.style.marginBottom ="20px"; //maybe move to css later


            //epmloyee images
            const img = document.createElement("img");
            img.src = `/images/employees/${employee.firstname}.png`;
            img.alt = employee.firstname + " " + employee.lastname;
            img.width = 50;  //TODO: rykkes muligvis til css ??
            img.height = 50;
            img.onerror = () => img.src = "/images/default.jpg";
            card.appendChild(img);


            //employee names
            const name = document.createElement("p");
            name.textContent = employee.firstname + " " + employee.lastname;
            card.appendChild(name);



            container.appendChild(card);
        });
    })
    .catch(error => console.log("couldn't find employees", error));