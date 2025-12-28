import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Flame, Clock, Leaf, Info, Calendar, Utensils, Apple } from "lucide-react";
import { MealEntryDialog, WaterTracker } from "@/components/ui/health-entry-dialogs";
import { useDietTracking } from "@/hooks/use-health-tracking";
import { useAuth } from "@/hooks/use-auth";

const recipes = [
  {
    title: "Miso Glazed Salmon",
    time: "25 min",
    cals: 450,
    tags: ["Omega-3", "Protein"],
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Quinoa Buddha Bowl",
    time: "15 min",
    cals: 320,
    tags: ["Fiber", "Vegan"],
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Ginger Turmeric Tea",
    time: "5 min",
    cals: 45,
    tags: ["Anti-inflammatory"],
    color: "from-yellow-500/20 to-amber-500/20"
  }
];

export default function Diet() {
  const { isAuthenticated } = useAuth();
  const { dietLogs, isLoading, createDietLog, isCreating } = useDietTracking();
  const [waterIntake, setWaterIntake] = useState(1.2);

  const handleMealSubmit = (data: { date: string; mealType: string; items: string[]; calories: number; notes?: string }) => {
    createDietLog({
      date: data.date,
      mealType: data.mealType,
      items: data.items,
      calories: data.calories,
      notes: data.notes || null,
      userId: "",
    });
  };

  const handleAddWater = (amount: number) => {
    setWaterIntake(prev => Math.min(prev + amount, 4));
  };

  const todayMeals = dietLogs.filter(log => {
    const today = new Date().toISOString().split('T')[0];
    return log.date === today;
  });

  const totalCalories = todayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const targetCalories = 2000;

  const macros = {
    protein: { current: Math.round(totalCalories * 0.3 / 4), target: 120 },
    carbs: { current: Math.round(totalCalories * 0.45 / 4), target: 200 },
    fats: { current: Math.round(totalCalories * 0.25 / 9), target: 65 }
  };

  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Nourishment</h1>
          <p className="text-muted-foreground">Food as medicine. Balance your internal heat.</p>
        </div>
        {isAuthenticated && (
          <MealEntryDialog onSubmit={handleMealSubmit} isLoading={isCreating} />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Main tracking area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 rounded-3xl glass-panel relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Leaf className="w-64 h-64" />
             </div>
             <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-serif">Today's Macros</h2>
                 <div className="text-right">
                   <p className="text-2xl font-bold">{totalCalories}</p>
                   <p className="text-xs text-muted-foreground">/ {targetCalories} kcal</p>
                 </div>
               </div>
               <div className="grid grid-cols-3 gap-4">
                 <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-muted-foreground text-sm mb-1">Protein</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{macros.protein.current}</span>
                      <span className="text-sm text-muted-foreground mb-1">/ {macros.protein.target}g</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-500" 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((macros.protein.current / macros.protein.target) * 100, 100)}%` }}
                      />
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-muted-foreground text-sm mb-1">Carbs</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{macros.carbs.current}</span>
                      <span className="text-sm text-muted-foreground mb-1">/ {macros.carbs.target}g</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500" 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((macros.carbs.current / macros.carbs.target) * 100, 100)}%` }}
                      />
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-muted-foreground text-sm mb-1">Fats</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{macros.fats.current}</span>
                      <span className="text-sm text-muted-foreground mb-1">/ {macros.fats.target}g</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        className="h-full bg-yellow-500" 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((macros.fats.current / macros.fats.target) * 100, 100)}%` }}
                      />
                    </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Today's Meals */}
          {todayMeals.length > 0 && (
            <div className="p-6 rounded-3xl glass-panel">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Apple className="w-5 h-5 text-emerald-400" /> Today's Meals
              </h3>
              <div className="space-y-3">
                {todayMeals.map((meal, i) => (
                  <div key={meal.id || i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20">
                        <Utensils className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{meal.mealType}</p>
                        <p className="text-xs text-muted-foreground">{meal.items?.join(', ') || 'No items logged'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-300">{meal.calories} kcal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Meal History */}
          {dietLogs.length > 0 && (
            <div className="p-6 rounded-3xl glass-panel">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" /> Recent Meals
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {dietLogs.slice(0, 8).map((meal, i) => (
                  <div key={meal.id || i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="font-medium text-sm capitalize">{meal.mealType} - {new Date(meal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[250px]">{meal.items?.join(', ')}</p>
                    </div>
                    <p className="font-bold text-emerald-300">{meal.calories} kcal</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h3 className="text-xl font-medium mt-8 mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" /> Recommended Recipes
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {recipes.map((recipe, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`p-5 rounded-3xl bg-gradient-to-br ${recipe.color} border border-white/5 cursor-pointer relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-lg font-serif font-bold mb-2">{recipe.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-white/70">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.cals} kcal</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-4">
           <BentoCard className="bg-indigo-900/20 border-indigo-500/20">
              <div className="flex items-center gap-2 mb-3 text-indigo-300">
                <Info className="w-4 h-4" />
                <h4 className="font-medium">Ayurvedic Insight</h4>
              </div>
              <p className="text-sm text-indigo-100/80 leading-relaxed">
                Your <span className="text-white font-medium">Pitta</span> dosha is slightly elevated today. Avoid spicy foods. Favor cooling ingredients like cucumber, mint, and coconut.
              </p>
           </BentoCard>

           <WaterTracker 
             onAddWater={handleAddWater}
             currentAmount={waterIntake}
             goalAmount={2.5}
           />
        </div>
      </div>
    </Shell>
  );
}
