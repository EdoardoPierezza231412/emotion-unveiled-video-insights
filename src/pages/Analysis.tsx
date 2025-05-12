
import React, { useState, useRef } from "react";
import { PlayCircle, PauseCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/layout/Navigation";
import VideoUploader from "@/components/VideoUploader";
import EmotionChart from "@/components/charts/EmotionChart";
import EmotionBadge from "@/components/EmotionBadge";
import { useToast } from "@/hooks/use-toast";

const Analysis = () => {
  const { toast } = useToast();
  const [videoSource, setVideoSource] = useState("");
  const [sourceType, setSourceType] = useState<"file" | "url" | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dominantEmotion, setDominantEmotion] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelected = (source: string, type: "file" | "url") => {
    setVideoSource(source);
    setSourceType(type);
    setIsProcessing(true);
    
    // In a real implementation, this would be where we'd send the video to an API for processing
    // For demo purposes, we'll simulate processing with a timeout
    setTimeout(() => {
      setIsProcessing(false);
      setDominantEmotion("neutral");
      
      toast({
        title: "Analysis Complete",
        description: "Your video has been successfully analyzed.",
      });
    }, 5000);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Simulate emotion changes based on video playback time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const currentTime = videoRef.current.currentTime;
    const emotions = ["joy", "sadness", "anger", "fear", "surprise", "neutral"];
    const randomIndex = Math.floor(Math.abs(Math.sin(currentTime) * emotions.length));
    
    setDominantEmotion(emotions[randomIndex]);
  };
  
  const resetAnalysis = () => {
    setVideoSource("");
    setSourceType("");
    setIsProcessing(false);
    setIsPlaying(false);
    setDominantEmotion(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Video Analysis</h1>
        
        {!videoSource ? (
          <VideoUploader 
            onVideoSelected={handleVideoSelected} 
            isProcessing={isProcessing} 
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                  <video
                    ref={videoRef}
                    src={videoSource}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  
                  {dominantEmotion && !isProcessing && (
                    <div className="absolute top-4 right-4 animate-fade-in">
                      <EmotionBadge
                        emotion={dominantEmotion as any}
                        intensity={75}
                        showIntensity={false}
                      />
                    </div>
                  )}
                  
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <RefreshCw className="h-12 w-12 mb-4 mx-auto animate-spin" />
                        <p className="text-lg font-medium">Processing video...</p>
                        <p className="text-sm text-gray-300 max-w-xs mx-auto mt-2">
                          Our AI is analyzing emotional patterns in your content
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={togglePlayPause}
                    disabled={isProcessing}
                  >
                    {isPlaying ? (
                      <PauseCircle className="h-6 w-6" />
                    ) : (
                      <PlayCircle className="h-6 w-6" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAnalysis}
                    disabled={isProcessing}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Current Analysis */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Current Analysis</h3>
                
                {isProcessing ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded animate-pulse-light" />
                    <div className="h-6 bg-muted rounded w-3/4 animate-pulse-light" />
                    <div className="h-6 bg-muted rounded w-1/2 animate-pulse-light" />
                  </div>
                ) : videoSource ? (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Dominant Emotion
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dominantEmotion && (
                          <EmotionBadge
                            emotion={dominantEmotion as any}
                            intensity={75}
                          />
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Language Detection
                      </p>
                      <p>English (US)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Premium: Analyze up to 50+ languages
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Emotion Categories
                      </p>
                      <p className="mb-2">Basic emotions detected</p>
                      <div className="flex flex-wrap gap-2">
                        <EmotionBadge emotion="joy" intensity={20} />
                        <EmotionBadge emotion="sadness" intensity={15} />
                        <EmotionBadge emotion="neutral" intensity={65} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Premium: Unlock 25+ complex emotion categories
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Upload or provide a video URL to start analysis.
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Analysis Chart - Full Width */}
            <div className="lg:col-span-3">
              <EmotionChart isLoading={isProcessing} />
            </div>
          </div>
        )}
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
