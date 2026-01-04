import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Search, Star, MapPin, ShieldCheck, Zap, Flower2, HeartHandshake, Globe, Video, MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BookingDialog } from "@/components/ui/booking-dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const healers = [
  {
    id: 1,
    name: "Dr. Elena Vasquez",
    title: "Naturopathic Physician (ND)",
    specialty: "Hormonal Balance & Gut Health",
    location: "Austin, TX (Remote Available)",
    rating: 4.9,
    reviews: 124,
    verified: true,
    hourlyRate: 175,
    tags: ["Functional Medicine", "Herbalism", "Nutrition"],
    image: "bg-emerald-500/20",
    icon: Flower2,
    color: "text-emerald-400",
    availableRemote: true
  },
  {
    id: 2,
    name: "Master Jun Wei",
    title: "TCM Practitioner & Acupuncturist",
    specialty: "Chronic Pain & Qi Stagnation",
    location: "Vancouver, BC",
    rating: 5.0,
    reviews: 89,
    verified: true,
    hourlyRate: 150,
    tags: ["Acupuncture", "Cupping", "Herbs"],
    image: "bg-red-500/20",
    icon: Zap,
    color: "text-red-400",
    availableRemote: true
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    title: "Somatic Trauma Therapist",
    specialty: "Nervous System Regulation",
    location: "London, UK (Remote)",
    rating: 4.8,
    reviews: 56,
    verified: true,
    hourlyRate: 125,
    tags: ["Somatic Experiencing", "Breathwork", "Polyvagal"],
    image: "bg-indigo-500/20",
    icon: HeartHandshake,
    color: "text-indigo-400",
    availableRemote: true
  },
  {
    id: 4,
    name: "Dr. Ravi Sharma",
    title: "Ayurvedic Vaidya",
    specialty: "Digestive Health & Dosha Balancing",
    location: "Mumbai, India (Remote)",
    rating: 4.9,
    reviews: 203,
    verified: true,
    hourlyRate: 100,
    tags: ["Ayurveda", "Panchakarma", "Herbal Medicine"],
    image: "bg-amber-500/20",
    icon: Flower2,
    color: "text-amber-400",
    availableRemote: true
  },
  {
    id: 5,
    name: "Dr. Maya Chen",
    title: "Integrative Medicine MD",
    specialty: "Autoimmune & Chronic Fatigue",
    location: "San Francisco, CA",
    rating: 4.7,
    reviews: 178,
    verified: true,
    hourlyRate: 250,
    tags: ["Integrative Medicine", "Functional Testing", "IV Therapy"],
    image: "bg-cyan-500/20",
    icon: Zap,
    color: "text-cyan-400",
    availableRemote: true
  }
];

export default function Marketplace() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleBook = (booking: any) => {
    toast({
      title: "Booking Request Sent",
      description: `Your session has been scheduled. Check your email for confirmation.`,
    });
  };

  const handleMessage = (healerId: number, healerName: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to message practitioners.",
        variant: "destructive"
      });
      return;
    }
    window.location.href = `/messages`;
  };

  const handleApply = () => {
    toast({
      title: "Practitioner Application",
      description: "Our verification process uses on-chain credentials. Application portal opening soon!",
    });
  };

  const filteredHealers = healers.filter(healer => {
    const matchesFilter = filter === "All" || healer.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()));
    const matchesSearch = searchQuery === "" || 
      healer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      healer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      healer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <Shell>
      <div className="mb-8 p-6 rounded-3xl glass-card border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-serif font-medium mb-2">The Bazaar</h1>
            <p className="text-muted-foreground">
              A sovereign marketplace of verified healers. Exercise your freedom to choose the care that resonates with you.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground">
             <Globe className="w-3 h-3" />
             <span>GLOBAL PRACTITIONER NETWORK</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Find healers, specialists, or modalities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-practitioners"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scroll-hidden">
          {["All", "Naturopathy", "TCM", "Ayurveda", "Somatic", "Energy"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-testid={`button-filter-${cat.toLowerCase()}`}
              className={cn(
                "px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors",
                filter === cat 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "bg-white/5 hover:bg-white/10 text-muted-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHealers.map((healer) => (
          <motion.div
            key={healer.id}
            whileHover={{ y: -5 }}
            className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
            data-testid={`card-practitioner-${healer.id}`}
          >
            {/* Holographic Header */}
            <div className={cn("h-24 relative overflow-hidden", healer.image)}>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
               <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 text-xs border border-white/10">
                 <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                 <span>{healer.rating}</span>
                 <span className="opacity-50">({healer.reviews})</span>
               </div>
               {healer.availableRemote && (
                 <div className="absolute top-4 left-4 bg-emerald-500/20 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 text-xs border border-emerald-500/30 text-emerald-300">
                   <Video className="w-3 h-3" />
                   <span>Remote</span>
                 </div>
               )}
            </div>

            <div className="p-6 relative -mt-10">
               <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                 <healer.icon className={cn("w-8 h-8", healer.color)} />
               </div>

               <div className="flex justify-between items-start mb-2">
                 <div>
                   <h3 className="text-xl font-serif font-bold group-hover:text-primary transition-colors">{healer.name}</h3>
                   <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{healer.title}</p>
                 </div>
                 {healer.verified && (
                   <div className="text-emerald-400" title="Verified Practitioner">
                     <ShieldCheck className="w-5 h-5" />
                   </div>
                 )}
               </div>

               <p className="text-sm text-white/80 mb-4 h-10 line-clamp-2">
                 Specializing in {healer.specialty}.
               </p>

               <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                 <div className="flex items-center gap-2">
                   <MapPin className="w-3 h-3" />
                   {healer.location}
                 </div>
                 <span className="text-primary font-bold">${healer.hourlyRate}/hr</span>
               </div>

               <div className="flex flex-wrap gap-2 mb-6">
                 {healer.tags.map(tag => (
                   <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded-md border border-white/5 text-white/60">
                     {tag}
                   </span>
                 ))}
               </div>

               <div className="flex gap-2">
                 <BookingDialog 
                   practitioner={healer}
                   onBook={handleBook}
                   trigger={
                     <button className="flex-1 py-3 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all font-medium text-sm flex items-center justify-center gap-2">
                       Book Now
                     </button>
                   }
                 />
                 <button 
                   onClick={() => handleMessage(healer.id, healer.name)}
                   className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                   data-testid={`button-message-${healer.id}`}
                 >
                   <MessageCircle className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </motion.div>
        ))}
        
        {/* Call to Action Card for Providers */}
        <div className="relative border border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer min-h-[400px]">
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
             <HeartHandshake className="w-8 h-8 text-muted-foreground" />
           </div>
           <h3 className="text-lg font-serif mb-2">Are you a Healer?</h3>
           <p className="text-sm text-muted-foreground max-w-xs mb-6">
             Join our sovereign network. Verification is done on-chain to ensure trust without centralized gatekeepers.
           </p>
           <button 
             onClick={handleApply}
             className="text-sm font-medium text-primary hover:underline"
             data-testid="button-apply-practitioner"
           >
             Apply for Verification &rarr;
           </button>
        </div>
      </div>
    </Shell>
  );
}
