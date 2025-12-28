import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Users, MessageCircle, Flame, Leaf, Sparkles } from "lucide-react";

const tribes = [
  {
    name: "Paleo Ancestral",
    members: "12.4k",
    desc: "Returning to human biological roots through diet and movement.",
    active: true,
    color: "text-orange-400",
    bg: "bg-orange-500/20"
  },
  {
    name: "Vipassana Sitters",
    members: "8.2k",
    desc: "Daily silent meditation practice and Dhamma discussion.",
    active: true,
    color: "text-purple-400",
    bg: "bg-purple-500/20"
  },
  {
    name: "Biohacker Collective",
    members: "24.1k",
    desc: "Quantified self, longevity protocols, and cold exposure.",
    active: true,
    color: "text-cyan-400",
    bg: "bg-cyan-500/20"
  }
];

export default function Community() {
  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <h1 className="text-4xl font-serif font-medium mb-2">The Tribes</h1>
        <p className="text-muted-foreground">
          Healing does not happen in isolation. Find your people, share your wisdom.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           {/* Create Post */}
           <div className="p-4 rounded-3xl glass-panel flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <div className="flex-1">
                 <input 
                   type="text" 
                   placeholder="Share an insight or question..." 
                   className="w-full bg-transparent border-none focus:outline-none text-lg placeholder:text-muted-foreground/50 mb-4"
                 />
                 <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                       <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Leaf className="w-5 h-5 text-emerald-400" /></button>
                       <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Sparkles className="w-5 h-5 text-amber-400" /></button>
                    </div>
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
                      Post
                    </button>
                 </div>
              </div>
           </div>

           {/* Feed Items */}
           {[1, 2, 3].map((i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-6 rounded-3xl glass-card border border-white/5"
             >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-white/10" />
                   <div>
                      <h4 className="font-medium">Sarah J.</h4>
                      <p className="text-xs text-muted-foreground">Biohacker Collective • 2h ago</p>
                   </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 text-white/80">
                   Just completed a 72-hour fast. The mental clarity around hour 48 was insane. Has anyone else experienced that "pop" where the brain fog just completely evaporates?
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                   <button className="flex items-center gap-1 hover:text-primary transition-colors"><Flame className="w-4 h-4" /> 243</button>
                   <button className="flex items-center gap-1 hover:text-primary transition-colors"><MessageCircle className="w-4 h-4" /> 42</button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="p-6 rounded-3xl bg-black/40 border border-white/10">
              <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Active Tribes
              </h3>
              <div className="space-y-4">
                 {tribes.map((tribe) => (
                    <div key={tribe.name} className="group cursor-pointer">
                       <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${tribe.bg} ${tribe.color}`}>
                             <Users className="w-4 h-4" />
                          </div>
                          <div>
                             <h4 className="font-medium group-hover:text-primary transition-colors">{tribe.name}</h4>
                             <p className="text-xs text-muted-foreground">{tribe.members} members</p>
                          </div>
                       </div>
                       <p className="text-xs text-muted-foreground pl-11 line-clamp-1">{tribe.desc}</p>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs uppercase tracking-widest transition-colors">
                Explore All
              </button>
           </div>
        </div>
      </div>
    </Shell>
  );
}
