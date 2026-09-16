import Image from "next/image";
import type { Event } from "@/lib/data";

export default function EventCard({
  event,
  priority = false,
  reverse = false,
}: {
  event: Event;
  priority?: boolean;
  reverse?: boolean;
}) {
  const meta = [event.time, event.place].filter(Boolean);

  return (
    <article
      className={`group grid overflow-hidden rounded-md border border-ink-900/10 bg-white shadow-sm transition-shadow hover:shadow-xl sm:grid-cols-2 ${
        reverse ? "sm:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[280px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority={priority}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-bark-700">
          {event.dateLabel}
        </p>
        <h3 className="mt-2 text-balance font-display text-2xl font-bold leading-tight text-ink-900 sm:text-[1.75rem]">
          {event.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-600">
          {meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <p className="mt-4 max-w-prose text-ink-600">{event.description}</p>
      </div>
    </article>
  );
}
