const container = document.getElementById("employeeContainer");

const role = sessionStorage.getItem("role");
const backBtn = document.getElementById("back-button")
const createEmpBtn = document.getElementById("createEmpbtn")
if (role !== "ADMIN") {
    createEmpBtn.style.display = "none";
}

createEmpBtn.addEventListener("click", () =>
{window.location.href = "../html/createEmployee.html"});

backBtn.addEventListener("click", () =>{window.location.href="../html/dashboard.html"});

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        console.log("Delete failed");
    }
    return response;
}

async function deleteEmployee(id) {
    //brug fetch til delete
    const delUrl = `http://localhost:8080/employees/${id}`;
    try {
        const response = await restDelete(delUrl)
        console.log("We have deleted");
        console.log(response);
        const body = await response.text();
        alert(body)
    } catch (error) {
        alert(error.message);
        console.log(error)
    }
}

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
            img.width = 50;
            img.height = 50;
            img.onerror = () => img.src = "/images/employees/default.jpg";
            card.appendChild(img);


            //employee names
            const name = document.createElement("p");
            name.textContent = employee.firstname + " " + employee.lastname;
            card.appendChild(name);

            const userRole = sessionStorage.getItem("role");

            if (userRole === "ADMIN") {
                const deleteEmpBtn = document.createElement("input");
                deleteEmpBtn.type = "button";
                deleteEmpBtn.setAttribute("value", "Delete Employee");
                deleteEmpBtn.id = "deleteEmpBtn"; // 👈 give it the same kind of handle as #createEmpbtn
                card.appendChild(deleteEmpBtn)
                deleteEmpBtn.onclick = function () {
                    deleteEmployee(employee.id)
                    window.location.href = "../html/employees.html"
                }
            }


            container.appendChild(card);
        });
    })
    .catch(error => console.log("couldn't find employees", error));