const storage = window.sessionStorage;

const star = document.getElementById("info-icon");
const tooltip = document.getElementById("tooltip");

star.addEventListener("click", () => {
    tooltip.classList.toggle('active')
})

function savePersonData(event) {
    event.preventDefault();

    const ort = document.getElementById("ort").value;
    const namn = document.getElementById("namn").value;
    const arkurs = document.getElementById("arkurs").value;
    const amne = document.getElementById("ämne").value;
    const online = document.getElementById("online").value
    let email = ''; // Initialize email as an empty string by default

    // Capture email only if online is "ja"
    if (online === "ja") {
        email = document.getElementById("email").value; // Capture the email only if online is "ja"
    }
    const personData = {
        namn: namn,
        arskurs: arkurs,
        amne: amne,
        online: online,
        email: email // Add email to the person data
    };

    // Retrieve the current data for the location (if any), and ensure it's an array
    let storedData = JSON.parse(storage.getItem(ort));
    
    // If storedData is not an array (it might be null or an object), initialize as an empty array
    if (!Array.isArray(storedData)) {
        storedData = [];
    }

    // Add the new person to the array
    storedData.push(personData);

    // Save the updated array back to sessionStorage
    storage.setItem(ort, JSON.stringify(storedData));

    // Navigate to the next page
    window.location.href = 'antal-anmalda.html';
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("anmalan-form");
    if (form) {
        form.addEventListener("submit", savePersonData);
    }
});
