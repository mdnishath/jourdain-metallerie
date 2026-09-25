import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember/70 focus-visible:ring-offset-2 focus-visible:ring-offset-iron select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-iron hover:bg-flame hover:shadow-glow active:translate-y-px",
  ghost:
    "border border-chrome/25 text-white hover:border-chrome/60 hover:bg-white/5 active:translate-y-px",
  link: "text-ember hover:text-flame underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-7 text-base",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const cls = `${base} ${variants[variant]} ${variant === "link" ? "" : sizes[size]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
