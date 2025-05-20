
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import EmotionBadge from "@/components/EmotionBadge";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-900/90">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-20 right-[20%] w-72 h-72 rounded-full bg-primary/30 filter blur-[80px]" />
            <div className="absolute bottom-32 left-[10%] w-64 h-64 rounded-full bg-accent/20 filter blur-[60px]" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-10">
              <div className="space-y-6 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    AI-Powered
                  </span>
                  <br />
                  Emotion Analysis
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                  Detect and visualize emotional shifts in real-time, from core feelings to complex human states,
                  with multilingual support and smart language detection.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/analysis")} className="premium-button">
                  Analyze a Video <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="backdrop-blur-lg bg-black/20 border-white/10">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl pt-8 animate-float">
                <EmotionBadge emotion="joy" intensity={85} />
                <EmotionBadge emotion="sadness" intensity={45} />
                <EmotionBadge emotion="anger" intensity={30} />
                <EmotionBadge emotion="fear" intensity={25} />
                <EmotionBadge emotion="surprise" intensity={70} />
                <EmotionBadge emotion="neutral" intensity={50} />
                <EmotionBadge emotion="complex" intensity={90} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-slate-900/90 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Key Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform delivers precise emotional insights, frame by frame, word by word.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="premium-card p-8 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text">Real-Time Visualization</h3>
                <p className="text-muted-foreground">
                  Watch emotions evolve in real-time with our advanced visualization tools that track subtle shifts in expression.
                </p>
              </div>
              
              <div className="premium-card p-8 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text">Multilingual Support</h3>
                <p className="text-muted-foreground">
                  Automatic language detection and translation reveal emotional patterns across cultures and languages.
                </p>
              </div>
              
              <div className="premium-card p-8 transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Comprehensive reports with emotional insights and patterns over time for deeper understanding.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subscription Plans */}
        <section className="py-24 bg-gradient-to-b from-background to-slate-900/80 relative">
          {/* Background elements */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-40 left-[15%] w-80 h-80 rounded-full bg-primary/20 filter blur-[100px]" />
            <div className="absolute bottom-20 right-[5%] w-96 h-96 rounded-full bg-accent/20 filter blur-[120px]" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Subscription Plans</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the perfect plan for your needs, from free basic analysis to enterprise-grade solutions.
              </p>
            </div>
            
            <SubscriptionPlans />
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-900 border-t border-slate-800 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">EA</div>
              <span className="font-heading text-xl">Emotion AI</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Emotion AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
