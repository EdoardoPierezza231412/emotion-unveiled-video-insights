
import React from "react";
import { Badge } from "@/components/ui/badge";

type EmotionType = "joy" | "sadness" | "anger" | "fear" | "surprise" | "neutral" | "complex";

interface EmotionBadgeProps {
  emotion: EmotionType;
  intensity?: number;
  showIntensity?: boolean;
}

const EmotionBadge = ({ emotion, intensity = 50, showIntensity = true }: EmotionBadgeProps) => {
  const getEmotionColor = (emotion: EmotionType) => {
    switch (emotion) {
      case "joy": return "bg-emotion-joy text-black";
      case "sadness": return "bg-emotion-sadness text-white";
      case "anger": return "bg-emotion-anger text-white";
      case "fear": return "bg-emotion-fear text-white";
      case "surprise": return "bg-emotion-surprise text-black";
      case "neutral": return "bg-emotion-neutral text-white";
      case "complex": return "bg-gradient-to-r from-primary to-accent text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getEmotionIcon = (emotion: EmotionType) => {
    switch (emotion) {
      case "joy": return "😊";
      case "sadness": return "😢";
      case "anger": return "😠";
      case "fear": return "😨";
      case "surprise": return "😲";
      case "neutral": return "😐";
      case "complex": return "🔄";
      default: return "❓";
    }
  };

  return (
    <Badge className={`${getEmotionColor(emotion)} font-normal`}>
      <span className="mr-1">{getEmotionIcon(emotion)}</span>
      <span className="capitalize">{emotion}</span>
      {showIntensity && (
        <span className="ml-1 opacity-80">{Math.round(intensity)}%</span>
      )}
    </Badge>
  );
};

export default EmotionBadge;
