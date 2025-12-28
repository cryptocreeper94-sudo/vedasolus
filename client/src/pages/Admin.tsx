import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  UserX, 
  Flag, 
  Settings, 
  FileText
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <Shell>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2 text-rose-400">Admin Control</h1>
          <p className="text-muted-foreground">Platform moderation, user management, and compliance.</p>
        </div>
      </div>

      <BentoGrid>
         <BentoCard colSpan={2} className="bg-rose-950/10 border-rose-500/20">
            <h3 className="font-medium text-rose-300 mb-6 flex items-center gap-2">
              <Flag className="w-5 h-5" /> Flagged Content Queue
            </h3>
            
            <div className="space-y-3">
              {[
                { type: "Post", user: "User_892", reason: "Potential Medical Misinformation", severity: "High" },
                { type: "Profile", user: "Healer_Test", reason: "Unverified Credentials", severity: "Medium" },
                { type: "Comment", user: "Anon_22", reason: "Spam / Bot Behavior", severity: "Low" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                   <div>
                     <span className="text-xs uppercase bg-white/10 px-2 py-1 rounded text-muted-foreground mr-3">{item.type}</span>
                     <span className="font-medium text-white/90">{item.reason}</span>
                     <p className="text-xs text-muted-foreground mt-1">Reported by System • {item.user}</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className={`text-xs font-bold ${item.severity === "High" ? "text-rose-500" : "text-amber-500"}`}>
                       {item.severity} Priority
                     </span>
                     <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs">Review</button>
                   </div>
                </div>
              ))}
            </div>
         </BentoCard>

         <BentoCard>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <UserX className="w-4 h-4 text-muted-foreground" /> User Management
            </h3>
            <div className="space-y-2">
               <button className="w-full p-3 text-left rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                 <span className="block font-medium">Search User Database</span>
                 <span className="text-xs text-muted-foreground">Find by ID, Email, or Wallet</span>
               </button>
               <button className="w-full p-3 text-left rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                 <span className="block font-medium">Ban / Suspension Logs</span>
                 <span className="text-xs text-muted-foreground">View active restrictions</span>
               </button>
               <button className="w-full p-3 text-left rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                 <span className="block font-medium">Verification Override</span>
                 <span className="text-xs text-muted-foreground">Manually verify practitioners</span>
               </button>
            </div>
         </BentoCard>

         <BentoCard className="bg-white/5">
             <h3 className="font-medium mb-4 flex items-center gap-2">
               <FileText className="w-4 h-4" /> Compliance Reports
             </h3>
             <p className="text-sm text-muted-foreground mb-4">
               Generate monthly compliance reports for Orbit Staffing.io audit logs.
             </p>
             <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm">Download CSV</button>
         </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
