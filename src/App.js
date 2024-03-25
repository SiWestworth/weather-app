// Importing necessary modules and components
import "./App.css";

import Search from "./components/search/search";
import Forcast from "./components/forcast/forcast";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import React, { useState } from "react";
// Main App component
function App() {
  // State variables for current weather, forecast and error
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle search changes
  const handleOnSearchChange = async (searchData) => {
    // Extracting latitude and longitude from search data
    const [lat, lon] = searchData.value.split(/[\s,]+/);

    // Validation for latitude and longitude
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      setError("Invalid latitude or longitude");
      return;
    }

    // Fetching weather and forecast data from API
    try {
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ).then((res) => res.json());

      const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ).then((res) => res.json());

      // Setting the state with the fetched data
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch (err) {
      // Handling errors
      setError(err.message);
    }
  };

  // Rendering error message if there is an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Main render of the App component
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forcast data={forecast} />}
    </div>
  );
}

// Exporting the App component
export default App;
