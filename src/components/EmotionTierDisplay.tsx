
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Available Emotions</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
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
            className="flex items-center gap-1 bg-card hover:bg-accent transition-colors"
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
                  className="bg-muted/50 hover:bg-accent cursor-help transition-colors"
                >
                  +{hiddenCount} more
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs">
                  <p className="text-xs mb-2">Additional emotions in this tier:</p>
                  <div className="flex flex-wrap gap-1">
                    {emotions.slice(displayCount).map((emotion) => (
                      <Badge key={emotion} variant="outline" className="text-xs">
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
        
        <p className="flex items-center gap-1">
          <span className="font-mono bg-black/20 rounded px-1 py-0.5 text-[10px]">
            {plan === "basic" ? "tiny" : plan === "plus" ? "medium" : "turbo"}
          </span> 
          transcription model
        </p>
      </div>
    </div>
  );
};

export default EmotionTierDisplay;
