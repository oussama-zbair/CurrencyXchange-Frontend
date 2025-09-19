import { ArrowDown, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToConverter = () => {
    document.getElementById("converter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 gradient-primary rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 gradient-secondary rounded-full opacity-10 animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 gradient-primary rounded-full opacity-5 animate-float" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-light/20 text-primary border border-primary/20 px-4 py-2 rounded-full mb-8 transition-bounce hover:shadow-glow">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Real-time Exchange Rates</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse-glow">
              Currency
            </span>
            <br />
            <span className="text-foreground">Exchange</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl font-normal">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A personal project showcasing modern React development with real-time currency conversion. Built for learning and portfolio demonstration.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["Real-time Rates", "180+ Currencies", "Mobile Optimized"].map((feature, index) => (
              <div
                key={feature}
                className="flex items-center space-x-2 bg-card border border-border px-4 py-2 rounded-full animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button
              size="lg"
              onClick={scrollToConverter}
              className="gradient-hero text-white font-semibold px-8 py-6 text-lg transition-bounce hover:shadow-glow animate-pulse-glow"
            >
              Start Converting
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Open source project • GitHub portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};