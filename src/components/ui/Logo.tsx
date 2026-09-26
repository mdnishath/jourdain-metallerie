import { brand } from "@/config/brand";

/**
 * Logo provisoire. Quand le client aura son nouveau logo :
 *   1. déposer le fichier dans /public/brand/
 *   2. renseigner brand.logo = "/brand/mon-logo.svg"
 * Le composant bascule automatiquement sur l'image.
 */
export default function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (brand.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.logo}
        alt={brand.name}
        className={`h-9 w-auto ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="lg-steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4f5f7" />
            <stop offset="0.5" stopColor="#9aa0a8" />
            <stop offset="1" stopColor="#e6e9ee" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="31"
          height="31"
          rx="4"
          stroke="url(#lg-steel)"
          strokeWidth="1.5"
        />
        {/* stylised "J" welded from two bars */}
        <path
          d="M12 8h12v4h-4v11.5c0 3.6-2.6 6-6.2 6C10.5 29.5 8 27.2 8 23.6h4c0 1.5.8 2.3 1.9 2.3 1.2 0 2.1-.9 2.1-2.4V12h-4V8Z"
          fill="url(#lg-steel)"
        />
        <circle cx="26" cy="26" r="2.4" fill="#ff6a1a" />
        <circle cx="26" cy="26" r="4.5" fill="#ff6a1a" opacity="0.25" />
      </svg>
      {!compact && (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="font-display text-[1.65rem] leading-none tracking-wide text-white">
            {brand.name}
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-mist">
            Métallerie · Serrurerie
          </span>
        </span>
      )}
    </span>
  );
}
