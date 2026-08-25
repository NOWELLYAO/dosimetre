import { useState } from "react";
import { ALCOHOL_TYPES } from "../data/database";
import { pureAlcoholGrams, totalKcal, standardUnits, formatNumber } from "../utils/calc";
import GaugeBar from "./GaugeBar";

function newEntry(idx) {
  const t = ALCOHOL_TYPES[idx % ALCOHOL_TYPES.length];
  return { key: crypto.randomUUID(), typeId: t.id, abv: t.abv, volume: t.defVol, qty: 1, sucre: t.sucre100 };
}

export default function DrinkComparator() {
  const [entries, setEntries] = useState([newEntry(4), newEntry(0)]);

  function update(key, patch) {
    setEntries((es) => es.map((e) => (e.key === key ? { ...e, ...patch } : e)));
  }
  function setType(key, typeId) {
    const t = ALCOHOL_TYPES.find((x) => x.id === typeId);
    update(key, { typeId, abv: t.abv, volume: t.defVol, sucre: t.sucre100 });
  }
  function addEntry() {
    if (entries.length >= 5) return;
    setEntries((es) => [...es, newEntry(es.length)]);
  }
  function removeEntry(key) {
    setEntries((es) => (es.length > 1 ? es.filter((e) => e.key !== key) : es));
  }

  const computed = entries.map((e) => {
    const totalVol = e.volume * e.qty;
    const g = pureAlcoholGrams(totalVol, e.abv);
    const kcal = totalKcal(totalVol, e.abv, e.sucre);
    const units = standardUnits(totalVol, e.abv, 10);
    const type = ALCOHOL_TYPES.find((t) => t.id === e.typeId);
    return { ...e, totalVol, g, kcal, units, type };
  });

  const maxG = Math.max(...computed.map((c) => c.g), 1);
  const maxKcal = Math.max(...computed.map((c) => c.kcal), 1);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-copper font-mono mb-1">Instrument 02</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Comparateur de boissons</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          Place jusqu'à 5 boissons côte à côte — vin, bière, spiritueux — pour comparer l'alcool pur et les
          calories réellement consommées.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {computed.map((c) => (
          <div key={c.key} className="bg-panel border border-line rounded-sm p-5 space-y-4 relative">
            {entries.length > 1 && (
              <button
                onClick={() => removeEntry(c.key)}
                className="absolute top-3 right-3 text-muted hover:text-alert text-xs font-mono"
                aria-label="Retirer"
              >
                ✕
              </button>
            )}
            <select
              value={c.typeId}
              onChange={(e) => setType(c.key, e.target.value)}
              className="input-num"
            >
              {ALCOHOL_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.emoji} {t.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-3 gap-2">
              <label className="block">
                <span className="block text-[10px] uppercase text-muted font-mono mb-1">Titrage %</span>
                <input type="number" step="0.5" value={c.abv} onChange={(e) => update(c.key, { abv: Number(e.target.value) })} className="input-num" />
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase text-muted font-mono mb-1">Vol. ml</span>
                <input type="number" step="5" value={c.volume} onChange={(e) => update(c.key, { volume: Number(e.target.value) })} className="input-num" />
              </label>
              <label className="block">
                <span className="block text-[10px] uppercase text-muted font-mono mb-1">Qté</span>
                <input type="number" min="1" step="1" value={c.qty} onChange={(e) => update(c.key, { qty: Number(e.target.value) })} className="input-num" />
              </label>
            </div>

            <div className="tick-divider" />

            <GaugeBar label="Alcool pur" value={c.g} max={maxG} unit="g" color="copper" />
            <GaugeBar label="Calories" value={c.kcal} max={maxKcal} unit="kcal" color="sage" />
            <div className="flex justify-between text-xs font-mono text-muted pt-1">
              <span>{formatNumber(c.totalVol, 0)} ml total</span>
              <span>{formatNumber(c.units, 1)} unités FR</span>
            </div>
          </div>
        ))}

        {entries.length < 5 && (
          <button
            onClick={addEntry}
            className="border border-dashed border-line rounded-sm p-5 text-muted hover:text-copperLight hover:border-copper transition-colors flex items-center justify-center font-mono text-sm min-h-[220px]"
          >
            + Ajouter une boisson
          </button>
        )}
      </div>

      {computed.length >= 2 && (
        <div className="bg-panel2 border border-line rounded-sm p-5">
          <p className="text-sm text-paper font-mono">
            {(() => {
              const sorted = [...computed].sort((a, b) => b.g - a.g);
              const top = sorted[0];
              const bottom = sorted[sorted.length - 1];
              const ratio = bottom.g > 0 ? (top.g / bottom.g).toFixed(1) : "∞";
              return `${top.type.emoji} ${top.type.name} apporte ${ratio}× plus d'alcool pur que ${bottom.type.emoji} ${bottom.type.name} dans les quantités saisies.`;
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
