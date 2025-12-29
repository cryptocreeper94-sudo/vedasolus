import { motion } from "framer-motion";
import { Sparkles, Target, Heart, Globe, Lightbulb, Users, Leaf, Zap } from "lucide-react";
import { ScrollArea } from "./scroll-area";

interface MissionStatementProps {
  onClose?: () => void;
}

export function MissionStatement({ onClose }: MissionStatementProps) {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center mb-4 border border-cyan-500/30">
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Our Mission</h2>
          <p className="text-cyan-300/80 text-sm">Dark Wave Studios LLC</p>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-cyan-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Vision</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To create a world where ancient healing wisdom and modern science unite, 
                    empowering every individual to achieve optimal health through personalized, 
                    holistic wellness journeys verified on the blockchain.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-pink-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Core Values</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span><strong className="text-pink-300">Synthesis</strong> — Bridging Eastern wisdom with Western science</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span><strong className="text-cyan-300">Sovereignty</strong> — Your health data belongs to you</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span><strong className="text-emerald-300">Authenticity</strong> — Real practitioners, real results</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      <span><strong className="text-violet-300">Community</strong> — Healing together in tribes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-emerald-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">The Problem We Solve</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Healthcare is fragmented. Your medical records are scattered across systems 
                    you can't access. Ancient healing traditions are dismissed. Modern wellness 
                    apps ignore your unique constitution. VedaSolus changes everything.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-violet-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Our Solution</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <span>Ayurvedic dosha analysis & personalized recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>AI-powered wellness coaching with voice interaction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-pink-400" />
                      <span>Verified practitioner marketplace for holistic care</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-violet-400" />
                      <span>Blockchain-verified health passport & records</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-orange-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Revenue Model</h3>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-xs text-slate-400 mb-1">Seeker</p>
                      <p className="text-lg font-bold text-white">Free</p>
                    </div>
                    <div className="bg-cyan-500/10 rounded-lg p-3 text-center border border-cyan-500/20">
                      <p className="text-xs text-cyan-400 mb-1">Practitioner Path</p>
                      <p className="text-lg font-bold text-white">$9.99<span className="text-xs text-slate-400">/mo</span></p>
                    </div>
                    <div className="bg-pink-500/10 rounded-lg p-3 text-center border border-pink-500/20">
                      <p className="text-xs text-pink-400 mb-1">Healer's Circle</p>
                      <p className="text-lg font-bold text-white">$19.99<span className="text-xs text-slate-400">/mo</span></p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg p-3 text-center border border-violet-500/20">
                      <p className="text-xs text-violet-400 mb-1">Master's Journey</p>
                      <p className="text-lg font-bold text-white">$39.99<span className="text-xs text-slate-400">/mo</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4 pb-2">
              <p className="text-xs text-slate-500 italic">
                "Where ancient wisdom meets modern science, healing finds its true path."
              </p>
              <p className="text-xs text-cyan-400/60 mt-2">— VedaSolus Philosophy</p>
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
