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


