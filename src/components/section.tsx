import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <div className={cn("px-4 sm:px-8 md:px-16 border-b", className)}>
      {children}
    </div>
  );
};
