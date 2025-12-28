import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  Activity, 
  Utensils, 
  Moon, 
  Brain, 
  Settings, 
  LayoutGrid,
  Sprout,
  Library,
  Fingerprint
} from "lucide-react";
import bgImage from "@assets/generated_images/dark_ethereal_fluid_gradient_background_with_glowing_particles.png";

const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer group",
          isActive 
            ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        )}
      >
        <Icon className={cn("w-6 h-6 mb-1", isActive && "stroke-[2.5px]")} />
        <span className="text-[10px] font-medium tracking-wider uppercase opacity-80">{label}</span>
      </motion.div>
    </Link>
  );
};

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay Gradient for depth */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-transparent to-background/90 pointer-events-none" />

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar Navigation - Glassmorphism */}
        <nav className="hidden md:flex flex-col w-24 h-full glass-panel border-r border-white/5 py-8 px-2 justify-between z-50">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <span className="font-serif text-xl font-bold text-white">Z</span>
            </div>
            
            <div className="flex flex-col space-y-4 w-full">
              <NavItem href="/" icon={LayoutGrid} label="Dash" />
              <NavItem href="/ayurveda" icon={Sprout} label="Ayurveda" />
              <NavItem href="/passport" icon={Fingerprint} label="Passport" />
              <NavItem href="/library" icon={Library} label="Codex" />
              <NavItem href="/diet" icon={Utensils} label="Diet" />
              <NavItem href="/exercise" icon={Activity} label="Move" />
              <NavItem href="/sleep" icon={Moon} label="Sleep" />
              <NavItem href="/wisdom" icon={Brain} label="Wisdom" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <NavItem href="/settings" icon={Settings} label="Config" />
          </div>
        </nav>

        {/* Mobile Navigation - Bottom Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-panel border-t border-white/5 flex items-center justify-around px-4 z-50">
          <NavItem href="/" icon={LayoutGrid} label="Dash" />
          <NavItem href="/passport" icon={Fingerprint} label="ID" />
          <NavItem href="/library" icon={Library} label="Codex" />
          <NavItem href="/ayurveda" icon={Sprout} label="Veda" />
          <NavItem href="/diet" icon={Utensils} label="Diet" />
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-hidden">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
