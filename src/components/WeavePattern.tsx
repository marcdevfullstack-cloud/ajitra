export default function WeavePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="ajtra-weave"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(8)"
        >
          <path d="M-8 36 C 10 8, 46 8, 64 36 C 82 64, 118 64, 136 36" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M-8 58 C 10 30, 46 30, 64 58 C 82 86, 118 86, 136 58" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ajtra-weave)" />
    </svg>
  );
}
