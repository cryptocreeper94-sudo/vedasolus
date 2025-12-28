import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { 
  Users, 
  Activity, 
  Server, 
  Database, 
  Globe, 
  Cpu, 
  Code,
  GitBranch,
  Terminal
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis, YAxis } from "recharts";

const usageData = [
  { time: "00:00", requests: 2400, errors: 12 },
  { time: "04:00", requests: 1398, errors: 8 },
  { time: "08:00", requests: 9800, errors: 45 },
  { time: "12:00", requests: 15200, errors: 23 },
  { time: "16:00", requests: 12400, errors: 34 },
  { time: "20:00", requests: 8900, errors: 15 },
  { time: "23:59", requests: 4300, errors: 9 },
];

const geoData = [
  { region: "NA", users: 45000 },
  { region: "EU", users: 32000 },
  { region: "AS", users: 28000 },
  { region: "SA", users: 12000 },
];

export default function DeveloperDashboard() {
  return (
    <Shell>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2 text-emerald-400">System Core</h1>
          <p className="text-muted-foreground font-mono text-sm">Owner Access Level • Node: ZEN-MAIN-01</p>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-md flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
             SYSTEM OPTIMAL
           </div>
        </div>
      </div>

      <BentoGrid>
        {/* Main Traffic Graph (Replit Style) */}
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

        {/* Vital Stats Grid */}
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

        {/* Code / Deployment Status */}
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
               feat: implement health passport protocol v2
             </div>
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <span className="text-emerald-500">Build Passing</span>
               <span className="ml-auto opacity-50">2m ago</span>
             </div>
           </div>
        </BentoCard>

        {/* User Geography */}
        <BentoCard className="relative overflow-hidden">
           <h3 className="font-mono text-sm text-muted-foreground mb-4">ACTIVE NODES</h3>
           <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={geoData}>
                 <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                   {geoData.map((entry, index) => (
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

        {/* Action Console */}
        <BentoCard colSpan={2} className="bg-black/60 border-white/10">
           <h3 className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
             <Code className="w-4 h-4" /> DEVELOPER CONSOLE
           </h3>
           <div className="grid grid-cols-4 gap-4">
              <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group">
                <span className="block text-xs text-muted-foreground mb-1">Cache</span>
                <span className="text-sm font-mono group-hover:text-red-400">FLUSH ALL</span>
              </button>
              <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group">
                <span className="block text-xs text-muted-foreground mb-1">Database</span>
                <span className="text-sm font-mono group-hover:text-orange-400">MIGRATE</span>
              </button>
              <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group">
                <span className="block text-xs text-muted-foreground mb-1">Logs</span>
                <span className="text-sm font-mono group-hover:text-blue-400">EXPORT</span>
              </button>
              <button className="p-3 rounded-lg border border-white/10 hover:bg-white/5 text-left transition-colors group">
                <span className="block text-xs text-muted-foreground mb-1">System</span>
                <span className="text-sm font-mono group-hover:text-emerald-400">RESTART</span>
              </button>
           </div>
        </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
