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
            
            <div className="p-8 rounded-xl border border-dashed border-white/20 text-center">
              <Flag className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium mb-1">No flagged content</p>
              <p className="text-xs text-muted-foreground">Content moderation queue is empty. Flagged items will appear here.</p>
            </div>
         </BentoCard>

         <BentoCard>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <UserX className="w-4 h-4 text-muted-foreground" /> User Management
            </h3>
            <div className="space-y-2">
               <button disabled title="User search — planned feature" className="w-full p-3 text-left rounded-xl border border-transparent opacity-40 cursor-not-allowed">
                 <span className="block font-medium">Search User Database</span>
                 <span className="text-xs text-muted-foreground">Find by ID, Email, or Wallet</span>
               </button>
               <button disabled title="Ban/suspension logs — planned feature" className="w-full p-3 text-left rounded-xl border border-transparent opacity-40 cursor-not-allowed">
                 <span className="block font-medium">Ban / Suspension Logs</span>
                 <span className="text-xs text-muted-foreground">View active restrictions</span>
               </button>
               <button disabled title="Verification override — planned feature" className="w-full p-3 text-left rounded-xl border border-transparent opacity-40 cursor-not-allowed">
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
             <button disabled title="CSV export — planned feature" className="w-full py-2 bg-white/10 rounded-lg text-sm opacity-40 cursor-not-allowed">Download CSV</button>
         </BentoCard>
      </BentoGrid>
    </Shell>
  );
}
