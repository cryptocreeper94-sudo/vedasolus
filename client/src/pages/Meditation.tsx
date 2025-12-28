import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Play, Pause, Wind, Brain, Heart, Moon, Zap, Clock, Volume2, SkipForward, RotateCcw, Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  icon: any;
  gradient: string;
  tradition: "Eastern" | "Western" | "Both";
}

const meditationSessions: MeditationSession[] = [
  {
    id: "breath-awareness",
    title: "Breath Awareness",
    description: "Follow the natural rhythm of your breath to cultivate presence and calm",
    duration: 10,
    category: "Breathwork",
    icon: Wind,
    gradient: "from-cyan-500/20 to-blue-500/20",
    tradition: "Both"
  },
  {
    id: "body-scan",
    title: "Progressive Body Scan",
    description: "Systematically release tension from head to toe",
    duration: 15,
    category: "Relaxation",
    icon: Heart,
    gradient: "from-pink-500/20 to-rose-500/20",
    tradition: "Western"
  },
  {
    id: "loving-kindness",
    title: "Metta (Loving-Kindness)",
    description: "Cultivate compassion for yourself and all beings",
    duration: 12,
    category: "Heart",
    icon: Heart,
    gradient: "from-rose-500/20 to-orange-500/20",
    tradition: "Eastern"
  },
  {
    id: "mindfulness",
    title: "Open Awareness",
    description: "Rest in spacious awareness without attachment",
    duration: 20,
    category: "Mindfulness",
    icon: Brain,
    gradient: "from-purple-500/20 to-indigo-500/20",
    tradition: "Eastern"
  },
  {
    id: "sleep-prep",
    title: "Sleep Preparation",
    description: "Transition gently into restorative sleep",
    duration: 15,
    category: "Sleep",
    icon: Moon,
    gradient: "from-indigo-500/20 to-purple-500/20",
    tradition: "Both"
  },
  {
    id: "energy-boost",
    title: "Morning Energy",
    description: "Awaken your body and mind with energizing breath",
    duration: 8,
    category: "Energy",
    icon: Zap,
    gradient: "from-amber-500/20 to-orange-500/20",
    tradition: "Eastern"
  }
];

const soundscapes = [
  { id: "rain", name: "Gentle Rain", icon: "🌧️" },
  { id: "ocean", name: "Ocean Waves", icon: "🌊" },
  { id: "forest", name: "Forest Ambience", icon: "🌲" },
  { id: "bowls", name: "Singing Bowls", icon: "🔔" },
  { id: "silence", name: "Pure Silence", icon: "🤫" },
];

export default function Meditation() {
  const [activeSession, setActiveSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedSound, setSelectedSound] = useState("silence");
  const [completedToday, setCompletedToday] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const startSession = (session: MeditationSession) => {
    setActiveSession(session);
    setTimeRemaining(session.duration * 60);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const endSession = () => {
    if (activeSession) {
      setCompletedToday([...completedToday, activeSession.id]);
      toast({
        title: "Session Complete",
        description: `You completed ${activeSession.title}. Great work!`,
      });
    }
    setActiveSession(null);
    setIsPlaying(false);
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <h1 className="text-4xl font-serif font-medium mb-2">Stillness</h1>
        <p className="text-muted-foreground">Bridging ancient wisdom with modern mindfulness. Find your center.</p>
      </div>

      {/* Active Session Player */}
      {activeSession && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-8 rounded-3xl bg-gradient-to-br ${activeSession.gradient} border border-white/10 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-white/60 uppercase tracking-widest mb-1">{activeSession.category}</p>
                <h2 className="text-3xl font-serif font-bold mb-2">{activeSession.title}</h2>
                <p className="text-white/70">{activeSession.description}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-5xl font-mono font-bold mb-4">{formatTime(timeRemaining)}</div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTimeRemaining(activeSession.duration * 60)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    data-testid="button-restart"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={togglePlay}
                    data-testid="button-play-pause"
                    className="p-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                  <button
                    onClick={endSession}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    data-testid="button-end-session"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Soundscape Selector */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <Volume2 className="w-4 h-4 text-white/60" />
                <div className="flex gap-2">
                  {soundscapes.map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => setSelectedSound(sound.id)}
                      data-testid={`button-sound-${sound.id}`}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        selectedSound === sound.id
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {sound.icon} {sound.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Session Library */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditationSessions.map((session) => {
          const isCompleted = completedToday.includes(session.id);
          const Icon = session.icon;
          
          return (
            <motion.div
              key={session.id}
              whileHover={{ y: -5 }}
              className={`relative p-6 rounded-3xl bg-gradient-to-br ${session.gradient} border border-white/10 cursor-pointer group ${
                isCompleted ? "ring-2 ring-emerald-500/50" : ""
              }`}
              onClick={() => !activeSession && startSession(session)}
              data-testid={`card-meditation-${session.id}`}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 p-1 bg-emerald-500 rounded-full">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-xs text-white/60">
                  <Clock className="w-3 h-3" />
                  {session.duration} min
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                {session.title}
              </h3>
              <p className="text-sm text-white/70 mb-4">{session.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  session.tradition === "Eastern" 
                    ? "bg-amber-500/20 text-amber-300"
                    : session.tradition === "Western"
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-purple-500/20 text-purple-300"
                }`}>
                  {session.tradition}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startSession(session);
                  }}
                  data-testid={`button-start-${session.id}`}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Daily Progress */}
      <div className="mt-8 p-6 rounded-3xl glass-card border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Today's Mindfulness
          </h3>
          <span className="text-sm text-muted-foreground">
            {completedToday.length}/{meditationSessions.length} sessions
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${(completedToday.length / meditationSessions.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {completedToday.length === 0 
            ? "Start a session to begin your mindfulness journey today"
            : `You've practiced ${completedToday.reduce((acc, id) => {
                const session = meditationSessions.find(s => s.id === id);
                return acc + (session?.duration || 0);
              }, 0)} minutes today`
          }
        </p>
      </div>
    </Shell>
  );
}
