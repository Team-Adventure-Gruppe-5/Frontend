const translations = {
    en: {
        "welcome-title": "Welcome to Adventure XP",
        "welcome-description": "Your ultimate destination for fun, excitement, and unforgettable experiences! Explore our wide range of activities, from thrilling go-kart races and action-packed paintball to fun sumo wrestling and challenging mini golf. We also offer convenient activity packages, perfect for groups, families, or a full day of adventure. Have a special request or question? Just click below and get in touch – we’re here to make your adventure dreams come true!",
        "packages-button": "Packages",
        "request-button": "Send request"
    },
    da: {
        "welcome-title": "Velkommen til Adventure XP",
        "welcome-description": "Dit ultimative sted for sjov, spænding og uforglemmelige oplevelser! Udforsk vores brede udvalg af aktiviteter – fra hæsblæsende go-kart og actionfyldt paintball til sjov sumobrydning og udfordrende minigolf. Vi tilbyder også pakkeløsninger, der er perfekte til grupper, familier eller en hel dag med eventyr. Har du et særligt ønske eller spørgsmål? Klik nedenfor – vi står klar til at gøre dine eventyrdrømme til virkelighed!",
        "packages-button": "Pakker",
        "request-button": "Send forespørgsel"
    }
};

function setLanguage(lang) {
    Object.keys(translations[lang]).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = translations[lang][id];
    });
    localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);

document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));
document.getElementById("lang-da").addEventListener("click", () => setLanguage("da"));
