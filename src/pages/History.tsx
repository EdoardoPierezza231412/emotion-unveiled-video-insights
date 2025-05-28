
import React, { useState, useEffect } from "react";
import { History as HistoryIcon, Filter, BarChart3, TrendingUp, Download, Eye, Sparkles, Calendar, Clock } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface HistoryItem {
  id: string;
  timestamp: string;
  url: string;
  plan: string;
  downloadLink: string;
  data?: any;
}

const PredictionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  
  const itemsPerPage = 5;

  useEffect(() => {
    // Load real data from localStorage
    const savedHistory = localStorage.getItem('emotionAnalysisHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistoryData(parsedHistory);
      } catch (error) {
        console.error('Error parsing history data:', error);
        setHistoryData([]);
      }
    }
  }, []);
  
  // Filter predictions based on active tab (for now all show the same since we only have video analysis)
  const filteredData = historyData;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleExportAll = () => {
    if (filteredData.length === 0) return;
    
    const csvContent = filteredData.map(item => ({
      timestamp: new Date(item.timestamp).toLocaleString(),
      url: item.url,
      plan: item.plan,
      downloadLink: item.downloadLink
    }));
    
    const csvString = [
      ['Timestamp', 'URL', 'Plan', 'Download Link'].join(','),
      ...csvContent.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emotion-analysis-history-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    localStorage.removeItem('emotionAnalysisHistory');
    setHistoryData([]);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced animated background with more noise */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent filter blur-[120px] animate-pulse-light" />
        <div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent filter blur-[100px] animate-float" />
        <div className="absolute top-1/2 right-[5%] w-72 h-72 rounded-full bg-gradient-to-l from-primary/15 to-accent/15 filter blur-[80px] animate-glow" />
        <div className="absolute top-1/4 left-[30%] w-64 h-64 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 filter blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-[30%] w-56 h-56 rounded-full bg-gradient-to-l from-purple-500/10 to-pink-500/10 filter blur-[90px] animate-pulse-light" style={{ animationDelay: '1s' }} />
      </div>
      <div className="noise-overlay opacity-40"></div>
      
      <Navigation />
      
      <main className="flex-1 container py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
          <div className="space-y-3">
            <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 backdrop-blur-sm px-4 py-2 animate-fade-in">
              <HistoryIcon className="w-4 h-4 mr-2" />
              Analysis History
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient animate-slide-up">Analysis History</h1>
            <p className="text-muted-foreground text-lg max-w-2xl animate-slide-up">
              Review your emotion analysis results and download previous reports
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleExportAll} 
              disabled={filteredData.length === 0}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group px-6 py-3"
            >
              <Download className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Export All CSV
            </Button>
            <Button 
              onClick={clearHistory}
              disabled={filteredData.length === 0}
              variant="outline"
              className="glass-card border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 px-6 py-3"
            >
              Clear History
            </Button>
          </div>
        </div>
        
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
              {filteredData.length > 0 ? (
                <>
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                          <TableHead className="text-foreground font-semibold text-base py-4 px-6">Date</TableHead>
                          <TableHead className="text-foreground font-semibold text-base py-4">Video URL</TableHead>
                          <TableHead className="text-foreground font-semibold text-base py-4">Plan</TableHead>
                          <TableHead className="text-foreground font-semibold text-base py-4 text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedData.map((item, index) => (
                          <TableRow 
                            key={item.id} 
                            className="border-white/5 hover:bg-white/5 transition-all duration-200 group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <TableCell className="whitespace-nowrap font-medium text-base py-4 px-6">
                              <div className="flex flex-col">
                                <span className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {new Date(item.timestamp).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(item.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-80 py-4">
                              <div className="truncate text-sm group-hover:text-clip group-hover:whitespace-normal transition-all duration-200">
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-accent transition-colors duration-200 underline"
                                >
                                  {item.url}
                                </a>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge className={`capitalize font-medium ${
                                item.plan === 'basic' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' :
                                item.plan === 'plus' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                'bg-purple-500/20 text-purple-400 border-purple-500/30'
                              }`}>
                                {item.plan === 'basic' ? 'Starter' : item.plan === 'plus' ? 'Creator' : 'Enterprise'}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 text-center">
                              <div className="flex items-center gap-2 justify-center">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => window.open(item.downloadLink, '_blank')}
                                  className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {totalPages > 1 && (
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
                  )}
                </>
              ) : (
                <div className="text-center py-12 px-6">
                  <div className="h-16 w-16 bg-gradient-to-r from-muted/50 to-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Analysis History</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't analyzed any videos yet. Start by uploading a video to see your results here.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/analysis'}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                  >
                    Analyze Your First Video
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gradient flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 glass-card rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-gradient">{filteredData.length}</div>
                    <div className="text-xs text-muted-foreground">Total Analyses</div>
                  </div>
                  <div className="text-center p-4 glass-card rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-gradient">
                      {filteredData.filter(item => item.plan === 'pro').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Enterprise</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gradient">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: <Filter className="h-5 w-5" />,
                    label: "Advanced Filters",
                    description: "Filter by date, plan, results",
                    color: "from-blue-600 to-purple-600"
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5" />,
                    label: "Trend Analysis",
                    description: "View usage patterns over time",
                    color: "from-green-600 to-emerald-600"
                  },
                  {
                    icon: <BarChart3 className="h-5 w-5" />,
                    label: "Detailed Reports",
                    description: "Generate comprehensive reports",
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
