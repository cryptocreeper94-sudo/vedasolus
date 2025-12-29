import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Activity, Play, Timer, TrendingUp, Flame, Wind, Calendar, Zap } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis } from "recharts";
import { ExerciseEntryDialog } from "@/components/ui/health-entry-dialogs";
import { useExerciseTracking } from "@/hooks/use-health-tracking";
import { useAuth } from "@/hooks/use-auth";


export default function Exercise() {
  const { isAuthenticated } = useAuth();
  const { exerciseLogs, isLoading, createExerciseLog, isCreating } = useExerciseTracking();

  const handleExerciseSubmit = (data: { date: string; activityType: string; durationMinutes: number; intensity: string; notes?: string }) => {
    createExerciseLog({
      date: data.date,
      activityType: data.activityType,
      durationMinutes: data.durationMinutes,
      intensity: data.intensity,
      notes: data.notes || null,
      userId: "",
    });
  };

  const totalMinutesToday = exerciseLogs
    .filter(log => log.date === new Date().toISOString().split('T')[0])
    .reduce((sum, log) => sum + (log.durationMinutes || 0), 0);

  const caloriesBurned = exerciseLogs
    .filter(log => log.date === new Date().toISOString().split('T')[0])
    .reduce((sum, log) => {
      const intensity = log.intensity === 'high' ? 10 : log.intensity === 'moderate' ? 7 : 4;
      return sum + ((log.durationMinutes || 0) * intensity);
    }, 0);

  const weeklyData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    return [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const dayLogs = exerciseLogs.filter(l => l.date === dateStr);
      const active = dayLogs.reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
      return { name: days[d.getDay()], active, steps: active * 100 };
    });
  })();

  const recentWorkouts = exerciseLogs.slice(0, 3).map(log => ({
    name: log.activityType?.replace(/^\w/, c => c.toUpperCase()) || "Workout",
    time: `${log.durationMinutes} min`,
    intensity: log.intensity?.replace(/^\w/, c => c.toUpperCase()) || "Moderate",
    date: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }));

  const workoutsToShow = recentWorkouts;

  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Movement</h1>
          <p className="text-muted-foreground">Flowing water never stagnates. Keep the Qi moving.</p>
        </div>
        {isAuthenticated && (
          <ExerciseEntryDialog onSubmit={handleExerciseSubmit} isLoading={isCreating} />
        )}
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
              <BarChart data={weeklyData} barGap={8}>
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none' }}
                />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="steps" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.3} />
                <Bar dataKey="active" fill="#10b981" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fillOpacity={index === weeklyData.length - 1 ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Today's Stats */}
        <BentoCard className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-cyan-500/20 rounded-full">
               <Zap className="w-6 h-6 text-cyan-400" />
             </div>
             <div>
               <p className="text-sm text-muted-foreground">Active Today</p>
               <p className="text-2xl font-bold">{totalMinutesToday} <span className="text-sm font-normal text-muted-foreground">min</span></p>
             </div>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(totalMinutesToday / 60 * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Goal: 60 minutes</p>
        </BentoCard>

        {/* Current Status */}
        <BentoCard>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-orange-500/20 rounded-full">
               <Flame className="w-6 h-6 text-orange-400" />
             </div>
             <div>
               <p className="text-sm text-muted-foreground">Calories Burned</p>
               <p className="text-2xl font-bold">{caloriesBurned} <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
             </div>
          </div>
          <div className="space-y-3">
             {exerciseLogs.slice(0, 2).map((log, i) => (
               <div key={log.id || i} className="bg-white/5 p-3 rounded-xl flex justify-between items-center">
                  <span className="text-sm capitalize">{log.activityType}</span>
                  <span className="text-sm font-mono text-orange-300">
                    {Math.round((log.durationMinutes || 0) * (log.intensity === 'high' ? 10 : log.intensity === 'moderate' ? 7 : 4))} kcal
                  </span>
               </div>
             ))}
             {exerciseLogs.length === 0 && (
               <div className="text-center py-4">
                 <p className="text-sm text-muted-foreground">No activity logged yet</p>
               </div>
             )}
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/20">
           <h3 className="text-emerald-300 font-medium mb-4 flex items-center gap-2">
             <Wind className="w-4 h-4" /> Qi Gong
           </h3>
           <p className="text-sm text-emerald-100/70 mb-6">
             The 8 Brocades sequence is recommended for today to clear liver stagnation.
           </p>
           <button 
             className="w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl flex items-center justify-center gap-2 transition-colors"
             data-testid="button-start-qigong"
           >
             <Play className="w-4 h-4 fill-current" /> Start Session
           </button>
        </BentoCard>

        {/* Recent Workouts */}
        <BentoCard colSpan={3}>
           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-cyan-400" /> Recent Sessions
           </h3>
           {workoutsToShow.length > 0 ? (
             <div className="grid md:grid-cols-3 gap-4">
                {workoutsToShow.map((workout, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-white/10"
                  >
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-medium">{workout.name}</span>
                       <Activity className="w-4 h-4 text-muted-foreground" />
                     </div>
                     <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                       <Timer className="w-3 h-3" /> {workout.time}
                     </div>
                     <div className="flex justify-between items-center mt-auto">
                       <span className={`text-xs px-2 py-1 rounded-full ${
                         workout.intensity === 'High' ? 'bg-red-500/20 text-red-300' :
                         workout.intensity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                         'bg-green-500/20 text-green-300'
                       }`}>{workout.intensity}</span>
                       <span className="text-xs opacity-50">{workout.date}</span>
                     </div>
                  </motion.div>
                ))}
             </div>
           ) : (
             <div className="text-center py-8">
               <Activity className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
               <p className="text-muted-foreground">No workouts logged yet</p>
               <p className="text-sm text-muted-foreground/60">Start logging to track your progress</p>
             </div>
           )}
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
