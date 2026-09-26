import { brand } from "@/config/brand";
import { PhoneIcon } from "./Nav";

export default function StickyMobileBar() {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-iron/92 px-3 pt-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={brand.phones[0].href}
          className="flex h-12 items-center justify-center gap-2 rounded-md border border-chrome/30 text-sm font-semibold text-white"
        >
          <PhoneIcon /> Appeler
        </a>
        <a
          href="#contact"
          className="flex h-12 items-center justify-center rounded-md bg-ember text-sm font-semibold text-iron"
        >
          Demander un devis
        </a>
      </div>
    </div>
  );
}
