import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Clock, 
  CheckCircle,
  TrendingUp,
  MoreVertical
} from "lucide-react";

export default function PractitionerDashboard() {
  return (
    <Shell>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Practice Hub</h1>
          <p className="text-muted-foreground">Manage your clients, appointments, and business growth.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
          + New Client
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                 <Users className="w-6 h-6" />
               </div>
               <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">
                 <TrendingUp className="w-3 h-3" /> +12%
               </span>
            </div>
            <h3 className="text-3xl font-bold">142</h3>
            <p className="text-sm text-muted-foreground">Active Clients</p>
         </div>

         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                 <Calendar className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">8</h3>
            <p className="text-sm text-muted-foreground">Upcoming Today</p>
         </div>

         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                 <DollarSign className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">$12.4k</h3>
            <p className="text-sm text-muted-foreground">Revenue (Mo)</p>
         </div>

         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
                 <Briefcase className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">Orbit</h3>
            <p className="text-sm text-muted-foreground">Staffing Status: Active</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[500px]">
         {/* Appointment Schedule */}
         <div className="lg:col-span-8 p-6 rounded-3xl glass-panel border border-white/10 overflow-y-auto">
            <h3 className="font-medium text-lg mb-6">Today's Schedule</h3>
            <div className="space-y-3">
               {[
                 { time: "09:00 AM", client: "Sarah Miller", type: "Initial Consultation", status: "Completed" },
                 { time: "10:30 AM", client: "David Chen", type: "Follow-up", status: "In Progress" },
                 { time: "01:00 PM", client: "Emily Davis", type: "Ayurvedic Assessment", status: "Upcoming" },
                 { time: "02:30 PM", client: "Michael Wilson", type: "Integration Session", status: "Upcoming" },
               ].map((app, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-20 text-sm font-mono text-muted-foreground">{app.time}</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                      {app.client.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium group-hover:text-primary transition-colors">{app.client}</h4>
                      <p className="text-xs text-muted-foreground">{app.type}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" :
                      app.status === "In Progress" ? "bg-blue-500/10 text-blue-400 animate-pulse" :
                      "bg-white/10 text-muted-foreground"
                    }`}>
                      {app.status}
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                 </div>
               ))}
            </div>
         </div>

         {/* Quick Actions / Franchise Info */}
         <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-indigo-950/20 border border-indigo-500/20">
               <h3 className="font-medium text-indigo-100 mb-4">Franchise Tenant Status</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-200/60">Business Profile</span>
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-200/60">Payment Gateway</span>
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Stripe Active</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-indigo-200/60">Orbit Payroll</span>
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Synced</span>
                  </div>
               </div>
               <button className="w-full mt-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                 Manage Business
               </button>
            </div>
         </div>
      </div>
    </Shell>
  );
}
