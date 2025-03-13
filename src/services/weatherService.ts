
import { toast } from "@/components/ui/use-toast";
import { WeatherData } from "@/components/CurrentWeather";
import { HourlyData } from "@/components/HourlyForecast";
import { ForecastDay } from "@/components/ForecastCard";
import { WeatherDetailsData } from "@/components/WeatherDetails";

// Mock data for demo purposes
const mockLocations = {
  "new york": {
    current: {
      location: "New York",
      country: "USA",
      temperature: 24,
      feelsLike: 26,
      humidity: 65,
      windSpeed: 12,
      pressure: 1014,
      condition: "cloudy",
      icon: "cloudy",
      precipitation: 0.2,
      visibility: 9.5,
      uvIndex: 3,
      sunrise: "06:45",
      sunset: "19:27"
    },
    hourly: Array(24).fill(null).map((_, i) => ({
      time: `${i}:00`,
      temperature: 18 + Math.sin(i / 3) * 7,
      condition: i > 6 && i < 20 ? "cloudy" : "clear",
      icon: i > 6 && i < 20 ? "cloudy" : "clear"
    })),
    forecast: [
      { date: "2023-06-01", day: "Mon", tempMax: 26, tempMin: 18, condition: "cloudy", icon: "cloudy", humidity: 70, precipitation: 0.1 },
      { date: "2023-06-02", day: "Tue", tempMax: 28, tempMin: 17, condition: "rainy", icon: "rainy", humidity: 80, precipitation: 12.5 },
      { date: "2023-06-03", day: "Wed", tempMax: 22, tempMin: 16, condition: "rainy", icon: "rainy", humidity: 85, precipitation: 8.2 },
      { date: "2023-06-04", day: "Thu", tempMax: 24, tempMin: 17, condition: "cloudy", icon: "cloudy", humidity: 65, precipitation: 0 },
      { date: "2023-06-05", day: "Fri", tempMax: 26, tempMin: 19, condition: "sunny", icon: "sunny", humidity: 50, precipitation: 0 },
      { date: "2023-06-06", day: "Sat", tempMax: 27, tempMin: 20, condition: "sunny", icon: "sunny", humidity: 45, precipitation: 0 },
      { date: "2023-06-07", day: "Sun", tempMax: 25, tempMin: 19, condition: "cloudy", icon: "cloudy", humidity: 60, precipitation: 0.5 }
    ],
    charts: {
      temperature: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        temperature: 18 + Math.sin(i / 3) * 7
      })),
      humidity: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: 50 + Math.sin(i / 4) * 30
      })),
      precipitation: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: (i > 12 && i < 18) ? Math.abs(Math.sin(i) * 5) : 0
      }))
    }
  },
  "london": {
    current: {
      location: "London",
      country: "UK",
      temperature: 18,
      feelsLike: 17,
      humidity: 78,
      windSpeed: 18,
      pressure: 1008,
      condition: "rainy",
      icon: "rainy",
      precipitation: 2.4,
      visibility: 6.2,
      uvIndex: 2,
      sunrise: "05:15",
      sunset: "20:45"
    },
    hourly: Array(24).fill(null).map((_, i) => ({
      time: `${i}:00`,
      temperature: 14 + Math.sin(i / 4) * 5,
      condition: i > 8 && i < 18 ? (i % 3 === 0 ? "rainy" : "cloudy") : "cloudy",
      icon: i > 8 && i < 18 ? (i % 3 === 0 ? "rainy" : "cloudy") : "cloudy"
    })),
    forecast: [
      { date: "2023-06-01", day: "Mon", tempMax: 19, tempMin: 14, condition: "rainy", icon: "rainy", humidity: 80, precipitation: 3.2 },
      { date: "2023-06-02", day: "Tue", tempMax: 17, tempMin: 13, condition: "rainy", icon: "rainy", humidity: 85, precipitation: 5.1 },
      { date: "2023-06-03", day: "Wed", tempMax: 16, tempMin: 12, condition: "cloudy", icon: "cloudy", humidity: 75, precipitation: 1.0 },
      { date: "2023-06-04", day: "Thu", tempMax: 18, tempMin: 13, condition: "cloudy", icon: "cloudy", humidity: 70, precipitation: 0.5 },
      { date: "2023-06-05", day: "Fri", tempMax: 20, tempMin: 14, condition: "sunny", icon: "sunny", humidity: 65, precipitation: 0 },
      { date: "2023-06-06", day: "Sat", tempMax: 21, tempMin: 15, condition: "sunny", icon: "sunny", humidity: 60, precipitation: 0 },
      { date: "2023-06-07", day: "Sun", tempMax: 19, tempMin: 14, condition: "cloudy", icon: "cloudy", humidity: 70, precipitation: 0.2 }
    ],
    charts: {
      temperature: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        temperature: 14 + Math.sin(i / 4) * 5
      })),
      humidity: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: 65 + Math.sin(i / 3) * 20
      })),
      precipitation: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: (i > 8 && i < 18) ? 0.5 + Math.abs(Math.sin(i) * 3) : 0
      }))
    }
  },
  "tokyo": {
    current: {
      location: "Tokyo",
      country: "Japan",
      temperature: 28,
      feelsLike: 30,
      humidity: 70,
      windSpeed: 8,
      pressure: 1012,
      condition: "clear",
      icon: "clear",
      precipitation: 0,
      visibility: 10,
      uvIndex: 8,
      sunrise: "04:30",
      sunset: "18:50"
    },
    hourly: Array(24).fill(null).map((_, i) => ({
      time: `${i}:00`,
      temperature: 22 + Math.sin(i / 3) * 8,
      condition: i > 6 && i < 19 ? "sunny" : "clear",
      icon: i > 6 && i < 19 ? "sunny" : "clear"
    })),
    forecast: [
      { date: "2023-06-01", day: "Mon", tempMax: 29, tempMin: 22, condition: "sunny", icon: "sunny", humidity: 65, precipitation: 0 },
      { date: "2023-06-02", day: "Tue", tempMax: 30, tempMin: 23, condition: "sunny", icon: "sunny", humidity: 60, precipitation: 0 },
      { date: "2023-06-03", day: "Wed", tempMax: 31, tempMin: 24, condition: "sunny", icon: "sunny", humidity: 63, precipitation: 0 },
      { date: "2023-06-04", day: "Thu", tempMax: 30, tempMin: 24, condition: "cloudy", icon: "cloudy", humidity: 70, precipitation: 0 },
      { date: "2023-06-05", day: "Fri", tempMax: 29, tempMin: 23, condition: "rainy", icon: "rainy", humidity: 80, precipitation: 3.5 },
      { date: "2023-06-06", day: "Sat", tempMax: 28, tempMin: 22, condition: "rainy", icon: "rainy", humidity: 85, precipitation: 8.2 },
      { date: "2023-06-07", day: "Sun", tempMax: 27, tempMin: 22, condition: "cloudy", icon: "cloudy", humidity: 75, precipitation: 1.1 }
    ],
    charts: {
      temperature: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        temperature: 22 + Math.sin(i / 3) * 8
      })),
      humidity: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: 60 + Math.sin(i / 4) * 15
      })),
      precipitation: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: (i > 16 && i < 24) ? Math.abs(Math.sin(i) * 2) : 0
      }))
    }
  },
  "sydney": {
    current: {
      location: "Sydney",
      country: "Australia",
      temperature: 22,
      feelsLike: 24,
      humidity: 55,
      windSpeed: 15,
      pressure: 1016,
      condition: "sunny",
      icon: "sunny",
      precipitation: 0,
      visibility: 15,
      uvIndex: 6,
      sunrise: "06:50",
      sunset: "17:15"
    },
    hourly: Array(24).fill(null).map((_, i) => ({
      time: `${i}:00`,
      temperature: 18 + Math.sin(i / 4) * 6,
      condition: i > 7 && i < 18 ? "sunny" : "clear",
      icon: i > 7 && i < 18 ? "sunny" : "clear"
    })),
    forecast: [
      { date: "2023-06-01", day: "Mon", tempMax: 23, tempMin: 15, condition: "sunny", icon: "sunny", humidity: 50, precipitation: 0 },
      { date: "2023-06-02", day: "Tue", tempMax: 25, tempMin: 16, condition: "sunny", icon: "sunny", humidity: 45, precipitation: 0 },
      { date: "2023-06-03", day: "Wed", tempMax: 24, tempMin: 17, condition: "sunny", icon: "sunny", humidity: 50, precipitation: 0 },
      { date: "2023-06-04", day: "Thu", tempMax: 22, tempMin: 16, condition: "cloudy", icon: "cloudy", humidity: 60, precipitation: 0 },
      { date: "2023-06-05", day: "Fri", tempMax: 21, tempMin: 15, condition: "cloudy", icon: "cloudy", humidity: 65, precipitation: 0.3 },
      { date: "2023-06-06", day: "Sat", tempMax: 19, tempMin: 14, condition: "rainy", icon: "rainy", humidity: 75, precipitation: 2.8 },
      { date: "2023-06-07", day: "Sun", tempMax: 18, tempMin: 13, condition: "rainy", icon: "rainy", humidity: 80, precipitation: 5.2 }
    ],
    charts: {
      temperature: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        temperature: 18 + Math.sin(i / 4) * 6
      })),
      humidity: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: 45 + Math.sin(i / 3) * 15
      })),
      precipitation: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: (i > 18 && i < 24) ? Math.abs(Math.sin(i) * 1.5) : 0
      }))
    }
  },
  "paris": {
    current: {
      location: "Paris",
      country: "France",
      temperature: 21,
      feelsLike: 22,
      humidity: 60,
      windSpeed: 10,
      pressure: 1013,
      condition: "cloudy",
      icon: "cloudy",
      precipitation: 0,
      visibility: 12,
      uvIndex: 4,
      sunrise: "05:55",
      sunset: "21:35"
    },
    hourly: Array(24).fill(null).map((_, i) => ({
      time: `${i}:00`,
      temperature: 16 + Math.sin(i / 3) * 7,
      condition: i > 8 && i < 17 ? (i % 2 === 0 ? "sunny" : "cloudy") : "cloudy",
      icon: i > 8 && i < 17 ? (i % 2 === 0 ? "sunny" : "cloudy") : "cloudy"
    })),
    forecast: [
      { date: "2023-06-01", day: "Mon", tempMax: 22, tempMin: 16, condition: "cloudy", icon: "cloudy", humidity: 60, precipitation: 0 },
      { date: "2023-06-02", day: "Tue", tempMax: 24, tempMin: 15, condition: "sunny", icon: "sunny", humidity: 55, precipitation: 0 },
      { date: "2023-06-03", day: "Wed", tempMax: 26, tempMin: 17, condition: "sunny", icon: "sunny", humidity: 50, precipitation: 0 },
      { date: "2023-06-04", day: "Thu", tempMax: 25, tempMin: 18, condition: "cloudy", icon: "cloudy", humidity: 55, precipitation: 0 },
      { date: "2023-06-05", day: "Fri", tempMax: 23, tempMin: 16, condition: "rainy", icon: "rainy", humidity: 70, precipitation: 2.1 },
      { date: "2023-06-06", day: "Sat", tempMax: 21, tempMin: 15, condition: "rainy", icon: "rainy", humidity: 75, precipitation: 3.8 },
      { date: "2023-06-07", day: "Sun", tempMax: 22, tempMin: 16, condition: "cloudy", icon: "cloudy", humidity: 65, precipitation: 0.5 }
    ],
    charts: {
      temperature: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        temperature: 16 + Math.sin(i / 3) * 7
      })),
      humidity: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: 55 + Math.sin(i / 4) * 20
      })),
      precipitation: Array(24).fill(null).map((_, i) => ({
        time: `${i}:00`,
        value: (i > 16 && i < 22) ? Math.abs(Math.sin(i) * 2.5) : 0
      }))
    }
  }
};

// Default to New York if no location is provided
const defaultLocation = "new york";

// Helper to simulate API call delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock fetch weather data
export const fetchWeatherData = async (location: string = defaultLocation): Promise<{
  current: WeatherData;
  details: WeatherDetailsData;
  hourly: HourlyData[];
  forecast: ForecastDay[];
  charts: any;
}> => {
  try {
    // Normalize location string
    const normalizedLocation = location.trim().toLowerCase();
    
    // Simulate API delay
    await delay(1000);
    
    if (mockLocations[normalizedLocation]) {
      const data = mockLocations[normalizedLocation];
      return {
        current: data.current,
        details: data.current,
        hourly: data.hourly,
        forecast: data.forecast,
        charts: data.charts
      };
    } else {
      // If location not found in mock data, return default location
      toast({
        title: "Location not found",
        description: `Weather data for ${location} is not available. Showing data for New York instead.`,
        variant: "destructive",
      });
      return fetchWeatherData(defaultLocation);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch weather data. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
};
