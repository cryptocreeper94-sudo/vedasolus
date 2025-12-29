import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { partnerOnboardingSlides } from "@shared/onboarding-content";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Building2,
  Activity,
  Heart,
  Brain,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock,
  Settings,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

const PARTNER_PINS: Record<string, { name: string; role: string }> = {
  "0424": { name: "Jason", role: "Founder/Developer" },
  "4444": { name: "Sidonie", role: "Partner/Co-Owner" },
};

const iconMap: Record<string, any> = {
  Sparkles, Globe, Zap, DollarSign, Shield, Heart, Brain, Activity, Building2, Users, CheckCircle
};

const onboardingSlides = partnerOnboardingSlides.map(slide => ({
  ...slide,
  icon: iconMap[slide.iconName] || Sparkles,
}));

export default function PartnerDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [partnerInfo, setPartnerInfo] = useState<{ name: string; role: string } | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("partner_auth");
    const hasSeenOnboarding = localStorage.getItem("partner_onboarding_seen");
    if (savedAuth) {
      const info = PARTNER_PINS[savedAuth];
      if (info) {
        setIsAuthenticated(true);
        setPartnerInfo(info);
        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        }
      }
    }
  }, []);

  const { data: orbitStatus } = useQuery({
    queryKey: ["/api/orbit/status"],
    queryFn: async () => {
      const res = await fetch("/api/orbit/status");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const handleLogin = () => {
    const info = PARTNER_PINS[pin];
    if (info) {
      setIsAuthenticated(true);
      setPartnerInfo(info);
      sessionStorage.setItem("partner_auth", pin);
      const hasSeenOnboarding = localStorage.getItem("partner_onboarding_seen");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("partner_onboarding_seen", "true");
  };

  const handleChangePin = () => {
    if (newPin.length !== 4 || confirmPin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }
    if (newPin !== confirmPin) {
      setError("PINs do not match");
      return;
    }
    setShowChangePin(false);
    setNewPin("");
    setConfirmPin("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-white mb-2">Partner Access</h1>
              <p className="text-slate-400 text-sm">Enter your PIN to access the partner dashboard</p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                maxLength={4}
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="text-center text-2xl tracking-widest bg-white/5 border-white/10 h-14"
                data-testid="input-partner-pin"
              />
              
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <Button 
                onClick={handleLogin} 
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
                data-testid="button-partner-login"
              >
                Access Dashboard
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/40 px-2 text-slate-500">or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-white/10 hover:bg-white/5"
                data-testid="button-google-login"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <Shell>
      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-lg bg-slate-950/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-6"
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center border ${
                  onboardingSlides[currentSlide].color === "cyan" ? "bg-cyan-500/20 border-cyan-500/30" :
                  onboardingSlides[currentSlide].color === "violet" ? "bg-violet-500/20 border-violet-500/30" :
                  onboardingSlides[currentSlide].color === "emerald" ? "bg-emerald-500/20 border-emerald-500/30" :
                  onboardingSlides[currentSlide].color === "pink" ? "bg-pink-500/20 border-pink-500/30" :
                  "bg-orange-500/20 border-orange-500/30"
                }`}>
                  {(() => {
                    const Icon = onboardingSlides[currentSlide].icon;
                    return <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      onboardingSlides[currentSlide].color === "cyan" ? "text-cyan-400" :
                      onboardingSlides[currentSlide].color === "violet" ? "text-violet-400" :
                      onboardingSlides[currentSlide].color === "emerald" ? "text-emerald-400" :
                      onboardingSlides[currentSlide].color === "pink" ? "text-pink-400" :
                      "text-orange-400"
                    }`} />;
                  })()}
                </div>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 mb-2">
                  {onboardingSlides[currentSlide].subtitle}
                </p>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                  {onboardingSlides[currentSlide].title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed px-2">
                  {onboardingSlides[currentSlide].content}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-4">
                {onboardingSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentSlide ? "w-6 bg-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="text-slate-400 text-sm px-2 sm:px-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                
                {currentSlide === onboardingSlides.length - 1 ? (
                  <Button
                    onClick={handleCloseOnboarding}
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 text-sm px-3 sm:px-4"
                    data-testid="button-start-dashboard"
                  >
                    Enter Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentSlide(currentSlide + 1)}
                    className="bg-white/10 hover:bg-white/20 text-sm px-3 sm:px-4"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Change PIN Modal */}
      <Dialog open={showChangePin} onOpenChange={setShowChangePin}>
        <DialogContent className="bg-slate-950/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Change Your PIN</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">New PIN</label>
              <Input
                type="password"
                maxLength={4}
                placeholder="Enter new 4-digit PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
                className="text-center text-xl tracking-widest bg-white/5 border-white/10"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Confirm PIN</label>
              <Input
                type="password"
                maxLength={4}
                placeholder="Confirm new PIN"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                className="text-center text-xl tracking-widest bg-white/5 border-white/10"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button onClick={handleChangePin} className="w-full bg-cyan-500 hover:bg-cyan-600">
              Update PIN
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
              {partnerInfo?.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Welcome, {partnerInfo?.name}</h1>
              <p className="text-violet-300/70">{partnerInfo?.role} • Partner Dashboard</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChangePin(true)}
            className="border-white/10"
            data-testid="button-change-pin"
          >
            <Settings className="w-4 h-4 mr-2" /> Change PIN
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Users", value: "1,247", change: "+12%", icon: Users, color: "cyan" },
          { label: "Monthly Revenue", value: "$4,890", change: "+8%", icon: DollarSign, color: "emerald" },
          { label: "Your Royalty", value: "$2,445", change: "50%", icon: TrendingUp, color: "pink" },
          { label: "Orbit Status", value: orbitStatus?.connected ? "Connected" : "Checking...", icon: Building2, color: "violet" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-xl ${
                stat.color === "cyan" ? "bg-cyan-500/20" :
                stat.color === "emerald" ? "bg-emerald-500/20" :
                stat.color === "pink" ? "bg-pink-500/20" :
                "bg-violet-500/20"
              }`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === "cyan" ? "text-cyan-400" :
                  stat.color === "emerald" ? "text-emerald-400" :
                  stat.color === "pink" ? "text-pink-400" :
                  "text-violet-400"
                }`} />
              </div>
              {stat.change && (
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <BentoGrid>
        <BentoCard colSpan={2} className="bg-gradient-to-br from-violet-500/10 to-pink-500/5 border-violet-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-violet-400" /> Business Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
              <span className="text-slate-300">Total Subscribers</span>
              <span className="font-bold text-white">892</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
              <span className="text-slate-300">Conversion Rate</span>
              <span className="font-bold text-emerald-400">12.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
              <span className="text-slate-300">Avg Revenue/User</span>
              <span className="font-bold text-cyan-400">$5.48</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
              <span className="text-slate-300">Churn Rate</span>
              <span className="font-bold text-orange-400">2.3%</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border-emerald-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Royalty Split
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">J</div>
              <div className="flex-1">
                <p className="text-sm text-white">Jason Andrews</p>
                <p className="text-xs text-slate-400">50% share</p>
              </div>
              <span className="font-mono text-cyan-400">$2,445</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold">S</div>
              <div className="flex-1">
                <p className="text-sm text-white">Sidonie Summers</p>
                <p className="text-xs text-slate-400">50% share</p>
              </div>
              <span className="font-mono text-pink-400">$2,445</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard colSpan={2} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-cyan-400" /> Orbit Staffing Status
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-white">Financial Hub</p>
              <p className="text-xs text-emerald-400">Connected</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-white">Ecosystem Hub</p>
              <p className="text-xs text-emerald-400">Synced</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-white">Payroll</p>
              <p className="text-xs text-emerald-400">Active</p>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border-pink-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-pink-400" /> Platform Health
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Uptime</span>
              <span className="text-emerald-400">99.9%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">API Latency</span>
              <span className="text-cyan-400">42ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Error Rate</span>
              <span className="text-emerald-400">0.1%</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard colSpan={3} className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-orange-400" /> AI Wellness Coach Performance
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-3xl font-bold text-orange-400">892</p>
              <p className="text-xs text-slate-400">Total Conversations</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-3xl font-bold text-cyan-400">94%</p>
              <p className="text-xs text-slate-400">Satisfaction Rate</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-3xl font-bold text-emerald-400">4.2</p>
              <p className="text-xs text-slate-400">Avg Messages/Session</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-3xl font-bold text-pink-400">78%</p>
              <p className="text-xs text-slate-400">Voice Enabled</p>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
