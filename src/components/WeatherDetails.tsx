
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Eye, Gauge, Sunrise, Sunset, ThermometerSun, Umbrella, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WeatherDetailsData {
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  precipitation: number;
  sunrise: string;
  sunset: string;
}

interface WeatherDetailsProps {
  data?: WeatherDetailsData;
  isLoading: boolean;
  className?: string;
}

export function WeatherDetails({ data, isLoading, className }: WeatherDetailsProps) {
  // Placeholder data for loading state
  const placeholderData: WeatherDetailsData = {
    feelsLike: 0,
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    pressure: 0,
    uvIndex: 0,
    precipitation: 0,
    sunrise: "--:--",
    sunset: "--:--"
  };

  const detailsData = isLoading ? placeholderData : data || placeholderData;

  return (
    <Card className={cn("glass-card glass-card-hover animate-fade-in", className)}>
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-xl font-medium tracking-tight">Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <DetailItem 
            icon={<ThermometerSun className="h-4 w-4 text-orange-400" />}
            label="Feels Like"
            value={`${isLoading ? "--" : Math.round(detailsData.feelsLike)}°`}
            isLoading={isLoading}
            delay={100}
          />
          
          <DetailItem 
            icon={<Droplets className="h-4 w-4 text-blue-400" />}
            label="Humidity"
            value={`${isLoading ? "--" : detailsData.humidity}%`}
            isLoading={isLoading}
            delay={150}
          />
          
          <DetailItem 
            icon={<Wind className="h-4 w-4 text-blue-400" />}
            label="Wind Speed"
            value={`${isLoading ? "--" : detailsData.windSpeed} km/h`}
            isLoading={isLoading}
            delay={200}
          />
          
          <DetailItem 
            icon={<Eye className="h-4 w-4 text-gray-400" />}
            label="Visibility"
            value={`${isLoading ? "--" : detailsData.visibility} km`}
            isLoading={isLoading}
            delay={250}
          />
          
          <DetailItem 
            icon={<Gauge className="h-4 w-4 text-blue-400" />}
            label="Pressure"
            value={`${isLoading ? "--" : detailsData.pressure} hPa`}
            isLoading={isLoading}
            delay={300}
          />
          
          <DetailItem 
            icon={<Umbrella className="h-4 w-4 text-purple-400" />}
            label="Precipitation"
            value={`${isLoading ? "--" : detailsData.precipitation} mm`}
            isLoading={isLoading}
            delay={350}
          />
          
          <DetailItem 
            icon={<Sunrise className="h-4 w-4 text-amber-400" />}
            label="Sunrise"
            value={isLoading ? "--:--" : detailsData.sunrise}
            isLoading={isLoading}
            delay={400}
          />
          
          <DetailItem 
            icon={<Sunset className="h-4 w-4 text-orange-400" />}
            label="Sunset"
            value={isLoading ? "--:--" : detailsData.sunset}
            isLoading={isLoading}
            delay={450}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLoading: boolean;
  delay: number;
}

function DetailItem({ icon, label, value, isLoading, delay }: DetailItemProps) {
  return (
    <div className="flex flex-col gap-1 animate-scale-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className={cn("text-sm font-medium", isLoading && "animate-pulse-gentle")}>
        {value}
      </div>
    </div>
  );
}
