import { useMemo, useState } from 'react';
import { ALCOHOL_TYPES } from '../data/database';
import { pureAlcoholGrams, totalKcal, standardUnits, formatNumber } from '../utils/calc';
import GaugeBar from './GaugeBar';
import NumberField from './NumberField';
import ProductPhoto from './ProductPhoto';
import { drinkImage } from '../utils/images';

function newEntry(idx) {
  const t = ALCOHOL_TYPES[idx % ALCOHOL_TYPES.length];
  const serving = t.servings[0];
  return {
    key: crypto.randomUUID(),
    typeId: t.id,
    abv: t.abv,
    servingLabel: serving.label,
    volume: serving.ml,
    qty: 1,
    sucre: t.sucre100,
  };
}

export default function DrinkComparator() {
  const [entries, setEntries] = useState([newEntry(4), newEntry(0)]);

  const update = (key, patch) =>
    setEntries((es) => es.map((e) => (e.key === key ? { ...e, ...patch } : e)));

  const setType = (key, id) => {
    const t = ALCOHOL_TYPES.find((x) => x.id === id);
    const serving = t?.servings?.[0];
    if (!t || !serving) return;
    update(key, {
      typeId: id,
      abv: t.abv,
      servingLabel: serving.label,
      volume: serving.ml,
      sucre: t.sucre100,
      qty: 1,
    });
  };

  const setServing = (key, label) => {
    const entry = entries.find((e) => e.key === key);
    const type = entry && ALCOHOL_TYPES.find((t) => t.id === entry.typeId);
    const serving = type?.servings?.find((s) => s.label === label);
    if (!serving) return;
    update(key, { servingLabel: serving.label, volume: serving.ml });
  };

  const setVolume = (key, value) => {
    const entry = entries.find((e) => e.key === key);
    const type = entry && ALCOHOL_TYPES.find((t) => t.id === entry.typeId);
    const match = type?.servings?.find((s) => s.ml === value);
    update(key, {
      volume: value,
      servingLabel: match ? match.label : `Personnalisé (${formatNumber(value, 0)} ml)`,
    });
  };

  const add = () => entries.length < 5 && setEntries((es) => [...es, newEntry(es.length)]);
  const remove = (key) => entries.length > 1 && setEntries((es) => es.filter((e) => e.key !== key));

  const computed = entries.map((e) => {
    const totalVol = e.volume * e.qty;
    const g = pureAlcoholGrams(totalVol, e.abv);
    const kcal = totalKcal(totalVol, e.abv, e.sucre);
    const units = standardUnits(totalVol, e.abv, 10);
    const type = ALCOHOL_TYPES.find((t) => t.id === e.typeId);
    return { ...e, totalVol, g, kcal, units, type };
  });

  const maxG = Math.max(...computed.map((c) => c.g), 1);
  const maxK = Math.max(...computed.map((c) => c.kcal), 1);
  const leader = useMemo(() => [...computed].sort((a, b) => b.kcal - a.kcal), [computed]);

  return (
    <div className="space-y-8">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Instrument 02 · lecture par verre</span>
          <h2>Comparateur de boissons</h2>
          <p>
            Compare le verre réellement consommé : format de service, volume, degré, alcool pur, unités et calories.
            Le visuel change avec chaque boisson pour rendre la comparaison immédiate.
          </p>
        </div>
        <div className="status-pill"><i />{entries.length}/5 boissons</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {computed.map((c) => {
          const servings = c.type?.servings || [];
          return (
            <article key={c.key} className="bg-panel border border-line rounded-[22px] overflow-hidden shadow-xl">
              <div className="h-44 relative">
                <ProductPhoto src={drinkImage(c.type.id)} alt={c.type.name} className="w-full h-full" />
                <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="font-bold text-lg font-['Manrope']">{c.type.emoji} {c.type.name}</h3>
                </div>
                {entries.length > 1 && (
                  <button onClick={() => remove(c.key)} className="absolute right-3 top-3 w-8 h-8 rounded-full bg-black/50 text-white">×</button>
                )}
              </div>

              <div className="p-5 space-y-4">
                <select value={c.typeId} onChange={(e) => setType(c.key, e.target.value)} className="input-num">
                  {ALCOHOL_TYPES.map((t) => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                </select>

                <div>
                  <span className="field-label block text-[8px] text-muted mb-2">Format de service</span>
                  <select value={c.servingLabel} onChange={(e) => setServing(c.key, e.target.value)} className="input-num">
                    {servings.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
                    {!servings.some((s) => s.label === c.servingLabel) && (
                      <option value={c.servingLabel}>{c.servingLabel}</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <label>
                    <span className="field-label block text-[8px] text-muted mb-2">Degré %</span>
                    <NumberField min={0} max={100} value={c.abv} onChange={(v) => update(c.key, { abv: v })} />
                  </label>
                  <label>
                    <span className="field-label block text-[8px] text-muted mb-2">Volume exact</span>
                    <NumberField min={0} value={c.volume} onChange={(v) => setVolume(c.key, v)} />
                  </label>
                  <label>
                    <span className="field-label block text-[8px] text-muted mb-2">Verres / doses</span>
                    <NumberField min={1} value={c.qty} onChange={(v) => update(c.key, { qty: v })} />
                  </label>
                </div>

                <div className="rounded-xl bg-panel2 border border-line px-3 py-2 text-[10px] font-mono text-muted">
                  <span className="text-paper">{c.servingLabel}</span> × {c.qty} = <span className="text-copperLight">{formatNumber(c.totalVol, 0)} ml</span> consommés
                </div>

                <GaugeBar label="Alcool pur" value={c.g} max={maxG} unit="g" color="copper" />
                <GaugeBar label="Calories" value={c.kcal} max={maxK} unit="kcal" color="sage" />

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-panel2 border border-line p-3">
                    <small className="text-[9px] text-muted font-mono">VOLUME TOTAL</small>
                    <strong className="block mt-1 font-mono">{formatNumber(c.totalVol, 0)} ml</strong>
                  </div>
                  <div className="rounded-xl bg-panel2 border border-line p-3">
                    <small className="text-[9px] text-muted font-mono">UNITÉS FR</small>
                    <strong className="block mt-1 font-mono">{formatNumber(c.units, 1)}</strong>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {entries.length < 5 && (
          <button onClick={add} className="rounded-[22px] border border-dashed border-line min-h-[560px] bg-panel/40 hover:bg-panel hover:border-[#c9ef83]/40 text-muted hover:text-[#c9ef83] font-mono transition">
            ＋ Ajouter une boisson
          </button>
        )}
      </div>

      {computed.length >= 2 && (
        <section className="smart-panel">
          <div className="smart-header">
            <div>
              <span className="eyebrow">Lecture intelligente</span>
              <h3>Le verre qui pèse le plus dans la comparaison</h3>
            </div>
            <span className="smart-badge">ALCOHOL INSIGHT</span>
          </div>
          <div className="insight-grid">
            <article className="insight-card insight-featured">
              <div className="insight-icon">🔥</div>
              <div>
                <span className="insight-kicker">Énergie</span>
                <h4>{leader[0].type.name} est la plus calorique</h4>
                <p>
                  Sur la quantité choisie, elle apporte <strong>{formatNumber(leader[0].kcal, 0)} kcal</strong>. À l'inverse,
                  {' '}{leader[leader.length - 1].type.name} en apporte {formatNumber(leader[leader.length - 1].kcal, 0)}.
                  {' '}L'écart est de <strong>{formatNumber(leader[0].kcal - leader[leader.length - 1].kcal, 0)} kcal</strong>.
                </p>
              </div>
            </article>
            <article className="insight-card">
              <div className="insight-icon">🥃</div>
              <div>
                <span className="insight-kicker">Alcool pur</span>
                <h4>{[...computed].sort((a, b) => b.g - a.g)[0].type.name} concentre le plus d'alcool</h4>
                <p>Le degré et le volume déterminent directement la quantité d'éthanol. Le nombre de verres compte donc autant que le type de boisson.</p>
              </div>
            </article>
          </div>
          <div className="smart-footnote">
            L'alcool apporte de l'énergie indépendamment des sucres. Ces chiffres décrivent une consommation calculée ; ils ne constituent pas une recommandation de consommation.
          </div>
        </section>
      )}
    </div>
  );
}
