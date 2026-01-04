import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Activity, Leaf, Moon, Sun, Wind, ArrowUpRight, Heart, Brain, Utensils, Flame, Trophy, Zap, Calendar, TrendingUp, Lightbulb, Plus, HelpCircle, ChevronLeft, ChevronRight, Droplet, User, QrCode, Target, BarChart3 } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
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
import vitalityBg from "@assets/generated_images/holographic_vitality_score_dashboard.png";
import wisdomBg from "@assets/generated_images/neon_zen_garden_wisdom.png";
import nutritionBg from "@assets/generated_images/futuristic_healthy_cuisine.png";
import activityBg from "@assets/generated_images/cyberpunk_rooftop_fitness.png";
import heartRateBg from "@assets/generated_images/holographic_heart_pulse.png";
import achievementBg from "@assets/generated_images/achievement_milestone_pathway.png";
import meditationBg from "@assets/generated_images/bioluminescent_meditation_cave.png";
import insightsBg from "@assets/generated_images/ai_ayurvedic_insights_visualization.png";


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

  // Calculate streak from consecutive days with health logs
  const calculateStreak = () => {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasLog = 
        sleepLogs.some(l => l.date === dateStr) ||
        dietLogs.some(l => l.date === dateStr) ||
        exerciseLogs.some(l => l.date === dateStr);
      if (hasLog) streak++;
      else if (i > 0) break;
    }
    return streak;
  };
  const currentStreak = calculateStreak();
  
  // Calculate vitality score based on actual health metrics
  const calculateVitalityScore = () => {
    let score = 0;
    let factors = 0;
    if (sleepLogs.length > 0) {
      const avgSleep = sleepLogs.slice(0, 7).reduce((sum, l) => sum + (l.hoursSlept || 0), 0) / Math.min(sleepLogs.length, 7);
      score += Math.min((avgSleep / 8) * 100, 100);
      factors++;
    }
    if (todayExercise > 0) {
      score += Math.min((todayExercise / 60) * 100, 100);
      factors++;
    }
    if (todayCalories > 0) {
      score += Math.min((todayCalories / 2000) * 100, 100);
      factors++;
    }
    return factors > 0 ? Math.round(score / factors) : 0;
  };
  const vitalityScore = calculateVitalityScore();
  
  const sleepAverage = sleepLogs.length > 0 
    ? sleepLogs.reduce((sum, l) => sum + (l.hoursSlept || 0), 0) / sleepLogs.length 
    : undefined;

  // Generate chart data from actual logs
  const chartData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    return [...Array(7)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const dayLogs = [
        ...sleepLogs.filter(l => l.date === dateStr),
        ...dietLogs.filter(l => l.date === dateStr),
        ...exerciseLogs.filter(l => l.date === dateStr)
      ];
      return { name: days[d.getDay()], value: dayLogs.length * 1000 };
    });
  })();

  // Health cards carousel
  const [healthCarouselRef, healthCarouselApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1
  });
  const [canScrollHealthPrev, setCanScrollHealthPrev] = useState(false);
  const [canScrollHealthNext, setCanScrollHealthNext] = useState(false);

  const scrollHealthPrev = useCallback(() => healthCarouselApi?.scrollPrev(), [healthCarouselApi]);
  const scrollHealthNext = useCallback(() => healthCarouselApi?.scrollNext(), [healthCarouselApi]);

  const onHealthSelect = useCallback(() => {
    if (!healthCarouselApi) return;
    setCanScrollHealthPrev(healthCarouselApi.canScrollPrev());
    setCanScrollHealthNext(healthCarouselApi.canScrollNext());
  }, [healthCarouselApi]);

  useEffect(() => {
    if (!healthCarouselApi) return;
    onHealthSelect();
    healthCarouselApi.on('select', onHealthSelect);
    healthCarouselApi.on('reInit', onHealthSelect);
  }, [healthCarouselApi, onHealthSelect]);

  // Wellness mini carousel (inside card)
  const [wellnessRef, wellnessApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1
  });
  const [wellnessIndex, setWellnessIndex] = useState(0);

  const scrollWellnessPrev = useCallback(() => wellnessApi?.scrollPrev(), [wellnessApi]);
  const scrollWellnessNext = useCallback(() => wellnessApi?.scrollNext(), [wellnessApi]);

  useEffect(() => {
    if (!wellnessApi) return;
    wellnessApi.on('select', () => setWellnessIndex(wellnessApi.selectedScrollSnap()));
  }, [wellnessApi]);

  // Auto-rotate wellness carousel
  useEffect(() => {
    if (!wellnessApi) return;
    const interval = setInterval(() => wellnessApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [wellnessApi]);

  // Hydration state
  const [hydration, setHydration] = useState(0);

  // Weekly stats
  const weeklyStats = {
    sleepNights: sleepLogs.length,
    meals: dietLogs.length,
    workouts: exerciseLogs.length
  };

  return (
    <Shell>
      <TooltipProvider>
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
            <h1 className="text-xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight sm:leading-relaxed pb-1 break-words">
              {greeting}, <span className="text-cyan-400 italic truncate">{displayName}</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
              <span className="text-xs sm:text-sm font-bold text-orange-300">{currentStreak}d</span>
            </div>
            {vitalityScore > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                <div className={`w-2 h-2 rounded-full ${vitalityScore >= 70 ? 'bg-emerald-500' : vitalityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`} />
                <span className={`text-sm font-medium ${vitalityScore >= 70 ? 'text-emerald-300' : vitalityScore >= 40 ? 'text-yellow-300' : 'text-red-300'}`}>
                  {vitalityScore >= 70 ? 'Optimal' : vitalityScore >= 40 ? 'Moderate' : 'Low'}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <BentoGrid>
        {/* Main Health Score */}
        <Link href="/passport" className="sm:col-span-2 row-span-2">
          <BentoCard colSpan={2} rowSpan={2} glow="emerald" backgroundImage={vitalityBg} className="cursor-pointer h-full" data-testid="card-vitality">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-white/90 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Vitality Score
                </h3>
                <p className="text-5xl font-serif mt-2 font-bold text-white">
                  {vitalityScore}<span className="text-xl align-top opacity-50">%</span>
                </p>
              </div>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="button-view-passport">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="h-[200px] w-full mt-auto -mb-6 -mx-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
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
        </Link>

        {/* Daily Wisdom - Eastern */}
        <BentoCard glow="violet" backgroundImage={wisdomBg} data-testid="card-wisdom">
          <div className="flex flex-col h-full justify-end text-center p-2">
            <Wind className="w-8 h-8 text-indigo-300 mx-auto mb-4 opacity-90" />
            <h4 className="text-sm uppercase tracking-widest text-indigo-200 mb-2">Daily Qi</h4>
            <p className="font-serif italic text-lg leading-relaxed text-white">
              "{randomQuote.text}"
            </p>
            <p className="text-xs text-indigo-200 mt-3">— {randomQuote.source}</p>
          </div>
        </BentoCard>

        {/* Wellness Hub - Mini Carousel */}
        <BentoCard glow="cyan" className="relative overflow-hidden" data-testid="card-wellness-hub">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-white/90">Wellness Hub</h4>
            <div className="flex gap-1">
              <button onClick={scrollWellnessPrev} className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-3 h-3 text-white" />
              </button>
              <button onClick={scrollWellnessNext} className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ChevronRight className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden" ref={wellnessRef}>
            <div className="flex">
              {/* Dosha Balance */}
              <Link href="/ayurveda" className="flex-none w-full">
                <div className="flex flex-col items-center justify-center py-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/30 to-pink-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-orange-300" />
                  </div>
                  <p className="text-sm font-medium text-white">Dosha Balance</p>
                  <p className="text-xs text-cyan-300 capitalize">{profile?.doshaType?.split("-")[0] || "Discover yours"}</p>
                </div>
              </Link>

              {/* Health Passport */}
              <Link href="/passport" className="flex-none w-full">
                <div className="flex flex-col items-center justify-center py-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <QrCode className="w-6 h-6 text-emerald-300" />
                  </div>
                  <p className="text-sm font-medium text-white">Health Passport</p>
                  <p className="text-xs text-emerald-300">Digital Identity</p>
                </div>
              </Link>

              {/* Weekly Progress */}
              <Link href="/settings" className="flex-none w-full">
                <div className="flex flex-col items-center justify-center py-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-blue-300" />
                  </div>
                  <p className="text-sm font-medium text-white">Weekly Progress</p>
                  <p className="text-xs text-blue-300">{weeklyStats.sleepNights + weeklyStats.meals + weeklyStats.workouts} logs</p>
                </div>
              </Link>

              {/* Hydration */}
              <div className="flex-none w-full" onClick={() => setHydration(h => Math.min(h + 1, 8))}>
                <div className="flex flex-col items-center justify-center py-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Droplet className="w-6 h-6 text-cyan-300" />
                  </div>
                  <p className="text-sm font-medium text-white">Hydration</p>
                  <p className="text-xs text-cyan-300">{hydration}/8 glasses</p>
                </div>
              </div>

              {/* Today's Focus */}
              <Link href="/meditation" className="flex-none w-full">
                <div className="flex flex-col items-center justify-center py-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-pink-300" />
                  </div>
                  <p className="text-sm font-medium text-white">Today's Focus</p>
                  <p className="text-xs text-pink-300">Mindfulness</p>
                </div>
              </Link>
            </div>
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-1 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${wellnessIndex === i ? 'bg-cyan-400' : 'bg-white/30'}`} />
            ))}
          </div>
        </BentoCard>

      </BentoGrid>

      {/* Health Tracking Cards Carousel */}
      <div className="mt-6 sm:mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Health Tracking</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={scrollHealthPrev}
              disabled={!canScrollHealthPrev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={scrollHealthNext}
              disabled={!canScrollHealthNext}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden" ref={healthCarouselRef}>
          <div className="flex gap-4">
            {/* Nutrition Card */}
            <Link href="/diet" className="flex-none w-[85%] sm:w-[calc(33.333%-11px)]">
              <BentoCard glow="emerald" backgroundImage={nutritionBg} className="cursor-pointer h-[180px] sm:h-[200px]" data-testid="card-diet">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white/90 font-medium flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-300" /> Nutrition
                  </h3>
                  <span className="text-xs font-mono text-green-300 whitespace-nowrap">{todayCalories || 0} kcal</span>
                </div>
                <div className="mt-auto">
                  {dietLogs.length === 0 ? (
                    <div className="text-center py-2">
                      <Utensils className="w-6 h-6 text-green-300/50 mx-auto mb-1" />
                      <p className="text-xs text-white/60">No meals logged</p>
                    </div>
                  ) : (
                    <p className="text-xs text-white/70">{dietLogs.length} meals logged</p>
                  )}
                </div>
              </BentoCard>
            </Link>

            {/* Streak Card */}
            <Link href="/settings" className="flex-none w-[85%] sm:w-[calc(33.333%-11px)]">
              <BentoCard glow="orange" backgroundImage={achievementBg} className="cursor-pointer h-[180px] sm:h-[200px]" data-testid="card-streak">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-orange-300" />
                  <h3 className="font-medium text-white">Current Streak</h3>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <span className="text-3xl font-bold text-orange-200">{currentStreak}</span>
                    <span className="text-sm text-white/60 ml-1">days</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < currentStreak % 7 || currentStreak >= 7 ? "bg-orange-300" : "bg-white/30"}`} />
                    ))}
                  </div>
                </div>
              </BentoCard>
            </Link>

            {/* Activity Card */}
            <Link href="/exercise" className="flex-none w-[85%] sm:w-[calc(33.333%-11px)]">
              <BentoCard glow="cyan" backgroundImage={activityBg} className="cursor-pointer h-[180px] sm:h-[200px]" data-testid="card-exercise">
                <div className="flex justify-between items-start">
                  <h3 className="text-white/90 font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-300" /> Activity
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/30 text-cyan-200">Today</span>
                </div>
                <div className="mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">{todayExercise}</span>
                    <span className="text-sm text-white/70">min</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((todayExercise / 60) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </BentoCard>
            </Link>

            {/* Sleep Card */}
            <Link href="/sleep" className="flex-none w-[85%] sm:w-[calc(33.333%-11px)]">
              <BentoCard glow="violet" backgroundImage={sleepBg} className="cursor-pointer h-[180px] sm:h-[200px]" data-testid="card-sleep">
                <div className="flex justify-between items-start">
                  <h3 className="text-white/90 font-medium flex items-center gap-2">
                    <Moon className="w-4 h-4 text-purple-300" /> Sleep
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-100">
                    {latestSleep ? `${latestSleep.quality}/5` : "--"}
                  </span>
                </div>
                <div className="mt-auto">
                  <div className="flex items-baseline gap-1 text-white">
                    <span className="text-2xl font-bold">{latestSleep?.hoursSlept ?? "--"}</span>
                    <span className="text-sm opacity-70">h</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    {sleepLogs.length > 0 ? `${sleepLogs.length} nights logged` : "No sleep logged"}
                  </p>
                </div>
              </BentoCard>
            </Link>

            {/* Meditation Card */}
            <Link href="/meditation" className="flex-none w-[85%] sm:w-[calc(33.333%-11px)]">
              <BentoCard glow="pink" backgroundImage={meditationBg} className="cursor-pointer h-[180px] sm:h-[200px]" data-testid="card-meditation">
                <div className="h-full flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-pink-500/30 backdrop-blur-sm flex items-center justify-center">
                    <Brain className="w-5 h-5 text-pink-200" />
                  </div>
                  <p className="font-medium text-white text-sm">Start Meditation</p>
                  <span className="text-xs text-white/70">15 min • Mindfulness</span>
                </div>
              </BentoCard>
            </Link>

            {/* Heart Rate Card */}
            <div className="flex-none w-[85%] sm:w-[calc(33.333%-11px)]" onClick={() => setHeartRateOpen(true)}>
              <BentoCard glow="pink" backgroundImage={heartRateBg} className="cursor-pointer h-[180px] sm:h-[200px]" data-testid="card-heart-rate">
                <div className="flex justify-between items-start">
                  <h3 className="text-white/90 font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-300" /> Heart Rate
                  </h3>
                  <button className="p-1 rounded-full bg-rose-500/30">
                    <Plus className="w-3 h-3 text-rose-200" />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-white">{heartRateLogs[0]?.bpm || "--"}</span>
                    <span className="text-xs block text-rose-200 uppercase mt-1">BPM</span>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Rate Dialog */}
      <Dialog open={heartRateOpen} onOpenChange={setHeartRateOpen}>
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
            <Button
              onClick={() => {
                if (newBpm) {
                  createHeartRateLog({
                    date: new Date().toISOString().split('T')[0],
                    bpm: parseInt(newBpm),
                    context: hrContext,
                    userId: "",
                  });
                  setNewBpm("");
                  setHeartRateOpen(false);
                }
              }}
              disabled={!newBpm || isCreatingHR}
              className="w-full bg-rose-500 hover:bg-rose-600"
              data-testid="button-save-heart-rate"
            >
              {isCreatingHR ? "Saving..." : "Save Reading"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Achievements Preview */}
      <div className="mt-6 sm:mt-8">
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
      </div>

      {/* Personalized Insights */}
      <div className="mt-6 sm:mt-8">
        <BentoCard colSpan={3} backgroundImage={insightsBg} className="border-primary/10">
          <PersonalizedInsights 
            sleepAvg={sleepAverage} 
            exerciseMinutes={todayExercise || 0}
            dosha={profile?.doshaType?.split("-")[0] || "Pitta"}
          />
        </BentoCard>
      </div>

      {/* AI Wellness Coach Floating Button */}
      <Dialog>
        <DialogTrigger asChild>
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:shadow-cyan-500/50 transition-shadow"
            data-testid="button-ai-coach"
          >
            <Brain className="w-7 h-7 text-white" />
          </motion.button>
        </DialogTrigger>
        <DialogContent className="bg-black/95 backdrop-blur-2xl border-cyan-500/20 max-w-2xl max-h-[80vh] overflow-hidden p-0">
          <AIWellnessCoach />
        </DialogContent>
      </Dialog>
      </TooltipProvider>
    </Shell>
  );
}
