
import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Subtle noise overlay for texture */}
      <div className="noise-overlay"></div>
      
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative">
          {/* Background elements */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-[10%] w-64 h-64 rounded-full bg-primary/5 filter blur-[100px]" />
            <div className="absolute bottom-0 left-[5%] w-72 h-72 rounded-full bg-accent/5 filter blur-[100px]" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
                  <span className="text-gradient animate-slide-up block">AI-Powered</span>
                  <span className="animate-slide-up block">Emotion Analysis</span>
                </h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto animate-slide-up">
                  Detect and visualize emotional shifts in real-time with advanced AI processing and multilingual support.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/analysis")} 
                  className="bg-primary hover:opacity-90 transition-all group"
                >
                  Analyze a Video 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-secondary/50 border border-border hover:bg-secondary/80"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Emotion Visualization Preview */}
              <div className="w-full max-w-2xl mx-auto mt-10 glass-card rounded-xl p-6 animate-float">
                <h3 className="text-sm font-medium mb-4">Sample Emotion Analysis</h3>
                <div className="space-y-3">
                  {[
                    { name: "Neutral", value: 65, color: "bg-emotion-neutral" },
                    { name: "Joy", value: 42, color: "bg-emotion-joy" },
                    { name: "Surprise", value: 28, color: "bg-emotion-surprise" },
                    { name: "Sadness", value: 15, color: "bg-emotion-sadness" },
                  ].map((emotion) => (
                    <div key={emotion.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{emotion.name}</span>
                        <span className="text-muted-foreground">{emotion.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary/70 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${emotion.color} rounded-full`}
                          style={{ width: `${emotion.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-20 relative border-t border-border">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Key Features</h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Our platform delivers precise emotional insights using advanced AI models
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-3">Real-Time Visualization</h3>
                <p className="text-muted-foreground text-sm">
                  Watch emotions evolve in real-time with our advanced visualization tools that track subtle shifts in expression.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-3">Multilingual Support</h3>
                <p className="text-muted-foreground text-sm">
                  Automatic language detection and translation reveal emotional patterns across cultures and languages.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="M7 17l4-4 4 4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-3">Detailed Analytics</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive reports with emotional insights and patterns over time for deeper understanding.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subscription Plans */}
        <section className="py-16 md:py-24 relative border-t border-border">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-40 left-[15%] w-80 h-80 rounded-full bg-primary/10 filter blur-[100px]" />
            <div className="absolute bottom-20 right-[5%] w-96 h-96 rounded-full bg-accent/10 filter blur-[120px]" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Subscription Plans</h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Choose the perfect plan for your needs, from free basic analysis to enterprise-grade solutions
              </p>
            </div>
            
            <SubscriptionPlans />
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/30 border-t border-border py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary/20 border border-primary/20 rounded flex items-center justify-center text-primary font-medium">EA</div>
              <span className="font-heading">Emotion<span className="text-primary">AI</span></span>
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
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
