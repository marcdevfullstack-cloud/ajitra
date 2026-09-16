import Image from "next/image";
import type { BureauMember } from "@/lib/data";

export default function BureauCard({ member }: { member: BureauMember }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-ink-900/10 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {member.photoUrl ? (
        <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full border border-ink-900/10">
          <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-forest-100 font-display text-xl font-bold text-forest-600">
          {member.name.trim().charAt(0).toUpperCase() || "?"}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-forest-500">
          {member.role}
        </p>
        <p className="mt-1 truncate font-display text-lg font-semibold text-ink-900">
          {member.name}
        </p>
        {member.memberSince ? (
          <p className="mt-0.5 text-xs text-ink-400">Membre depuis {member.memberSince}</p>
        ) : null}
      </div>
    </div>
  );
}
