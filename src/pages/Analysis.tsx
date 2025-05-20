
import React, { useState } from "react";
import { Download, Youtube, Wand2, BarChart4, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface ApiResponse {
  download: {
    link: string;
    filename?: string;
  };
  message?: string;
}

const Analysis = () => {
  const { toast } = useToast();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const validateYoutubeUrl = (url: string): boolean => {
    // Simple YouTube URL validation
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

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis Complete",
        description: "Your emotion analysis is ready to download"
      });
      
    } catch (error) {
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Emotion Detection</h1>
          <p className="text-muted-foreground">
            Analyze emotions from YouTube videos using AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Video Analysis</CardTitle>
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
                  <Label>Analysis Plan</Label>
                  <RadioGroup 
                    value={selectedPlan} 
                    onValueChange={setSelectedPlan}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basic" id="basic" />
                      <Label htmlFor="basic" className="cursor-pointer">Basic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plus" id="plus" />
                      <Label htmlFor="plus" className="cursor-pointer">Plus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pro" id="pro" />
                      <Label htmlFor="pro" className="cursor-pointer">Pro</Label>
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
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2" />
                      Analyze Video
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Download your emotion analysis results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result ? (
                <>
                  <Alert>
                    <AlertTitle>Analysis Complete</AlertTitle>
                    <AlertDescription>
                      Your file is ready to download
                    </AlertDescription>
                  </Alert>

                  <Button 
                    onClick={handleDownload} 
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="mr-2" />
                    Download CSV
                  </Button>
                </>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-muted rounded-md">
                  <div className="flex justify-center mb-4">
                    <BarChart4 className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                  <p className="text-muted-foreground text-sm">
                    Enter a YouTube URL and click Analyze to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Enter a YouTube video URL in the input field</li>
              <li>Select your analysis plan (Basic, Plus, or Pro)</li>
              <li>Click the "Analyze Video" button to process the video</li>
              <li>Wait for the analysis to complete</li>
              <li>Download your results as a CSV file</li>
            </ol>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Our AI analyzes facial expressions and vocal tones to detect emotions throughout the video.</p>
            </div>
          </CardContent>
        </Card>
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
