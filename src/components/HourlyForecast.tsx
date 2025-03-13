
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

interface HourlyForecastProps {
  data: HourlyData[];
  isLoading: boolean;
  className?: string;
}

export function HourlyForecast({ data, isLoading, className }: HourlyForecastProps) {
  const getWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className="h-6 w-6 text-amber-400" />;
      case 'rain':
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-400" />;
      case 'cloudy':
      case 'clouds':
      case 'overcast':
        return <Cloud className="h-6 w-6 text-gray-400" />;
      case 'snow':
      case 'snowy':
        return <CloudSnow className="h-6 w-6 text-blue-200" />;
      case 'drizzle':
        return <CloudDrizzle className="h-6 w-6 text-blue-300" />;
      case 'thunderstorm':
      case 'thunder':
        return <CloudLightning className="h-6 w-6 text-purple-500" />;
      default:
        return <Sun className="h-6 w-6 text-amber-400" />;
    }
  };

  // Create placeholder data for the loading state
  const placeholderData = Array(24).fill(null).map((_, index) => ({
    time: `${index}:00`,
    temperature: 0,
    condition: 'loading',
    icon: ''
  }));

  const displayData = isLoading ? placeholderData : data;

  return (
    <Card className={cn("glass-card glass-card-hover animate-fade-in", className)}>
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-xl font-medium tracking-tight">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex space-x-4 pb-1">
            {displayData.map((hour, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center gap-1 animate-scale-in"
                style={{ animationDelay: `${index * 25}ms` }}
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {isLoading ? (
                    <div className="h-4 w-10 bg-muted rounded animate-pulse"></div>
                  ) : (
                    hour.time
                  )}
                </span>
                <div className="my-1">
                  {isLoading ? (
                    <div className="h-6 w-6 bg-muted rounded-full animate-pulse"></div>
                  ) : (
                    getWeatherIcon(hour.condition)
                  )}
                </div>
                <span className="text-sm font-semibold">
                  {isLoading ? (
                    <div className="h-4 w-8 bg-muted rounded animate-pulse"></div>
                  ) : (
                    `${Math.round(hour.temperature)}°`
                  )}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
