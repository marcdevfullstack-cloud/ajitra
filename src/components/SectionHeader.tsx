export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-500">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-ink-600">{lead}</p> : null}
    </div>
  );
}
