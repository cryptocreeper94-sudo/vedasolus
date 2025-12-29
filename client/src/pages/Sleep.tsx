import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Moon, Sunrise, Sunset, Radio, CloudRain, TrendingUp, Calendar } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, AreaChart, Area } from "recharts";
import { SleepEntryDialog } from "@/components/ui/health-entry-dialogs";
import { useSleepTracking } from "@/hooks/use-health-tracking";
import { useAuth } from "@/hooks/use-auth";

const defaultSleepData = [
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
  const { isAuthenticated } = useAuth();
  const { sleepLogs, isLoading, createSleepLog, isCreating } = useSleepTracking();
  const [dreamNote, setDreamNote] = useState("");

  const handleSleepSubmit = (data: { date: string; hoursSlept: number; quality: number; notes?: string }) => {
    createSleepLog({
      date: data.date,
      hoursSlept: data.hoursSlept,
      quality: data.quality,
      notes: data.notes || null,
      userId: "",
    });
  };

  const averageSleep = sleepLogs.length > 0 
    ? (sleepLogs.reduce((sum, log) => sum + (log.hoursSlept || 0), 0) / sleepLogs.length).toFixed(1)
    : "--";

  const averageQuality = sleepLogs.length > 0
    ? Math.round(sleepLogs.reduce((sum, log) => sum + (log.quality || 0), 0) / sleepLogs.length)
    : 0;

  const weeklyData = sleepLogs.slice(0, 7).reverse().map((log, i) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(log.date).getDay()],
    hours: log.hoursSlept || 0,
    quality: log.quality || 0
  }));

  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Restoration</h1>
          <p className="text-muted-foreground">The Yin phase. Where the body repairs and the mind integrates.</p>
        </div>
        {isAuthenticated && (
          <SleepEntryDialog onSubmit={handleSleepSubmit} isLoading={isCreating} />
        )}
      </div>

      <BentoGrid>
        {/* Hypnogram */}
        <BentoCard colSpan={2} rowSpan={2} className="bg-gradient-to-b from-indigo-950/50 to-purple-950/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-400" /> Hypnogram
            </h3>
            <span className="text-2xl font-serif font-bold text-purple-200">{averageQuality * 20 + 10} Sleep Score</span>
          </div>
          <div className="h-[250px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={defaultSleepData}>
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

        {/* Sleep Stats */}
        <BentoCard className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Sleep</p>
              <p className="text-2xl font-bold">{averageSleep} <span className="text-sm font-normal text-muted-foreground">hours</span></p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {sleepLogs.length > 0 ? `Based on ${sleepLogs.length} nights` : "No sleep data yet"}
          </div>
        </BentoCard>

        {/* Sleep Stages Summary */}
        <BentoCard>
           <h3 className="font-medium mb-4">Sleep Architecture</h3>
           {sleepLogs.length > 0 ? (
             <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-300">Deep Sleep</span>
                    <span>~{Math.round((averageSleep !== "--" ? parseFloat(averageSleep) : 0) * 0.2 * 10) / 10}h</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-[20%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-indigo-300">REM</span>
                    <span>~{Math.round((averageSleep !== "--" ? parseFloat(averageSleep) : 0) * 0.25 * 10) / 10}h</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 w-[25%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-300">Light</span>
                    <span>~{Math.round((averageSleep !== "--" ? parseFloat(averageSleep) : 0) * 0.55 * 10) / 10}h</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-[55%]" />
                  </div>
                </div>
             </div>
           ) : (
             <div className="text-center py-4">
               <p className="text-sm text-muted-foreground">Log sleep to see your sleep architecture</p>
             </div>
           )}
        </BentoCard>

        {/* Recent Sleep Logs */}
        {sleepLogs.length > 0 && (
          <BentoCard colSpan={2}>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" /> Recent Sleep Logs
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {sleepLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="font-medium text-sm">{new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    {log.notes && <p className="text-xs text-muted-foreground truncate max-w-[200px]">{log.notes}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-300">{log.hoursSlept}h</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (log.quality || 0) ? 'bg-purple-400' : 'bg-white/20'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        )}

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
        <BentoCard className="group">
           <h3 className="font-medium mb-2 flex items-center gap-2">
              <Radio className="w-4 h-4 text-pink-400" /> Dream Log
           </h3>
           <textarea 
             value={dreamNote}
             onChange={(e) => setDreamNote(e.target.value)}
             className="w-full h-24 bg-transparent border-none resize-none text-sm focus:outline-none placeholder:text-muted-foreground/50"
             placeholder="Record fragments of your dreams here..."
             data-testid="textarea-dream"
           />
           <div className="flex justify-end">
              <button 
                className="text-xs bg-white/10 px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors"
                data-testid="button-save-dream"
              >
                Save
              </button>
           </div>
        </BentoCard>

      </BentoGrid>
    </Shell>
  );
}
