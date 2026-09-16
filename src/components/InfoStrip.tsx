export default function InfoStrip({
  meetings,
}: {
  meetings: { frequency: string; time: string; place: string };
}) {
  const cells = [
    { label: "Réunions", value: meetings.frequency },
    { label: "Heure", value: meetings.time },
    { label: "Lieu", value: meetings.place },
  ];

  return (
    <div className="grid overflow-hidden rounded-md border border-ink-900/10 bg-white shadow-sm sm:grid-cols-3">
      {cells.map((cell, i) => (
        <div
          key={cell.label}
          className={`px-6 py-5 ${i > 0 ? "border-t border-ink-900/10 sm:border-t-0 sm:border-l" : ""}`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-forest-500">
            {cell.label}
          </p>
          <p className="mt-1.5 font-display text-lg font-semibold text-ink-900">
            {cell.value}
          </p>
        </div>
      ))}
    </div>
  );
}
