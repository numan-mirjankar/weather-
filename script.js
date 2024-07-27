document.getElementById('search_btn').addEventListener('click', async () => {
    const city = document.getElementById('user_input').value;
    if (!city) return;

    // Construct the API URL with the user's input
    const apiKey = '850cac4c51c8a61b959dfe0593e8cb07'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        // Fetch data from the OpenWeatherMap API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the response data as JSON
        const data = await response.json();

        // Extract the weather data
        const cityName = data.name;
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        // Update the DOM with the fetched weather data
        document.getElementById('city-name').textContent = cityName;
        document.getElementById('degree-show').textContent = `${temp} °C`; // OpenWeatherMap returns temperature in Celsius
        document.getElementById('description').textContent = description;
        document.getElementById('weather-img').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('date-time').textContent = new Date().toLocaleDateString();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
});
