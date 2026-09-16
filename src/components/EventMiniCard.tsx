import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/data";

export default function EventMiniCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/evenements#${event.id}`}
      className="group block overflow-hidden rounded-md border border-ink-900/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-bark-700">
          {event.dateLabel}
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-display text-lg font-bold leading-snug text-ink-900 group-hover:text-forest-600">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-ink-600">{event.place}</p>
      </div>
    </Link>
  );
}
