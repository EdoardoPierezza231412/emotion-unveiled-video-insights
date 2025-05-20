
import React from "react";
import { CheckIcon, XIcon, InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlanFeatureComparisonProps {
  selectedPlan: string;
}

const planFeatures = {
  basic: {
    name: "Starter",
    price: "$0",
    period: "forever",
    transcriptionModel: "tiny",
    features: [
      { name: "5 videos per month", included: true },
      { name: "7 basic emotions", included: true },
      { name: "720p max resolution", included: true },
      { name: "5-minute video limit", included: true },
      { name: "English language only", included: true },
      { name: "Complex emotions", included: false },
      { name: "Multilingual support", included: false },
      { name: "Cultural context analysis", included: false },
    ]
  },
  plus: {
    name: "Creator",
    price: "$12",
    period: "per month",
    transcriptionModel: "medium",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "25+ advanced emotions", included: true },
      { name: "1080p & 4K supported", included: true },
      { name: "30-minute video limit", included: true },
      { name: "10 languages support", included: true },
      { name: "Complex emotions", included: true },
      { name: "Multilingual support", included: true },
      { name: "Cultural context analysis", included: false },
    ]
  },
  pro: {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    transcriptionModel: "turbo",
    features: [
      { name: "Unlimited videos", included: true },
      { name: "30+ emotion categories", included: true },
      { name: "8K video support", included: true },
      { name: "No video length limit", included: true },
      { name: "50+ languages supported", included: true },
      { name: "Complex emotions", included: true },
      { name: "Multilingual support", included: true },
      { name: "Cultural context analysis", included: true },
    ]
  }
};

const PlanFeatureComparison: React.FC<PlanFeatureComparisonProps> = ({ selectedPlan }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Plan Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Feature</th>
                <th className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <span>Starter</span>
                    <Badge variant="outline" className="mt-1">Free</Badge>
                    {selectedPlan === 'basic' && <Badge className="mt-1 bg-green-500">Current</Badge>}
                  </div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <span>Creator</span>
                    <Badge variant="outline" className="mt-1">$12/mo</Badge>
                    {selectedPlan === 'plus' && <Badge className="mt-1 bg-green-500">Current</Badge>}
                  </div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div className="flex flex-col items-center">
                    <span>Enterprise</span>
                    <Badge variant="outline" className="mt-1">$49/mo</Badge>
                    {selectedPlan === 'pro' && <Badge className="mt-1 bg-green-500">Current</Badge>}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Video Limit */}
              <tr className="border-b">
                <td className="py-3 px-2 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        <span>Video Limit</span>
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of videos you can analyze per month</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-2 text-center">5 videos/mo</td>
                <td className="py-3 px-2 text-center">Unlimited</td>
                <td className="py-3 px-2 text-center">Unlimited</td>
              </tr>
              
              {/* Emotion Categories */}
              <tr className="border-b">
                <td className="py-3 px-2 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        <span>Emotion Categories</span>
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of distinct emotions the system can detect</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-2 text-center">7 basic</td>
                <td className="py-3 px-2 text-center">25+ advanced</td>
                <td className="py-3 px-2 text-center">30+ complete</td>
              </tr>
              
              {/* Video Resolution */}
              <tr className="border-b">
                <td className="py-3 px-2 text-left">Max Resolution</td>
                <td className="py-3 px-2 text-center">720p</td>
                <td className="py-3 px-2 text-center">4K</td>
                <td className="py-3 px-2 text-center">8K</td>
              </tr>
              
              {/* Time Limit */}
              <tr className="border-b">
                <td className="py-3 px-2 text-left">Video Length</td>
                <td className="py-3 px-2 text-center">5 minutes</td>
                <td className="py-3 px-2 text-center">30 minutes</td>
                <td className="py-3 px-2 text-center">Unlimited</td>
              </tr>
              
              {/* Language Support */}
              <tr className="border-b">
                <td className="py-3 px-2 text-left">Languages</td>
                <td className="py-3 px-2 text-center">English only</td>
                <td className="py-3 px-2 text-center">10 languages</td>
                <td className="py-3 px-2 text-center">50+ languages</td>
              </tr>
              
              {/* Advanced Features */}
              <tr className="border-b">
                <td className="py-3 px-2 text-left">Complex Emotions</td>
                <td className="py-3 px-2 text-center">
                  <XIcon className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <CheckIcon className="h-4 w-4 mx-auto text-green-500" />
                </td>
                <td className="py-3 px-2 text-center">
                  <CheckIcon className="h-4 w-4 mx-auto text-green-500" />
                </td>
              </tr>
              
              {/* Cultural Analysis */}
              <tr>
                <td className="py-3 px-2 text-left">Cultural Context</td>
                <td className="py-3 px-2 text-center">
                  <XIcon className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <XIcon className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <CheckIcon className="h-4 w-4 mx-auto text-green-500" />
                </td>
              </tr>
              
              {/* Transcription Model */}
              <tr className="border-t">
                <td className="py-3 px-2 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        <span>Transcription Model</span>
                        <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The AI model used for speech transcription</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className="font-mono">tiny</Badge>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className="font-mono">medium</Badge>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className="font-mono">turbo</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanFeatureComparison;
