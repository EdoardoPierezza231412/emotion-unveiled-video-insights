
import React, { useState } from "react";
import { Download, Youtube, Wand2, BarChart2, Loader2, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

// Use environment variable for API base URL, with a sensible fallback
const API = process.env.REACT_APP_API_BASE_URL || "http://194.171.191.226:3100";

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
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 90 ? 90 : newProgress;
      });
    }, 800);
    
    try {
      // POST to correct analysis endpoint
      const response = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-plan": selectedPlan
        },
        body: JSON.stringify({ src: youtubeUrl })
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
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-[20%] w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent filter blur-[120px] animate-pulse-light" />
        <div className="absolute bottom-0 left-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent filter blur-[100px] animate-float" />
      </div>
      <div className="noise-overlay opacity-20"></div>
      
      <Navigation />
      
      <main className="flex-1 container py-12 relative z-10">
        <div className="mb-12 text-center">
          <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 backdrop-blur-sm px-4 py-2 mb-4 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Analysis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient animate-slide-up">Video Analysis Studio</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-slide-up">
            Transform your YouTube videos into detailed emotional insights with our advanced AI technology
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto glass-panel border border-white/10 p-1">
            <TabsTrigger 
              value="input" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300" 
              disabled={isLoading}
            >
              Analysis Input
            </TabsTrigger>
            <TabsTrigger 
              value="results" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300" 
              disabled={!result}
            >
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-8 pt-8 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Youtube className="h-6 w-6 text-white" />
                    </div>
                    Video Analysis
                    <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30">
                      {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-base">
                    Enter a YouTube URL and select your plan to begin advanced emotion analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="youtube-url" className="text-base font-medium">YouTube Video URL</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                          <Youtube className="h-5 w-5 text-primary" />
                        </div>
                        <Input 
                          id="youtube-url"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          disabled={isLoading}
                          className="pl-12 h-14 text-base glass-card border-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Transcription Model</Label>
                        <Badge variant="outline" className="font-mono text-xs glass-card border-primary/30 text-primary">
                          {getPlanModelName()}
                        </Badge>
                      </div>
                      <RadioGroup 
                        value={selectedPlan} 
                        onValueChange={setSelectedPlan}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {[
                          { id: "basic", label: "Starter", price: "Free", popular: false },
                          { id: "plus", label: "Creator", price: "$12/mo", popular: true },
                          { id: "pro", label: "Enterprise", price: "$49/mo", popular: false }
                        ].map((plan) => (
                          <div key={plan.id} className={`relative flex flex-col items-center space-y-3 p-6 border-2 rounded-xl transition-all duration-300 cursor-pointer group ${selectedPlan === plan.id ? "glass-panel border-primary/50 shadow-xl shadow-primary/20" : "glass-card border-white/10 hover:border-white/30"}`}>
                            {plan.popular && (
                              <Badge className="absolute -top-2 bg-gradient-to-r from-primary to-accent text-white border-0 shadow-lg">
                                Most Popular
                              </Badge>
                            )}
                            <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                            <Label htmlFor={plan.id} className="cursor-pointer font-semibold text-lg text-center">
                              {plan.label}
                            </Label>
                            <span className="text-sm text-muted-foreground font-medium">{plan.price}</span>
                            {selectedPlan === plan.id && (
                              <CheckCircle className="h-5 w-5 text-primary animate-scale-in" />
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl hover:shadow-primary/25 transition-all duration-300 group"
                      disabled={isLoading || !youtubeUrl.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-3 h-5 w-5" />
                          Analyzing... {Math.round(progress)}%
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-3 h-5 w-5" />
                          Analyze Video
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    {isLoading && (
                      <div className="space-y-3">
                        <Progress value={progress} className="h-2 bg-secondary/30" />
                        <p className="text-sm text-center text-muted-foreground animate-pulse">
                          🤖 Processing video and extracting emotional patterns...
                        </p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>

              <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gradient">Selected Plan Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmotionTierDisplay plan={selectedPlan} />
                </CardContent>
              </Card>
            </div>

            <PlanFeatureComparison selectedPlan={selectedPlan} />
          </TabsContent>
          
          <TabsContent value="results" className="pt-8 animate-slide-up">
            {result ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gradient flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                      Analysis Complete
                    </CardTitle>
                    <CardDescription className="text-base">
                      Your comprehensive emotion analysis results are ready for download
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="border-green-500/30 bg-green-500/10 backdrop-blur-sm">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <AlertTitle className="text-green-400 font-semibold">
                        Analysis Successful
                      </AlertTitle>
                      <AlertDescription className="text-green-300">
                        Your emotion analysis file is ready for download with detailed insights
                      </AlertDescription>
                    </Alert>

                    {result.meta && (
                      <div className="p-6 space-y-4 text-sm glass-card rounded-xl border border-white/10">
                        <h4 className="font-semibold text-base mb-3 text-gradient">Analysis Details</h4>
                        {[
                          { label: "Timestamp", value: new Date(result.meta.timestamp).toLocaleString() },
                          { label: "Detected Language", value: result.meta.language.toUpperCase() },
                          { label: "Model Used", value: getPlanModelName() }
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                            <span className="text-muted-foreground">{item.label}:</span>
                            <span className="font-mono text-primary font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button 
                      onClick={handleDownload} 
                      className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group"
                    >
                      <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Download CSV Results
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gradient">What's Next?</CardTitle>
                    <CardDescription className="text-base">
                      Explore more features and analyze additional content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        title: "View Detailed Analytics",
                        description: "Navigate to History to see comprehensive emotion visualization charts and trends",
                        icon: <BarChart2 className="h-5 w-5" />,
                        action: () => window.location.href = "/history",
                        color: "from-blue-600 to-purple-600"
                      },
                      {
                        title: "Analyze Another Video",
                        description: "Return to input screen to analyze another YouTube video with different settings",
                        icon: <Youtube className="h-5 w-5" />,
                        action: () => setActiveTab("input"),
                        color: "from-red-600 to-pink-600"
                      }
                    ].map((item) => (
                      <div key={item.title} className="space-y-3 p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                        <h4 className="font-semibold flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                        <Button 
                          variant="outline" 
                          className={`w-full bg-gradient-to-r ${item.color} text-white border-0 hover:opacity-90 transition-all duration-300`}
                          onClick={item.action}
                        >
                          {item.icon}
                          {item.title.split(' ')[0]} Now
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="glass-panel rounded-2xl border border-white/10 text-center p-12 shadow-2xl">
                <div className="flex justify-center mb-6 text-muted-foreground">
                  <BarChart2 className="h-16 w-16 opacity-50" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gradient">No Results Yet</h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Enter a YouTube URL and click Analyze to unlock powerful emotional insights
                </p>
                <Button 
                  variant="outline"
                  className="glass-card border-primary/30 hover:bg-primary/10 hover:border-primary/50 px-8 py-3"
                  onClick={() => setActiveTab("input")}
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Start Analysis
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
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
              © {new Date().getFullYear()} EmotionAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Analysis;
