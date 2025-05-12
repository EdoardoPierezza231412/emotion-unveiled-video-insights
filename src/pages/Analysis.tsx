
import React, { useState } from "react";
import { Upload, Wand2, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmotionChart from "@/components/charts/EmotionChart";
import VideoUploader from "@/components/VideoUploader";
import Navigation from "@/components/layout/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { v4 as uuidv4 } from "uuid";

// Mock data for charts
const mockEmotionData = [
  { name: "Joy", value: 0.73, color: "#10b981" },
  { name: "Surprise", value: 0.12, color: "#6366f1" },
  { name: "Neutral", value: 0.08, color: "#94a3b8" },
  { name: "Sadness", value: 0.04, color: "#64748b" },
  { name: "Fear", value: 0.03, color: "#7c3aed" },
];

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | any>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileUpload = (files: FileList) => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setActiveTab("analyze");
    }, 1500);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        emotions: mockEmotionData,
        id: uuidv4(),
        timestamp: new Date(),
      });
      setActiveTab("results");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Emotion Analysis</h1>
            <p className="text-muted-foreground">
              Upload a video or image to analyze emotions
            </p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload" disabled={loading}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="analyze" disabled={!loading && activeTab === "upload"}>
                <Wand2 className="mr-2 h-4 w-4" />
                Analyze
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!results}>
                <BarChart4 className="mr-2 h-4 w-4" />
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <VideoUploader onFileUpload={handleFileUpload} isLoading={loading} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analyze Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border-2 border-dashed border-muted p-6 text-center">
                    <p>Media ready for analysis</p>
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={analyzing} 
                      className="mt-4"
                    >
                      {analyzing ? "Analyzing..." : "Start Analysis"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {results ? (
                <>
                  <Alert>
                    <AlertTitle>Analysis Complete</AlertTitle>
                    <AlertDescription>
                      Your media has been analyzed successfully.
                    </AlertDescription>
                  </Alert>

                  <Card className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>Emotion Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <EmotionChart data={results.emotions} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button>
                      Export Results
                    </Button>
                  </div>
                </>
              ) : (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No results available yet. Please complete analysis first.</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
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

export default Analysis;
