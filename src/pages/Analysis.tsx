
import React, { useState } from "react";
import { Download, Youtube, Wand2, BarChart2, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import PlanFeatureComparison from "@/components/PlanFeatureComparison";
import EmotionTierDisplay from "@/components/EmotionTierDisplay";

interface ApiResponse {
  download: {
    link: string;
    filename?: string;
  };
  message?: string;
  meta?: {
    timestamp: string;
    language: string;
    input: string;
  };
}

const Analysis = () => {
  const { toast } = useToast();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [activeTab, setActiveTab] = useState("input");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const validateYoutubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateYoutubeUrl(youtubeUrl)) {
      toast({
        variant: "destructive",
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube video URL"
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    // Simulated progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 800);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/predict-any", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-plan": selectedPlan
        },
        body: JSON.stringify({
          src: youtubeUrl
        })
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setActiveTab("results");
      
      toast({
        title: "Analysis Complete",
        description: "Your emotion analysis is ready to download"
      });
      
    } catch (error) {
      clearInterval(progressInterval);
      setProgress(0);
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze the video. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result?.download?.link) {
      window.open(result.download.link, '_blank');
    }
  };

  const getPlanModelName = () => {
    switch (selectedPlan) {
      case "basic": return "tiny";
      case "plus": return "medium";
      case "pro": return "turbo";
      default: return "tiny";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Subtle noise overlay for texture */}
      <div className="noise-overlay"></div>
      
      <Navigation />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-1">Video Analysis</h1>
          <p className="text-muted-foreground">
            Analyze emotions from YouTube videos with advanced AI
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md bg-secondary/30">
            <TabsTrigger value="input" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={isLoading}>Analysis Input</TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={!result}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6 pt-4 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card rounded-xl border-border md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Video Analysis
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Enter a YouTube URL and select your plan to begin analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="youtube-url">YouTube Video URL</Label>
                      <div className="flex items-center space-x-2">
                        <div className="bg-secondary/50 p-2 rounded-l-md border-y border-l border-border">
                          <Youtube className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <Input 
                          id="youtube-url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          disabled={isLoading}
                          className="flex-grow rounded-l-none bg-secondary/30 border-border focus-visible:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Transcription Model</Label>
                        <Badge variant="outline" className="font-mono text-xs bg-secondary/50 border-border">
                          {getPlanModelName()}
                        </Badge>
                      </div>
                      <RadioGroup 
                        value={selectedPlan} 
                        onValueChange={setSelectedPlan}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div className={`flex flex-col items-center space-y-2 p-2 border rounded-md transition-colors cursor-pointer ${selectedPlan === "basic" ? "bg-secondary/70 border-primary/30" : "bg-secondary/30 hover:bg-secondary/50 border-border"}`}>
                          <RadioGroupItem value="basic" id="basic" className="sr-only" />
                          <Label htmlFor="basic" className="cursor-pointer font-medium">Starter</Label>
                          <span className="text-xs text-muted-foreground">Free</span>
                        </div>
                        <div className={`flex flex-col items-center space-y-2 p-2 border rounded-md transition-colors cursor-pointer ${selectedPlan === "plus" ? "bg-secondary/70 border-primary/30" : "bg-secondary/30 hover:bg-secondary/50 border-border"}`}>
                          <RadioGroupItem value="plus" id="plus" className="sr-only" />
                          <Label htmlFor="plus" className="cursor-pointer font-medium">Creator</Label>
                          <span className="text-xs text-muted-foreground">$12/mo</span>
                        </div>
                        <div className={`flex flex-col items-center space-y-2 p-2 border rounded-md transition-colors cursor-pointer ${selectedPlan === "pro" ? "bg-secondary/70 border-primary/30" : "bg-secondary/30 hover:bg-secondary/50 border-border"}`}>
                          <RadioGroupItem value="pro" id="pro" className="sr-only" />
                          <Label htmlFor="pro" className="cursor-pointer font-medium">Enterprise</Label>
                          <span className="text-xs text-muted-foreground">$49/mo</span>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || !youtubeUrl.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" />
                          Analyzing... {Math.round(progress)}%
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2" />
                          Analyze Video
                        </>
                      )}
                    </Button>

                    {isLoading && (
                      <div className="space-y-1">
                        <Progress value={progress} className="h-1.5 bg-secondary/50" />
                        <p className="text-xs text-muted-foreground text-center animate-pulse">
                          Processing video and extracting emotions...
                        </p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <Card className="glass-card rounded-xl border-border h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Selected Plan Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EmotionTierDisplay plan={selectedPlan} />
                </CardContent>
              </Card>
            </div>

            <PlanFeatureComparison selectedPlan={selectedPlan} />
          </TabsContent>
          
          <TabsContent value="results" className="pt-4 animate-slide-up">
            {result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card rounded-xl border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Analysis Complete</CardTitle>
                    <CardDescription>
                      Your emotion analysis results are ready
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="border-primary/30 bg-primary/10">
                      <AlertTitle className="flex items-center gap-2 text-foreground">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" />
                        </svg>
                        Analysis Successful
                      </AlertTitle>
                      <AlertDescription className="text-muted-foreground">
                        Your file is ready to download
                      </AlertDescription>
                    </Alert>

                    {result.meta && (
                      <div className="p-4 space-y-3 text-sm bg-secondary/30 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timestamp:</span>
                          <span className="font-mono">{new Date(result.meta.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Detected Language:</span>
                          <span className="uppercase font-mono">{result.meta.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model:</span>
                          <span className="font-mono">{getPlanModelName()}</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={handleDownload} 
                      className="w-full flex items-center justify-center"
                      variant="default"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-xl border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">What's Next?</CardTitle>
                    <CardDescription>
                      Actions you can take with your analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2.5">
                      <h4 className="font-medium text-sm">View Charts</h4>
                      <p className="text-sm text-muted-foreground">
                        Navigate to History to see detailed emotion visualization charts
                      </p>
                      <Button variant="outline" className="w-full bg-secondary/50 border-border hover:bg-secondary">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="font-medium text-sm">Analyze Another Video</h4>
                      <p className="text-sm text-muted-foreground">
                        Return to input screen to analyze another YouTube video
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full bg-secondary/50 border-border hover:bg-secondary"
                        onClick={() => setActiveTab("input")}
                      >
                        <Youtube className="mr-2 h-4 w-4" />
                        New Analysis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="glass-card rounded-xl border-border text-center p-8">
                <div className="flex justify-center mb-4 text-muted-foreground">
                  <BarChart2 className="h-12 w-12 opacity-50" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Enter a YouTube URL and click Analyze to get started
                </p>
                <Button 
                  variant="outline"
                  className="bg-secondary/50 border-border hover:bg-secondary"
                  onClick={() => setActiveTab("input")}
                >
                  Go to Analysis
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-secondary/30 border-t border-border py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary/20 border border-primary/20 rounded flex items-center justify-center text-primary font-medium">EA</div>
              <span className="font-heading">Emotion<span className="text-primary">AI</span></span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmotionAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Analysis;
