
import { useState, useEffect } from "react";
import { SearchLocation } from "@/components/SearchLocation";
import { CurrentWeather } from "@/components/CurrentWeather";
import { HourlyForecast } from "@/components/HourlyForecast";
import { ForecastCard } from "@/components/ForecastCard";
import { WeatherChart } from "@/components/WeatherChart";
import { WeatherDetails } from "@/components/WeatherDetails";
import { fetchWeatherData } from "@/services/weatherService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [location, setLocation] = useState("New York");
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setLocation(query);
    setIsLoading(true);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWeatherData(location);
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch weather data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, [location, toast]);

  useEffect(() => {
    // First-time loading animation
    const timer = setTimeout(() => {
      if (isLoading && !weatherData) {
        // If still loading after 3 seconds without data, show toast
        toast({
          title: "Loading weather data",
          description: "This might take a moment...",
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading, weatherData, toast]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Weather Dashboard</h1>
              <p className="text-muted-foreground mt-1">Real-time weather updates and forecasts</p>
            </div>
            <SearchLocation onSearch={handleSearch} />
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Current Weather */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CurrentWeather 
              data={weatherData?.current} 
              isLoading={isLoading} 
              className="lg:col-span-2"
            />
            <WeatherDetails 
              data={weatherData?.details} 
              isLoading={isLoading} 
              className="h-full"
            />
          </div>

          {/* Hourly Forecast */}
          <HourlyForecast 
            data={weatherData?.hourly || []} 
            isLoading={isLoading} 
          />

          {/* Chart & Forecast */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WeatherChart 
              data={weatherData?.charts || {}} 
              isLoading={isLoading} 
              className="lg:col-span-2"
            />
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium tracking-tight mb-2 animate-fade-in">7-Day Forecast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {(isLoading ? Array(7).fill(null) : weatherData?.forecast || []).map((day: any, index: number) => (
                  <ForecastCard 
                    key={index} 
                    day={day || {}} 
                    isLoading={isLoading}
                    className=""
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center text-sm text-muted-foreground animate-fade-in">
          <p>Weather Dashboard © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
