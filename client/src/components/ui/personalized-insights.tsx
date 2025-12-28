import { motion } from "framer-motion";
import { Leaf, Moon, Sun, Droplets, Wind, Flame, Lightbulb, Clock, Apple, Dumbbell, Brain, AlertCircle } from "lucide-react";

interface InsightData {
  sleepAvg?: number;
  caloriesAvg?: number;
  exerciseMinutes?: number;
  dosha?: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  type: "tip" | "warning" | "achievement";
  category: "ayurveda" | "sleep" | "diet" | "exercise" | "tcm";
}

function generateInsights(data: InsightData): Insight[] {
  const insights: Insight[] = [];
  const currentHour = new Date().getHours();
  const dosha = data.dosha || "Pitta";

  if (currentHour >= 6 && currentHour < 10) {
    insights.push({
      id: "kapha-morning",
      title: "Kapha Time - Get Moving",
      description: "This is Kapha time (6-10 AM). Counter morning heaviness with movement. Even 10 minutes of stretching helps activate your digestive fire.",
      icon: Wind,
      type: "tip",
      category: "ayurveda"
    });
  } else if (currentHour >= 10 && currentHour < 14) {
    insights.push({
      id: "pitta-noon",
      title: "Pitta Time - Main Meal",
      description: "Your Agni (digestive fire) is strongest now. This is the ideal time for your largest, most complex meal of the day.",
      icon: Flame,
      type: "tip",
      category: "ayurveda"
    });
  } else if (currentHour >= 14 && currentHour < 18) {
    insights.push({
      id: "vata-afternoon",
      title: "Vata Time - Creative Work",
      description: "Afternoon Vata time favors mental clarity. Perfect for creative projects, important decisions, and focused work.",
      icon: Brain,
      type: "tip",
      category: "ayurveda"
    });
  } else if (currentHour >= 18 && currentHour < 22) {
    insights.push({
      id: "kapha-evening",
      title: "Evening Kapha - Wind Down",
      description: "Begin your wind-down routine. Light supper before 7 PM, dim lights, and avoid screens to prepare for restorative sleep.",
      icon: Moon,
      type: "tip",
      category: "ayurveda"
    });
  }

  if (dosha === "Vata") {
    insights.push({
      id: "vata-balance",
      title: "Vata Balancing Today",
      description: "Favor warm, grounding foods and avoid cold, raw items. Sesame oil massage can help calm Vata energy.",
      icon: Droplets,
      type: "tip",
      category: "ayurveda"
    });
  } else if (dosha === "Pitta") {
    insights.push({
      id: "pitta-balance",
      title: "Pitta Cooling Tips",
      description: "Avoid excess heat and spicy foods. Coconut water, cucumber, and mint help balance Pitta's fire.",
      icon: Sun,
      type: "tip",
      category: "ayurveda"
    });
  } else if (dosha === "Kapha") {
    insights.push({
      id: "kapha-balance",
      title: "Kapha Activation",
      description: "Stimulate your system with warming spices like ginger and turmeric. Vigorous exercise helps counter Kapha sluggishness.",
      icon: Flame,
      type: "tip",
      category: "ayurveda"
    });
  }

  if (data.sleepAvg !== undefined) {
    if (data.sleepAvg < 7) {
      insights.push({
        id: "sleep-low",
        title: "Sleep Recovery Needed",
        description: `Your average of ${data.sleepAvg.toFixed(1)} hours is below optimal. Aim for 7-9 hours. Try earlier bedtime tonight.`,
        icon: AlertCircle,
        type: "warning",
        category: "sleep"
      });
    } else if (data.sleepAvg >= 7.5) {
      insights.push({
        id: "sleep-good",
        title: "Excellent Sleep Pattern",
        description: `Averaging ${data.sleepAvg.toFixed(1)} hours - you're giving your body proper rest for restoration and healing.`,
        icon: Moon,
        type: "achievement",
        category: "sleep"
      });
    }
  }

  if (data.exerciseMinutes !== undefined && data.exerciseMinutes < 30) {
    insights.push({
      id: "exercise-low",
      title: "Move Your Body",
      description: "Under 30 minutes of movement today. Even a short walk can boost circulation and lift your mood.",
      icon: Dumbbell,
      type: "warning",
      category: "exercise"
    });
  }

  insights.push({
    id: "tcm-meridian",
    title: "Liver Meridian Active (1-3 AM)",
    description: "In TCM, the liver processes emotions and toxins during deep sleep. Quality rest during this time supports natural detoxification.",
    icon: Leaf,
    type: "tip",
    category: "tcm"
  });

  return insights.slice(0, 4);
}

interface PersonalizedInsightsProps {
  sleepAvg?: number;
  caloriesAvg?: number;
  exerciseMinutes?: number;
  dosha?: string;
  compact?: boolean;
}

export function PersonalizedInsights({ sleepAvg, caloriesAvg, exerciseMinutes, dosha, compact }: PersonalizedInsightsProps) {
  const insights = generateInsights({ sleepAvg, caloriesAvg, exerciseMinutes, dosha });

  const typeStyles = {
    tip: "border-cyan-500/30 bg-cyan-500/5",
    warning: "border-amber-500/30 bg-amber-500/5",
    achievement: "border-emerald-500/30 bg-emerald-500/5"
  };

  const iconStyles = {
    tip: "text-cyan-400 bg-cyan-500/20",
    warning: "text-amber-400 bg-amber-500/20",
    achievement: "text-emerald-400 bg-emerald-500/20"
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Today's Insights</span>
        </div>
        {insights.slice(0, 2).map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-xl border ${typeStyles[insight.type]}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${iconStyles[insight.type]}`}>
                <insight.icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-0.5">{insight.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Personalized Insights</h3>
        </div>
        <span className="text-xs text-muted-foreground">Updated just now</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-2xl border ${typeStyles[insight.type]} hover:scale-[1.01] transition-transform cursor-pointer`}
            data-testid={`insight-${insight.id}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl ${iconStyles[insight.type]}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{insight.title}</h4>
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded-full ${
                    insight.category === "ayurveda" ? "bg-emerald-500/20 text-emerald-300" :
                    insight.category === "tcm" ? "bg-red-500/20 text-red-300" :
                    insight.category === "sleep" ? "bg-indigo-500/20 text-indigo-300" :
                    insight.category === "diet" ? "bg-orange-500/20 text-orange-300" :
                    "bg-cyan-500/20 text-cyan-300"
                  }`}>
                    {insight.category === "tcm" ? "TCM" : insight.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
