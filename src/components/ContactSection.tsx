import { Github, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Interested in this project or want to discuss web development? 
            Feel free to reach out through any of these channels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a
              href="https://github.com/oussama-zbair/CurrencyXchange-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Github className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">GitHub</h3>
                <p className="text-muted-foreground mb-4">
                  Check out the source code and other projects
                </p>
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <span className="text-sm font-medium">View Profile</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
            
            <a
              href="mailto:oussama.zbair9@gmail.com"
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">
                  Send me a message for collaboration or questions
                </p>
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <span className="text-sm font-medium">Send Email</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
          </div>
          
          <div className="mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};