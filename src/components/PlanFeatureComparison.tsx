
import React from "react";
import { Check, X, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlanFeatureComparisonProps {
  selectedPlan: string;
}

const PlanFeatureComparison: React.FC<PlanFeatureComparisonProps> = ({
  selectedPlan
}) => {
  const planFeatures = {
    basic: {
      name: "Starter",
      features: [
        { name: "5 videos per month", included: true },
        { name: "7 basic emotions", included: true },
        { name: "5-minute video limit", included: true },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
        { name: "Advanced analytics", included: false },
      ]
    },
    plus: {
      name: "Creator", 
      features: [
        { name: "Unlimited videos", included: true },
        { name: "25+ emotion categories", included: true },
        { name: "30-minute video limit", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: false },
        { name: "Advanced analytics", included: true },
      ]
    },
    pro: {
      name: "Enterprise",
      features: [
        { name: "Unlimited videos", included: true },
        { name: "30+ emotion categories", included: true },
        { name: "No video length limit", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Advanced analytics", included: true },
      ]
    }
  };

  const currentPlan = planFeatures[selectedPlan as keyof typeof planFeatures];

  if (!currentPlan) {
    return null;
  }

  return (
    <TooltipProvider>
      <Card className="glass-panel rounded-2xl border border-white/10 shadow-2xl mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            {currentPlan.name} Plan Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                {feature.included ? (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                )}
                <span className={!feature.included ? "text-muted-foreground" : ""}>
                  {feature.name}
                </span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 text-muted-foreground/50" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Feature details for {feature.name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default PlanFeatureComparison;
