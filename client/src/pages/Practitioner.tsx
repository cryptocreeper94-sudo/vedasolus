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
  MoreVertical,
  UserPlus,
  FileText,
  CreditCard,
  Shield,
  Building2,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const mockStaff = [
  { id: "doc_001", name: "Dr. Sarah Chen", role: "Acupuncturist", status: "active", rate: "$85/hr" },
  { id: "doc_002", name: "Dr. Michael Patel", role: "Ayurvedic Physician", status: "active", rate: "$120/hr" },
  { id: "cont_001", name: "Lisa Thompson", role: "Massage Therapist", status: "active", rate: "$65/hr" },
  { id: "emp_001", name: "James Wilson", role: "Front Desk", status: "active", rate: "$22/hr" },
];

const mockTimesheets = [
  { staff: "Dr. Sarah Chen", date: "2025-01-15", hours: 8, total: "$680" },
  { staff: "Dr. Michael Patel", date: "2025-01-15", hours: 6, total: "$720" },
  { staff: "Lisa Thompson", date: "2025-01-15", hours: 7, total: "$455" },
  { staff: "James Wilson", date: "2025-01-15", hours: 8, total: "$176" },
];

export default function PractitionerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: orbitStatus } = useQuery({
    queryKey: ["/api/orbit/status"],
    queryFn: async () => {
      const res = await fetch("/api/orbit/status");
      return res.json();
    },
    refetchInterval: 30000,
  });

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
               <button className="w-full mt-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors" data-testid="button-manage-business">
                 Manage Business
               </button>
            </div>
         </div>
      </div>

      {/* Orbit Staff Management Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-cyan-500/30">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Orbit Staff Management</h2>
              <p className="text-xs text-slate-400">
                Connected to Orbit Staffing • 
                <span className={orbitStatus?.connected ? "text-emerald-400 ml-1" : "text-orange-400 ml-1"}>
                  {orbitStatus?.connected ? "● Live" : "○ Connecting..."}
                </span>
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10" data-testid="button-sync-orbit">
            <RefreshCw className="w-4 h-4 mr-2" /> Sync Now
          </Button>
        </div>

        <Tabs defaultValue="staff" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 p-1 mb-6" data-testid="tabs-orbit">
            <TabsTrigger value="staff" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Users className="w-4 h-4 mr-2" /> Staff
            </TabsTrigger>
            <TabsTrigger value="timesheets" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400">
              <FileText className="w-4 h-4 mr-2" /> Timesheets
            </TabsTrigger>
            <TabsTrigger value="payroll" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              <CreditCard className="w-4 h-4 mr-2" /> Payroll
            </TabsTrigger>
            <TabsTrigger value="certifications" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400">
              <Shield className="w-4 h-4 mr-2" /> Certifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4" data-testid="content-staff">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-400">Manage your practitioners, contractors, and employees</p>
              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600" data-testid="button-add-staff">
                <UserPlus className="w-4 h-4 mr-2" /> Add Staff
              </Button>
            </div>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Rate</th>
                    <th className="p-4">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockStaff.map((staff) => (
                    <tr key={staff.id} className="border-t border-white/5 hover:bg-white/5 transition-colors" data-testid={`row-staff-${staff.id}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-xs font-bold">
                            {staff.name.charAt(0)}
                          </div>
                          <span className="font-medium text-white">{staff.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-300">{staff.role}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          staff.id.startsWith("doc") ? "bg-blue-500/20 text-blue-400" :
                          staff.id.startsWith("cont") ? "bg-orange-500/20 text-orange-400" :
                          "bg-emerald-500/20 text-emerald-400"
                        }`}>
                          {staff.id.startsWith("doc") ? "1099" : staff.id.startsWith("cont") ? "Contractor" : "W-2"}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-mono text-cyan-400">{staff.rate}</td>
                      <td className="p-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">Active</span>
                      </td>
                      <td className="p-4">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="timesheets" className="space-y-4" data-testid="content-timesheets">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-400">Track hours worked and sync with Orbit payroll</p>
              <Button size="sm" className="bg-violet-500 hover:bg-violet-600" data-testid="button-add-timesheet">
                <Clock className="w-4 h-4 mr-2" /> Log Hours
              </Button>
            </div>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Staff Member</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Hours</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Sync Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTimesheets.map((entry, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors" data-testid={`row-timesheet-${i}`}>
                      <td className="p-4 font-medium text-white">{entry.staff}</td>
                      <td className="p-4 text-sm text-slate-300">{entry.date}</td>
                      <td className="p-4 text-sm font-mono text-violet-400">{entry.hours}h</td>
                      <td className="p-4 text-sm font-mono text-emerald-400">{entry.total}</td>
                      <td className="p-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" /> Synced
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-4" data-testid="content-payroll">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">This Pay Period</p>
                <p className="text-3xl font-bold text-emerald-400">$4,231</p>
                <p className="text-xs text-slate-400 mt-1">Jan 1 - Jan 15, 2025</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-pink-500/5 border border-violet-500/20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Hours</p>
                <p className="text-3xl font-bold text-violet-400">156h</p>
                <p className="text-xs text-slate-400 mt-1">Across 4 staff members</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Next Payout</p>
                <p className="text-3xl font-bold text-cyan-400">Jan 20</p>
                <p className="text-xs text-slate-400 mt-1">Via Orbit Direct Deposit</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white">Payroll Actions</h3>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">Orbit Connected</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4 border-white/10" data-testid="button-run-payroll">
                  <CreditCard className="w-5 h-5 mr-3 text-emerald-400" />
                  <div className="text-left">
                    <p className="font-medium">Run Payroll</p>
                    <p className="text-xs text-slate-400">Process payments via Orbit</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 border-white/10" data-testid="button-view-reports">
                  <FileText className="w-5 h-5 mr-3 text-violet-400" />
                  <div className="text-left">
                    <p className="font-medium">Payroll Reports</p>
                    <p className="text-xs text-slate-400">View history and exports</p>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4" data-testid="content-certifications">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-400">Track medical licenses, certifications, and compliance</p>
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600" data-testid="button-add-cert">
                <Shield className="w-4 h-4 mr-2" /> Add Certification
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Dr. Sarah Chen", cert: "Acupuncture License", number: "ACU-TN-12345", expires: "2026-06-15", status: "valid" },
                { name: "Dr. Michael Patel", cert: "Ayurvedic Medicine", number: "AYU-TN-67890", expires: "2025-03-01", status: "expiring" },
                { name: "Lisa Thompson", cert: "LMT License", number: "LMT-TN-11111", expires: "2025-12-31", status: "valid" },
              ].map((cert, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5" data-testid={`card-cert-${i}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-white">{cert.name}</h4>
                      <p className="text-sm text-slate-400">{cert.cert}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cert.status === "valid" ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
                    }`}>
                      {cert.status === "valid" ? "Valid" : "Expiring Soon"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>#{cert.number}</span>
                    <span>Expires: {cert.expires}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Shell>
  );
}
