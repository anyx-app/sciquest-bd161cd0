import React from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = true,
  ...props 
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
        "dark:bg-slate-900/50 dark:border-white/10",
        hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/70",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
