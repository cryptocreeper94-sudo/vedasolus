import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Moon, Sunrise, Sunset, Radio, CloudRain } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const sleepData = [
  { time: "22:00", depth: 0 },
  { time: "23:00", depth: 20 },
  { time: "00:00", depth: 60 },
  { time: "01:00", depth: 90 },
  { time: "02:00", depth: 40 },
  { time: "03:00", depth: 90 },
  { time: "04:00", depth: 80 },
  { time: "05:00", depth: 20 },
  { time: "06:00", depth: 0 },
];

export default function Sleep() {
  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <h1 className="text-4xl font-serif font-medium mb-2">Restoration</h1>
        <p className="text-muted-foreground">The Yin phase. Where the body repairs and the mind integrates.</p>
      </div>

      <BentoGrid>
        {/* Hypnogram */}
        <BentoCard colSpan={2} rowSpan={2} className="bg-gradient-to-b from-indigo-950/50 to-purple-950/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-400" /> Hypnogram
            </h3>
            <span className="text-2xl font-serif font-bold text-purple-200">92 Sleep Score</span>
          </div>
          <div className="h-[250px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none' }}
                />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Line 
                  type="stepAfter" 
                  dataKey="depth" 
                  stroke="#a78bfa" 
                  strokeWidth={3} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around mt-4 text-xs text-muted-foreground">
             <span>Awake</span>
             <span>REM</span>
             <span>Light</span>
             <span>Deep</span>
          </div>
        </BentoCard>

        {/* Sleep Stages Summary */}
        <BentoCard>
           <h3 className="font-medium mb-4">Sleep Architecture</h3>
           <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-purple-300">Deep Sleep</span>
                  <span>1h 45m</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500 w-[25%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-indigo-300">REM</span>
                  <span>2h 10m</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 w-[35%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-300">Light</span>
                  <span>4h 05m</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[40%]" />
                </div>
              </div>
           </div>
        </BentoCard>

        {/* Environmental Noise */}
        <BentoCard className="bg-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                 <p className="font-medium">Soundscape</p>
                 <p className="text-xs text-muted-foreground">Ambient noise levels</p>
              </div>
           </div>
           <div className="flex items-end justify-between h-24 gap-1">
              {[40, 35, 60, 20, 30, 45, 30, 25, 20, 30].map((h, i) => (
                 <div key={i} style={{height: `${h}%`}} className="w-full bg-white/20 rounded-t-sm" />
              ))}
           </div>
           <p className="text-xs text-center mt-3 text-muted-foreground">Average 32dB (Whisper Quiet)</p>
        </BentoCard>

        {/* Circadian Schedule */}
        <BentoCard colSpan={2}>
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Circadian Rhythm</h3>
              <div className="flex items-center gap-2 text-xs text-orange-300 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                 <Sunrise className="w-3 h-3" />
                 Sunrise: 6:42 AM
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <div className="flex items-center gap-2 text-indigo-300 mb-2">
                   <Sunset className="w-4 h-4" />
                   <span className="text-sm font-medium">Wind Down</span>
                 </div>
                 <p className="text-2xl font-serif">9:30 PM</p>
                 <p className="text-xs text-muted-foreground mt-1">Avoid blue light after this time.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                 <div className="flex items-center gap-2 text-purple-300 mb-2">
                   <Moon className="w-4 h-4" />
                   <span className="text-sm font-medium">Bedtime</span>
                 </div>
                 <p className="text-2xl font-serif">10:30 PM</p>
                 <p className="text-xs text-muted-foreground mt-1">Ideal for hormonal balance.</p>
              </div>
           </div>
        </BentoCard>

        {/* Dream Journal Quick Entry */}
        <BentoCard className="group cursor-text">
           <h3 className="font-medium mb-2 flex items-center gap-2">
              <Radio className="w-4 h-4 text-pink-400" /> Dream Log
           </h3>
           <textarea 
             className="w-full h-24 bg-transparent border-none resize-none text-sm focus:outline-none placeholder:text-muted-foreground/50"
             placeholder="Record fragments of your dreams here..."
           />
           <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-xs bg-white/10 px-3 py-1 rounded-md hover:bg-white/20">Save</button>
           </div>
        </BentoCard>

      </BentoGrid>
    </Shell>
  );
}
