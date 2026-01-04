import { Shell } from "@/components/layout/Shell";
import { motion } from "framer-motion";
import { Users, MessageCircle, Flame, Leaf, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: string;
  tribe: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
}

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

const initialPosts: Post[] = [
  {
    id: "1",
    author: "Sarah J.",
    tribe: "Biohacker Collective",
    content: "Just completed a 72-hour fast. The mental clarity around hour 48 was insane. Has anyone else experienced that \"pop\" where the brain fog just completely evaporates?",
    time: "2h ago",
    likes: 243,
    comments: 42
  },
  {
    id: "2",
    author: "Marcus T.",
    tribe: "Paleo Ancestral",
    content: "Started cold plunging every morning at 5am. Week 3 and my energy levels are through the roof. Anyone else notice improved sleep quality?",
    time: "4h ago",
    likes: 189,
    comments: 28
  },
  {
    id: "3",
    author: "Elena R.",
    tribe: "Vipassana Sitters",
    content: "Day 45 of my meditation streak. The stillness is becoming more natural. Grateful for this community.",
    time: "6h ago",
    likes: 312,
    comments: 56
  }
];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handlePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Empty Post",
        description: "Please write something before posting.",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to post in the community.",
        variant: "destructive"
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      author: user?.name || "You",
      tribe: "Biohacker Collective",
      content: newPost,
      time: "Just now",
      likes: 0,
      comments: 0
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Posted!",
      description: "Your insight has been shared with the tribe."
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const handleExploreAll = () => {
    toast({
      title: "Tribes Directory",
      description: "Full tribe discovery coming soon! For now, explore the featured tribes on this page."
    });
  };

  return (
    <Shell>
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/10">
        <h1 className="text-2xl sm:text-4xl font-serif font-medium mb-2">The Tribes</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Healing does not happen in isolation. Find your people, share your wisdom.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           {/* Create Post */}
           <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl glass-panel flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm sm:text-base">
                {user?.name?.[0] || "?"}
              </div>
              <div className="flex-1 min-w-0">
                 <input 
                   type="text" 
                   value={newPost}
                   onChange={(e) => setNewPost(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && handlePost()}
                   placeholder="Share an insight or question..." 
                   data-testid="input-community-post"
                   className="w-full bg-transparent border-none focus:outline-none text-base sm:text-lg placeholder:text-muted-foreground/50 mb-3 sm:mb-4"
                 />
                 <div className="flex justify-between items-center">
                    <div className="flex gap-1 sm:gap-2">
                       <button className="p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"><Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /></button>
                       <button className="p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation"><Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /></button>
                    </div>
                    <button 
                      onClick={handlePost}
                      data-testid="button-post"
                      className="px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors touch-manipulation"
                    >
                      Post
                    </button>
                 </div>
              </div>
           </div>

           {/* Feed Items */}
           {posts.map((post) => (
             <motion.div 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/5"
               data-testid={`post-${post.id}`}
             >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                   <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-500/50 to-emerald-500/50 flex items-center justify-center font-bold text-sm sm:text-base">
                     {post.author[0]}
                   </div>
                   <div className="min-w-0">
                      <h4 className="font-medium text-sm sm:text-base truncate">{post.author}</h4>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{post.tribe} • {post.time}</p>
                   </div>
                </div>
                <p className="text-sm leading-relaxed mb-3 sm:mb-4 text-white/80">
                   {post.content}
                </p>
                <div className="flex gap-4 text-xs text-muted-foreground">
                   <button 
                     onClick={() => handleLike(post.id)}
                     data-testid={`button-like-${post.id}`}
                     className="flex items-center gap-1.5 hover:text-primary transition-colors touch-manipulation py-1"
                   >
                     <Flame className="w-4 h-4" /> {post.likes}
                   </button>
                   <button className="flex items-center gap-1.5 hover:text-primary transition-colors touch-manipulation py-1">
                     <MessageCircle className="w-4 h-4" /> {post.comments}
                   </button>
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
              <button 
                onClick={handleExploreAll}
                data-testid="button-explore-tribes"
                className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs uppercase tracking-widest transition-colors"
              >
                Explore All
              </button>
           </div>
        </div>
      </div>
    </Shell>
  );
}
