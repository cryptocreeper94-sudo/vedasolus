import { Shell } from "@/components/layout/Shell";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { 
  Fingerprint, 
  ShieldCheck, 
  Link as LinkIcon, 
  Upload, 
  FileText, 
  Share2, 
  Activity,
  Stethoscope,
  Building2,
  Lock,
  QrCode
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import idTexture from "@assets/generated_images/holographic_secure_digital_identity_texture_with_geometric_patterns.png";
import { cn } from "@/lib/utils";

// 3D Tilt Card Component
const DigitalIDCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, 200], [10, -10]);
  const rotateY = useTransform(x, [0, 340], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(170);
        y.set(100);
      }}
      className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl transition-all duration-200 ease-out group cursor-pointer"
    >
      {/* Holographic Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60 mix-blend-overlay"
        style={{ backgroundImage: `url(${idTexture})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/80 via-black/50 to-emerald-900/80 backdrop-blur-sm" />
      
      {/* Glossy Sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-20 h-full p-6 flex flex-col justify-between text-white font-mono" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
               <Fingerprint className="w-8 h-8 text-emerald-400" />
             </div>
             <div>
               <h3 className="text-sm uppercase tracking-widest opacity-70">Universal Health ID</h3>
               <p className="text-lg font-bold tracking-wider">ZEN-8921-04X</p>
             </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold tracking-wider">
            <ShieldCheck className="w-3 h-3" /> VERIFIED
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase opacity-50 mb-1">Identity Holder</p>
            <p className="text-xl font-sans font-medium">Alex Sterling</p>
            <p className="text-xs opacity-50 mt-1">0x71C...9A23</p>
          </div>
          <div className="p-2 bg-white rounded-lg shadow-lg">
            <QRCodeSVG value="https://zenith-health.replit.app/passport/0x71C" size={64} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ConnectionOption = ({ icon: Icon, title, desc, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -5 }}
    className="relative p-6 rounded-3xl glass-card overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20"
  >
    <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br", color)} />
    <div className="relative z-10 flex flex-col items-center text-center h-full">
       <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", color.replace("from-", "bg-").replace("/20", "/20"))}>
         <Icon className="w-8 h-8 text-white" />
       </div>
       <h3 className="text-lg font-serif font-bold mb-2">{title}</h3>
       <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
       <div className="mt-auto pt-6 w-full">
         <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs uppercase tracking-widest font-medium transition-colors">
           Connect
         </button>
       </div>
    </div>
  </motion.div>
);

export default function HealthPassport() {
  return (
    <Shell>
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-serif font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Health Passport
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Your sovereign health identity. All your records, verified on-chain, fully portable, and under your control.
          </p>
        </div>
        <div className="w-full md:w-auto perspective-1000">
           <DigitalIDCard />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary" /> Data Sources
          </h2>
          <span className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">Protocol: ZEN-V2</span>
        </div>

        {/* Choice Carousel */}
        <div className="grid md:grid-cols-3 gap-6">
           <ConnectionOption 
             icon={Building2}
             title="Provider Login"
             desc="Connect directly to hospital systems (Epic, Cerner) via secure OAuth. We pull and verify your history."
             color="from-blue-500/20 to-cyan-500/20"
           />
           <ConnectionOption 
             icon={Upload}
             title="Direct Upload"
             desc="Have existing PDF records? Upload them here. We hash the document and stamp it on-chain."
             color="from-emerald-500/20 to-teal-500/20"
           />
           <ConnectionOption 
             icon={FileText}
             title="Request Release"
             desc="Generate a formal HIPAA digital request to send to any provider to release records to your wallet."
             color="from-purple-500/20 to-pink-500/20"
           />
        </div>

        {/* Recent Activity / Ledger */}
        <BentoGrid className="mt-8">
          <BentoCard colSpan={2} className="relative overflow-hidden">
             <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="font-medium">On-Chain Activity Ledger</h3>
             </div>
             
             <div className="space-y-4 relative z-10">
               {[
                 { action: "Record Verified", source: "Mercy General", hash: "0x8a...2b1c", time: "2 hrs ago", status: "Confirmed" },
                 { action: "Access Granted", source: "Dr. A. Sharma", hash: "0x1d...9f3e", time: "1 day ago", status: "Active" },
                 { action: "Upload Stamped", source: "Lab Results.pdf", hash: "0x4c...8a2d", time: "3 days ago", status: "Immutable" }
               ].map((tx, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.action}</p>
                        <p className="text-xs text-muted-foreground">{tx.source}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-mono text-emerald-400/80">{tx.hash}</p>
                       <p className="text-[10px] text-muted-foreground">{tx.time}</p>
                    </div>
                 </div>
               ))}
             </div>
          </BentoCard>

          <BentoCard className="bg-indigo-950/20 border-indigo-500/20">
             <div className="flex items-center gap-3 mb-4">
                <Share2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-medium text-indigo-100">Grant Access</h3>
             </div>
             <p className="text-sm text-indigo-200/60 mb-6">
               Securely share your passport with a specialist. Access can be revoked at any time.
             </p>
             
             <div className="space-y-3">
               <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-indigo-300" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Provider Email or ID" 
                    className="bg-transparent text-sm w-full focus:outline-none text-white placeholder:text-indigo-400/50"
                  />
               </div>
               <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-indigo-500/20">
                 Authorize
               </button>
             </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </Shell>
  );
}
