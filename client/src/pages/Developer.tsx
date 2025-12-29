import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Code, 
  Map, 
  BarChart3, 
  FileText, 
  GitBranch, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  Globe,
  Shield,
  Database,
  Users,
  Brain,
  Wallet,
  Activity,
  Target,
  Calendar,
  ChevronRight,
  Server,
  Cpu,
  Terminal
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis } from "recharts";
import { Link } from "wouter";

const roadmapPhases = [
  {
    id: "phase1",
    title: "Foundation",
    status: "completed",
    quarter: "Q4 2024",
    progress: 100,
    color: "emerald",
    milestones: [
      { name: "User Authentication (Replit Auth)", status: "done" },
      { name: "Health Tracking (Sleep, Diet, Exercise)", status: "done" },
      { name: "Stripe Payment Integration", status: "done" },
      { name: "AI Wellness Coach (OpenAI + ElevenLabs)", status: "done" },
      { name: "Health Passport with QR Codes", status: "done" },
    ]
  },
  {
    id: "phase2",
    title: "Intelligence & Personalization",
    status: "in_progress",
    quarter: "Q1 2025",
    progress: 45,
    color: "cyan",
    milestones: [
      { name: "Dosha Analysis Engine", status: "done" },
      { name: "Personalized Insights Dashboard", status: "done" },
      { name: "TCM Meridian Tracking", status: "pending" },
      { name: "Advanced Analytics", status: "in_progress" },
      { name: "Apple HealthKit Integration", status: "pending" },
      { name: "FHIR Medical Records API", status: "pending" },
    ]
  },
  {
    id: "phase3",
    title: "Ecosystem Growth",
    status: "upcoming",
    quarter: "Q2 2025",
    progress: 0,
    color: "pink",
    milestones: [
      { name: "Practitioner Marketplace Launch", status: "pending" },
      { name: "In-App Messaging System", status: "pending" },
      { name: "Community Tribes Feature", status: "pending" },
      { name: "Video Consultations", status: "pending" },
      { name: "Practitioner Verification System", status: "pending" },
    ]
  },
  {
    id: "phase4",
    title: "Web3 & Enterprise",
    status: "upcoming",
    quarter: "Q3 2025",
    progress: 0,
    color: "violet",
    milestones: [
      { name: "Dark Wave Smart Chain Integration", status: "pending" },
      { name: "Orbit Staffing Payroll System", status: "pending" },
      { name: "NFT Health Credentials", status: "pending" },
      { name: "Enterprise API Access", status: "pending" },
      { name: "HIPAA Compliance Certification", status: "pending" },
    ]
  },
  {
    id: "phase5",
    title: "Native Mobile Apps",
    status: "upcoming",
    quarter: "Q1 2025",
    progress: 0,
    color: "orange",
    milestones: [
      { name: "Day 1: Expo/React Native project setup", status: "pending" },
      { name: "Day 2: Navigation & Shell layout", status: "pending" },
      { name: "Day 3: Dashboard & Home screen", status: "pending" },
      { name: "Day 4: Health tracking screens (Sleep, Diet, Exercise)", status: "pending" },
      { name: "Day 5: AI Wellness Coach integration", status: "pending" },
      { name: "Day 6: Health Passport & QR codes", status: "pending" },
      { name: "Day 7: Authentication flow (Firebase)", status: "pending" },
      { name: "Day 8: Stripe native payments", status: "pending" },
      { name: "Day 9: Push notifications setup", status: "pending" },
      { name: "Day 10: Practitioner marketplace", status: "pending" },
      { name: "Day 11: Messages & Community", status: "pending" },
      { name: "Day 12: Settings & Profile screens", status: "pending" },
      { name: "Day 13: Testing & bug fixes", status: "pending" },
      { name: "Day 14: Google Play submission", status: "pending" },
      { name: "Future: Apple Developer account & iOS build", status: "pending" },
    ]
  },
];

const analyticsData = {
  users: { total: 1247, growth: "+23%", active: 892 },
  revenue: { mrr: "$4,890", growth: "+18%", subscribers: 156 },
  engagement: { avgSession: "8.2 min", streak: "5.4 days", logs: 3420 },
  ai: { conversations: 892, avgLength: "6.2 msg", satisfaction: "94%" },
};

const usageData = [
  { time: "00:00", requests: 2400 },
  { time: "04:00", requests: 1398 },
  { time: "08:00", requests: 9800 },
  { time: "12:00", requests: 15200 },
  { time: "16:00", requests: 12400 },
  { time: "20:00", requests: 8900 },
  { time: "23:59", requests: 4300 },
];

const geoData = [
  { region: "NA", users: 45000 },
  { region: "EU", users: 32000 },
  { region: "AS", users: 28000 },
  { region: "SA", users: 12000 },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    done: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    in_progress: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    pending: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    upcoming: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  };
  
  const icons: Record<string, any> = {
    done: CheckCircle2,
    in_progress: Clock,
    pending: AlertCircle,
    completed: CheckCircle2,
    upcoming: Rocket,
  };
  
  const Icon = icons[status] || AlertCircle;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${styles[status] || styles.pending}`}>
      <Icon className="w-3 h-3" />
      {status.replace("_", " ")}
    </span>
  );
}

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("roadmap");

  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-500/30">
              <Code className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Developer Core</h1>
              <p className="text-cyan-300/70 text-sm">Strategic Command Center • PIN: 0424</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-md flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM OPTIMAL
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400" data-testid="tab-roadmap">
            <Map className="w-4 h-4 mr-2" /> Roadmap
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400" data-testid="tab-analytics">
            <BarChart3 className="w-4 h-4 mr-2" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400" data-testid="tab-system">
            <Server className="w-4 h-4 mr-2" /> System
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400" data-testid="tab-docs">
            <FileText className="w-4 h-4 mr-2" /> Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6" data-testid="content-roadmap">
          <BentoGrid>
            <BentoCard colSpan={3} className="bg-gradient-to-br from-cyan-500/5 to-violet-500/5 border-cyan-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-cyan-400" /> Product Roadmap
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Overall Progress</span>
                  <span className="text-sm font-bold text-cyan-400">36%</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {roadmapPhases.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          phase.color === "emerald" ? "bg-emerald-500/20" :
                          phase.color === "cyan" ? "bg-cyan-500/20" :
                          phase.color === "pink" ? "bg-pink-500/20" :
                          "bg-violet-500/20"
                        }`}>
                          <span className="text-lg font-bold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{phase.title}</h3>
                          <p className="text-xs text-slate-400">{phase.quarter}</p>
                        </div>
                      </div>
                      <StatusBadge status={phase.status} />
                    </div>
                    
                    <Progress value={phase.progress} className="h-2 mb-4" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {phase.milestones.map((milestone) => (
                        <div
                          key={milestone.name}
                          className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                            milestone.status === "done"
                              ? "bg-emerald-500/10 text-emerald-300"
                              : milestone.status === "in_progress"
                              ? "bg-cyan-500/10 text-cyan-300"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          {milestone.status === "done" ? (
                            <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          ) : milestone.status === "in_progress" ? (
                            <Clock className="w-3 h-3 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          )}
                          <span className="truncate">{milestone.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </BentoCard>
          </BentoGrid>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6" data-testid="content-analytics">
          <BentoGrid>
            <BentoCard className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 border-cyan-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Total Users</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-total-users">{analyticsData.users.total}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400">{analyticsData.users.growth} this month</span>
                <span className="text-slate-400">{analyticsData.users.active} active</span>
              </div>
            </BentoCard>

            <BentoCard className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 border-pink-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white" data-testid="text-mrr">{analyticsData.revenue.mrr}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400">{analyticsData.revenue.growth} growth</span>
                <span className="text-slate-400">{analyticsData.revenue.subscribers} subscribers</span>
              </div>
            </BentoCard>

            <BentoCard className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border-violet-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Avg Session</p>
                  <p className="text-2xl font-bold text-white">{analyticsData.engagement.avgSession}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400">Avg streak: {analyticsData.engagement.streak}</span>
                <span className="text-slate-400">{analyticsData.engagement.logs} logs</span>
              </div>
            </BentoCard>

            <BentoCard colSpan={2} className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-400" /> AI Coach Performance
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <p className="text-2xl font-bold text-white">{analyticsData.ai.conversations}</p>
                  <p className="text-xs text-slate-400">Conversations</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <p className="text-2xl font-bold text-white">{analyticsData.ai.avgLength}</p>
                  <p className="text-xs text-slate-400">Avg Length</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <p className="text-2xl font-bold text-cyan-400">{analyticsData.ai.satisfaction}</p>
                  <p className="text-xs text-slate-400">Satisfaction</p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">12.5%</p>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                Free → Paid conversion
              </div>
            </BentoCard>
          </BentoGrid>
        </TabsContent>

        <TabsContent value="system" className="space-y-6" data-testid="content-system">
          <BentoGrid>
            <BentoCard colSpan={2} rowSpan={2} className="bg-black/40 border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" /> API REQUEST VOLUME
                </h3>
                <div className="flex gap-4 text-xs font-mono">
                  <span className="text-emerald-400">24h Peak: 15.2k req/s</span>
                  <span className="text-muted-foreground">Avg Latency: 42ms</span>
                </div>
              </div>
              
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <defs>
                      <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', fontFamily: 'monospace' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="requests" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorReq)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </BentoCard>

            <BentoCard className="bg-white/5 border-white/5">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Cpu className="w-5 h-5 text-blue-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">CPU Load</span>
                    <span className="text-xl font-mono text-blue-400">12%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Database className="w-5 h-5 text-purple-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">DB Conn</span>
                    <span className="text-xl font-mono text-purple-400">842</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Server className="w-5 h-5 text-orange-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Uptime</span>
                    <span className="text-xl font-mono text-orange-400">99.99%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/20 flex flex-col justify-between">
                  <Globe className="w-5 h-5 text-cyan-400 mb-2" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Edge</span>
                    <span className="text-xl font-mono text-cyan-400">Global</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="font-mono text-xs">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                <Terminal className="w-4 h-4" />
                <span>LATEST DEPLOYMENT</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-emerald-500" />
                  <span className="text-white">main</span>
                  <span className="opacity-50">7f2a1b...</span>
                </div>
                <div className="pl-7 opacity-70">
                  feat: implement AI wellness coach with ElevenLabs
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-500">Build Passing</span>
                  <span className="ml-auto opacity-50">2m ago</span>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="relative overflow-hidden">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">ACTIVE NODES</h3>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geoData}>
                    <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                      {geoData.map((_, index) => (
                        <Cell key={`cell-${index}`} fillOpacity={0.4 + (index * 0.15)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-xs font-mono mt-2 opacity-50">
                <span>NA</span>
                <span>EU</span>
                <span>ASIA</span>
                <span>SA</span>
              </div>
            </BentoCard>

            <BentoCard colSpan={2} className="bg-black/60 border-white/10">
              <h3 className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Code className="w-4 h-4" /> DEVELOPER CONSOLE
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-flush-cache">
                  <span className="block text-xs text-muted-foreground mb-1">Cache</span>
                  <span className="text-sm font-mono group-hover:text-red-400">FLUSH ALL</span>
                </button>
                <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-migrate-db">
                  <span className="block text-xs text-muted-foreground mb-1">Database</span>
                  <span className="text-sm font-mono group-hover:text-orange-400">MIGRATE</span>
                </button>
                <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-export-logs">
                  <span className="block text-xs text-muted-foreground mb-1">Logs</span>
                  <span className="text-sm font-mono group-hover:text-blue-400">EXPORT</span>
                </button>
                <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group" data-testid="button-restart-system">
                  <span className="block text-xs text-muted-foreground mb-1">System</span>
                  <span className="text-sm font-mono group-hover:text-emerald-400">RESTART</span>
                </button>
              </div>
            </BentoCard>
          </BentoGrid>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6" data-testid="content-docs">
          <BentoGrid>
            <BentoCard colSpan={3} className="bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border-violet-500/20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-violet-400" /> Documentation Hub
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "API Reference", icon: Code, desc: "REST endpoints and authentication", color: "cyan", href: null },
                  { title: "Integration Guides", icon: Zap, desc: "FHIR, HealthKit, Blockchain", color: "emerald", href: null },
                  { title: "Security & Compliance", icon: Shield, desc: "HIPAA, data protection policies", color: "pink", href: null },
                  { title: "Database Schema", icon: Database, desc: "Drizzle ORM models and relations", color: "violet", href: null },
                  { title: "Business Plan", icon: Target, desc: "Strategic overview and projections", color: "orange", href: "/business-plan" },
                  { title: "Employee Onboarding", icon: Users, desc: "Partner/staff welcome presentation", color: "pink", href: null },
                  { title: "Release Notes", icon: Calendar, desc: "Version history and changelog", color: "slate", href: null },
                ].map((doc) => {
                  const content = (
                    <motion.div
                      key={doc.title}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${
                        doc.color === "cyan" ? "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40" :
                        doc.color === "emerald" ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40" :
                        doc.color === "pink" ? "bg-pink-500/5 border-pink-500/20 hover:border-pink-500/40" :
                        doc.color === "violet" ? "bg-violet-500/5 border-violet-500/20 hover:border-violet-500/40" :
                        doc.color === "orange" ? "bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40" :
                        "bg-slate-500/5 border-slate-500/20 hover:border-slate-500/40"
                      }`}
                      data-testid={`doc-${doc.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          doc.color === "cyan" ? "bg-cyan-500/20" :
                          doc.color === "emerald" ? "bg-emerald-500/20" :
                          doc.color === "pink" ? "bg-pink-500/20" :
                          doc.color === "violet" ? "bg-violet-500/20" :
                          doc.color === "orange" ? "bg-orange-500/20" :
                          "bg-slate-500/20"
                        }`}>
                          <doc.icon className={`w-5 h-5 ${
                            doc.color === "cyan" ? "text-cyan-400" :
                            doc.color === "emerald" ? "text-emerald-400" :
                            doc.color === "pink" ? "text-pink-400" :
                            doc.color === "violet" ? "text-violet-400" :
                            doc.color === "orange" ? "text-orange-400" :
                            "text-slate-400"
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{doc.title}</h3>
                          <p className="text-xs text-slate-400">{doc.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </motion.div>
                  );
                  
                  return doc.href ? (
                    <Link key={doc.title} href={doc.href}>{content}</Link>
                  ) : (
                    <div key={doc.title}>{content}</div>
                  );
                })}
              </div>
            </BentoCard>
          </BentoGrid>
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
