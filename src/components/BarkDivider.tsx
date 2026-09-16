const heights = [26, 38, 30, 44, 28, 40, 24];

export default function BarkDivider({
  flip = false,
  animated = false,
}: {
  flip?: boolean;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 560 56"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-10 w-full sm:h-14 ${flip ? "scale-y-[-1]" : ""}`}
    >
      <line x1="0" y1="50" x2="560" y2="50" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      {heights.map((h, i) => (
        <path
          key={i}
          d={`M${40 + i * 70} 50 C ${40 + i * 70 - 6} ${50 - h}, ${40 + i * 70 + 6} ${50 - h}, ${40 + i * 70} ${50 - h - 4}`}
          stroke={i % 2 === 0 ? "var(--color-forest-400)" : "var(--color-bark-500)"}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          pathLength={animated ? 1 : undefined}
          style={
            animated
              ? {
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: `bark-draw 0.9s ${0.15 * i}s ease-out forwards`,
                }
              : undefined
          }
        />
      ))}
      {animated ? (
        <style>{`
          @keyframes bark-draw {
            to { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            path { animation: none !important; stroke-dashoffset: 0 !important; }
          }
        `}</style>
      ) : null}
    </svg>
  );
}
