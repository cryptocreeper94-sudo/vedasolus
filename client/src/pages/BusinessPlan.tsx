import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Globe, 
  Shield, 
  Wallet,
  Zap,
  Heart,
  Building,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Download,
  Share2,
  Leaf,
  Brain,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const marketData = {
  tam: "$150B",
  sam: "$28B",
  som: "$850M",
  cagr: "12.4%",
};

const revenueProjections = [
  { year: "2025", mrr: "$15K", users: "5,000", tier: "Early" },
  { year: "2026", mrr: "$120K", users: "25,000", tier: "Growth" },
  { year: "2027", mrr: "$500K", users: "100,000", tier: "Scale" },
  { year: "2028", mrr: "$2M", users: "500,000", tier: "Enterprise" },
];

const teamRoles = [
  { role: "Founder/CEO", name: "Jason", status: "Active", focus: "Vision & Strategy" },
  { role: "Lead Developer", name: "AI Agent", status: "Active", focus: "Full-Stack Development" },
  { role: "Wellness Director", name: "TBD", status: "Hiring", focus: "Content & Practitioner Relations" },
  { role: "Marketing Lead", name: "TBD", status: "Hiring", focus: "Growth & Community" },
];

const milestones = [
  { date: "Q4 2024", milestone: "MVP Launch", status: "completed" },
  { date: "Q1 2025", milestone: "AI Coach Integration", status: "completed" },
  { date: "Q2 2025", milestone: "Practitioner Marketplace", status: "in_progress" },
  { date: "Q3 2025", milestone: "Blockchain Integration", status: "pending" },
  { date: "Q4 2025", milestone: "Enterprise API Launch", status: "pending" },
  { date: "Q1 2026", milestone: "Series A Funding", status: "pending" },
];

export default function BusinessPlan() {
  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center border border-orange-500/30">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Business Plan</h1>
              <p className="text-orange-300/70 text-sm">Strategic Overview • Dark Wave Studios LLC</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5" data-testid="button-download-plan">
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5" data-testid="button-share-plan">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </motion.div>

      <BentoGrid>
        <BentoCard colSpan={2} className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 border-cyan-500/20">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" /> Executive Summary
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">Zenith</strong> is a holistic health platform that bridges ancient Eastern wisdom 
              (Ayurveda, Traditional Chinese Medicine) with modern Western science, empowering users to achieve 
              optimal wellness through personalized, AI-driven guidance.
            </p>
            <p>
              Our platform combines health tracking, practitioner marketplace, blockchain-verified credentials, 
              and conversational AI coaching to create an unprecedented wellness ecosystem.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">1M+</p>
                <p className="text-xs text-slate-400">Target Users (2026)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-400">$2M</p>
                <p className="text-xs text-slate-400">ARR Goal (2028)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">4</p>
                <p className="text-xs text-slate-400">Revenue Streams</p>
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-violet-400" /> Market Opportunity
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">TAM (Global Wellness)</span>
              <span className="text-lg font-bold text-violet-400">{marketData.tam}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">SAM (Digital Health)</span>
              <span className="text-lg font-bold text-pink-400">{marketData.sam}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">SOM (Holistic Apps)</span>
              <span className="text-lg font-bold text-cyan-400">{marketData.som}</span>
            </div>
            <div className="pt-3 border-t border-white/10">
              <span className="text-xs text-slate-400">Market CAGR</span>
              <span className="ml-2 text-emerald-400 font-bold">{marketData.cagr}</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard colSpan={3} className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 border-pink-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-pink-400" /> Value Proposition
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Leaf, title: "Eastern Wisdom", desc: "Ayurveda & TCM integrated into daily routines", color: "emerald" },
              { icon: Brain, title: "AI Coaching", desc: "Personalized guidance with voice interaction", color: "cyan" },
              { icon: Shield, title: "Data Sovereignty", desc: "Blockchain-verified health credentials", color: "violet" },
              { icon: MessageCircle, title: "Practitioner Access", desc: "Connect with verified holistic healers", color: "pink" },
            ].map((item) => (
              <div key={item.title} className={`p-4 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20`}>
                <item.icon className={`w-8 h-8 text-${item.color}-400 mb-3`} />
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard colSpan={2} className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" /> Revenue Projections
          </h3>
          <div className="space-y-4">
            {revenueProjections.map((proj, i) => (
              <div key={proj.year} className="flex items-center gap-4">
                <div className="w-16 text-center">
                  <span className="text-sm font-bold text-white">{proj.year}</span>
                </div>
                <div className="flex-1">
                  <Progress value={((i + 1) / 4) * 100} className="h-2" />
                </div>
                <div className="w-20 text-right">
                  <span className="text-sm font-bold text-emerald-400">{proj.mrr}</span>
                  <span className="text-xs text-slate-400 block">{proj.users} users</span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-orange-400" /> Revenue Streams
          </h3>
          <div className="space-y-3">
            {[
              { name: "Subscriptions", pct: 60, color: "cyan" },
              { name: "Marketplace Fees", pct: 25, color: "pink" },
              { name: "Enterprise API", pct: 10, color: "violet" },
              { name: "Premium Content", pct: 5, color: "emerald" },
            ].map((stream) => (
              <div key={stream.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{stream.name}</span>
                  <span className={`text-${stream.color}-400 font-medium`}>{stream.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${stream.color}-400 rounded-full`} 
                    style={{ width: `${stream.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard colSpan={2} className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border-blue-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-400" /> Key Milestones
          </h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
            <div className="space-y-4">
              {milestones.map((item, i) => (
                <div key={item.date} className="flex items-start gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    item.status === "completed" ? "bg-emerald-500/20 border border-emerald-500/40" :
                    item.status === "in_progress" ? "bg-cyan-500/20 border border-cyan-500/40" :
                    "bg-slate-500/20 border border-slate-500/40"
                  }`}>
                    {item.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : item.status === "in_progress" ? (
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{item.date}</span>
                      {item.status === "in_progress" && (
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] rounded-full">Current</span>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${
                      item.status === "completed" ? "text-emerald-300" :
                      item.status === "in_progress" ? "text-white" :
                      "text-slate-400"
                    }`}>
                      {item.milestone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        <BentoCard className="bg-gradient-to-br from-rose-500/10 to-pink-500/5 border-rose-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-rose-400" /> Team
          </h3>
          <div className="space-y-3">
            {teamRoles.map((member) => (
              <div key={member.role} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm font-medium text-white">{member.role}</p>
                  <p className="text-xs text-slate-400">{member.focus}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  member.status === "Active" 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-orange-500/20 text-orange-400"
                }`}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard colSpan={3} className="bg-gradient-to-br from-slate-500/10 to-zinc-500/5 border-slate-500/20">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-slate-400" /> Competitive Advantage
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-cyan-400 mb-2">vs. Headspace/Calm</h4>
              <p className="text-xs text-slate-400">
                We go beyond meditation to include comprehensive health tracking, 
                Ayurvedic analysis, and practitioner connections.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-pink-400 mb-2">vs. MyFitnessPal</h4>
              <p className="text-xs text-slate-400">
                We integrate Eastern wisdom traditions, AI coaching, and blockchain 
                verification that fitness apps lack.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-violet-400 mb-2">vs. Teladoc</h4>
              <p className="text-xs text-slate-400">
                We focus on holistic and preventive care with verified alternative 
                medicine practitioners, not just Western doctors.
              </p>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
