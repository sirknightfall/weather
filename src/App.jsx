import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latitude = 51.5074;
    const longitude = -0.1278;

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Weather fetch failed:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>London Weather</h1>
      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div>
          <p>🌡 Temperature: {weather.temperature_2m} °C</p>
          <p>⛅ Code: {weather.weathercode}</p>
        </div>
      ) : (
        <p>Unable to fetch weather.</p>
      )}
    </main>
  );
}

export default App;
