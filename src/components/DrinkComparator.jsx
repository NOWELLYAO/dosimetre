import { useState } from "react";
import { ALCOHOL_TYPES } from "../data/database";
import { pureAlcoholGrams, totalKcal, standardUnits, formatNumber, clamp } from "../utils/calc";
import GaugeBar from "./GaugeBar";

function newEntry(idx) {
  const t = ALCOHOL_TYPES[idx % ALCOHOL_TYPES.length];
  return {
    key: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2)}`,
    typeId: t.id,
    abv: t.abv,
    volume: t.defVol,
    qty: 1,
    sucre: t.sucre100,
  };
}

export default function DrinkComparator() {
  const [entries, setEntries] = useState([newEntry(4), newEntry(0)]);

  function update(key, patch) {
    setEntries((es) => es.map((e) => (e.key === key ? { ...e, ...patch } : e)));
  }
  function setType(key, typeId) {
    const t = ALCOHOL_TYPES.find((x) => x.id === typeId);
    if (!t) return;
    update(key, { typeId, abv: t.abv, volume: t.defVol, sucre: t.sucre100 });
  }
  function addEntry() {
    if (entries.length < 5) setEntries((es) => [...es, newEntry(es.length)]);
  }
  function removeEntry(key) {
    setEntries((es) => (es.length > 1 ? es.filter((e) => e.key !== key) : es));
  }

  const computed = entries.map((e) => {
    const abv = clamp(e.abv, 0, 60);
    const volume = clamp(e.volume, 0, 10000);
    const qty = clamp(e.qty, 1, 100);
    const sucre = clamp(e.sucre, 0, 100);
    const totalVol = volume * qty;
    const g = pureAlcoholGrams(totalVol, abv);
    const kcal = totalKcal(totalVol, abv, sucre);
    const units = standardUnits(totalVol, abv, 10);
    const type = ALCOHOL_TYPES.find((t) => t.id === e.typeId);
    return { ...e, abv, volume, qty, sucre, totalVol, g, kcal, units, type };
  });

  const maxG = Math.max(...computed.map((c) => c.g), 1);
  const maxKcal = Math.max(...computed.map((c) => c.kcal), 1);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-copper font-mono mb-1">Instrument 02</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Comparateur de boissons</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          Compare jusqu'à 5 boissons selon les quantités réellement saisies : alcool pur, sucres et énergie.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {computed.map((c) => (
          <div key={c.key} className="bg-panel border border-line rounded-sm p-5 space-y-4 relative">
            {entries.length > 1 && (
              <button onClick={() => removeEntry(c.key)}
                className="absolute top-3 right-3 text-muted hover:text-alert text-xs font-mono"
                aria-label="Retirer cette boisson">✕</button>
            )}
            <select value={c.typeId} onChange={(e) => setType(c.key, e.target.value)} className="input-num">
              {ALCOHOL_TYPES.map((t) => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
            </select>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <NumberField label="Titrage %" value={c.abv} onChange={(v) => update(c.key, { abv: v })} min={0} max={60} step={0.5} />
              <NumberField label="Vol. ml" value={c.volume} onChange={(v) => update(c.key, { volume: v })} min={0} max={10000} step={5} />
              <NumberField label="Qté" value={c.qty} onChange={(v) => update(c.key, { qty: v })} min={1} max={100} step={1} />
              <NumberField label="Sucres g/100ml" value={c.sucre} onChange={(v) => update(c.key, { sucre: v })} min={0} max={100} step={0.1} />
            </div>

            <div className="tick-divider" />
            <GaugeBar label="Alcool pur" value={c.g} max={maxG} unit="g" color="copper" />
            <GaugeBar label="Calories" value={c.kcal} max={maxKcal} unit="kcal" color="sage" />
            <div className="flex justify-between text-xs font-mono text-muted pt-1">
              <span>{formatNumber(c.totalVol, 0)} ml total</span>
              <span>{formatNumber(c.units, 1)} unités de 10 g</span>
            </div>
          </div>
        ))}

        {entries.length < 5 && (
          <button onClick={addEntry}
            className="border border-dashed border-line rounded-sm p-5 text-muted hover:text-copperLight hover:border-copper transition-colors flex items-center justify-center font-mono text-sm min-h-[220px]">
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
              if (bottom.g === 0) return `${top.type.emoji} ${top.type.name} contient ${formatNumber(top.g, 1)} g d'alcool pur dans les quantités saisies.`;
              return `${top.type.emoji} ${top.type.name} apporte ${formatNumber(top.g / bottom.g, 1)}× plus d'alcool pur que ${bottom.type.emoji} ${bottom.type.name} dans les quantités saisies.`;
            })()}
          </p>
        </div>
      )}
    </div>
  );
}

function NumberField({ label, value, onChange, min, max, step }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase text-muted font-mono mb-1">{label}</span>
      <input type="number" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(clamp(e.target.value, min, max))} className="input-num" />
    </label>
  );
}
