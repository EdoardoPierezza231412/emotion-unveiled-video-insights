
import React from "react";
import { CheckIcon, XIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Basic emotion analysis for personal use",
    features: [
      { name: "5 videos per month", included: true },
      { name: "Basic emotions (7 categories)", included: true },
      { name: "720p max resolution", included: true },
      { name: "5-minute video limit", included: true },
      { name: "English language only", included: true },
      { name: "Complex emotions", included: false },
      { name: "Multilingual support", included: false },
      { name: "Cultural context analysis", included: false },
    ],
    transcriptionModel: "tiny",
    popular: false,
    buttonText: "Current Plan",
    buttonDisabled: true,
  },
  {
    name: "Creator",
    price: "$12",
    period: "per month",
    description: "Advanced analysis for creators and professionals",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "Extended emotions (25+ categories)", included: true },
      { name: "4K resolution support", included: true },
      { name: "30-minute video limit", included: true },
      { name: "10 languages supported", included: true },
      { name: "Complex emotions", included: true },
      { name: "Multilingual support", included: true },
      { name: "Cultural context analysis", included: false },
    ],
    transcriptionModel: "medium",
    popular: true,
    buttonText: "Upgrade",
    buttonDisabled: false,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "Complete solution for businesses and research",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "Full emotion spectrum (30+ labels)", included: true },
      { name: "8K resolution support", included: true },
      { name: "No video length limit", included: true },
      { name: "50+ languages supported", included: true },
      { name: "Complex emotions", included: true },
      { name: "Multilingual support", included: true },
      { name: "Cultural context analysis", included: true },
    ],
    transcriptionModel: "turbo",
    popular: false,
    buttonText: "Contact Sales",
    buttonDisabled: false,
  },
];

const SubscriptionPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.name} 
          className={`${
            plan.popular 
              ? "border-primary shadow-lg shadow-primary/10" 
              : ""
          } relative overflow-hidden`}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0">
              <Badge className="rounded-tl-none rounded-tr-none rounded-br-none bg-primary">
                <StarIcon className="h-3 w-3 mr-1" /> Popular
              </Badge>
            </div>
          )}
          
          <CardHeader>
            <CardTitle>
              {plan.name}
              <div className="mt-2 text-3xl font-bold">
                {plan.price}
                <span className="text-sm text-muted-foreground font-normal ml-1">
                  {plan.period}
                </span>
              </div>
            </CardTitle>
            <CardDescription className="mt-2">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {plan.transcriptionModel}
                </Badge>
                <span className="text-sm text-muted-foreground">transcription model</span>
              </div>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature.name} className="flex items-start">
                  {feature.included ? (
                    <CheckIcon className="h-5 w-5 text-primary mr-2 shrink-0" />
                  ) : (
                    <XIcon className="h-5 w-5 text-muted-foreground/50 mr-2 shrink-0" />
                  )}
                  <span className={!feature.included ? "text-muted-foreground" : ""}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant={plan.popular ? "default" : "outline"}
              disabled={plan.buttonDisabled}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
