import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Zap, Star, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface Tier {
  id: string;
  name: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  price?: number;
  features: string[];
  icon: React.ElementType;
  popular?: boolean;
  gradient: string;
}

const tiers: Tier[] = [
  {
    id: "seeker",
    name: "Seeker",
    price: 0,
    features: [
      "Basic health tracking (limited)",
      "Dosha quiz & basic profile",
      "3 meditation sessions",
      "Community access (read-only)",
    ],
    icon: Star,
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    id: "practitioner_path",
    name: "Practitioner Path",
    monthlyPrice: 999,
    yearlyPrice: 7999,
    features: [
      "Unlimited health tracking",
      "Full meditation library",
      "Personalized daily insights",
      "Streak tracking & achievements",
      "Community participation",
      "Health records storage (5 files)",
    ],
    icon: Zap,
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "healers_circle",
    name: "Healer's Circle",
    monthlyPrice: 1999,
    yearlyPrice: 14999,
    features: [
      "Everything in Practitioner Path",
      "Practitioner marketplace access",
      "1 free consultation/month",
      "Priority booking",
      "Unlimited messaging",
      "Blockchain-verified health records",
    ],
    icon: Sparkles,
    popular: true,
    gradient: "from-primary/20 to-emerald-500/10",
  },
  {
    id: "masters_journey",
    name: "Master's Journey",
    monthlyPrice: 3999,
    yearlyPrice: 29999,
    features: [
      "Everything in Healer's Circle",
      "Unlimited practitioner consultations",
      "Personal wellness coach",
      "Custom program creation",
      "Priority support",
      "Family sharing (up to 5)",
    ],
    icon: Crown,
    gradient: "from-pink-500/20 to-purple-500/10",
  },
];

export function SubscriptionTiers() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [loading, setLoading] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async (tierId: string) => {
    if (tierId === "seeker") return;
    
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(tierId);
    try {
      const response = await fetch("/api/subscription/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tier: tierId, billingCycle }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">Choose Your Path</h2>
        <p className="text-muted-foreground mb-6">Select the journey that aligns with your wellness goals</p>
        
        <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-white"
            }`}
            data-testid="button-monthly"
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-white"
            }`}
            data-testid="button-yearly"
          >
            Yearly
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
              Save 33%
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, index) => {
          const price = tier.price !== undefined 
            ? tier.price 
            : billingCycle === "monthly" 
              ? tier.monthlyPrice 
              : tier.yearlyPrice;
          
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-3xl border transition-all hover:scale-[1.02] ${
                tier.popular
                  ? "border-primary/50 bg-gradient-to-br " + tier.gradient
                  : "border-white/10 bg-gradient-to-br " + tier.gradient
              }`}
              data-testid={`tier-${tier.id}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                  tier.popular ? "bg-primary/30" : "bg-white/10"
                }`}>
                  <tier.icon className={`w-6 h-6 ${tier.popular ? "text-primary" : "text-white"}`} />
                </div>
                <h3 className="text-xl font-bold">{tier.name}</h3>
              </div>

              <div className="mb-6">
                {price === 0 ? (
                  <div className="text-3xl font-bold">Free</div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold">${formatPrice(price!)}</span>
                    <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                    {billingCycle === "yearly" && tier.monthlyPrice && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ${formatPrice(tier.yearlyPrice! / 12)}/mo billed annually
                      </p>
                    )}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      tier.popular ? "text-primary" : "text-emerald-400"
                    }`} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading === tier.id || tier.price === 0}
                data-testid={`button-subscribe-${tier.id}`}
                className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  tier.price === 0
                    ? "bg-white/5 text-muted-foreground cursor-default"
                    : tier.popular
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {loading === tier.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : tier.price === 0 ? (
                  "Current Plan"
                ) : (
                  "Subscribe"
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
