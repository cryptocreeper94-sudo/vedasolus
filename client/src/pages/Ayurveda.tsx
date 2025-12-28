import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Flame, Wind, Droplets, Sun, Moon, Leaf, Sprout } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const doshas = [
  {
    name: "Vata",
    element: "Air & Ether",
    icon: Wind,
    color: "text-blue-300",
    bg: "bg-blue-500/20",
    desc: "The energy of movement. Governs breathing, pulsation, and muscle movement.",
    characteristics: ["Creative", "Quick", "Changeable", "Light", "Dry"]
  },
  {
    name: "Pitta",
    element: "Fire & Water",
    icon: Flame,
    color: "text-orange-300",
    bg: "bg-orange-500/20",
    desc: "The energy of digestion and metabolism. Governs body temperature and intelligence.",
    characteristics: ["Determined", "Sharp", "Hot", "Oily", "Intense"]
  },
  {
    name: "Kapha",
    element: "Earth & Water",
    icon: Droplets,
    color: "text-emerald-300",
    bg: "bg-emerald-500/20",
    desc: "The energy of lubrication and structure. Governs weight, growth, and lubrication.",
    characteristics: ["Calm", "Steady", "Heavy", "Slow", "Cool"]
  }
];

const dailyRoutine = [
  { time: "06:00 - 10:00", phase: "Kapha", activity: "Active movement to counter heaviness" },
  { time: "10:00 - 14:00", phase: "Pitta", activity: "Main meal when digestive fire (Agni) is strongest" },
  { time: "14:00 - 18:00", phase: "Vata", activity: "Creative work and mental clarity" },
  { time: "18:00 - 22:00", phase: "Kapha", activity: "Wind down, light supper" },
  { time: "22:00 - 02:00", phase: "Pitta", activity: "Restorative sleep, liver detox" },
  { time: "02:00 - 06:00", phase: "Vata", activity: "Dreaming, spiritual practice, elimination" }
];

export default function Ayurveda() {
  const [activeDosha, setActiveDosha] = useState("Pitta");

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-medium mb-2">Ayurvedic Wisdom</h1>
        <p className="text-muted-foreground">The science of life (Ayur = Life, Veda = Knowledge). Understanding your unique constitution.</p>
      </div>

      <BentoGrid>
        {/* Dosha Selector/Display */}
        <BentoCard colSpan={3} className="overflow-visible">
          <div className="grid md:grid-cols-3 gap-6 h-full">
            {doshas.map((dosha) => (
              <motion.div
                key={dosha.name}
                onClick={() => setActiveDosha(dosha.name)}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "relative p-6 rounded-2xl border cursor-pointer transition-all duration-300",
                  activeDosha === dosha.name 
                    ? "bg-white/10 border-white/20 shadow-xl" 
                    : "bg-white/5 border-transparent hover:bg-white/10"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-3 rounded-full", dosha.bg)}>
                    <dosha.icon className={cn("w-6 h-6", dosha.color)} />
                  </div>
                  {activeDosha === dosha.name && (
                    <span className="px-2 py-1 text-xs bg-white/20 rounded-full font-medium">Dominant</span>
                  )}
                </div>
                <h3 className="text-2xl font-serif mb-2">{dosha.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">{dosha.element}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{dosha.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {dosha.characteristics.map(char => (
                    <span key={char} className="text-[10px] bg-black/20 px-2 py-1 rounded-md text-white/70">
                      {char}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>

        {/* Dinacharya (Daily Routine) Clock */}
        <BentoCard colSpan={2} rowSpan={2} className="relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 z-10 relative">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" /> Dinacharya (Daily Rhythm)
            </h3>
            <span className="text-xs text-muted-foreground">Current Phase: <span className="text-white font-bold">Kapha</span></span>
          </div>

          <div className="grid gap-2 z-10 relative">
            {dailyRoutine.map((slot, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className="w-24 font-mono text-xs text-muted-foreground">{slot.time}</div>
                <div className={cn(
                  "px-2 py-1 rounded text-[10px] uppercase font-bold w-16 text-center",
                  slot.phase === "Vata" ? "bg-blue-500/20 text-blue-300" :
                  slot.phase === "Pitta" ? "bg-orange-500/20 text-orange-300" :
                  "bg-emerald-500/20 text-emerald-300"
                )}>
                  {slot.phase}
                </div>
                <div className="text-sm truncate">{slot.activity}</div>
              </div>
            ))}
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 rounded-full border-4 border-white/5 z-0" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-48 h-48 rounded-full border-4 border-white/5 z-0" />
        </BentoCard>

        {/* Agni (Digestive Fire) Status */}
        <BentoCard className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                 <p className="font-medium">Agni Status</p>
                 <p className="text-xs text-muted-foreground">Digestive Fire</p>
              </div>
           </div>
           
           <div className="text-center py-6">
             <div className="inline-block relative">
               <Flame className="w-16 h-16 text-orange-500 animate-pulse" />
               <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20" />
             </div>
             <h4 className="text-xl font-serif mt-4">Sama Agni</h4>
             <p className="text-sm text-orange-200/60 mt-2">Balanced digestion. Maintain regular meal times.</p>
           </div>
        </BentoCard>

        {/* Ojas (Vitality) */}
        <BentoCard>
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Sprout className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                 <p className="font-medium">Ojas</p>
                 <p className="text-xs text-muted-foreground">Vital Essence</p>
              </div>
           </div>
           <p className="text-sm text-muted-foreground mb-4">
             Ojas is the subtle essence that maintains immunity and strength.
           </p>
           <div className="space-y-2">
             <div className="flex justify-between text-xs">
               <span>Immunity</span>
               <span className="text-amber-400">High</span>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full w-[85%] bg-amber-500" />
             </div>
             
             <div className="flex justify-between text-xs mt-3">
               <span>Radiance</span>
               <span className="text-amber-400">Building</span>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
               <div className="h-full w-[60%] bg-amber-500/60" />
             </div>
           </div>
        </BentoCard>

        {/* Seasonal Recommendation (Ritucharya) */}
        <BentoCard colSpan={3} className="bg-white/5">
           <div className="flex items-start gap-6">
             <div className="hidden md:block p-4 bg-white/5 rounded-2xl">
               <Leaf className="w-12 h-12 text-green-400" />
             </div>
             <div>
               <h3 className="text-xl font-serif mb-2">Ritucharya (Seasonal Regimen): Hemanta (Late Autumn)</h3>
               <p className="text-muted-foreground mb-4 max-w-2xl">
                 The strength of the digestive fire is high. It is the time to nourish the body with sweet, sour, and salty tastes. Oil massage (Abhyanga) is highly beneficial to counter the dry, cold Vata qualities of the season.
               </p>
               <div className="flex gap-3">
                 <button className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm transition-colors">View Seasonal Diet</button>
                 <button className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm transition-colors">Daily Routines</button>
               </div>
             </div>
           </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
