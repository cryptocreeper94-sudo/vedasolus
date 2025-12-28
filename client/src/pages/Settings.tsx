import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Wallet, 
  History, 
  Building2, 
  CheckCircle2, 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "wallet", label: "Wallet & Billing", icon: Wallet },
  { id: "integrations", label: "Integrations", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <Shell>
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-medium mb-2">Configuration</h1>
        <p className="text-muted-foreground">Manage your identity, payments, and system connections.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                 activeTab === tab.id 
                   ? "bg-primary/20 text-primary border border-primary/20" 
                   : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
               )}
             >
               <tab.icon className="w-4 h-4" />
               {tab.label}
             </button>
           ))}
           
           <div className="pt-4 mt-4 border-t border-white/5">
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400/80 hover:text-red-400 transition-colors text-sm">
               <LogOut className="w-4 h-4" />
               Sign Out
             </button>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
           {activeTab === "wallet" && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
             >
                {/* Billing Status */}
                <div className="p-6 rounded-3xl glass-card border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-[100px] rounded-full" />
                   
                   <div className="relative z-10 flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-xl font-medium mb-1">Health Token Balance</h2>
                        <p className="text-3xl font-serif font-bold">2,450 <span className="text-sm font-sans font-normal text-muted-foreground">ZEN</span></p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90">
                        Top Up
                      </button>
                   </div>

                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-black/20 border border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-white/10 rounded-lg">
                             <CreditCard className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-sm font-medium">Visa •••• 4242</p>
                             <p className="text-xs text-muted-foreground">Expires 12/28</p>
                           </div>
                         </div>
                         <button className="text-xs text-primary hover:underline">Edit</button>
                      </div>
                      
                      <button className="p-4 rounded-2xl border border-dashed border-white/20 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
                        <span className="text-xl">+</span> Add Payment Method
                      </button>
                   </div>
                   
                   <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                     <Shield className="w-3 h-3" /> Payments secured by Stripe
                   </p>
                </div>

                {/* Invoices */}
                <div className="p-6 rounded-3xl glass-card border border-white/10">
                   <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                     <History className="w-4 h-4 text-muted-foreground" /> Transaction History
                   </h3>
                   <div className="space-y-1">
                      {[
                        { desc: "Consultation: Dr. Vasquez", date: "Dec 28, 2025", amount: "-$150.00" },
                        { desc: "Premium Membership (Monthly)", date: "Dec 01, 2025", amount: "-$29.00" },
                        { desc: "Herbal Supplement Order", date: "Nov 24, 2025", amount: "-$85.50" }
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
                           <div>
                             <p className="text-sm font-medium">{tx.desc}</p>
                             <p className="text-xs text-muted-foreground">{tx.date}</p>
                           </div>
                           <span className="text-sm font-mono">{tx.amount}</span>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground text-center">View All Transactions</button>
                </div>
             </motion.div>
           )}

           {activeTab === "integrations" && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
             >
                <div className="p-6 rounded-3xl glass-card border border-white/10">
                   <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
                           <Building2 className="w-8 h-8 text-white" />
                         </div>
                         <div>
                           <h2 className="text-xl font-bold">Orbit Staffing.io</h2>
                           <p className="text-sm text-muted-foreground">Central Hub & Payroll System</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" /> CONNECTED
                      </div>
                   </div>
                   
                   <p className="text-sm text-white/80 leading-relaxed mb-6">
                     Your account is fully synchronized with Orbit Staffing. Payroll, invoicing, and provider verification data is being pulled in real-time.
                   </p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-muted-foreground mb-1">Last Sync</p>
                        <p className="font-mono text-sm">Just now</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <p className="font-mono text-sm text-emerald-400">Operational</p>
                      </div>
                   </div>

                   <button className="w-full py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm">
                     Manage Connection Settings
                   </button>
                </div>
             </motion.div>
           )}
           
           {activeTab === "profile" && (
              <div className="p-8 text-center text-muted-foreground border border-dashed border-white/10 rounded-3xl">
                Profile Settings Placeholder
              </div>
           )}

           {activeTab === "notifications" && (
              <div className="p-8 text-center text-muted-foreground border border-dashed border-white/10 rounded-3xl">
                Notification Preferences Placeholder
              </div>
           )}
        </div>
      </div>
    </Shell>
  );
}
