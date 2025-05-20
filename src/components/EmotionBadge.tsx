
import React from "react";
import { Badge } from "@/components/ui/badge";

interface EmotionBadgeProps {
  emotion: string;
  intensity: number;
}

const EmotionBadge: React.FC<EmotionBadgeProps> = ({ emotion, intensity }) => {
  const getColor = () => {
    switch (emotion) {
      case "joy":
        return "bg-emotion-joy/20 text-emotion-joy border-emotion-joy/30";
      case "sadness":
        return "bg-emotion-sadness/20 text-emotion-sadness border-emotion-sadness/30";
      case "anger":
        return "bg-emotion-anger/20 text-emotion-anger border-emotion-anger/30";
      case "fear":
        return "bg-emotion-fear/20 text-emotion-fear border-emotion-fear/30";
      case "surprise":
        return "bg-emotion-surprise/20 text-emotion-surprise border-emotion-surprise/30";
      case "neutral":
        return "bg-emotion-neutral/20 text-emotion-neutral border-emotion-neutral/30";
      case "complex":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <Badge 
      variant="outline"
      className={`flex items-center gap-2 ${getColor()} py-2 px-3 rounded-md border`}
    >
      <span className="font-medium capitalize">{emotion}</span>
      <div className="h-5 w-0.5 bg-border/50 mx-1" />
      <span className="text-xs font-mono">{intensity}%</span>
    </Badge>
  );
};

export default EmotionBadge;
