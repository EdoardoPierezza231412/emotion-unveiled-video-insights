
import React from "react";
import { NavLink } from "react-router-dom";
import { MenuIcon, Video, BarChart2, Settings, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const navLinks = [
    {
      title: "Dashboard",
      path: "/",
      icon: <BarChart2 className="h-5 w-5 mr-2" />,
    },
    {
      title: "Video Analysis",
      path: "/analysis",
      icon: <Video className="h-5 w-5 mr-2" />,
      isNew: true,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-background/60 backdrop-blur-xl border-b border-slate-800/80">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center gap-2 mr-8">
            <div className="h-9 w-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-semibold shadow-lg">EA</div>
            <span className="font-heading font-medium text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Emotion AI</span>
          </NavLink>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {link.icon}
                {link.title}
                {link.isNew && (
                  <Badge className="ml-2 bg-accent text-xs" variant="secondary">
                    New
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex bg-black/20 border-slate-700/60 hover:bg-slate-800/60 transition-all"
          >
            <span className="mr-2">Free Plan</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden bg-black/20 hover:bg-slate-800/60" 
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="md:hidden animate-fade-in fixed inset-0 z-40 pt-16 bg-black/95 backdrop-blur-lg">
          <nav className="container py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center py-3 px-4 rounded-md text-sm font-medium ${
                    isActive 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:bg-slate-800/80 hover:text-foreground"
                  }`
                }
                onClick={() => setIsMobileNavOpen(false)}
              >
                {link.icon}
                {link.title}
                {link.isNew && (
                  <Badge className="ml-2 bg-accent text-xs" variant="secondary">
                    New
                  </Badge>
                )}
              </NavLink>
            ))}
            <Separator className="my-4 bg-slate-800" />
            <div className="px-4 py-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-between bg-black/40 border-slate-700/60"
              >
                <span>Free Plan</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
