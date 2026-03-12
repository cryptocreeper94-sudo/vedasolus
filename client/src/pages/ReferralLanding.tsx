import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shield, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReferralLanding() {
  const params = useParams<{ hash: string }>();
  const [, navigate] = useLocation();
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (params.hash && !tracked) {
      fetch("/api/affiliate/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralHash: params.hash, platform: "vedasolus" }),
      })
        .then(() => setTracked(true))
        .catch(() => setTracked(true));

      localStorage.setItem("vedasolus_referral", params.hash);
    }
  }, [params.hash, tracked]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
            <Sparkles className="w-10 h-10 text-cyan-400" />
          </div>

          <h1 className="text-3xl font-serif font-bold text-white mb-3">Welcome to VedaSolus</h1>
          <p className="text-slate-400 mb-2">Ancient wisdom meets modern science</p>
          <p className="text-sm text-cyan-400/70 mb-8">Part of the Trust Layer 32-app ecosystem</p>

          {!tracked && (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Setting up your referral...</span>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/")}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
              data-testid="button-explore-app"
            >
              Explore VedaSolus
            </Button>
            <div className="flex items-center gap-2 justify-center text-xs text-slate-500 mt-4">
              <Shield className="w-3 h-3" />
              <span>Verified Trust Layer Ecosystem App</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
