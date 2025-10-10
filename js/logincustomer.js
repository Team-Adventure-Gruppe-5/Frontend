//customer login
document.getElementById("loginCustomerForm").addEventListener('submit', event =>{
    event.preventDefault();
    const mail = document.getElementById("mail").value
    const bookingId = document.getElementById("bookingId").value

    fetch("http://localhost:8080/login-customer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({mail, bookingId})
    })
        .then(response => {
            if (!response.ok) throw new Error("Wrong credentials")
            return response.json()
        })
        .then(customer => {
            sessionStorage.setItem("customer", JSON.stringify(customer))
            window.location.href ="customer.html";
        })
        .catch(error => console.log("ERROR", error))

})