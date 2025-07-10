// Import React hooks: useEffect for side effects, useState for state management
import { useEffect, useState } from "react";

// Main App component
function App() {
  // State to store weather data
  const [weather, setWeather] = useState(null);
  // State to store location data (city and country)
  const [location, setLocation] = useState(null);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // useEffect runs once after the component mounts
  useEffect(() => {
    // First, get the user's location from their IP address using ipapi.co
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((locData) => {
        // Destructure latitude, longitude, city, and country_name from the API response
        const { latitude, longitude, city, country_name } = locData;
        // Save city and country to state
        setLocation({ city, country_name });

        // Fetch weather data from open-meteo.com using the obtained coordinates
        return fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
        );
      })
      .then((res) => res.json())
      .then((weatherData) => {
        // Save the current weather data to state
        setWeather(weatherData.current);
        // Set loading to false since data is loaded
        setLoading(false);
      })
      .catch((err) => {
        // Log any errors and stop loading
        console.error("Error:", err);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs only once on mount

  // Render the UI
  return (
    <main style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>Weather App</h1>
      {loading ? (
        // Show loading message while fetching data
        <p>Loading...</p>
      ) : weather && location ? (
        // If weather and location data are available, display them
        <div>
          <h2>
            {location.city}, {location.country_name}
          </h2>
          <p>🌡 Temperature: {weather.temperature_2m} °C</p>
          <p>⛅ Weather code: {weather.weathercode}</p>
        </div>
      ) : (
        // If data could not be fetched, show an error message
        <p>Could not get weather data.</p>
      )}
    </main>
  );
}

// Export the App component as the default export
export default App;
