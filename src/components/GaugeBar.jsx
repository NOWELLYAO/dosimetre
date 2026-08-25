import { formatNumber } from "../utils/calc";

export default function GaugeBar({ label, value, max, unit = "", color = "copper", decimals = 1, sub }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const colorMap = {
    copper: "bg-copper",
    sage: "bg-sage",
    alert: "bg-alert",
  };
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs uppercase tracking-wider text-muted font-mono">{label}</span>
        <span className="font-mono text-sm text-paper">
          {formatNumber(value, decimals)}
          <span className="text-muted text-xs ml-0.5">{unit}</span>
          {sub && <span className="text-muted text-xs ml-1.5">{sub}</span>}
        </span>
      </div>
      <div className="relative h-2.5 rounded-sm bg-panel2 border border-line overflow-hidden">
        <div className="absolute inset-0 tick-divider opacity-60" />
        <div
          className={`animate-bar h-full ${colorMap[color] || colorMap.copper} rounded-sm relative`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
