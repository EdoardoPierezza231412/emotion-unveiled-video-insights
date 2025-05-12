
import React from "react";
import { NavLink } from "react-router-dom";
import { MenuIcon, Video, BarChart2, Settings, ChevronRight } from "lucide-react";
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
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center gap-2 mr-8">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-white font-semibold">EA</div>
            <span className="font-heading font-medium text-xl">Emotion AI</span>
          </NavLink>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center text-sm font-medium ${
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
          <Button variant="outline" size="sm" className="hidden md:flex">
            <span className="mr-2">Free Plan</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="container py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center py-2 px-3 rounded-md text-sm font-medium ${
                    isActive 
                      ? "bg-secondary text-foreground" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
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
            <Separator className="my-2" />
            <div className="px-3 py-2">
              <Button variant="outline" size="sm" className="w-full justify-between">
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
