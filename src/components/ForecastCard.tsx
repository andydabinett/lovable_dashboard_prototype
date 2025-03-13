
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Droplets, Sun, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ForecastDay {
  date: string;
  day: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  humidity: number;
  precipitation: number;
}

interface ForecastCardProps {
  day: ForecastDay;
  isLoading?: boolean;
  className?: string;
}

export function ForecastCard({ day, isLoading = false, className }: ForecastCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="h-8 w-8 text-amber-400" />;
      case 'rain':
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      case 'cloudy':
      case 'clouds':
      case 'overcast':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'snow':
      case 'snowy':
        return <CloudSnow className="h-8 w-8 text-blue-200" />;
      case 'drizzle':
        return <CloudDrizzle className="h-8 w-8 text-blue-300" />;
      case 'thunderstorm':
      case 'thunder':
        return <CloudLightning className="h-8 w-8 text-purple-500" />;
      default:
        return <Sun className="h-8 w-8 text-amber-400" />;
    }
  };

  return (
    <Card className={cn("glass-card glass-card-hover h-full transition-all duration-300 overflow-hidden animate-scale-in", className)}>
      <CardContent className="p-4 flex flex-col items-center justify-between h-full">
        <div className="font-medium text-sm mb-2 text-center">
          {isLoading ? (
            <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
          ) : (
            day.day
          )}
        </div>
        
        <div className="py-2">
          {isLoading ? (
            <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
          ) : (
            getWeatherIcon(day.condition)
          )}
        </div>
        
        <div className="flex justify-between items-center w-full mt-2">
          {isLoading ? (
            <div className="space-y-2 w-full">
              <div className="h-5 w-full bg-muted rounded animate-pulse"></div>
              <div className="h-5 w-full bg-muted rounded animate-pulse"></div>
            </div>
          ) : (
            <>
              <div className="flex gap-1 items-center">
                <Thermometer className="h-3 w-3 text-red-400" />
                <span className="text-xs font-medium">{Math.round(day.tempMax)}°</span>
              </div>
              <div className="text-xs">{day.condition}</div>
              <div className="flex gap-1 items-center">
                <Thermometer className="h-3 w-3 text-blue-400" />
                <span className="text-xs font-medium">{Math.round(day.tempMin)}°</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
