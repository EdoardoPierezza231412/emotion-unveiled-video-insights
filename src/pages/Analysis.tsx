
import React, { useState } from "react";
import { Download, Youtube, Wand2, BarChart4, Loader2, Info } from "lucide-react";
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

  const getPlanColor = () => {
    switch (selectedPlan) {
      case "basic": return "bg-blue-600";
      case "plus": return "bg-purple-600";
      case "pro": return "bg-gradient-to-r from-indigo-600 to-purple-600";
      default: return "bg-blue-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Emotion Analysis</h1>
          <p className="text-muted-foreground">
            Analyze emotions from YouTube videos with advanced AI
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="input" disabled={isLoading}>Analysis Input</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>Analysis Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card border-border md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Video Analysis
                    <Badge className={getPlanColor()}>
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
                        <Youtube className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <Input 
                          id="youtube-url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          disabled={isLoading}
                          className="flex-grow"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Transcription Model</Label>
                        <Badge variant="outline" className="font-mono text-xs">
                          {getPlanModelName()}
                        </Badge>
                      </div>
                      <RadioGroup 
                        value={selectedPlan} 
                        onValueChange={setSelectedPlan}
                        className="grid grid-cols-3 gap-4"
                      >
                        <div className="flex flex-col items-center space-y-2 p-2 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="basic" id="basic" className="sr-only" />
                          <Label htmlFor="basic" className="cursor-pointer font-medium">Starter</Label>
                          <span className="text-xs text-muted-foreground">Free</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-2 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
                          <RadioGroupItem value="plus" id="plus" className="sr-only" />
                          <Label htmlFor="plus" className="cursor-pointer font-medium">Creator</Label>
                          <span className="text-xs text-muted-foreground">$12/mo</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2 p-2 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer">
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
                      <Progress value={progress} className="h-2" />
                    )}
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Selected Plan Features</CardTitle>
                  <CardDescription>
                    {selectedPlan === "basic" && "Basic features for personal use"}
                    {selectedPlan === "plus" && "Advanced features for creators"}
                    {selectedPlan === "pro" && "Professional features for enterprises"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EmotionTierDisplay plan={selectedPlan} />
                </CardContent>
              </Card>
            </div>

            <PlanFeatureComparison selectedPlan={selectedPlan} />
          </TabsContent>
          
          <TabsContent value="results" className="pt-4">
            {result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Analysis Complete</CardTitle>
                    <CardDescription>
                      Your emotion analysis results are ready
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="border-green-500/30 bg-green-500/10">
                      <AlertTitle className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> Analysis Successful
                      </AlertTitle>
                      <AlertDescription>
                        Your file is ready to download
                      </AlertDescription>
                    </Alert>

                    {result.meta && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timestamp:</span>
                          <span>{new Date(result.meta.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Detected Language:</span>
                          <span className="uppercase">{result.meta.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model:</span>
                          <span className="font-mono">{getPlanModelName()}</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={handleDownload} 
                      className="w-full"
                      variant="default"
                    >
                      <Download className="mr-2" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>What's Next?</CardTitle>
                    <CardDescription>
                      Actions you can take with your analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">View Charts</h4>
                      <p className="text-sm text-muted-foreground">
                        Navigate to History to see emotion visualization charts
                      </p>
                      <Button variant="outline" className="w-full">
                        <BarChart4 className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Analyze Another Video</h4>
                      <p className="text-sm text-muted-foreground">
                        Return to input to analyze another YouTube video
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
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
              <div className="text-center p-8 border-2 border-dashed border-muted rounded-md">
                <div className="flex justify-center mb-4">
                  <BarChart4 className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                <p className="text-muted-foreground text-sm">
                  Enter a YouTube URL and click Analyze to get started
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => setActiveTab("input")}
                >
                  Go to Analysis
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
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

export default Analysis;
