function loadFragment(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        }).catch(error => console.log("Failed to load fragment", error))
}

loadFragment("header", "/html/fragments/header.html")
loadFragment("footer", "/html/fragments/footer.html")