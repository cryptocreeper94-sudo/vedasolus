import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Search, BookOpen, Globe, Fingerprint, ExternalLink, Dna, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const libraryTopics = [
  {
    id: "stress",
    title: "Stress & Anxiety",
    western: {
      concept: "HPA Axis Dysregulation",
      desc: "Chronic activation of the 'fight or flight' response leading to elevated cortisol.",
      remedies: ["CBT", "Magnesium", "Deep Breathing"]
    },
    eastern: {
      concept: "Qi Stagnation (Liver)",
      desc: "Blocked energy flow causing tension, irritability, and constriction.",
      remedies: ["Acupuncture", "Tai Chi", "Chrysanthemum Tea"]
    },
    ayurveda: {
      concept: "Vata Aggravation",
      desc: "Excess air/ether element causing ungroundedness and racing thoughts.",
      remedies: ["Ashwagandha", "Oil Massage (Abhyanga)", "Warm Foods"]
    }
  },
  {
    id: "insomnia",
    title: "Insomnia & Sleep",
    western: {
      concept: "Circadian Rhythm Disruption",
      desc: "Imbalance in melatonin/adenosine cycles often due to blue light.",
      remedies: ["Sleep Hygiene", "Melatonin", "Blue Light Blockers"]
    },
    eastern: {
      concept: "Shen Disturbance",
      desc: "The spirit (Shen) is unsettled and cannot anchor in the heart at night.",
      remedies: ["Jujube Seeds", "Meditation", "Acupressure (Heart 7)"]
    },
    ayurveda: {
      concept: "Rajasic Mind",
      desc: "Overactivity and mental stimulation preventing deep rest.",
      remedies: ["Brahmi", "Warm Milk with Nutmeg", "Yoga Nidra"]
    }
  },
  {
    id: "digestion",
    title: "Digestive Issues",
    western: {
      concept: "Gut Microbiome Imbalance",
      desc: "Dysbiosis or lack of diversity in gut bacteria.",
      remedies: ["Probiotics", "Fiber", "FODMAP Diet"]
    },
    eastern: {
      concept: "Spleen Qi Deficiency",
      desc: "Weakness in the organ system responsible for transformation and transport.",
      remedies: ["Warm Cooked Foods", "Avoid Raw/Cold", "Ginger"]
    },
    ayurveda: {
      concept: "Manda Agni (Low Fire)",
      desc: "Weak digestive fire leading to toxin (Ama) accumulation.",
      remedies: ["Triphala", "Cumin-Coriander-Fennel Tea", "Fasting"]
    }
  }
];

export default function Library() {
  const [selectedTopic, setSelectedTopic] = useState(libraryTopics[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleResourceHub = () => {
    toast({
      title: "Resource Hub",
      description: "Curated external resources and research papers coming soon!"
    });
  };

  const filteredTopics = libraryTopics.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Shell>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">The Codex</h1>
          <p className="text-muted-foreground">A comparative glossary of global healing wisdom.</p>
        </div>
        
        {/* Blockchain Verification Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
           <Fingerprint className="w-3 h-3" />
           <span>VERIFIED ON-CHAIN: BLOCK #892104</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Sidebar List */}
        <div className="lg:col-span-3 flex flex-col gap-4 bg-black/20 rounded-3xl p-4 border border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search conditions..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scroll-hidden">
            {filteredTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all duration-200 text-sm font-medium flex items-center justify-between group",
                  selectedTopic.id === topic.id 
                    ? "bg-primary/20 text-primary border border-primary/20" 
                    : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                )}
              >
                {topic.title}
                {selectedTopic.id === topic.id && (
                  <motion.div layoutId="activeIndicator" className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Comparison */}
        <div className="lg:col-span-9 flex flex-col gap-6 overflow-y-auto pr-2 pb-20 scroll-hidden">
           {/* Blockchain Metadata for Topic */}
           <div className="flex items-center justify-between text-xs text-muted-foreground font-mono px-2">
              <span>TOPIC HASH: 0x7f...3a2b</span>
              <span className="flex items-center gap-1 text-emerald-500/80"><Globe className="w-3 h-3" /> UNIVERSAL ACCESS NODE</span>
           </div>

           <div className="grid md:grid-cols-3 gap-4">
              {/* Western Column */}
              <motion.div 
                key={selectedTopic.id + "west"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-950/20 border border-blue-500/20 rounded-3xl p-6 flex flex-col"
              >
                 <div className="flex items-center gap-3 mb-4 text-blue-300">
                    <Activity className="w-5 h-5" />
                    <h3 className="font-serif text-xl">Western Science</h3>
                 </div>
                 
                 <div className="bg-blue-500/10 rounded-xl p-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-blue-400 opacity-70">Core Concept</span>
                    <p className="font-medium text-blue-100">{selectedTopic.western.concept}</p>
                 </div>
                 
                 <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {selectedTopic.western.desc}
                 </p>

                 <div>
                    <span className="text-xs uppercase tracking-wider text-blue-400 opacity-70 block mb-2">Approaches</span>
                    <div className="flex flex-wrap gap-2">
                       {selectedTopic.western.remedies.map(r => (
                          <span key={r} className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-md border border-blue-500/10">{r}</span>
                       ))}
                    </div>
                 </div>
              </motion.div>

              {/* Eastern Column */}
              <motion.div 
                key={selectedTopic.id + "east"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-950/20 border border-red-500/20 rounded-3xl p-6 flex flex-col"
              >
                 <div className="flex items-center gap-3 mb-4 text-red-300">
                    <Dna className="w-5 h-5" />
                    <h3 className="font-serif text-xl">TCM / Eastern</h3>
                 </div>
                 
                 <div className="bg-red-500/10 rounded-xl p-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-red-400 opacity-70">Core Concept</span>
                    <p className="font-medium text-red-100">{selectedTopic.eastern.concept}</p>
                 </div>
                 
                 <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {selectedTopic.eastern.desc}
                 </p>

                 <div>
                    <span className="text-xs uppercase tracking-wider text-red-400 opacity-70 block mb-2">Approaches</span>
                    <div className="flex flex-wrap gap-2">
                       {selectedTopic.eastern.remedies.map(r => (
                          <span key={r} className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded-md border border-red-500/10">{r}</span>
                       ))}
                    </div>
                 </div>
              </motion.div>

              {/* Ayurveda Column */}
              <motion.div 
                key={selectedTopic.id + "veda"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-amber-950/20 border border-amber-500/20 rounded-3xl p-6 flex flex-col"
              >
                 <div className="flex items-center gap-3 mb-4 text-amber-300">
                    <BookOpen className="w-5 h-5" />
                    <h3 className="font-serif text-xl">Ayurveda</h3>
                 </div>
                 
                 <div className="bg-amber-500/10 rounded-xl p-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-amber-400 opacity-70">Core Concept</span>
                    <p className="font-medium text-amber-100">{selectedTopic.ayurveda.concept}</p>
                 </div>
                 
                 <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {selectedTopic.ayurveda.desc}
                 </p>

                 <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 opacity-70 block mb-2">Approaches</span>
                    <div className="flex flex-wrap gap-2">
                       {selectedTopic.ayurveda.remedies.map(r => (
                          <span key={r} className="text-xs bg-amber-500/20 text-amber-200 px-2 py-1 rounded-md border border-amber-500/10">{r}</span>
                       ))}
                    </div>
                 </div>
              </motion.div>
           </div>
           
           <div className="mt-4 p-4 rounded-xl border border-dashed border-white/10 flex items-center justify-between text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
               <ExternalLink className="w-4 h-4" />
               <span>Want to learn more? Explore our verified external resources.</span>
             </div>
             <button onClick={handleResourceHub} data-testid="button-resource-hub" className="text-primary hover:text-primary/80 transition-colors">View Resource Hub &rarr;</button>
           </div>
        </div>
      </div>
    </Shell>
  );
}
