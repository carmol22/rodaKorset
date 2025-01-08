async function fetchData() {
    try {
        const response = await fetch('data/timeAndPlace.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export { fetchData }
