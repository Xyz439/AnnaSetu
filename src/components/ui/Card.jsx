import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "bg-[var(--color-surface-container-lowest)] rounded-2xl p-6 shadow-[0_8px_32px_rgba(25,28,27,0.04)]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
