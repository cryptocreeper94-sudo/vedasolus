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
import { useAuth } from "@/hooks/use-auth";

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
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30 pb-20 pt-20">
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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-6 h-20 flex items-center justify-between",
          isScrolled ? "bg-black/60 backdrop-blur-xl border-white/5" : "bg-transparent"
        )}
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span className="font-serif text-lg font-bold text-white">Z</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-wide hidden md:block text-white">ZENITH</span>
        </div>

        {/* Right: User & Hamburger Menu */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <UserCircle className="w-4 h-4 text-primary" />
              <span className="text-xs text-white hidden sm:inline">{user?.email || user?.firstName || "User"}</span>
            </div>
          ) : (
            !isLoading && (
              <a 
                href="/api/login"
                data-testid="link-login"
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </a>
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                    <span className="font-serif font-bold text-white">Z</span>
                  </div>
                  <span className="font-serif text-lg font-bold tracking-wide">Navigation</span>
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
      <main className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-160px)]">
         {children}
      </main>

      {/* FOOTER - Sticky & Transparent */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-black/60 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-6 text-xs text-muted-foreground">
         <div className="flex items-center gap-1">
           <Copyright className="w-3 h-3" />
           <span>Dark Wave Studios LLC 2025</span>
         </div>

         <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono opacity-50">v2.0.4-beta</span>
            
            <Link href="/partner">
              <button 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors cursor-pointer"
                data-testid="button-partners"
              >
                <Handshake className="w-4 h-4" />
                <span className="font-medium hidden sm:inline">Partners</span>
              </button>
            </Link>

            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer"
              data-testid="button-investors"
            >
              <Wallet className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">Investors</span>
            </button>
            
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer group">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                   <span className="font-mono font-medium">Verified On-Chain</span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 backdrop-blur-2xl border-white/10 max-w-sm">
                 <div className="flex flex-col items-center text-center p-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">
                      <QrCode className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-serif font-medium mb-2 text-white">Blockchain Verified</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      This build is cryptographically signed and immutable.
                    </p>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                      <QRCodeSVG value="https://explorer.zenith.chain/tx/0x9a...2b1" size={150} fgColor="#10b981" bgColor="transparent" />
                    </div>

                    <div className="w-full space-y-2 font-mono text-xs">
                       <div className="flex justify-between">
                         <span className="text-muted-foreground">Contract:</span>
                         <span className="text-emerald-400">0x71C...9A23</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-muted-foreground">Block:</span>
                         <span className="text-white">#8,921,042</span>
                       </div>
                    </div>

                    <button className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors">
                      <ExternalLink className="w-4 h-4" /> View in Explorer
                    </button>
                 </div>
              </DialogContent>
            </Dialog>
         </div>
      </footer>
    </div>
  );
}
