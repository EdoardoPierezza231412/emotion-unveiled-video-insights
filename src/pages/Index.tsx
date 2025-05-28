
import React from "react";
import { ArrowRight, Upload, Sparkles, Video, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent filter blur-[120px] animate-pulse-light" />
        <div className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent filter blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 filter blur-[80px] animate-glow" />
      </div>
      
      <div className="noise-overlay opacity-30"></div>
      
      <Navigation />
      
      <main className="flex-1 relative z-10">
        {/* Updated Hero Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 backdrop-blur-sm px-6 py-2 text-sm font-medium animate-fade-in">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Emotion Intelligence
                </Badge>
                
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight animate-slide-up">
                  <span className="text-foreground">Welcome back!</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    Ready to understand emotions deeper than ever?
                  </span>
                </h1>
                
                <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up">
                  Upload content or access recent results. Your insights, your control.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/analysis")} 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-2xl hover:shadow-primary/25 transition-all duration-300 group px-8 py-4 text-lg hover:scale-105"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Video
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/analysis")}
                  className="glass-card border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-8 py-4 text-lg hover:scale-105"
                >
                  <Video className="mr-2 h-5 w-5" />
                  Try Sample Video
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/history")}
                  className="glass-card border-accent/30 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 px-8 py-4 text-lg hover:scale-105"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Explore Dashboard
                </Button>
              </div>
              
              {/* Enhanced Emotion Visualization Preview */}
              <div className="w-full max-w-3xl mx-auto mt-16 glass-panel rounded-2xl p-8 animate-float shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gradient">Emotion Analysis Preview</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Ready
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Joy", value: 78, color: "bg-emotion-joy", trend: "+12%" },
                    { name: "Confidence", value: 65, color: "bg-emotion-surprise", trend: "+8%" },
                    { name: "Focus", value: 52, color: "bg-emotion-neutral", trend: "+5%" },
                    { name: "Excitement", value: 34, color: "bg-emotion-complex", trend: "+15%" },
                  ].map((emotion, index) => (
                    <div key={emotion.name} className="space-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{emotion.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-xs font-mono">{emotion.trend}</span>
                          <span className="text-muted-foreground font-mono">{emotion.value}%</span>
                        </div>
                      </div>
                      <div className="h-3 w-full bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div 
                          className={`h-full ${emotion.color} rounded-full transition-all duration-1000 ease-out animate-shimmer`}
                          style={{ 
                            width: `${emotion.value}%`,
                            background: `linear-gradient(90deg, var(--tw-gradient-stops), transparent)`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Single-line feature note */}
              <div className="mt-8">
                <p className="text-muted-foreground text-sm italic">
                  Empowered by privacy-safe AI. Built to analyze, learn, and evolve.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Subscription Plans */}
        <section className="py-20 md:py-32 relative border-t border-white/10">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-40 left-[15%] w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 filter blur-[120px] animate-pulse-light" />
            <div className="absolute bottom-20 right-[5%] w-80 h-80 rounded-full bg-gradient-to-l from-accent/20 to-primary/20 filter blur-[100px] animate-float" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">Choose Your Plan</h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                From personal projects to enterprise solutions, we have the perfect plan for your emotional AI needs
              </p>
            </div>
            
            <SubscriptionPlans />
          </div>
        </section>
      </main>
      
      <footer className="glass-panel border-t border-white/10 py-12 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                EA
              </div>
              <span className="font-heading text-xl">Emotion<span className="text-gradient">AI</span></span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-primary transition-colors duration-200">Documentation</a>
              <a href="#" className="hover:text-primary transition-colors duration-200">GitHub</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmotionAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
