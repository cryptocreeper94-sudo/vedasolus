import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto",
        "auto-rows-[minmax(160px,auto)] sm:auto-rows-[minmax(180px,auto)] md:auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  children,
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
  glow = "cyan",
}: {
  className?: string;
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
  glow?: "cyan" | "pink" | "emerald" | "violet" | "orange";
}) => {
  const glowColors = {
    cyan: "from-cyan-500/20 to-cyan-500/5",
    pink: "from-pink-500/20 to-pink-500/5",
    emerald: "from-emerald-500/20 to-emerald-500/5",
    violet: "from-violet-500/20 to-violet-500/5",
    orange: "from-orange-500/20 to-orange-500/5",
  };

  const glowAccent = {
    cyan: "bg-cyan-500/30",
    pink: "bg-pink-500/30",
    emerald: "bg-emerald-500/30",
    violet: "bg-violet-500/30",
    orange: "bg-orange-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.08 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl flex flex-col justify-between p-4 sm:p-5 md:p-6",
        "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]",
        "hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300",
        colSpan === 2 ? "sm:col-span-2" : "col-span-1",
        colSpan === 3 ? "sm:col-span-2 lg:col-span-3" : "",
        rowSpan === 2 ? "row-span-2" : "row-span-1",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        glowColors[glow]
      )} />
      
      <div className={cn(
        "absolute -right-16 -top-16 w-32 h-32 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-all duration-500",
        glowAccent[glow]
      )} />
      <div className={cn(
        "absolute -left-16 -bottom-16 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-all duration-500",
        glowAccent[glow]
      )} />
      
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]" />
      
      <div className="relative z-10 h-full flex flex-col min-w-0">
        {children}
      </div>
    </motion.div>
  );
};
