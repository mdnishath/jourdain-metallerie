const items = [
  "Escaliers",
  "Portails",
  "Portes",
  "Garde-corps",
  "Clôtures",
  "Serrurerie",
  "Sur mesure",
  "100 % métal",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/8 bg-iron/40 py-4 backdrop-blur-sm"
    >
      <div className="marquee-track flex w-max whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display flex items-center text-2xl uppercase tracking-[0.12em] text-chrome/70 md:text-3xl"
          >
            <span className="px-6">{t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          </span>
        ))}
      </div>
    </div>
  );
}
