console.log("jeg er i formEmployee");

document.addEventListener('DOMContentLoaded', createFormEventListener);
let formEmployee;

function createFormEventListener() {
    formEmployee = document.getElementById("formEmployee");
    formEmployee.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;
    console.log("Sender form til:", url);

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson(url, formData);

        alert("Employee created successfully!");
        console.log("Response:", responseData);

        form.reset();

        // redirect til employee-listen
        window.location.href = "../html/employees.html";

    } catch (error) {
        alert("Error creating employee: " + error.message);
        console.error(error);
    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log("Form data:", plainFormData);

    return await postObjectAsJson(url, plainFormData, "POST");
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log("Sender JSON:", objectAsJsonString);

    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
}
