import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Activity, Leaf, Moon, Sun, Wind, ArrowUpRight, Heart, Brain, Utensils } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

export default function Home() {
  return (
    <Shell>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-end"
      >
        <div>
          <h2 className="text-muted-foreground font-medium mb-1 tracking-wider uppercase text-xs">Dec 28, 2025</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground">
            Good Evening, <span className="text-primary italic">Alex</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium">System Optimal</span>
        </div>
      </motion.div>

      <BentoGrid>
        {/* Main Health Score */}
        <BentoCard colSpan={2} rowSpan={2} className="relative overflow-visible">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Vitality Score
              </h3>
              <p className="text-5xl font-serif mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                92<span className="text-xl align-top opacity-50">%</span>
              </p>
            </div>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="h-[200px] w-full mt-auto -mb-6 -mx-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Daily Wisdom - Eastern */}
        <BentoCard className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/20">
          <div className="flex flex-col h-full justify-center text-center p-2">
            <Wind className="w-8 h-8 text-indigo-400 mx-auto mb-4 opacity-80" />
            <h4 className="text-sm uppercase tracking-widest text-indigo-300 mb-2">Daily Qi</h4>
            <p className="font-serif italic text-xl leading-relaxed text-indigo-100">
              "Tension is who you think you should be. Relaxation is who you are."
            </p>
            <p className="text-xs text-indigo-400 mt-4">— Chinese Proverb</p>
          </div>
        </BentoCard>

        {/* Sleep Metric */}
        <BentoCard className="relative group">
          <div className="flex justify-between items-start">
            <h3 className="text-muted-foreground font-medium flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" /> Sleep
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300">Optimal</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">7</span>
              <span className="text-lg text-muted-foreground">h</span>
              <span className="text-3xl font-bold text-foreground ml-2">42</span>
              <span className="text-lg text-muted-foreground">m</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[85%]" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Rem Cycle: 23% (High)</p>
          </div>
        </BentoCard>

        {/* Quick Diet */}
        <BentoCard>
          <div className="flex justify-between items-start mb-4">
             <h3 className="text-muted-foreground font-medium flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-400" /> Nutrition
            </h3>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Sun className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Breakfast</p>
                    <p className="text-xs text-muted-foreground">Oatmeal & Berries</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-green-400">320 kcal</span>
             </div>
             
             <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lunch</p>
                    <p className="text-xs text-muted-foreground">Logged 12:30 PM</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-green-400">540 kcal</span>
             </div>
          </div>
        </BentoCard>

        {/* Quick Action - Meditate */}
        <BentoCard className="cursor-pointer bg-primary/5 hover:bg-primary/10 border-primary/20">
           <div className="h-full flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium text-primary">Start Meditation</p>
              <span className="text-xs text-primary/60">15 min • Mindfulness</span>
           </div>
        </BentoCard>

        {/* Heart Rate */}
        <BentoCard>
          <div className="flex justify-between items-start">
            <h3 className="text-muted-foreground font-medium flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" /> Resting HR
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-24 h-24 rounded-full border-4 border-rose-500/20 animate-ping absolute" />
               <div className="w-20 h-20 rounded-full border-4 border-rose-500/40" />
             </div>
             <div className="relative z-10 text-center">
                <span className="text-4xl font-bold text-rose-100">58</span>
                <span className="text-xs block text-rose-400/80 uppercase tracking-widest">BPM</span>
             </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
