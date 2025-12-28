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
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
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
}: {
  className?: string;
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl glass-card flex flex-col justify-between p-6",
        colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
        colSpan === 3 ? "md:col-span-3" : "",
        rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-all duration-500" />
      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-secondary/20 rounded-full blur-[50px] group-hover:bg-secondary/30 transition-all duration-500" />
      
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
