
import React from "react";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmotionTierDisplayProps {
  plan: string;
}

const emotionsByPlan = {
  basic: [
    "happy", "sad", "mad", "scared", "surprised", "disgusted", "neutral"
  ],
  plus: [
    "excitement", "confusion", "surprise", "neutral", "optimism", "pride",
    "curiosity", "fear", "amusement", "joy", "desire", "annoyance",
    "nervousness", "gratitude", "approval", "realization", "disappointment",
    "caring", "sadness", "admiration", "disapproval", "anger", "remorse"
  ],
  pro: [
    "excitement", "confusion", "surprise", "neutral", "optimism", "pride",
    "curiosity", "fear", "amusement", "joy", "desire", "annoyance",
    "nervousness", "gratitude", "approval", "realization", "disappointment",
    "caring", "sadness", "admiration", "disapproval", "anger", "remorse",
    "relief", "love", "disgust", "embarrassment"
  ]
};

const getEmotionIcon = (emotion: string): string => {
  const icons: { [key: string]: string } = {
    happy: "😊", sad: "😢", mad: "😠", scared: "😨", surprised: "😲",
    disgusted: "🤢", neutral: "😐", excitement: "🤩", confusion: "😕",
    surprise: "😮", optimism: "🙂", pride: "😌", curiosity: "🧐",
    fear: "😰", amusement: "😄", joy: "😁", desire: "😏", 
    annoyance: "😒", nervousness: "😬", gratitude: "🙏", approval: "👍",
    realization: "💡", disappointment: "😞", caring: "🤗", sadness: "😭",
    admiration: "😍", disapproval: "👎", anger: "😡", remorse: "😔",
    relief: "😌", love: "❤️", disgust: "🤮", embarrassment: "😳"
  };

  return icons[emotion] || "❓";
};

const EmotionTierDisplay: React.FC<EmotionTierDisplayProps> = ({ plan }) => {
  const emotions = emotionsByPlan[plan as keyof typeof emotionsByPlan] || emotionsByPlan.basic;
  const displayCount = 12;
  const displayedEmotions = emotions.slice(0, displayCount);
  const hiddenCount = emotions.length - displayCount;

  const getBgGradient = () => {
    if (plan === "basic") return "bg-gradient-to-br from-slate-900 to-slate-800";
    if (plan === "plus") return "bg-gradient-to-br from-slate-900 via-primary/10 to-slate-800";
    return "bg-gradient-to-br from-slate-900 via-primary/15 to-accent/10";
  };

  return (
    <Card className={`overflow-hidden border border-slate-700/60 ${getBgGradient()} backdrop-blur-xl shadow-xl`}>
      <CardContent className="p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Available Emotions
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="rounded-full bg-slate-700/60 p-1.5 text-primary hover:bg-slate-600/60 transition-colors">
                  <Info className="h-3.5 w-3.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  {plan === "basic" ? "Basic emotions only" : 
                  plan === "plus" ? "25+ advanced emotions" : 
                  "Complete set of 30+ emotions"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-wrap gap-2">
          {displayedEmotions.map((emotion) => (
            <Badge 
              key={emotion} 
              variant="outline"
              className="flex items-center gap-1.5 bg-slate-800/80 border-slate-600/40 hover:bg-slate-700/80 hover:border-slate-500/60 transition-all duration-200 px-3 py-1.5"
            >
              <span>{getEmotionIcon(emotion)}</span>
              <span className="capitalize">{emotion}</span>
            </Badge>
          ))}
          
          {hiddenCount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="outline"
                    className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/40 cursor-help transition-all duration-200"
                  >
                    +{hiddenCount} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="text-xs mb-2">Additional emotions in this tier:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {emotions.slice(displayCount).map((emotion) => (
                        <Badge key={emotion} variant="outline" className="text-xs bg-slate-800/80 border-slate-600/40">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="mb-1">
            {plan === "basic" ? "Basic tier includes 7 fundamental emotions." : 
            plan === "plus" ? "Creator tier provides 25+ advanced emotion categories." : 
            "Enterprise tier offers our full suite of 30+ emotions with cultural context."}
          </p>
          
          <div className="flex items-center gap-1.5 mt-3">
            <span className={`font-mono ${
              plan === "basic" 
                ? "bg-slate-800/80 text-slate-300" 
                : plan === "plus" 
                ? "bg-primary/20 text-primary" 
                : "bg-gradient-to-r from-primary/20 to-accent/20 text-accent"
            } rounded px-2 py-0.5 text-[10px]`}>
              {plan === "basic" ? "tiny" : plan === "plus" ? "medium" : "turbo"}
            </span> 
            <span>transcription model</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionTierDisplay;
