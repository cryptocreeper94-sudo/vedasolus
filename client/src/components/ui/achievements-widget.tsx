import { motion } from "framer-motion";
import { Flame, Trophy, Star, Zap, Moon, Heart, Dumbbell, Brain, Leaf, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  type: string;
  lastActivity?: string;
}

export function StreakDisplay({ currentStreak, longestStreak, type, lastActivity }: StreakDisplayProps) {
  const icons = {
    sleep: Moon,
    diet: Leaf,
    exercise: Dumbbell,
    meditation: Brain,
    overall: Flame
  };
  const Icon = icons[type as keyof typeof icons] || Flame;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <Icon className="w-4 h-4 text-orange-400" />
          </div>
          <span className="text-sm font-medium capitalize">{type} Streak</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(Math.min(currentStreak, 7))].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-2 h-2 rounded-full bg-orange-400"
            />
          ))}
          {currentStreak > 7 && <span className="text-xs text-orange-300 ml-1">+{currentStreak - 7}</span>}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-orange-300">{currentStreak}</p>
          <p className="text-xs text-muted-foreground">days</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Best: {longestStreak} days</p>
        </div>
      </div>
    </div>
  );
}

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  target?: number;
}

export function AchievementBadge({ name, description, icon, earned, progress, target }: AchievementBadgeProps) {
  const iconMap: Record<string, any> = {
    trophy: Trophy,
    star: Star,
    zap: Zap,
    heart: Heart,
    moon: Moon,
    flame: Flame,
    brain: Brain,
    leaf: Leaf,
    award: Award
  };
  const Icon = iconMap[icon] || Trophy;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden",
        earned
          ? "bg-gradient-to-br from-primary/20 to-cyan-500/10 border-primary/30"
          : "bg-white/5 border-white/10 opacity-60"
      )}
    >
      {earned && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      )}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
        earned ? "bg-primary/20" : "bg-white/10"
      )}>
        <Icon className={cn("w-6 h-6", earned ? "text-primary" : "text-muted-foreground")} />
      </div>
      <h4 className={cn("font-medium text-sm mb-1", !earned && "text-muted-foreground")}>{name}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
      {!earned && progress !== undefined && target !== undefined && (
        <div className="mt-3">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary/50"
              initial={{ width: 0 }}
              animate={{ width: `${(progress / target) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{progress}/{target}</p>
        </div>
      )}
    </motion.div>
  );
}

export const defaultAchievements: AchievementBadgeProps[] = [
  { name: "First Steps", description: "Complete your first health log", icon: "star", earned: true },
  { name: "Week Warrior", description: "Log health data for 7 consecutive days", icon: "flame", earned: true },
  { name: "Sleep Master", description: "Achieve 8+ hours of sleep for 5 nights", icon: "moon", earned: false, progress: 3, target: 5 },
  { name: "Hydration Hero", description: "Meet your water goal for 30 days", icon: "leaf", earned: false, progress: 12, target: 30 },
  { name: "Mindful Minute", description: "Complete 10 meditation sessions", icon: "brain", earned: false, progress: 4, target: 10 },
  { name: "Balanced Being", description: "Log all three categories in one day", icon: "heart", earned: true },
  { name: "Centurion", description: "Log 100 total entries", icon: "award", earned: false, progress: 45, target: 100 },
  { name: "Early Riser", description: "Wake before 6 AM for 7 days", icon: "zap", earned: false, progress: 2, target: 7 },
];

export function AchievementsGrid() {
  const earned = defaultAchievements.filter(a => a.earned).length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" /> Achievements
        </h3>
        <span className="text-sm text-muted-foreground">{earned}/{defaultAchievements.length} earned</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {defaultAchievements.map((achievement, i) => (
          <AchievementBadge key={i} {...achievement} />
        ))}
      </div>
    </div>
  );
}
