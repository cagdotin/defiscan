import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className="mx-auto w-full px-0">
      <div className={cn("border-x px-2 md:px-4", className)}>{children}</div>
    </div>
  );
};
