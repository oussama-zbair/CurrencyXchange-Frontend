import { Github, Heart, ExternalLink } from "lucide-react";

export const Footer = () => {
  const techStack = [
    { name: "React", href: "https://react.dev" },
    { name: "TypeScript", href: "https://typescriptlang.org" },
    { name: "Tailwind CSS", href: "https://tailwindcss.com" },
    { name: "Vite", href: "https://vitejs.dev" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CX</span>
              </div>
              <span className="font-bold text-xl text-foreground">CurrencyXchange</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A personal React project showcasing modern frontend development with real-time currency conversion.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#github"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">View on GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Built With</h3>
            <ul className="space-y-2">
              {techStack.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm relative group flex items-center space-x-2"
                  >
                    <span>{tech.name}</span>
                    <ExternalLink className="h-3 w-3" />
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© 2024 CurrencyXchange. A personal project built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>and React</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Exchange rates updated every minute</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};