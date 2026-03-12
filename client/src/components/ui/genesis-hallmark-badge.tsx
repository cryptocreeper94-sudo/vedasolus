import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, ExternalLink, CheckCircle, Copy, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function GenesisHallmarkBadge() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: genesis } = useQuery({
    queryKey: ["/api/hallmark/genesis"],
    queryFn: async () => {
      const res = await fetch("/api/hallmark/genesis");
      if (!res.ok) return null;
      return res.json();
    },
  });

  if (!genesis) return null;

  const metadata = genesis.metadata as Record<string, any> || {};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all cursor-pointer group"
        data-testid="button-genesis-hallmark"
      >
        <Shield className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-medium text-cyan-300">Genesis Hallmark</span>
        <span className="text-xs font-mono text-cyan-400/70">{genesis.thId}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-lg bg-slate-950/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-xl font-serif font-bold text-white mb-1">Genesis Hallmark</h2>
              <p className="text-lg font-mono text-cyan-400">{genesis.thId}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-2">Application Info</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">App Name</span>
                    <span className="text-sm text-white">{genesis.appName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Product</span>
                    <span className="text-sm text-white">{genesis.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Type</span>
                    <span className="text-sm text-emerald-400 capitalize">{genesis.releaseType}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-2">Blockchain Record</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Data Hash</span>
                    <span className="text-xs font-mono text-cyan-400/70 truncate max-w-[200px]">{genesis.dataHash}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Tx Hash</span>
                    <span className="text-xs font-mono text-violet-400/70 truncate max-w-[200px]">{genesis.txHash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Block Height</span>
                    <span className="text-sm font-mono text-white">{genesis.blockHeight}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400 mb-2">Ecosystem Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Ecosystem</span>
                    <span className="text-sm text-white">{metadata.ecosystem || "Trust Layer"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Chain</span>
                    <span className="text-sm text-white">{metadata.chain || "Trust Layer Blockchain"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Consensus</span>
                    <span className="text-sm text-white">{metadata.consensus || "Proof of Trust"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Operator</span>
                    <span className="text-sm text-white">{metadata.operator || "DarkWave Studios LLC"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Native Asset</span>
                    <span className="text-sm text-cyan-400">{metadata.nativeAsset || "SIG"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Parent Genesis</span>
                    <span className="text-sm font-mono text-violet-400">{metadata.parentGenesis || "TH-00000001"}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-emerald-300">Verified on Trust Layer</p>
                  <p className="text-xs text-emerald-400/70">
                    Created {genesis.createdAt ? new Date(genesis.createdAt).toLocaleDateString() : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
