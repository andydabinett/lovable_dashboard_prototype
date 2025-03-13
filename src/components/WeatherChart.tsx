
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

export interface TemperatureData {
  time: string;
  temperature: number;
}

interface WeatherChartProps {
  data: {
    temperature?: TemperatureData[];
    humidity?: {time: string; value: number}[];
    precipitation?: {time: string; value: number}[];
  };
  isLoading: boolean;
  className?: string;
}

export function WeatherChart({ data, isLoading, className }: WeatherChartProps) {
  const [chartType, setChartType] = useState<'temperature' | 'humidity' | 'precipitation'>('temperature');
  
  // Create placeholder data for loading state
  const placeholderData = Array(24).fill(null).map((_, i) => ({
    time: `${i}:00`,
    temperature: 0,
    value: 0
  }));
  
  const getChartData = () => {
    if (isLoading) return placeholderData;
    
    switch (chartType) {
      case 'temperature':
        return data.temperature || placeholderData;
      case 'humidity':
        return data.humidity || placeholderData;
      case 'precipitation':
        return data.precipitation || placeholderData;
      default:
        return placeholderData;
    }
  };
  
  const getChartColor = () => {
    switch (chartType) {
      case 'temperature':
        return "#f97316";
      case 'humidity':
        return "#3b82f6";
      case 'precipitation':
        return "#8b5cf6";
      default:
        return "#f97316";
    }
  };
  
  const getValueKey = () => {
    return chartType === 'temperature' ? 'temperature' : 'value';
  };
  
  const getYAxisLabel = () => {
    switch (chartType) {
      case 'temperature':
        return '°C';
      case 'humidity':
        return '%';
      case 'precipitation':
        return 'mm';
      default:
        return '';
    }
  };

  return (
    <Card className={cn("glass-card glass-card-hover animate-fade-in h-full", className)}>
      <CardHeader className="p-6 pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle className="text-xl font-medium tracking-tight">
          {chartType === 'temperature' && 'Temperature Trend'}
          {chartType === 'humidity' && 'Humidity Trend'}
          {chartType === 'precipitation' && 'Precipitation Trend'}
        </CardTitle>
        
        <div className="flex space-x-1">
          <Button 
            variant={chartType === 'temperature' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setChartType('temperature')}
            className="h-8 px-3 text-xs font-medium"
          >
            Temperature
          </Button>
          <Button 
            variant={chartType === 'humidity' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setChartType('humidity')}
            className="h-8 px-3 text-xs font-medium"
          >
            Humidity
          </Button>
          <Button 
            variant={chartType === 'precipitation' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setChartType('precipitation')}
            className="h-8 px-3 text-xs font-medium"
          >
            Precipitation
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 h-[300px]">
        {isLoading ? (
          <div className="w-full h-full bg-muted/30 rounded-md animate-pulse flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={getChartColor()} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis 
                dataKey="time" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                tickFormatter={(value) => value}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                tickFormatter={(value) => `${value}${getYAxisLabel()}`}
                width={40}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: 4 }}
                formatter={(value) => [`${value}${getYAxisLabel()}`, chartType.charAt(0).toUpperCase() + chartType.slice(1)]}
              />
              <Area 
                type="monotone" 
                dataKey={getValueKey()} 
                stroke={getChartColor()} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorGradient)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
