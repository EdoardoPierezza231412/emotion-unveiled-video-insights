
import React, { useState, useEffect } from "react";
import {
  Download,
  Youtube,
  Wand2,
  BarChart2,
  Loader2,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const API = import.meta.env.VITE_API_BASE_URL || "http://194.171.191.226:3100";

const planOptions = [
  { id: "basic", label: "Starter", price: "Free", model: "tiny" },
  { id: "plus", label: "Creator", price: "$12/mo", model: "medium", popular: true },
  { id: "pro", label: "Enterprise", price: "$49/mo", model: "turbo" }
];

const nextActions = (
  setTab: (val: string) => void,
  download: () => void
): Array<{ title: string; icon: React.ReactNode; action: () => void }> => [
  {
    title: "View Detailed Analytics",
    icon: <BarChart2 className="h-5 w-5" />,
    action: () => (window.location.href = "/history")
  },
  {
    title: "Analyze Another Video",
    icon: <Youtube className="h-5 w-5" />,
    action: () => setTab("input")
  }
];

const Analysis: React.FC = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [plan, setPlan] = useState(planOptions[0].id);
  const [tab, setTab] = useState("input");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress(p => Math.min(90, p + Math.random() * 15));
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const reset = () => {
    setLoading(false);
    setProgress(0);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/.test(url)) {
      return toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid YouTube link."
      });
    }

    setLoading(true);
    setDownloadLink(null);

    try {
      const payload = {
        src: url,
        translate: false,
        classify: false,
        classify_ext: false,
        intensity: false
      };
      const res = await fetch(`${API}/predict-any`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-plan": plan
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        const msg = Array.isArray(err.detail)
          ? err.detail.map((d: any) => d.msg).join(", ")
          : err.detail || `Error ${res.status}`;
        throw new Error(msg);
      }

      const data = await res.json();
      const link = data.download?.link;
      if (!link) {
        throw new Error("Download link not found in response");
      }

      setProgress(100);
      setDownloadLink(link);
      setAnalysisData(data);
      
      // Save to localStorage for history
      const historyItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        url: url,
        plan: plan,
        downloadLink: link,
        data: data
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('emotionAnalysisHistory') || '[]');
      existingHistory.unshift(historyItem);
      localStorage.setItem('emotionAnalysisHistory', JSON.stringify(existingHistory.slice(0, 50))); // Keep last 50

      setTab("results");
      toast({ title: "Analysis Complete", description: "Your download is ready." });
    } catch (err: any) {
      reset();
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const download = () => downloadLink && window.open(downloadLink, "_blank");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent filter blur-[120px] animate-pulse-light" />
        <div className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent filter blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 filter blur-[80px] animate-glow" />
      </div>
      <div className="noise-overlay opacity-30"></div>
      
      <Navigation />
      
      <main className="flex-1 p-8 relative z-10">
        <header className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 backdrop-blur-sm px-4 py-2 mb-4 animate-fade-in">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Analysis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">Video Analysis Studio</h1>
          <p className="text-muted-foreground text-lg">
            Transform YouTube videos into emotional insights
          </p>
        </header>

        <Tabs value={tab} onValueChange={setTab} className="max-w-4xl mx-auto">
          <TabsList className="glass-panel border border-white/10 p-1 mb-8">
            <TabsTrigger 
              value="input" 
              disabled={loading}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300"
            >
              Input
            </TabsTrigger>
            <TabsTrigger 
              value="results" 
              disabled={!downloadLink}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all duration-300"
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input">
            <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={submit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-lg font-semibold">YouTube URL</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      disabled={loading}
                      placeholder="https://youtube.com/watch?v=..."
                      className="glass-card border-white/20 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Choose Your Plan</Label>
                    <RadioGroup value={plan} onValueChange={setPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {planOptions.map(({ id, label, price, popular }) => (
                        <div key={id} className="relative">
                          <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            plan === id 
                              ? 'border-primary bg-primary/10' 
                              : 'border-white/20 bg-white/5 hover:border-white/40'
                          }`}>
                            <RadioGroupItem value={id} className="sr-only" />
                            {popular && (
                              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent to-primary text-white">
                                Popular
                              </Badge>
                            )}
                            <div className="text-center">
                              <div className="font-bold text-lg">{label}</div>
                              <div className="text-2xl font-bold text-gradient">{price}</div>
                              <div className="text-sm text-muted-foreground mt-2">
                                {id === 'basic' && 'Basic emotion detection'}
                                {id === 'plus' && 'Advanced emotion analysis'}
                                {id === 'pro' && 'Enterprise-grade insights'}
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading || !url}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300 group px-8 py-4 text-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> 
                        Analyzing... {Math.round(progress)}%
                      </>
                    ) : (
                      <>
                        Analyze Video
                        <Wand2 className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                  
                  {loading && (
                    <Progress 
                      value={progress} 
                      className="mt-4 h-3 bg-secondary/30"
                    />
                  )}
                </form>
              </CardContent>
            </Card>

            <PlanFeatureComparison selectedPlan={plan} />
          </TabsContent>

          <TabsContent value="results">
            {downloadLink ? (
              <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gradient mb-2">Analysis Complete!</h2>
                    <p className="text-muted-foreground">Your emotion analysis is ready for download</p>
                  </div>
                  
                  <Alert className="glass-card border-green-500/30 mb-6">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Your download is ready and has been saved to your history.</AlertDescription>
                  </Alert>
                  
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <Button 
                      onClick={download}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group px-8 py-4 text-lg"
                    >
                      <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Download CSV Results
                    </Button>
                  </div>
                  
                  <EmotionTierDisplay plan={plan} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {nextActions(setTab, download).map(({ title, icon, action }) => (
                      <Button
                        key={title}
                        variant="outline"
                        onClick={action}
                        className="w-full flex items-center justify-center gap-2 glass-card border-white/20 hover:border-white/40 transition-all duration-300 py-4"
                      >
                        {icon}
                        <span>{title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results yet. Please analyze a video first.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analysis;
