import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Activity, Leaf, Moon, Sun, Wind, ArrowUpRight, Heart, Brain, Utensils, Flame, Trophy, Zap, Calendar, TrendingUp, Lightbulb, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useSleepTracking, useDietTracking, useExerciseTracking, useHeartRateTracking } from "@/hooks/use-health-tracking";
import { useProfile } from "@/hooks/use-profile";
import { PersonalizedInsights } from "@/components/ui/personalized-insights";
import { AIWellnessCoach } from "@/components/ui/ai-wellness-coach";
import sleepBg from "@assets/generated_images/ethereal_bedroom_sleep_sanctuary_with_nebula_projection.png";
import dietBg from "@assets/generated_images/cyberpunk_healthy_smoothie_bowl_with_neon_lighting.png";
import zenBg from "@assets/generated_images/futuristic_zen_garden_with_bioluminescent_plants.png";

const data = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const dailyQuotes = [
  { text: "Tension is who you think you should be. Relaxation is who you are.", source: "Chinese Proverb" },
  { text: "The part can never be well unless the whole is well.", source: "Plato" },
  { text: "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.", source: "Ayurvedic Proverb" },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const { sleepLogs } = useSleepTracking();
  const { dietLogs } = useDietTracking();
  const { exerciseLogs } = useExerciseTracking();
  const { heartRateLogs, createHeartRateLog, isCreating: isCreatingHR } = useHeartRateTracking();
  
  const [heartRateOpen, setHeartRateOpen] = useState(false);
  const [newBpm, setNewBpm] = useState("");
  const [hrContext, setHrContext] = useState("resting");

  const displayName = profile?.displayName || user?.name?.split(' ')[0] || "Seeker";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 17 ? "Good Afternoon" : "Good Evening";
  
  const randomQuote = dailyQuotes[Math.floor(Date.now() / 86400000) % dailyQuotes.length];

  const latestSleep = sleepLogs[0];
  const todayCalories = dietLogs
    .filter(l => l.date === new Date().toISOString().split('T')[0])
    .reduce((sum, l) => sum + (l.calories || 0), 0);
  const todayExercise = exerciseLogs
    .filter(l => l.date === new Date().toISOString().split('T')[0])
    .reduce((sum, l) => sum + (l.durationMinutes || 0), 0);

  const currentStreak = 7;
  const vitalityScore = 92;
  
  const sleepAverage = sleepLogs.length > 0 
    ? sleepLogs.reduce((sum, l) => sum + (l.hoursSlept || 0), 0) / sleepLogs.length 
    : undefined;

  return (
    <Shell>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="min-w-0">
            <h2 className="text-muted-foreground font-medium mb-1 tracking-wider uppercase text-[10px] sm:text-xs">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h2>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground truncate">
              {greeting}, <span className="text-cyan-400 italic">{displayName}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
              <span className="text-xs sm:text-sm font-bold text-orange-300">{currentStreak}d</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-300">Optimal</span>
            </div>
          </div>
        </div>
      </motion.div>

      <BentoGrid>
        {/* Main Health Score */}
        <BentoCard colSpan={2} rowSpan={2} glow="emerald" className="relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h3 className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Vitality Score
              </h3>
              <p className="text-5xl font-serif mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {vitalityScore}<span className="text-xl align-top opacity-50">%</span>
              </p>
            </div>
            <Link href="/passport">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors" data-testid="button-view-passport">
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </Link>
          </div>
          
          <div className="h-[200px] w-full mt-auto -mb-6 -mx-6 relative z-10">
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
        <BentoCard glow="violet" className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40" 
               style={{ backgroundImage: `url(${zenBg})` }} />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          
          <div className="flex flex-col h-full justify-center text-center p-2 relative z-10">
            <Wind className="w-8 h-8 text-indigo-400 mx-auto mb-4 opacity-80" />
            <h4 className="text-sm uppercase tracking-widest text-indigo-300 mb-2">Daily Qi</h4>
            <p className="font-serif italic text-xl leading-relaxed text-white">
              "{randomQuote.text}"
            </p>
            <p className="text-xs text-indigo-300 mt-4">— {randomQuote.source}</p>
          </div>
        </BentoCard>

        {/* Sleep Metric */}
        <Link href="/sleep">
          <BentoCard glow="violet" className="relative group overflow-hidden cursor-pointer h-full" data-testid="card-sleep">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-30" 
                 style={{ backgroundImage: `url(${sleepBg})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-white/80 font-medium flex items-center gap-2">
                  <Moon className="w-4 h-4 text-purple-400" /> Sleep
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 backdrop-blur-md">
                  {latestSleep ? `${latestSleep.quality}/5` : "Optimal"}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-bold">{latestSleep?.hoursSlept || 7}</span>
                  <span className="text-lg opacity-70">h</span>
                  <span className="text-3xl font-bold ml-2">{Math.round(((latestSleep?.hoursSlept || 7.7) % 1) * 60)}</span>
                  <span className="text-lg opacity-70">m</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden backdrop-blur-sm">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((latestSleep?.hoursSlept || 7.7) / 9) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-white/60 mt-2">
                  {sleepLogs.length > 0 ? `${sleepLogs.length} nights logged` : "Rem Cycle: 23% (High)"}
                </p>
              </div>
            </div>
          </BentoCard>
        </Link>

        {/* Quick Diet */}
        <Link href="/diet">
          <BentoCard glow="emerald" className="relative overflow-hidden group cursor-pointer h-full" data-testid="card-diet">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-20" 
                 style={{ backgroundImage: `url(${dietBg})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-white/80 font-medium flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-400" /> Nutrition
                </h3>
                <span className="text-sm font-mono text-green-400">{todayCalories || 860} kcal</span>
              </div>
              <div className="space-y-3">
                 {dietLogs.slice(0, 2).map((log, i) => (
                   <div key={log.id || i} className="flex justify-between items-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <Utensils className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white capitalize">{log.mealType}</p>
                          <p className="text-xs text-white/60 truncate max-w-[100px]">{log.items?.[0] || "Logged"}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-green-400">{log.calories} kcal</span>
                   </div>
                 ))}
                 {dietLogs.length === 0 && (
                   <>
                     <div className="flex justify-between items-center p-2 rounded-lg bg-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Sun className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Breakfast</p>
                            <p className="text-xs text-white/60">Oatmeal & Berries</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-green-400">320 kcal</span>
                     </div>
                     <div className="flex justify-between items-center p-2 rounded-lg bg-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Utensils className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Lunch</p>
                            <p className="text-xs text-white/60">Logged 12:30 PM</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-green-400">540 kcal</span>
                     </div>
                   </>
                 )}
              </div>
            </div>
          </BentoCard>
        </Link>

        {/* Streak & Achievements */}
        <BentoCard glow="orange">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-orange-500/20">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="font-medium">Current Streak</h3>
              <p className="text-xs text-muted-foreground">Keep the momentum!</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-4xl font-bold text-orange-300">{currentStreak}</span>
              <span className="text-lg text-muted-foreground ml-1">days</span>
            </div>
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-3 h-3 rounded-full ${i < currentStreak % 7 || currentStreak >= 7 ? "bg-orange-400" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Best: 14 days</p>
        </BentoCard>

        {/* Quick Action - Meditate */}
        <Link href="/meditation">
          <BentoCard glow="pink" className="cursor-pointer h-full" data-testid="card-meditation">
             <div className="h-full flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-primary">Start Meditation</p>
                <span className="text-xs text-primary/60">15 min • Mindfulness</span>
             </div>
          </BentoCard>
        </Link>

        {/* Today's Activity */}
        <Link href="/exercise">
          <BentoCard glow="cyan" className="cursor-pointer h-full" data-testid="card-exercise">
            <div className="flex justify-between items-start">
              <h3 className="text-muted-foreground font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Activity
              </h3>
              <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300">Today</span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-cyan-300">{todayExercise || 45}</span>
                <span className="text-lg text-muted-foreground">min</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(((todayExercise || 45) / 60) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {exerciseLogs.length > 0 ? `${exerciseLogs.length} workouts logged` : "Goal: 60 minutes"}
              </p>
            </div>
          </BentoCard>
        </Link>

        {/* Heart Rate */}
        <Dialog open={heartRateOpen} onOpenChange={setHeartRateOpen}>
          <DialogTrigger asChild>
            <div>
              <BentoCard glow="pink" className="cursor-pointer h-full" data-testid="card-heart-rate">
                <div className="flex justify-between items-start">
                  <h3 className="text-muted-foreground font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" /> Heart Rate
                  </h3>
                  <button className="p-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 transition-colors">
                    <Plus className="w-3 h-3 text-rose-400" />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center relative">
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-rose-500/20 animate-ping absolute" />
                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-rose-500/40" />
                   </div>
                   <div className="relative z-10 text-center">
                      <span className="text-3xl sm:text-4xl font-bold text-rose-100">
                        {heartRateLogs[0]?.bpm || "--"}
                      </span>
                      <span className="text-[10px] sm:text-xs block text-rose-400/80 uppercase tracking-widest">BPM</span>
                   </div>
                </div>
                {heartRateLogs.length > 0 && (
                  <p className="text-[10px] text-center text-rose-400/60 mt-2">
                    {heartRateLogs.length} readings logged
                  </p>
                )}
              </BentoCard>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-background/95 backdrop-blur-xl border-rose-500/20 max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                Log Heart Rate
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">BPM (Beats per minute)</label>
                <Input
                  type="number"
                  placeholder="e.g., 72"
                  value={newBpm}
                  onChange={(e) => setNewBpm(e.target.value)}
                  min={30}
                  max={220}
                  className="text-2xl text-center font-bold"
                  data-testid="input-heart-rate"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Context</label>
                <Select value={hrContext} onValueChange={setHrContext}>
                  <SelectTrigger data-testid="select-hr-context">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resting">Resting</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="post-exercise">Post-Exercise</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: For resting heart rate, measure after sitting quietly for 5 minutes.
              </p>
              <Button
                onClick={() => {
                  if (newBpm && parseInt(newBpm) >= 30 && parseInt(newBpm) <= 220) {
                    createHeartRateLog({
                      userId: "",
                      date: new Date().toISOString().split('T')[0],
                      bpm: parseInt(newBpm),
                      context: hrContext,
                    });
                    setNewBpm("");
                    setHeartRateOpen(false);
                  }
                }}
                disabled={isCreatingHR || !newBpm}
                className="w-full bg-rose-500 hover:bg-rose-600"
                data-testid="button-log-heart-rate"
              >
                {isCreatingHR ? "Saving..." : "Log Heart Rate"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Achievements Preview */}
        <BentoCard colSpan={2} className="bg-gradient-to-r from-primary/5 to-cyan-500/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" /> Recent Achievements
            </h3>
            <Link href="/settings">
              <span className="text-xs text-primary hover:underline cursor-pointer">View all</span>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "First Steps", icon: "⭐", earned: true },
              { name: "Week Warrior", icon: "🔥", earned: true },
              { name: "Sleep Master", icon: "🌙", earned: false, progress: "3/5" },
              { name: "Balanced Being", icon: "💚", earned: true },
            ].map((achievement, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`p-3 rounded-xl text-center transition-all ${
                  achievement.earned 
                    ? "bg-primary/10 border border-primary/20" 
                    : "bg-white/5 border border-white/10 opacity-60"
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <p className="text-xs font-medium mt-1 truncate">{achievement.name}</p>
                {!achievement.earned && achievement.progress && (
                  <p className="text-[10px] text-muted-foreground">{achievement.progress}</p>
                )}
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Personalized Insights */}
        <BentoCard colSpan={3} className="border-primary/10">
          <PersonalizedInsights 
            sleepAvg={sleepAverage} 
            exerciseMinutes={todayExercise || 0}
            dosha={profile?.doshaType?.split("-")[0] || "Pitta"}
          />
        </BentoCard>

        {/* AI Wellness Coach */}
        <BentoCard colSpan={3} className="p-0 overflow-hidden">
          <AIWellnessCoach />
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
