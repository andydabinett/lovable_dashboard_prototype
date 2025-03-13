
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Droplets, Gauge, Sun, Thermometer, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface CurrentWeatherProps {
  data?: WeatherData;
  isLoading: boolean;
  className?: string;
}

export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  icon: string;
  precipitation: number;
}

export function CurrentWeather({ data, isLoading, className }: CurrentWeatherProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="h-16 w-16 text-amber-400 animate-float" />;
      case 'rain':
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-400 animate-float" />;
      case 'cloudy':
      case 'clouds':
      case 'overcast':
        return <Cloud className="h-16 w-16 text-gray-400 animate-float" />;
      case 'snow':
      case 'snowy':
        return <CloudSnow className="h-16 w-16 text-blue-200 animate-float" />;
      case 'drizzle':
        return <CloudDrizzle className="h-16 w-16 text-blue-300 animate-float" />;
      case 'thunderstorm':
      case 'thunder':
        return <CloudLightning className="h-16 w-16 text-purple-500 animate-float" />;
      default:
        return <Sun className="h-16 w-16 text-amber-400 animate-float" />;
    }
  };

  // Placeholder data for skeleton loading state
  const skeletonData: WeatherData = {
    location: "Loading...",
    country: "",
    temperature: 0,
    feelsLike: 0,
    humidity: 0,
    windSpeed: 0,
    pressure: 0,
    condition: "clear",
    icon: "",
    precipitation: 0
  };

  const weatherData = isLoading ? skeletonData : data || skeletonData;

  return (
    <Card className={cn("overflow-hidden glass-card glass-card-hover", className)}>
      <CardHeader className="p-6 pb-0">
        <div className="flex flex-col gap-1 animate-fade-in">
          <CardTitle className={cn("text-2xl font-medium tracking-tight", 
            isLoading && "animate-pulse-gentle"
          )}>
            {weatherData.location}
            {weatherData.country && `, ${weatherData.country}`}
          </CardTitle>
          <CardDescription className={cn("text-sm", isLoading && "animate-pulse-gentle")}>
            {isLoading ? "Loading weather data..." : weatherData.condition}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center col-span-1 md:col-span-1 animate-scale-in" style={{animationDelay: "100ms"}}>
            {mounted && getWeatherIcon(weatherData.condition)}
          </div>
          
          <div className="flex flex-col items-center justify-center col-span-1 md:col-span-1 animate-scale-in" style={{animationDelay: "200ms"}}>
            <div className={cn("text-5xl font-semibold", isLoading && "animate-pulse-gentle")}>
              {isLoading ? "--" : `${Math.round(weatherData.temperature)}°`}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Feels like {isLoading ? "--" : `${Math.round(weatherData.feelsLike)}°`}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-1 animate-scale-in" style={{animationDelay: "300ms"}}>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{isLoading ? "--" : `${weatherData.humidity}%`}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{isLoading ? "--" : `${weatherData.windSpeed} km/h`}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{isLoading ? "--" : `${weatherData.pressure} hPa`}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{isLoading ? "--" : `${weatherData.precipitation} mm`}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
