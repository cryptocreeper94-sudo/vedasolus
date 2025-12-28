import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Activity, Play, Timer, TrendingUp, Flame, Wind } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";

const activityData = [
  { name: "Mon", steps: 6000, active: 45 },
  { name: "Tue", steps: 8500, active: 60 },
  { name: "Wed", steps: 7000, active: 50 },
  { name: "Thu", steps: 10000, active: 80 },
  { name: "Fri", steps: 5000, active: 30 },
  { name: "Sat", steps: 12000, active: 120 },
  { name: "Sun", steps: 9000, active: 75 },
];

export default function Exercise() {
  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <h1 className="text-4xl font-serif font-medium mb-2">Movement</h1>
        <p className="text-muted-foreground">Flowing water never stagnates. Keep the Qi moving.</p>
      </div>

      <BentoGrid>
        {/* Weekly Activity Chart */}
        <BentoCard colSpan={2} rowSpan={2} className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Weekly Flow
            </h3>
            <div className="flex gap-2">
               <span className="text-xs px-2 py-1 bg-white/5 rounded-full">Steps</span>
               <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">Active Min</span>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} barGap={8}>
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none' }}
                />
                <Bar dataKey="steps" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.3} yAxisId="left" />
                <Bar dataKey="active" fill="#10b981" radius={[4, 4, 0, 0]} yAxisId="right">
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={index === 3 ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Current Status */}
        <BentoCard>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-orange-500/20 rounded-full">
               <Flame className="w-6 h-6 text-orange-400" />
             </div>
             <div>
               <p className="text-sm text-muted-foreground">Calories Burned</p>
               <p className="text-2xl font-bold">482 <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
             </div>
          </div>
          <div className="space-y-4">
             <div className="bg-white/5 p-3 rounded-xl flex justify-between items-center">
                <span className="text-sm">Walking</span>
                <span className="text-sm font-mono text-orange-300">124 kcal</span>
             </div>
             <div className="bg-white/5 p-3 rounded-xl flex justify-between items-center">
                <span className="text-sm">Yoga Flow</span>
                <span className="text-sm font-mono text-orange-300">210 kcal</span>
             </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20">
           <h3 className="text-emerald-300 font-medium mb-4 flex items-center gap-2">
             <Wind className="w-4 h-4" /> Qi Gong
           </h3>
           <p className="text-sm text-emerald-100/70 mb-6">
             The 8 Brocades sequence is recommended for today to clear liver stagnation.
           </p>
           <button className="w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl flex items-center justify-center gap-2 transition-colors">
             <Play className="w-4 h-4 fill-current" /> Start Session
           </button>
        </BentoCard>

        {/* Recent Workouts */}
        <BentoCard colSpan={3}>
           <h3 className="text-lg font-medium mb-4">Recent Sessions</h3>
           <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Morning Vinyasa", time: "45 min", intensity: "Moderate", date: "Today, 7:00 AM" },
                { name: "HIIT Cardio", time: "20 min", intensity: "High", date: "Yesterday" },
                { name: "Evening Stretch", time: "15 min", intensity: "Low", date: "Yesterday" },
              ].map((workout, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-white/10">
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-medium">{workout.name}</span>
                     <Activity className="w-4 h-4 text-muted-foreground" />
                   </div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                     <Timer className="w-3 h-3" /> {workout.time}
                   </div>
                   <div className="flex justify-between items-center mt-auto">
                     <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{workout.intensity}</span>
                     <span className="text-xs opacity-50">{workout.date}</span>
                   </div>
                </div>
              ))}
           </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
