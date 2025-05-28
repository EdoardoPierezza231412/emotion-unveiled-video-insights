
import React from "react";
import { Check, X, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlanFeatureComparisonProps {
  selectedPlan: string;
}

const PlanFeatureComparison: React.FC<PlanFeatureComparisonProps> = ({ selectedPlan }) => {
  return (
    <Card className="glass-card border-border rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">Plan Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium">Feature</th>
                <th className="py-3 px-2 text-center text-sm font-medium">
                  <div className="flex flex-col items-center">
                    <span>Starter</span>
                    <Badge variant="outline" className="mt-1 bg-secondary/50 text-xs border-border">Free</Badge>
                    {selectedPlan === 'basic' && <Badge className="mt-1 bg-primary/20 text-primary text-xs">Current</Badge>}
                  </div>
                </th>
                <th className="py-3 px-2 text-center text-sm font-medium">
                  <div className="flex flex-col items-center">
                    <span>Creator</span>
                    <Badge variant="outline" className="mt-1 bg-secondary/50 text-xs border-border">$12/mo</Badge>
                    {selectedPlan === 'plus' && <Badge className="mt-1 bg-primary/20 text-primary text-xs">Current</Badge>}
                  </div>
                </th>
                <th className="py-3 px-2 text-center text-sm font-medium">
                  <div className="flex flex-col items-center">
                    <span>Enterprise</span>
                    <Badge variant="outline" className="mt-1 bg-secondary/50 text-xs border-border">$49/mo</Badge>
                    {selectedPlan === 'pro' && <Badge className="mt-1 bg-primary/20 text-primary text-xs">Current</Badge>}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Video Limit */}
              <tr className="border-b border-border">
                <td className="py-3 px-2 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        <span>Video Limit</span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-secondary/90 backdrop-blur-md border-border">
                        <p className="text-xs">Number of videos you can analyze per month</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-2 text-center">5 videos/mo</td>
                <td className="py-3 px-2 text-center">Unlimited</td>
                <td className="py-3 px-2 text-center">Unlimited</td>
              </tr>
              
              {/* Emotion Categories */}
              <tr className="border-b border-border">
                <td className="py-3 px-2 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        <span>Emotion Categories</span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-secondary/90 backdrop-blur-md border-border">
                        <p className="text-xs">Number of distinct emotions the system can detect</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-2 text-center">7 basic</td>
                <td className="py-3 px-2 text-center">25+ advanced</td>
                <td className="py-3 px-2 text-center">30+ complete</td>
              </tr>
              
              {/* Time Limit */}
              <tr className="border-b border-border">
                <td className="py-3 px-2 text-left">Video Length</td>
                <td className="py-3 px-2 text-center">5 minutes</td>
                <td className="py-3 px-2 text-center">30 minutes</td>
                <td className="py-3 px-2 text-center">Unlimited</td>
              </tr>
              
              {/* Priority Support */}
              <tr className="border-b border-border">
                <td className="py-3 px-2 text-left">Priority Support</td>
                <td className="py-3 px-2 text-center">
                  <X className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <Check className="h-4 w-4 mx-auto text-primary" />
                </td>
                <td className="py-3 px-2 text-center">
                  <Check className="h-4 w-4 mx-auto text-primary" />
                </td>
              </tr>
              
              {/* API Access */}
              <tr className="border-b border-border">
                <td className="py-3 px-2 text-left">API Access</td>
                <td className="py-3 px-2 text-center">
                  <X className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <X className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <Check className="h-4 w-4 mx-auto text-primary" />
                </td>
              </tr>
              
              {/* Advanced Analytics */}
              <tr className="border-b border-border">
                <td className="py-3 px-2 text-left">Advanced Analytics</td>
                <td className="py-3 px-2 text-center">
                  <X className="h-4 w-4 mx-auto text-muted-foreground/50" />
                </td>
                <td className="py-3 px-2 text-center">
                  <Check className="h-4 w-4 mx-auto text-primary" />
                </td>
                <td className="py-3 px-2 text-center">
                  <Check className="h-4 w-4 mx-auto text-primary" />
                </td>
              </tr>
              
              {/* Transcription Model */}
              <tr className="border-t border-border">
                <td className="py-3 px-2 text-left">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1 cursor-help">
                        <span>Transcription Model</span>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-secondary/90 backdrop-blur-md border-border">
                        <p className="text-xs">The AI model used for speech transcription</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className="font-mono bg-secondary/50 text-xs border-border">tiny</Badge>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className="font-mono bg-secondary/50 text-xs border-border">medium</Badge>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className="font-mono bg-secondary/50 text-xs border-border">turbo</Badge>
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
