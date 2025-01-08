// Skapa en funktion för att dynamiskt skapa en navbar
function createNavbar() {
    const navbar = document.createElement('nav');  // Skapar navbar-elementet

    const ul = document.createElement('ul');  // Skapar en lista för navigationen

    // Lista på menyalternativ (kan modifieras)
    const menuItems = [
        { name: 'Hem', link: '/index.html' },  // Ändrad från '../index.html' till '/index.html'
        { name: 'Anmälan', link: '/anmal-intresse.html' },  // Ändrad från '../anmal-intresse.html' till '/anmal-intresse.html'
        { name: 'Antal Anmälda', link: '/antal-anmalda.html' }  // Ändrad från '../antal-anmalda.html' till '/antal-anmalda.html'
    ];

    // Skapa listobjekt och länkar för varje menyalternativ
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.name;  // Texten på menyalternativet
        a.href = item.link;         // Länken för menyalternativet
        li.appendChild(a);          // Lägg till länken i listan
        ul.appendChild(li);         // Lägg till listobjektet i listan
    });

    navbar.appendChild(ul);  // Lägg till listan i navbar
    document.body.insertBefore(navbar, document.body.firstChild);  // Lägg till navbar högst upp i body
}

// Anropa funktionen för att skapa navbar
createNavbar();
