
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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold gradient-text">
                  Analyze Any Video with Emotion-Aware AI
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                  Detect and visualize emotional shifts in real-time, from core feelings to complex human states,
                  with multilingual support and smart language detection.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/analysis")}>
                  Analyze a Video <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl pt-4">
                <EmotionBadge emotion="joy" intensity={75} />
                <EmotionBadge emotion="sadness" intensity={45} />
                <EmotionBadge emotion="anger" intensity={30} />
                <EmotionBadge emotion="fear" intensity={25} />
                <EmotionBadge emotion="surprise" intensity={60} />
                <EmotionBadge emotion="neutral" intensity={50} />
                <EmotionBadge emotion="complex" intensity={80} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform delivers precise emotional insights, frame by frame, word by word.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Visualization</h3>
                <p className="text-muted-foreground">
                  Watch emotions evolve in real-time with our advanced visualization tools.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
                <p className="text-muted-foreground">
                  Automatic language detection and translation reveal emotional patterns across cultures.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Comprehensive reports with emotional insights and patterns over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subscription Plans */}
        <section className="py-16 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Subscription Plans</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your needs, from free basic analysis to enterprise-grade solutions.
              </p>
            </div>
            
            <SubscriptionPlans />
          </div>
        </section>
      </main>
      
      <footer className="bg-card border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-white font-semibold">EA</div>
              <span className="font-heading">Emotion AI</span>
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
