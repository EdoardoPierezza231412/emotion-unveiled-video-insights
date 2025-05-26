import React, { useState, useEffect } from "react";
import {
  Download, Youtube, Wand2, BarChart2, Loader2, Sparkles, ArrowRight, CheckCircle
} from "lucide-react";
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

const API = import.meta.env.VITE_API_BASE_URL || "http://194.171.191.226:3100";

const planOptions = [
  { id: "basic", label: "Starter", price: "Free", model: "tiny" },
  { id: "plus", label: "Creator", price: "$12/mo", model: "medium", popular: true },
  { id: "pro", label: "Enterprise", price: "$49/mo", model: "turbo" }
];

const nextActions = (
  setTab: (val: string) => void,
  download: () => void
) => [
  {
    title: "View Detailed Analytics",
    desc: "See comprehensive emotion charts and trends",
    icon: <BarChart2 className="h-5 w-5" />,
    action: () => (window.location.href = "/history")
  },
  {
    title: "Analyze Another Video",
    desc: "Return to input to analyze a new video",
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
  const [result, setResult] = useState<any>(null);

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
      return toast({ variant: "destructive", title: "Invalid URL", description: "Enter a valid YouTube link." });
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-plan": plan },
        body: JSON.stringify({ src: url })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setProgress(100);
      setResult(data);
      setTab("results");
      toast({ title: "Done", description: "Analysis ready." });
    } catch (err: any) {
      reset();
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const download = () => result?.download?.link && window.open(result.download.link, "_blank");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 p-8">
        <header className="text-center mb-8">
          <Badge className="px-4 py-1 mb-4"><Sparkles className="mr-2" />AI-Powered Analysis</Badge>
          <h1 className="text-4xl font-bold">Video Analysis Studio</h1>
          <p className="text-muted-foreground">Transform YouTube videos into emotional insights</p>
        </header>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="input" disabled={loading}>Input</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>Results</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <Card>
              <CardContent>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <Label htmlFor="url">YouTube URL</Label>
                    <Input id="url" value={url} onChange={e => setUrl(e.target.value)} disabled={loading} />
                  </div>
                  <RadioGroup value={plan} onValueChange={setPlan} className="flex gap-4">
                    {planOptions.map(({ id, label, price, popular }) => (
                      <label key={id} className="flex items-center gap-2">
                        <RadioGroupItem value={id} /> {label} ({price}) {popular && "★"}
                      </label>
                    ))}
                  </RadioGroup>
                  <Button type="submit" disabled={loading || !url}>
                    {loading ? <><Loader2 className="animate-spin" />{Math.round(progress)}%</> : <>Analyze <Wand2 /></>}
                  </Button>
                  {loading && <Progress value={progress} />}
                </form>
              </CardContent>
            </Card>
            <PlanFeatureComparison selectedPlan={plan} />
          </TabsContent>
          <TabsContent value="results">
            {result ? (
              <Card>
                <CardContent>
                  <h2 className="flex items-center gap-2"><CheckCircle />Analysis Complete</h2>
                  <Alert><AlertTitle>Success</AlertTitle><AlertDescription>Download ready</AlertDescription></Alert>
                  <Button onClick={download}><Download />Download CSV</Button>
                  <EmotionTierDisplay plan={plan} />
                  <div className="mt-4 space-y-2">
                    {nextActions(setTab, download).map(({ title, desc, icon, action }) => (
                      <Button key={title} variant="outline" onClick={action} className="w-full flex items-center gap-2">
                        {icon}{title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : <p>No results yet</p>}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analysis;
