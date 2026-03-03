import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Copy,
  Share2,
  TrendingUp,
  DollarSign,
  Award,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Star,
  Gem,
  Crown,
  Sparkles,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tierColors: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  base: { bg: "bg-slate-500/20", text: "text-slate-300", border: "border-slate-500/30", icon: Star },
  silver: { bg: "bg-zinc-400/20", text: "text-zinc-300", border: "border-zinc-400/30", icon: Award },
  gold: { bg: "bg-amber-500/20", text: "text-amber-300", border: "border-amber-500/30", icon: TrendingUp },
  platinum: { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/30", icon: Gem },
  diamond: { bg: "bg-violet-500/20", text: "text-violet-300", border: "border-violet-500/30", icon: Crown },
};

export default function AffiliateDashboard() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["/api/affiliate/dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/affiliate/dashboard", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const payoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/affiliate/request-payout", {
        method: "POST",
        credentials: "include",
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({ title: "Payout Requested", description: `${data.amount} SIG processing` });
      } else {
        toast({ title: "Cannot Process", description: data.error, variant: "destructive" });
      }
    },
  });

  const copyLink = () => {
    if (dashboard?.referralLink) {
      navigator.clipboard.writeText(dashboard.referralLink);
      setCopied(true);
      toast({ title: "Link Copied", description: "Your referral link is on your clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLink = () => {
    if (dashboard?.referralLink && navigator.share) {
      navigator.share({
        title: "Join me on VedaSolus",
        text: "Join me on VedaSolus — part of the Trust Layer ecosystem!",
        url: dashboard.referralLink,
      });
    } else {
      copyLink();
    }
  };

  if (!isAuthenticated) {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Shield className="w-16 h-16 text-cyan-400/40 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-slate-400">Sign in to access the Share & Earn program</p>
        </div>
      </Shell>
    );
  }

  if (isLoading) {
    return (
      <Shell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      </Shell>
    );
  }

  const tier = dashboard?.tier || "base";
  const tierStyle = tierColors[tier] || tierColors.base;
  const TierIcon = tierStyle.icon;

  return (
    <Shell>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${tierStyle.bg} flex items-center justify-center border ${tierStyle.border}`}>
            <TierIcon className={`w-7 h-7 ${tierStyle.text}`} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white">Share & Earn</h1>
            <p className="text-slate-400">Earn SIG across all 32 Trust Layer apps with one link</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Referrals", value: dashboard?.stats?.totalReferrals || 0, icon: Users, color: "cyan" },
          { label: "Converted", value: dashboard?.stats?.convertedReferrals || 0, icon: CheckCircle, color: "emerald" },
          { label: "Pending Earnings", value: `${dashboard?.stats?.pendingEarnings || "0.00"} SIG`, icon: Clock, color: "pink" },
          { label: "Paid Earnings", value: `${dashboard?.stats?.paidEarnings || "0.00"} SIG`, icon: DollarSign, color: "violet" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className={`p-2 rounded-xl w-fit mb-3 ${
              stat.color === "cyan" ? "bg-cyan-500/20" :
              stat.color === "emerald" ? "bg-emerald-500/20" :
              stat.color === "pink" ? "bg-pink-500/20" : "bg-violet-500/20"
            }`}>
              <stat.icon className={`w-5 h-5 ${
                stat.color === "cyan" ? "text-cyan-400" :
                stat.color === "emerald" ? "text-emerald-400" :
                stat.color === "pink" ? "text-pink-400" : "text-violet-400"
              }`} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <BentoGrid>
        <BentoCard colSpan={2} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-cyan-400" /> Your Referral Link
          </h3>
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 mb-4">
            <p className="text-sm text-cyan-300 font-mono break-all" data-testid="text-referral-link">
              {dashboard?.referralLink || "Loading..."}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={copyLink}
              className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30"
              data-testid="button-copy-link"
            >
              {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              onClick={shareLink}
              className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30"
              data-testid="button-share-link"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-3">Your link works across all 32 Trust Layer ecosystem apps</p>
        </BentoCard>

        <BentoCard className={`bg-gradient-to-br ${tier === "diamond" ? "from-violet-500/10 to-pink-500/5 border-violet-500/20" : "from-emerald-500/10 to-cyan-500/5 border-emerald-500/20"}`}>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <TierIcon className={`w-5 h-5 ${tierStyle.text}`} /> Your Tier
          </h3>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${tierStyle.bg} border ${tierStyle.border} mb-4`}>
            <TierIcon className={`w-4 h-4 ${tierStyle.text}`} />
            <span className={`text-sm font-bold capitalize ${tierStyle.text}`}>{tier}</span>
            <span className={`text-xs ${tierStyle.text}`}>{(dashboard?.tierRate * 100).toFixed(1)}%</span>
          </div>
          {dashboard?.nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>{dashboard.stats.convertedReferrals} converted</span>
                <span>{dashboard.nextTier.referralsNeeded} more to {dashboard.nextTier.name}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all"
                  style={{
                    width: `${Math.min(100, (dashboard.stats.convertedReferrals / (dashboard.stats.convertedReferrals + dashboard.nextTier.referralsNeeded)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
          {!dashboard?.nextTier && (
            <p className="text-xs text-emerald-400">Maximum tier reached!</p>
          )}
        </BentoCard>

        <BentoCard colSpan={3} className="bg-gradient-to-br from-pink-500/10 to-orange-500/5 border-pink-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-pink-400" /> Commission Tiers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(dashboard?.tiers || []).map((t: any) => {
              const style = tierColors[t.name] || tierColors.base;
              const Icon = style.icon;
              return (
                <div
                  key={t.name}
                  className={`p-3 rounded-xl text-center border ${t.active ? style.border + " " + style.bg : "border-white/5 bg-white/5"}`}
                  data-testid={`tier-${t.name}`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${t.active ? style.text : "text-slate-500"}`} />
                  <p className={`text-xs font-bold capitalize ${t.active ? style.text : "text-slate-500"}`}>{t.name}</p>
                  <p className={`text-lg font-bold ${t.active ? "text-white" : "text-slate-600"}`}>{(t.rate * 100).toFixed(1)}%</p>
                  <p className="text-[10px] text-slate-500">{t.minReferrals}+ referrals</p>
                </div>
              );
            })}
          </div>
        </BentoCard>

        <BentoCard colSpan={2} className="bg-gradient-to-br from-violet-500/10 to-indigo-500/5 border-violet-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-violet-400" /> Recent Referrals
          </h3>
          {(!dashboard?.referrals || dashboard.referrals.length === 0) ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No referrals yet. Share your link to get started!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {dashboard.referrals.slice(0, 10).map((r: any) => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2">
                    {r.status === "converted" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="text-sm text-slate-300">{r.platform}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    r.status === "converted" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-emerald-400" /> Payout
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="text-3xl font-bold text-emerald-400">{dashboard?.stats?.pendingEarnings || "0.00"}</p>
              <p className="text-xs text-slate-400">SIG Available</p>
            </div>
            <Button
              onClick={() => payoutMutation.mutate()}
              disabled={payoutMutation.isPending || parseFloat(dashboard?.stats?.pendingEarnings || "0") < 10}
              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 disabled:opacity-40"
              data-testid="button-request-payout"
            >
              {payoutMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <DollarSign className="w-4 h-4 mr-2" />
              )}
              Request Payout
            </Button>
            <p className="text-[10px] text-slate-500 text-center">Minimum 10 SIG required. Payouts processed within 48 hours.</p>
          </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
