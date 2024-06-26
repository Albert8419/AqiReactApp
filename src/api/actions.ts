import axios from "axios";

// Defines the base URL for the API
const API_BASE_URL = "https://vigilant-space-guacamole-7wpr4v7rg6p3p769-3000.app.github.dev/api";

// Defines the interface for AQI data
export interface AQIData {
  aqi: number;
  dominentpol: string;
  forecast: {
    daily: {
      pm10: { avg: number; day: string; max: number; min: number; }[];
      pm25: { avg: number; day: string; max: number; min: number; }[];
      o3: { avg: number; day: string; max: number; min: number; }[];
    }
  };
}

// Defines the interface for simplified AQI data
export interface AqiData {
  city: string;
  aqi: number;
  dominentpol: string;
  pm10avg: number;
  pm25avg: number;
  o3avg: number;
  forecast: {
    daily: {
      pm10: { avg: number; day: string; max: number; min: number; }[];
      pm25: { avg: number; day: string; max: number; min: number; }[];
      o3: { avg: number; day: string; max: number; min: number; }[];
    }
  };
}

// Function to fetch AQI data
const fetchAQIData = async (city: string): Promise<AQIData> => {
  const response = await axios.get(`${API_BASE_URL}/aqi/${city}`);
  return response.data.data;
};

// Function to get simplified AQI data
export const getAQIData = async (city: string): Promise<AqiData> => {
  try {

    // Fetching AQI data
    const aqiData = await fetchAQIData(city);
    const { aqi, dominentpol, forecast } = aqiData;
    const { pm10, pm25, o3 } = forecast.daily;

    // Calculates averages for PM10, PM25, and O3
    const pm10avg = pm10.find((d) => d.day === "2024-04-25")?.avg || 0;
    const pm25avg = pm25.find((d) => d.day === "2024-04-25")?.avg || 0;
    const o3avg = o3.find((d) => d.day === "2024-04-25")?.avg || 0;

    // Returns simplified AQI data 
    return {
      city,
      aqi,
      dominentpol,
      pm10avg,
      pm25avg,
      o3avg,
      forecast,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.status === 404 ? "City not found" : error.message;
      
        // Throws error if any  
      throw new Error(message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
