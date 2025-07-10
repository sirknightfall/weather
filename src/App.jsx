import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, get the user's location from IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((locData) => {
        const { latitude, longitude, city, country_name } = locData;
        setLocation({ city, country_name });

        // Then fetch the weather using those coordinates
        return fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
        );
      })
      .then((res) => res.json())
      .then((weatherData) => {
        setWeather(weatherData.current);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>Weather App</h1>
      {loading ? (
        <p>Loading...</p>
      ) : weather && location ? (
        <div>
          <h2>
            {location.city}, {location.country_name}
          </h2>
          <p>🌡 Temperature: {weather.temperature_2m} °C</p>
          <p>⛅ Weather code: {weather.weathercode}</p>
        </div>
      ) : (
        <p>Could not get weather data.</p>
      )}
    </main>
  );
}

export default App;
