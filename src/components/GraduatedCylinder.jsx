import { formatNumber } from "../utils/calc";

// Instrument-style graduated cylinder — signature visual of the app.
// Shows pure-alcohol fill level against total volume, with tick marks like a lab beaker.
export default function GraduatedCylinder({ volumeMl, alcoholMl, abv }) {
  const capacity = Math.max(volumeMl, 50);
  const fillPct = Math.min(100, (volumeMl / capacity) * 100);
  const alcoholPct = Math.min(100, (alcoholMl / capacity) * 100);
  const ticks = 10;

  return (
    <div className="flex items-end gap-6">
      <div className="relative w-24 h-56 shrink-0">
        {/* cylinder body */}
        <svg viewBox="0 0 100 220" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E6A15C" />
              <stop offset="100%" stopColor="#C9762B" />
            </linearGradient>
          </defs>
          {/* outer glass */}
          <rect x="20" y="10" width="60" height="200" rx="4" fill="#182422" stroke="#2C3A36" strokeWidth="2" />
          {/* liquid (total volume) */}
          <rect
            x="22"
            y={210 - fillPct * 1.98}
            width="56"
            height={fillPct * 1.98}
            fill="#3a4a45"
            opacity="0.7"
            className="animate-fill"
          />
          {/* pure alcohol overlay */}
          <rect
            x="22"
            y={210 - alcoholPct * 1.98}
            width="56"
            height={alcoholPct * 1.98}
            fill="url(#liquidGrad)"
            className="animate-fill"
          />
          {/* tick marks */}
          {Array.from({ length: ticks + 1 }).map((_, i) => {
            const y = 10 + (i * 200) / ticks;
            return (
              <g key={i}>
                <line x1="20" y1={y} x2={i % 2 === 0 ? 12 : 16} y2={y} stroke="#8FA39A" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="pb-2 space-y-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted font-mono">Alcool pur</div>
          <div className="font-display text-3xl text-copperLight">{formatNumber(alcoholMl, 1)} ml</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted font-mono">Titrage</div>
          <div className="font-mono text-lg text-paper">{formatNumber(abv, 1)}°</div>
        </div>
      </div>
    </div>
  );
}
