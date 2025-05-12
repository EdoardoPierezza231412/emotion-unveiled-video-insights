
import React, { useState } from "react";
import { History, Sliders, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navigation from "@/components/layout/Navigation";
import EmotionBadge from "@/components/EmotionBadge";
import { EmotionPrediction, downloadCSV } from "@/lib/csv-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - in a real app would come from a database
const mockPredictions: EmotionPrediction[] = [
  {
    id: "1",
    timestamp: new Date("2025-05-10T10:23:54"),
    text: "I'm so excited about this new project!",
    emotion: "joy",
    intensity: 85,
    source: "video"
  },
  {
    id: "2",
    timestamp: new Date("2025-05-10T11:15:22"),
    text: "This makes me feel really disappointed.",
    emotion: "sadness",
    intensity: 73,
    source: "video"
  },
  {
    id: "3",
    timestamp: new Date("2025-05-09T09:45:12"),
    text: "I can't believe they would do that to me.",
    emotion: "anger",
    intensity: 64,
    source: "text"
  },
  {
    id: "4",
    timestamp: new Date("2025-05-08T16:12:01"),
    text: "I'm worried about the outcome of the meeting.",
    emotion: "fear",
    intensity: 58,
    source: "video"
  },
  {
    id: "5",
    timestamp: new Date("2025-05-07T14:05:47"),
    text: "That was unexpected but interesting.",
    emotion: "surprise",
    intensity: 69,
    source: "text"
  },
  {
    id: "6",
    timestamp: new Date("2025-05-06T15:32:18"),
    text: "It doesn't make much difference to me either way.",
    emotion: "neutral",
    intensity: 90,
    source: "video"
  },
  {
    id: "7",
    timestamp: new Date("2025-05-05T08:17:29"),
    text: "I feel both happy and sad about the news.",
    emotion: "complex",
    intensity: 75,
    source: "text"
  },
];

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  
  const itemsPerPage = 5;
  
  // Filter predictions based on active tab
  const filteredPredictions = activeTab === "all" 
    ? mockPredictions 
    : mockPredictions.filter(p => p.source === activeTab);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredPredictions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPredictions = filteredPredictions.slice(startIndex, startIndex + itemsPerPage);

  // Calculate emotion distribution
  const emotionStats = filteredPredictions.reduce((acc, prediction) => {
    const emotion = prediction.emotion;
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const handleExportAll = () => {
    downloadCSV(filteredPredictions, `emotion-predictions-${activeTab}-${new Date().toISOString().slice(0,10)}.csv`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Prediction History</h1>
            <p className="text-muted-foreground">Review past emotion predictions and analytics</p>
          </div>
          
          <Button onClick={handleExportAll} className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Export All As CSV
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Text</TableHead>
                    <TableHead>Emotion</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPredictions.map((prediction) => (
                    <TableRow key={prediction.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(prediction.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="max-w-60 truncate">
                        {prediction.text}
                      </TableCell>
                      <TableCell>
                        <EmotionBadge
                          emotion={prediction.emotion as any}
                          intensity={prediction.intensity}
                        />
                      </TableCell>
                      <TableCell className="capitalize">
                        {prediction.source}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Analysis Tools</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Sliders className="mr-2 h-4 w-4" />
                    Filter Results
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Emotion Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(emotionStats).map(([emotion, count]) => (
                    <div key={emotion} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <EmotionBadge
                          emotion={emotion as any}
                          showIntensity={false}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="h-2 bg-muted rounded-full w-24">
                          <div 
                            className="h-2 bg-primary rounded-full" 
                            style={{ width: `${(count / filteredPredictions.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-card border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-white font-semibold">EA</div>
              <span className="font-heading">Emotion AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Emotion AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default History;
