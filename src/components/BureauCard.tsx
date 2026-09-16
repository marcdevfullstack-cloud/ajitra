import type { BureauMember } from "@/lib/data";

export default function BureauCard({ member }: { member: BureauMember }) {
  return (
    <div className="rounded-md border border-ink-900/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-forest-500">
        {member.role}
      </p>
      <p className="mt-1.5 font-display text-lg font-semibold text-ink-900">
        {member.name}
      </p>
    </div>
  );
}
