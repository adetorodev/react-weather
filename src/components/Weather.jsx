import { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=b2a5adcct04b33178913oc335f405433&units=metric`
      );
      if (!response.ok) {
        if (response.status == 404) {
          throw new Error("City not found, Enter a valid city name");
        } else {
          throw new Error("Weather Data not available, try again");
        }
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };
  return (
    <div className="min-h-screen bg-grey-100 flex items-center justify-center">
        <h1 className="text-4xl">Welcome To React Weather App</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your City Name"
        />
        <button
          onClick={fetchWeatherData}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Get Weather
        </button>
        {weatherData && (
          <div className="mt-4">
            <h2 className="text-2xl">City: {weatherData.city}</h2>
            <p className="text-gray-600">
              Description: {weatherData.condition.description}
            </p>
            <p className="text-gray-600">
              Temperature: {weatherData.temperature.current}
            </p>
            <p className="text-gray-600">
              Humility: {weatherData.temperature.humidity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
