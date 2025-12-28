import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Brain, Scroll, Sparkles } from "lucide-react";

export default function Wisdom() {
  return (
    <Shell>
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-medium mb-2">Ancient Wisdom, Modern Science</h1>
        <p className="text-muted-foreground">Bridging the gap between empirical data and holistic understanding.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Western Perspective */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-blue-500/20 rounded-xl">
                 <Brain className="w-6 h-6 text-blue-400" />
               </div>
               <h2 className="text-2xl font-serif">Western Science</h2>
             </div>
             
             <div className="space-y-6">
               <div className="p-4 rounded-xl bg-white/5 border-l-2 border-blue-500">
                 <h3 className="font-bold text-lg mb-2">Cortisol Regulation</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Chronic stress elevates cortisol levels, leading to inflammation, sleep disruption, and potential weight gain. Managing HPA axis dysregulation is key to long-term health.
                 </p>
               </div>

               <div className="p-4 rounded-xl bg-white/5 border-l-2 border-blue-500">
                 <h3 className="font-bold text-lg mb-2">Circadian Biology</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Light exposure controls melatonin production. Viewing morning sunlight within 30 minutes of waking anchors your circadian rhythm for better sleep onset.
                 </p>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Eastern Perspective */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-amber-500/20 rounded-xl">
                 <Scroll className="w-6 h-6 text-amber-400" />
               </div>
               <h2 className="text-2xl font-serif">Eastern Wisdom</h2>
             </div>
             
             <div className="space-y-6">
               <div className="p-4 rounded-xl bg-white/5 border-l-2 border-amber-500">
                 <h3 className="font-bold text-lg mb-2">Qi Stagnation</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   When energy flow (Qi) is blocked by stress or emotion, it manifests as physical tension and pain. Smooth flow of Qi ensures vitality and emotional balance.
                 </p>
               </div>

               <div className="p-4 rounded-xl bg-white/5 border-l-2 border-amber-500">
                 <h3 className="font-bold text-lg mb-2">Yin & Yang Balance</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Health is the dynamic balance of opposing forces. Day (Yang) is for activity; Night (Yin) is for restoration. Disregarding this rhythm depletes your Jing (essence).
                 </p>
               </div>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 p-8 rounded-3xl glass-card text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-medium mb-2">The Synthesis</h3>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          "Stress" and "Qi Stagnation" describe the same phenomenon through different lenses. By calming the nervous system (Science) through breathwork (Wisdom), we achieve the same goal: Homeostasis.
        </p>
      </div>
    </Shell>
  );
}
