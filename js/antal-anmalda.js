import { fetchData } from "/js/fetchData.js";

// Map Swedish days to indices
const dayMap = {
    "söndag": 0,
    "måndagar": 1,
    "tisdagar": 2,
    "onsdagar": 3,
    "torsdagar": 4,
    "fredagar": 5,
    "lördag": 6
};

const storage = window.sessionStorage;

function displayAllPersons() {
    for (let i = 0; i < storage.length; i++) {
        const ort = storage.key(i);
        const value = JSON.parse(storage.getItem(ort));

        if (Array.isArray(value)) {
            const ortDoc = document.getElementById(`${ort}-lista`);

            if (ortDoc) {
                value.forEach(person => {
                    const infoLi = document.createElement('li');
                    let emailDisplay = ''; // Default to empty string

                    // Check if person is online and set the email display accordingly
                    if (person.online === 'ja' && person.email) {
                        emailDisplay = `<span class="email">${person.email}</span>`; // Display email if online is 'ja'
                    }

                    infoLi.innerHTML = `${person.namn}, ${person.arskurs}, ${person.amne}, ${emailDisplay} <span class="online-status">Online: ${person.online}</span>`;
                    ortDoc.appendChild(infoLi);
                });
            }
        } else if (value && typeof value === 'object') {
            const ortDoc = document.getElementById(`${ort}-lista`);

            if (ortDoc) {
                let emailDisplay = ''; // Default to empty string

                // Check if person is online and set the email display accordingly
                if (value.online === 'ja' && value.email) {
                    emailDisplay = `<span class="email">${value.email}</span>`; // Display email if online is 'ja'
                }

                const infoLi = document.createElement('li');
                infoLi.innerHTML = `${value.namn}, ${value.arskurs}, ${value.amne}, ${emailDisplay} ${value.online}`;
                ortDoc.appendChild(infoLi);
            }
        } else {
            console.warn(`Data for ${ort} is neither an array nor an object! Skipping this location.`);
        }
    }
}


document.addEventListener("DOMContentLoaded", displayAllPersons);

async function calculateNextMeeting() {
    const data = await fetchData(); // Fetch the JSON data
    console.log(data)

    const today = new Date();
    const todayIndex = today.getDay(); // Current day index (0 = Sunday, 6 = Saturday)

    data.forEach(({ name, day, time }) => {
        const meetingDayIndex = dayMap[day.toLowerCase()];

        if (meetingDayIndex === undefined) {
            console.error(`Unknown day: ${day} for ${name}`);
            return; // Skip invalid entries
        }

        // Calculate days until the next meeting
        const daysUntilNextMeeting = (meetingDayIndex - todayIndex + 7) % 7 || 7;
        const nextMeetingDate = new Date();
        nextMeetingDate.setDate(today.getDate() + daysUntilNextMeeting);

        // Get the time part of the meeting (start and end)
        const [meetingStartTime, meetingEndTime] = time.split(" - ");
        console.log(`Parsed time for ${name}: Start - ${meetingStartTime}, End - ${meetingEndTime}`);

        // Split start time by "." (for HH.mm format) instead of ":"
        const [hour, minute] = meetingStartTime.split(".").map(num => parseInt(num));

        if (isNaN(hour) || isNaN(minute)) {
            console.error(`Invalid time format for ${name}: ${meetingStartTime}`);
            return; // Skip invalid time format
        }

        // Set the next meeting's date and time
        nextMeetingDate.setHours(hour, minute, 0, 0); // Set time to meeting start time

        // Check if nextMeetingDate is valid
        if (isNaN(nextMeetingDate)) {
            console.error(`Invalid date: ${nextMeetingDate}`);
            return;
        }

        // Format date and time
        const formattedDate = nextMeetingDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const nextMeetingInfo = `${formattedDate} kl. ${meetingStartTime}`;

        // Target the correct location's nasta-mote div based on name
        const locationId = name.toLowerCase();
        const nastaMoteDiv = document.getElementById(`nasta-mote-${locationId}`);

        // Check if the nasta-mote div exists and then insert the info
        if (nastaMoteDiv) {
            nastaMoteDiv.innerHTML = `Datum och tid för nästa möte: ${nextMeetingInfo}`;
        }

        // Check if it's time for the meeting and clear storage
        const currentTime = new Date();
        if (currentTime >= nextMeetingDate) {
            // If the current time is past or equal to the meeting time, clear sessionStorage
            window.sessionStorage.clear();
            console.log("Session storage cleared!");
        }
    });
}

document.addEventListener("DOMContentLoaded", calculateNextMeeting);
