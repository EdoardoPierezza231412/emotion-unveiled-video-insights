
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Demo data for the emotion timeline
const generateEmotionData = (points = 20) => {
  const emotions = ["joy", "sadness", "anger", "fear", "surprise", "neutral"];
  const data = [];
  
  for (let i = 0; i < points; i++) {
    const point: any = {
      timePoint: i * 5, // 5 second intervals
    };
    
    emotions.forEach(emotion => {
      // Create some variation but ensure neutral is more common
      if (emotion === "neutral") {
        point[emotion] = Math.random() * 30 + 50; // between 50-80
      } else {
        point[emotion] = Math.random() * 50; // between 0-50
      }
    });
    
    data.push(point);
  }
  
  return data;
};

interface EmotionChartProps {
  videoLength?: number;
  isLoading?: boolean;
}

const EmotionChart = ({ videoLength = 100, isLoading = false }: EmotionChartProps) => {
  const [data, setData] = React.useState(generateEmotionData());
  
  // For demo purposes, regenerate data periodically to simulate analysis updates
  React.useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setData(generateEmotionData());
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Emotional Analysis Timeline
          {isLoading && (
            <span className="text-xs font-normal text-muted-foreground animate-pulse">
              Processing Video... 
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="line" className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="timePoint" 
                  label={{ value: 'Time (seconds)', position: 'insideBottomRight', offset: -10 }} 
                />
                <YAxis label={{ value: 'Intensity', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value, name) => [Math.round(Number(value)), name]} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="joy" 
                  stroke="#FFD166" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sadness" 
                  stroke="#118AB2" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="anger" 
                  stroke="#EF476F" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="fear" 
                  stroke="#073B4C" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="surprise" 
                  stroke="#06D6A0" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke="#8A817C" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="area" className="w-full">
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Area Chart View - Available in Premium Plan
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmotionChart;
