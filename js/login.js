//emp login
document.getElementById("loginForm").addEventListener("submit", event => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid username or password");

            }
            return response.json();
        })
        .then(employee => {
            sessionStorage.setItem("employee", JSON.stringify(employee));
            sessionStorage.setItem("welcomeMessage", `Welcome, ${employee.firstname}!`);
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            document.getElementById("error").textContent = error.message;
        });
});

//customer login
document.addEventListener('DOMContentLoaded',() =>{
    const customerForm = document.getElementById("loginCustomerForm")
    customerForm.addEventListener("submit", ()=>{
        event.preventDefault();
        const mail = document.getElementById("mail").value
        const bookingId = document.getElementById("bookingId").value

        fetch("http://localhost:8080/login-customer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({mail, bookingId})
        })
            .then(response => {
                if(!response.ok) throw new Error("Wrong credentials")
                return response.json()
            })
            .then(customer => {
                sessionStorage.setItem("customer", JSON.stringify(customer))
            })
            .catch(error => console.log("ERROR", error))

    })
})
