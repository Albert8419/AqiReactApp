// Defines the shape of the AQI data retrieved from the API
interface AQIData {
  city: string; // Name of the city
  aqi: number; // Air Quality Index value
  dominentpol: string; // Dominant pollutant
  forecast: Forecast; // Forecast data for different pollutants
}

// Defines the structure of the forecast data
interface Forecast {
  daily: DailyForecast; // Daily forecast details
}

// Defines the structure of the daily forecast
interface DailyForecast {
  pm10: AirQualityForecast[]; // PM10 forecast details
  pm25: AirQualityForecast[]; // PM2.5 forecast details
  o3: AirQualityForecast[]; // O3 forecast details
}

// Defines the structure of the air quality forecast
interface AirQualityForecast {
  avg: number; // Average value
  day: string; // Day of the forecast
  max: number; // Maximum value
  min: number; // Minimum value
}

// Defines the attribution information for the AQI data source
interface Attribution {
  url: string; // URL of the data source
  name: string; // Name of the data source
  logo?: string; // Optional logo of the data source
}

// Defines the individual AQI values for different pollutants
interface IAQI {
  co: AQIValue; // Carbon monoxide AQI value
  h: AQIValue; // Humidity AQI value
  no2: AQIValue; // Nitrogen dioxide AQI value
  o3: AQIValue; // Ozone AQI value
  p: AQIValue; // Pressure AQI value
  pm10: AQIValue; // PM10 AQI value
  pm25: AQIValue; // PM2.5 AQI value
  so2: AQIValue; // Sulfur dioxide AQI value
  t: AQIValue; // Temperature AQI value
  w: AQIValue; // Wind AQI value
}

// Defines the structure of an individual AQI value
interface AQIValue {
  v: number; // Value of the AQI
}

// Defines the structure of the time data
interface Time {
  s: string; // Start time
  tz: string; // Timezone
  v: number; // Value
  iso: string; // ISO timestamp
}

// Defines the structure of debug information
interface Debug {
  sync: string; // Synchronization status
}
