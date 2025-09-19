import { Code, Database, Smartphone } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            About This Project
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            A modern currency converter built as a personal portfolio project showcasing 
            frontend development skills with React, TypeScript, and modern web technologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <Code className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Frontend</h3>
              <p className="text-muted-foreground">
                Built with React 18, TypeScript, and Tailwind CSS for a modern, 
                responsive user experience.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <Database className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Backend</h3>
              <p className="text-muted-foreground">
                Java Spring Boot backend (coming soon) will provide real-time 
                exchange rates and API services.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <Smartphone className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Mobile First</h3>
              <p className="text-muted-foreground">
                Fully responsive design ensuring great user experience 
                across all devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};