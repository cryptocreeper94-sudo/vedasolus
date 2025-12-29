import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { 
  Activity, 
  Utensils, 
  Moon, 
  Brain, 
  Settings, 
  LayoutGrid,
  Sprout,
  Library,
  Fingerprint,
  Store,
  Users,
  Code,
  Briefcase,
  ShieldAlert,
  Menu,
  X,
  QrCode,
  ExternalLink,
  Copyright,
  LogIn,
  LogOut,
  UserCircle,
  Wind,
  MessageCircle,
  FileText,
  Sparkles,
  Handshake,
  Wallet
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MissionStatement } from "@/components/ui/mission-statement";
import { QRCodeSVG } from "qrcode.react";
import bgImage from "@assets/generated_images/dark_ethereal_fluid_gradient_background_with_glowing_particles.png";
import logoImage from "@assets/Copilot_20251228_214224_1766980581672.png";
import { useAuth } from "@/hooks/use-auth";
import { LoginModal } from "@/components/ui/login-modal";

// Navigation Structure for Hamburger Menu
const navGroups = [
  {
    title: "Core",
    items: [
      { href: "/", icon: LayoutGrid, label: "Dashboard" },
      { href: "/passport", icon: Fingerprint, label: "Health Passport" },
      { href: "/records", icon: FileText, label: "Health Records" },
    ]
  },
  {
    title: "Wisdom",
    items: [
      { href: "/ayurveda", icon: Sprout, label: "Ayurveda" },
      { href: "/library", icon: Library, label: "The Codex" },
      { href: "/diet", icon: Utensils, label: "Diet & Nutrition" },
      { href: "/exercise", icon: Activity, label: "Movement" },
      { href: "/sleep", icon: Moon, label: "Sleep" },
      { href: "/meditation", icon: Wind, label: "Stillness" },
      { href: "/wisdom", icon: Brain, label: "Synthesis" },
    ]
  },
  {
    title: "Ecosystem",
    items: [
      { href: "/marketplace", icon: Store, label: "The Bazaar" },
      { href: "/community", icon: Users, label: "Tribes" },
      { href: "/messages", icon: MessageCircle, label: "Messages" },
    ]
  },
  {
    title: "Professional",
    items: [
      { href: "/practitioner", icon: Briefcase, label: "Practice Hub" },
      { href: "/developer", icon: Code, label: "Developer Core" },
      { href: "/admin", icon: ShieldAlert, label: "Admin Console" },
      { href: "/partner", icon: Handshake, label: "Partner Portal" },
    ]
  },
  {
    title: "Settings",
    items: [
      { href: "/settings", icon: Settings, label: "Settings" },
      { href: "/business-plan", icon: FileText, label: "Business Plan" },
    ]
  }
];

const NavItem = ({ href, icon: Icon, label, onClick }: { href: string; icon: any; label: string; onClick?: () => void }) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group mb-1",
          isActive 
            ? "bg-primary/20 text-primary border border-primary/20" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
        <span className="font-medium text-sm">{label}</span>
      </div>
    </Link>
  );
};

export function Shell({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 pb-20 pt-20 sm:pb-24 sm:pt-24">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-transparent to-background/90 pointer-events-none" />

      {/* HEADER - Sticky & Transparent */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between safe-area-pt -translate-y-4",
          isScrolled ? "bg-black/80 backdrop-blur-xl border-white/10" : "bg-transparent"
        )}
      >
        {/* Left: Brand */}
        <div className="flex items-center">
          <img 
            src={logoImage} 
            alt="VedaSolus" 
            className="h-24 sm:h-28 md:h-32 w-auto object-contain -ml-5 -mt-2.5 -mb-4"
          />
        </div>

        {/* Right: User & Hamburger Menu */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <UserCircle className="w-4 h-4 text-primary" />
              <span className="text-xs text-white hidden sm:inline">{user?.name || user?.email || "User"}</span>
            </div>
          ) : (
            !isLoading && (
              <button 
                onClick={() => setLoginOpen(true)}
                data-testid="button-login"
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button 
                data-testid="button-menu"
                className="p-3 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </SheetTrigger>
          <SheetContent side="right" className="w-[320px] bg-black/90 backdrop-blur-2xl border-l border-white/10 p-0 overflow-y-auto">
             <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <img src={logoImage} alt="VedaSolus" className="h-10 w-auto" />
                </div>

                <div className="space-y-6">
                  {navGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 px-4">{group.title}</h4>
                      {group.items.map(item => (
                        <NavItem 
                          key={item.href} 
                          href={item.href} 
                          icon={item.icon} 
                          label={item.label} 
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                    </div>
                  ))}
                  
                  {/* Mission Statement */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 px-4">About</h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          data-testid="button-mission-statement"
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all cursor-pointer group mb-1"
                        >
                          <Sparkles className="w-5 h-5 text-cyan-400" />
                          <span className="font-medium text-sm">Our Mission</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-black/95 backdrop-blur-2xl border-cyan-500/20 max-w-lg max-h-[80vh] overflow-hidden p-0">
                        <MissionStatement />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Config Link & Auth */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
                    <NavItem 
                      href="/settings" 
                      icon={Settings} 
                      label="Configuration" 
                      onClick={() => setIsOpen(false)}
                    />
                    {isAuthenticated && (
                      <button
                        data-testid="button-logout"
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all cursor-pointer group mb-1"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
             </div>
          </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 px-3 py-4 sm:p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-128px)] sm:min-h-[calc(100vh-160px)]">
         {children}
      </main>

      {/* FOOTER - Clean & Mobile-Friendly */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-white/10 safe-area-pb">
         <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
           <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
             <span className="hidden sm:inline">VedaSolus</span>
             <span className="font-mono opacity-50">v2.0</span>
           </div>

           <div className="flex items-center gap-2">
              <Link href="/partner">
                <button 
                  className="p-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors"
                  data-testid="button-partners"
                >
                  <Handshake className="w-4 h-4" />
                </button>
              </Link>

              <button 
                className="p-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                data-testid="button-investors"
              >
                <Wallet className="w-4 h-4" />
              </button>
           </div>
         </div>
      </footer>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}
