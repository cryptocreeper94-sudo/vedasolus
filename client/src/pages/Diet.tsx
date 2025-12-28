import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Flame, Clock, Leaf, Info } from "lucide-react";

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
  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <h1 className="text-4xl font-serif font-medium mb-2">Nourishment</h1>
        <p className="text-muted-foreground">Food as medicine. Balance your internal heat.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Main tracking area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 rounded-3xl glass-panel relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Leaf className="w-64 h-64" />
             </div>
             <div className="relative z-10">
               <h2 className="text-2xl font-serif mb-6">Today's Macros</h2>
               <div className="grid grid-cols-3 gap-4">
                 <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-muted-foreground text-sm mb-1">Protein</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">84</span>
                      <span className="text-sm text-muted-foreground mb-1">/ 120g</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-blue-500 w-[70%]" />
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-muted-foreground text-sm mb-1">Carbs</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">145</span>
                      <span className="text-sm text-muted-foreground mb-1">/ 200g</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-green-500 w-[72%]" />
                    </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-muted-foreground text-sm mb-1">Fats</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">42</span>
                      <span className="text-sm text-muted-foreground mb-1">/ 65g</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-yellow-500 w-[64%]" />
                    </div>
                 </div>
               </div>
             </div>
          </div>

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

           <div className="p-4 rounded-3xl glass-panel">
             <h4 className="font-medium mb-4">Hydration</h4>
             <div className="relative h-48 w-full bg-blue-900/20 rounded-2xl overflow-hidden flex items-end justify-center">
                <div className="absolute inset-x-0 bottom-0 bg-blue-500/50 blur-xl h-[60%]" />
                <div className="absolute inset-x-0 bottom-0 bg-blue-400/30 h-[55%] animate-pulse" />
                <div className="relative z-10 mb-8 text-center">
                  <span className="text-3xl font-bold">1.2</span>
                  <span className="text-sm opacity-70 block">Liters</span>
                </div>
             </div>
             <button className="w-full mt-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-xl transition-colors font-medium text-sm">
               + Add Water
             </button>
           </div>
        </div>
      </div>
    </Shell>
  );
}
