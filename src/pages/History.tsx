
import React, { useState } from "react";
import { History as HistoryIcon, Filter, BarChart3, TrendingUp, Download, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent filter blur-[120px] animate-pulse-light" />
        <div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent filter blur-[100px] animate-float" />
        <div className="absolute top-1/2 right-[5%] w-72 h-72 rounded-full bg-gradient-to-l from-primary/15 to-accent/15 filter blur-[80px] animate-glow" />
      </div>
      <div className="noise-overlay opacity-20"></div>
      
      <Navigation />
      
      <main className="flex-1 container py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
          <div className="space-y-3">
            <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 backdrop-blur-sm px-4 py-2 animate-fade-in">
              <HistoryIcon className="w-4 h-4 mr-2" />
              Analysis History
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient animate-slide-up">Prediction History</h1>
            <p className="text-muted-foreground text-lg max-w-2xl animate-slide-up">
              Review past emotion predictions and discover insights from your analysis history
            </p>
          </div>
          
          <Button 
            onClick={handleExportAll} 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group px-6 py-3"
          >
            <Download className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Export All CSV
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="glass-panel border border-white/10 p-1">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300"
            >
              All Sources
            </TabsTrigger>
            <TabsTrigger 
              value="video" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300"
            >
              Video Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="text" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300"
            >
              Text Analysis
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          <Card className="xl:col-span-2 glass-panel rounded-2xl border border-white/10 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-gradient flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-foreground font-semibold text-base py-4 px-6">Date</TableHead>
                      <TableHead className="text-foreground font-semibold text-base py-4">Content</TableHead>
                      <TableHead className="text-foreground font-semibold text-base py-4">Emotion</TableHead>
                      <TableHead className="text-foreground font-semibold text-base py-4">Source</TableHead>
                      <TableHead className="text-foreground font-semibold text-base py-4 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPredictions.map((prediction, index) => (
                      <TableRow 
                        key={prediction.id} 
                        className="border-white/5 hover:bg-white/5 transition-all duration-200 group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell className="whitespace-nowrap font-medium text-base py-4 px-6">
                          <div className="flex flex-col">
                            <span>{new Date(prediction.timestamp).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">{new Date(prediction.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-80 py-4">
                          <div className="truncate text-sm group-hover:text-clip group-hover:whitespace-normal transition-all duration-200">
                            {prediction.text}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <EmotionBadge
                            emotion={prediction.emotion as any}
                            intensity={prediction.intensity}
                          />
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`capitalize font-medium ${prediction.source === 'video' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'}`}>
                            {prediction.source}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="p-6 border-t border-white/10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                        className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:bg-white/10 transition-colors"}`}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="hover:bg-white/10 transition-colors data-[selected=true]:bg-gradient-to-r data-[selected=true]:from-primary data-[selected=true]:to-accent data-[selected=true]:text-white"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-white/10 transition-colors"}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gradient flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: <Filter className="h-5 w-5" />,
                    label: "Advanced Filters",
                    description: "Filter by date, emotion, intensity",
                    color: "from-blue-600 to-purple-600"
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5" />,
                    label: "Trend Analysis",
                    description: "View emotion patterns over time",
                    color: "from-green-600 to-emerald-600"
                  },
                  {
                    icon: <BarChart3 className="h-5 w-5" />,
                    label: "Detailed Charts",
                    description: "Advanced visualization tools",
                    color: "from-orange-600 to-red-600"
                  }
                ].map((action) => (
                  <Button 
                    key={action.label}
                    variant="outline" 
                    className={`w-full justify-start h-auto p-4 glass-card border-white/20 hover:border-white/40 transition-all duration-300 group`}
                  >
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{action.label}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gradient">Emotion Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(emotionStats).map(([emotion, count], index) => (
                  <div 
                    key={emotion} 
                    className="flex items-center justify-between gap-3 p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <EmotionBadge emotion={emotion as any} intensity={0} />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">{count}</div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((count / filteredPredictions.length) * 100)}%
                        </div>
                      </div>
                      <div className="h-3 bg-secondary/30 rounded-full w-24 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out group-hover:animate-shimmer" 
                          style={{ width: `${(count / filteredPredictions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="glass-panel border-t border-white/10 py-8 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                EA
              </div>
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
