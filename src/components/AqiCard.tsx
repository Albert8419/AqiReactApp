// React and state management imports
import { useState, FormEvent } from "react";

// API function for fetching AQI data
import { getAQIData } from "../api/actions";

// CSS styling for the AQI card
import "./AqiCard.css"; 

// Defines the shape of AQI data using an interface
interface AqiData {
  aqi: number; // Air Quality Index
  dominentpol: string; // Dominant pollutant
  forecast: {
    daily: {
      pm10: Array<{ avg: number }>; // PM10 data array
      pm25: Array<{ avg: number }>; // PM2.5 data array
      o3: Array<{ avg: number }>; // Ozone data array
    }
  };
}

// Component for displaying AQI data and handling search
const AqiCard = () => {
  const [data, setData] = useState<AqiData | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Function to handle city search
  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    // State variables for storing AQI data, loading state, city input, and error message
    event.preventDefault(); // Prevent form submission
    setLoadingState(true); // Set loading state to true
    try {
      const res = await getAQIData(city); // Fetch AQI data for the specified city
      setError(""); // Clears any previous error message
      setData(res); // Updates AQI data state
    } catch (error: any) {
      console.error(error.message); // Logs the error message
      setData(null); // Clears AQI data state
      setError("Error fetching AQI data"); // Sets an error message
    } finally {
      setLoadingState(false); // Sets loading state to false regardless of success or failure
    }
  };

  // JSX structure for rendering the AQI card
  return (
    <div className="aqi-card">
      {/* Top Section: Last Update Status or Error Message */}
      <div className="aqi-top-section">
        {data && <p>Latest site readings</p>}
        {error && <p className="aqi-error">{error}</p>}
      </div>
      
      {/* Middle Section: AQI Value and Details or Prompt */}
      <div className="aqi-middle-section">
        {data ? (
          <>
            <div className="aqi-value-city-wrapper">
              <div className="aqi-city-name">{city}</div>
              <div className="aqi-value">{data.aqi}</div>
            </div>
            <div className="aqi-details">
              <p>Dominant Pollutant: {data.dominentpol}</p>
              <p>PM10 Avg: {data.forecast.daily.pm10[0]?.avg}</p>
              <p>PM25 Avg: {data.forecast.daily.pm25[0]?.avg}</p>
              <p>O3 Avg: {data.forecast.daily.o3[0]?.avg}</p>
            </div>
          </>
        ) : (
          <p className="aqi-prompt">Please enter a city</p>
        )}
      </div>
      
      {/* Bottom Section: Search */}
      <div className="aqi-bottom-section">
        <form onSubmit={handleSearch} className="aqi-search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="aqi-search-input"
            placeholder="Enter city name..."
          />
          <button type="submit" className={`aqi-search-button ${loadingState ? 'loading' : ''}`}>
            {loadingState ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AqiCard;

