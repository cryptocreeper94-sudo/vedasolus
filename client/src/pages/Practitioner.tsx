import { Shell } from "@/components/layout/Shell";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Clock, 
  CheckCircle,
  UserPlus,
  FileText,
  CreditCard,
  Shield,
  Building2,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function PractitionerDashboard() {
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
        <button disabled className="px-4 py-2 bg-primary/40 text-primary-foreground/60 rounded-xl font-medium text-sm cursor-not-allowed" title="Client intake form — planned feature">
          + New Client
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                 <Users className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-muted-foreground">No clients yet</p>
         </div>

         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                 <Calendar className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">0</h3>
            <p className="text-sm text-muted-foreground">No appointments</p>
         </div>

         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                 <DollarSign className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">$0</h3>
            <p className="text-sm text-muted-foreground">Revenue (Mo)</p>
         </div>

         <div className="p-6 rounded-3xl glass-card border border-white/10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400">
                 <Briefcase className="w-6 h-6" />
               </div>
            </div>
            <h3 className="text-3xl font-bold">Orbit</h3>
            <p className="text-sm text-muted-foreground">Staffing Status: Standby</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 h-[500px]">
         {/* Appointment Schedule */}
         <div className="lg:col-span-8 p-6 rounded-3xl glass-panel border border-white/10 overflow-y-auto">
            <h3 className="font-medium text-lg mb-6">Today's Schedule</h3>
            <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)] text-center">
              <div className="p-4 bg-purple-500/10 rounded-2xl mb-4">
                <Calendar className="w-10 h-10 text-purple-400/60" />
              </div>
              <p className="text-muted-foreground text-sm">No appointments scheduled today</p>
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
               <button disabled className="w-full mt-6 py-3 bg-indigo-500/40 text-white/60 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed" data-testid="button-manage-business" title="Full business management dashboard coming Q3">
                 Business Manager (Coming Q3)
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
                  <tr>
                    <td colSpan={6} className="p-12">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="p-4 bg-cyan-500/10 rounded-2xl mb-4">
                          <Users className="w-10 h-10 text-cyan-400/60" />
                        </div>
                        <p className="text-muted-foreground text-sm">No staff members yet. Add your first team member to get started.</p>
                      </div>
                    </td>
                  </tr>
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
                  <tr>
                    <td colSpan={5} className="p-12">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="p-4 bg-violet-500/10 rounded-2xl mb-4">
                          <Clock className="w-10 h-10 text-violet-400/60" />
                        </div>
                        <p className="text-muted-foreground text-sm">No timesheets recorded yet.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-4" data-testid="content-payroll">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">This Pay Period</p>
                <p className="text-3xl font-bold text-emerald-400">$0</p>
                <p className="text-xs text-slate-400 mt-1">No pay period active</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-pink-500/5 border border-violet-500/20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Hours</p>
                <p className="text-3xl font-bold text-violet-400">0h</p>
                <p className="text-xs text-slate-400 mt-1">No hours logged</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Next Payout</p>
                <p className="text-3xl font-bold text-cyan-400">—</p>
                <p className="text-xs text-slate-400 mt-1">No payout scheduled</p>
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
              <div className="md:col-span-2 p-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 bg-pink-500/10 rounded-2xl mb-4">
                    <Shield className="w-10 h-10 text-pink-400/60" />
                  </div>
                  <p className="text-muted-foreground text-sm">No certifications tracked yet.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Shell>
  );
}
