import { Github, Heart, ExternalLink, Server } from "lucide-react";

export const Footer = () => {
  const techStack = [
    { name: "React", href: "https://react.dev" },
    { name: "TypeScript", href: "https://typescriptlang.org" },
    { name: "Tailwind CSS", href: "https://tailwindcss.com" },
    { name: "Vite", href: "https://vitejs.dev" },
  ];

  const backendStack = [
    { name: "Spring Boot (WebFlux)", href: "https://docs.spring.io/spring-framework/reference/web/webflux.html" },
    { name: "Java 17", href: "https://www.oracle.com/java/technologies/downloads/#java17" },
    { name: "ExchangeRate API", href: "https://exchangerate.host" },
    { name: "MaxMind GeoLite2", href: "https://dev.maxmind.com/geoip/geolite2-free-geolocation-data" },
    { name: "Maven", href: "https://maven.apache.org" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CX</span>
              </div>
              <span className="font-bold text-xl text-foreground">CurrencyXchange</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A full-stack React & Spring Boot project showcasing modern web development with real-time currency conversion.
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

          {/* Frontend Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <span>Frontend Stack</span>
            </h3>
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

          {/* Backend Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center space-x-2">
              <span>Backend Stack</span>
              <Server className="h-4 w-4 text-muted-foreground" />
            </h3>
            <ul className="space-y-2">
              {backendStack.map((tech) => (
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
            <span>© 2024 CurrencyXchange. A full-stack project built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
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