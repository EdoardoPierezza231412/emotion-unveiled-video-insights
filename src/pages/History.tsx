import React, { useState } from "react";
import { History as HistoryIcon, Sliders, BarChart } from "lucide-react";
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

const PredictionHistory = () => {
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
    <div className="min-h-screen flex flex-col relative">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="noise-overlay"></div>
      
      <Navigation />
      
      <main className="flex-1 container py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gradient">Prediction History</h1>
            <p className="text-muted-foreground text-lg">Review past emotion predictions and analytics</p>
          </div>
          
          <Button onClick={handleExportAll} className="btn-primary shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
            <HistoryIcon className="h-4 w-4" />
            Export All As CSV
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-secondary/30 backdrop-blur-sm border border-white/10 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">All Sources</TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Video</TabsTrigger>
            <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">Text</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 glass-card card-hover border-white/10">
            <CardContent className="p-8">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-secondary/20">
                    <TableHead className="text-foreground font-semibold">Date</TableHead>
                    <TableHead className="text-foreground font-semibold">Text</TableHead>
                    <TableHead className="text-foreground font-semibold">Emotion</TableHead>
                    <TableHead className="text-foreground font-semibold">Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPredictions.map((prediction) => (
                    <TableRow key={prediction.id} className="border-white/5 hover:bg-secondary/10 transition-colors duration-200">
                      <TableCell className="whitespace-nowrap font-medium">
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
                      <TableCell className="capitalize font-medium">
                        {prediction.source}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                      className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:bg-secondary/50 transition-colors"}`}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="hover:bg-secondary/50 transition-colors"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-secondary/50 transition-colors"}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
          
          <Card className="glass-card card-hover border-white/10">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gradient">Analysis Tools</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="justify-start btn-outline hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                    <Sliders className="mr-2 h-4 w-4" />
                    Filter Results
                  </Button>
                  <Button variant="outline" className="justify-start btn-outline hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gradient">Emotion Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(emotionStats).map(([emotion, count]) => (
                    <div key={emotion} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-secondary/20 backdrop-blur-sm border border-white/5">
                      <div className="flex items-center gap-3">
                        <EmotionBadge
                          emotion={emotion as any}
                          intensity={0}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">{count}</span>
                        <div className="h-2 bg-muted rounded-full w-28 overflow-hidden">
                          <div 
                            className="h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out" 
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
      
      <footer className="bg-secondary/30 backdrop-blur-lg border-t border-white/10 py-8 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold shadow-lg">EA</div>
              <span className="font-heading text-lg">Emotion<span className="text-gradient">AI</span></span>
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

export default PredictionHistory;
