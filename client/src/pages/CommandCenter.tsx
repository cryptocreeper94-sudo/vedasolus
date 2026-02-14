import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Monitor,
  Search,
  Megaphone,
  Mail,
  Share2,
  DollarSign,
  CreditCard,
  Building2,
  Moon,
  Utensils,
  Activity,
  Wind,
  Brain,
  Users,
  MessageCircle,
  Store,
  Fingerprint,
  Sprout,
  FileText,
  Settings,
  BookOpen,
  Library,
  Briefcase,
  Code,
  Handshake,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  Heart,
  ExternalLink,
} from "lucide-react";
import logoImage from "@assets/Copilot_20251228_214224_1766980581672.png";
import bgImage from "@assets/generated_images/dark_ethereal_fluid_gradient_background_with_glowing_particles.png";

interface CardItem {
  title: string;
  description: string;
  icon: any;
  path?: string;
  external?: string;
  toast?: string;
}

interface Category {
  title: string;
  description: string;
  icon: any;
  gradient: string;
  cardGradient: string;
  glowColor: string;
  cards: CardItem[];
}

const categories: Category[] = [
  {
    title: "Analytics & Insights",
    description: "Track performance, traffic, and SEO health",
    icon: BarChart3,
    gradient: "from-cyan-500 to-blue-500",
    cardGradient: "from-cyan-500/15 to-blue-500/10",
    glowColor: "cyan",
    cards: [
      { title: "Analytics Dashboard", description: "Traffic, users, and conversion metrics", icon: BarChart3, path: "/developer" },
      { title: "System Dashboard", description: "Server health and performance stats", icon: Monitor, path: "/developer" },
      { title: "SEO Manager", description: "Manage meta tags and search rankings", icon: Search, path: "/developer" },
    ],
  },
  {
    title: "Marketing & Growth",
    description: "Campaigns, newsletters, and social presence",
    icon: Megaphone,
    gradient: "from-purple-500 to-pink-500",
    cardGradient: "from-purple-500/15 to-pink-500/10",
    glowColor: "purple",
    cards: [
      { title: "Marketing Hub", description: "Campaign management and analytics", icon: Megaphone, toast: "Planned" },
      { title: "Newsletter", description: "Email campaigns and subscriber management", icon: Mail, toast: "Planned" },
      { title: "Social Media", description: "Social scheduling and engagement", icon: Share2, toast: "Planned" },
    ],
  },
  {
    title: "Revenue & Monetization",
    description: "Subscriptions, payments, and financial tools",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-500",
    cardGradient: "from-green-500/15 to-emerald-500/10",
    glowColor: "emerald",
    cards: [
      { title: "Subscription Tiers", description: "Manage pricing plans and features", icon: CreditCard, path: "/settings" },
      { title: "Stripe Dashboard", description: "Payment processing and invoices", icon: DollarSign, external: "https://dashboard.stripe.com" },
      { title: "Orbit Financial", description: "Payroll, invoicing, and financial hub", icon: Building2, external: "https://orbitstaffing.replit.app" },
    ],
  },
  {
    title: "Health & Wellness Suite",
    description: "Core health tracking and AI coaching tools",
    icon: Heart,
    gradient: "from-orange-500 to-red-500",
    cardGradient: "from-orange-500/15 to-red-500/10",
    glowColor: "orange",
    cards: [
      { title: "Sleep Tracker", description: "Monitor sleep patterns and quality", icon: Moon, path: "/sleep" },
      { title: "Nutrition Log", description: "Track meals and nutritional intake", icon: Utensils, path: "/diet" },
      { title: "Exercise Log", description: "Log workouts and activity goals", icon: Activity, path: "/exercise" },
      { title: "Meditation", description: "Guided meditation and mindfulness", icon: Wind, path: "/meditation" },
      { title: "AI Wellness Coach", description: "Chat with your AI health assistant", icon: Brain, path: "/", toast: "Open the chat widget on the dashboard" },
    ],
  },
  {
    title: "Community & Engagement",
    description: "Connect with users and practitioners",
    icon: Users,
    gradient: "from-blue-500 to-indigo-500",
    cardGradient: "from-blue-500/15 to-indigo-500/10",
    glowColor: "blue",
    cards: [
      { title: "Community Tribes", description: "Group discussions and wellness circles", icon: Users, path: "/community" },
      { title: "Messages", description: "Direct messaging and notifications", icon: MessageCircle, path: "/messages" },
      { title: "Practitioner Marketplace", description: "Browse and book wellness experts", icon: Store, path: "/marketplace" },
    ],
  },
  {
    title: "User Management",
    description: "Profiles, records, and user settings",
    icon: Fingerprint,
    gradient: "from-teal-500 to-cyan-500",
    cardGradient: "from-teal-500/15 to-cyan-500/10",
    glowColor: "teal",
    cards: [
      { title: "Health Passport", description: "Portable health identity and QR codes", icon: Fingerprint, path: "/passport" },
      { title: "Ayurveda Profile", description: "Dosha analysis and recommendations", icon: Sprout, path: "/ayurveda" },
      { title: "Health Records", description: "Medical history and documents", icon: FileText, path: "/records" },
      { title: "Settings", description: "Account preferences and configuration", icon: Settings, path: "/settings" },
    ],
  },
  {
    title: "Education & Content",
    description: "Knowledge base, courses, and resources",
    icon: BookOpen,
    gradient: "from-rose-500 to-pink-500",
    cardGradient: "from-rose-500/15 to-pink-500/10",
    glowColor: "rose",
    cards: [
      { title: "Wisdom Library", description: "Curated wellness insights and articles", icon: BookOpen, path: "/wisdom" },
      { title: "Education Library", description: "Courses, guides, and learning paths", icon: Library, path: "/library" },
      { title: "Business Plan", description: "Strategic roadmap and milestones", icon: Briefcase, path: "/business-plan" },
    ],
  },
  {
    title: "Platform & Development",
    description: "Developer tools, admin access, and integrations",
    icon: Code,
    gradient: "from-slate-500 to-zinc-500",
    cardGradient: "from-slate-500/15 to-zinc-500/10",
    glowColor: "slate",
    cards: [
      { title: "Developer Core", description: "Roadmap, APIs, and system config", icon: Code, path: "/developer" },
      { title: "Partner Portal", description: "Partner dashboard and analytics", icon: Handshake, path: "/partner" },
      { title: "Admin Dashboard", description: "User management and platform controls", icon: ShieldAlert, path: "/admin" },
    ],
  },
];

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (pin === "0424") {
      onUnlock();
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl" data-testid="card-pin-gate">
          <div className="text-center mb-8">
            <img src={logoImage} alt="VedaSolus" className="h-20 w-auto mx-auto mb-4 object-contain" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
              <LayoutDashboard className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-2" data-testid="text-pin-title">Command Center</h1>
            <p className="text-slate-400 text-sm">Enter your PIN to access the admin dashboard</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ""));
                setError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full text-center text-2xl tracking-widest bg-white/5 border border-white/10 rounded-xl h-14 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-colors"
              data-testid="input-command-pin"
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm text-center"
                  data-testid="text-pin-error"
                >
                  Invalid PIN. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold transition-all"
              data-testid="button-access-command"
            >
              Access Command Center
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ card, glowColor }: { card: CardItem; glowColor: string; cardGradient: string }) {
  const [, setLocation] = useLocation();

  const glowMap: Record<string, string> = {
    cyan: "hover:shadow-cyan-500/20 hover:border-cyan-500/30",
    purple: "hover:shadow-purple-500/20 hover:border-purple-500/30",
    emerald: "hover:shadow-emerald-500/20 hover:border-emerald-500/30",
    orange: "hover:shadow-orange-500/20 hover:border-orange-500/30",
    blue: "hover:shadow-blue-500/20 hover:border-blue-500/30",
    teal: "hover:shadow-teal-500/20 hover:border-teal-500/30",
    rose: "hover:shadow-rose-500/20 hover:border-rose-500/30",
    slate: "hover:shadow-slate-500/20 hover:border-slate-500/30",
  };

  const iconColorMap: Record<string, string> = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    emerald: "text-emerald-400",
    orange: "text-orange-400",
    blue: "text-blue-400",
    teal: "text-teal-400",
    rose: "text-rose-400",
    slate: "text-slate-400",
  };

  const isPlanned = card.toast && !card.path;

  const handleClick = () => {
    if (isPlanned) return;
    if (card.toast && card.path) {
      setLocation(card.path);
      return;
    }
    if (card.external) {
      window.open(card.external, "_blank", "noopener,noreferrer");
      return;
    }
    if (card.path) {
      setLocation(card.path);
    }
  };

  const Icon = card.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`flex-shrink-0 w-[280px] sm:w-[300px] h-[200px] rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-5 ${isPlanned ? "cursor-default opacity-60" : "cursor-pointer"} transition-all duration-300 hover:shadow-xl ${glowMap[glowColor] || ""} flex flex-col justify-between group`}
      data-testid={`card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center border border-white/10`}>
            <Icon className={`w-5 h-5 ${iconColorMap[glowColor] || "text-white"}`} />
          </div>
          {card.external && <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />}
        </div>
        <h4 className="text-white font-semibold text-sm mb-1">{card.title}</h4>
        <p className="text-slate-400 text-xs leading-relaxed">{card.description}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
        <span>{card.external ? "Open external" : card.toast && !card.path ? "Planned" : "Navigate"}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </div>
    </motion.div>
  );
}

export default function CommandCenter() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <PinGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-transparent to-background/90 pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="p-2 rounded-xl hover:bg-white/10 transition-colors" data-testid="button-back-home">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white hidden sm:block" data-testid="text-command-center-title">Command Center</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300" data-testid="text-welcome-greeting">Welcome, Jason</span>
          <button
            onClick={() => setIsUnlocked(false)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            data-testid="button-logout-command"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2" data-testid="text-dashboard-heading">Mission Control</h2>
          <p className="text-slate-400 text-sm sm:text-base">Manage every aspect of VedaSolus from one place</p>
        </motion.div>

        <div className="space-y-10">
          {categories.map((category, catIdx) => {
            const CatIcon = category.icon;
            return (
              <motion.section
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.05 }}
                data-testid={`section-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                    <CatIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    <p className="text-xs text-slate-400">{category.description}</p>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent -mx-1 px-1">
                  {category.cards.map((card) => (
                    <FeatureCard
                      key={card.title}
                      card={card}
                      glowColor={category.glowColor}
                      cardGradient={category.cardGradient}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
