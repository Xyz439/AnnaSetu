import { cn } from './Card';

export function Badge({ status, className, ...props }) {
  let statusStyles = "";
  switch (status?.toLowerCase()) {
    case 'available':
      statusStyles = "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)]";
      break;
    case 'accepted':
      statusStyles = "bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed)]";
      break;
    case 'collected':
      statusStyles = "bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)]";
      break;
    case 'distributed':
      statusStyles = "bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed)]";
      break;
    default:
      statusStyles = "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]";
  }

  return (
    <span 
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium font-inter",
        statusStyles,
        className
      )}
      {...props}
    >
      {status}
    </span>
  );
}
