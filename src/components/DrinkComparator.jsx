import { useMemo, useState } from "react";
import { ALCOHOL_TYPES } from "../data/database";
import { pureAlcoholGrams, totalKcal, standardUnits, formatNumber } from "../utils/calc";
import GaugeBar from "./GaugeBar";
import NumberField from "./NumberField";

function newEntry(idx) {
  const t = ALCOHOL_TYPES[idx % ALCOHOL_TYPES.length];
  return {
    key: crypto.randomUUID(),
    typeId: t.id,
    abv: t.abv,
    servingLabel: t.servings[0].label,
    volume: t.servings[0].ml,
    qty: 1,
    sucre: t.sucre100,
  };
}

function drinkPhoto(type) {
  const queries = {
    biere_blonde: "blonde beer glass",
    biere_ipa: "ipa beer glass",
    biere_sans_alcool: "non alcoholic beer",
    cidre: "cider glass",
    vin_rouge: "red wine glass",
    vin_blanc: "white wine glass",
    vin_moelleux: "sweet white wine glass",
    champagne: "champagne flute",
    rose: "rose wine glass",
    porto: "port wine glass",
    spritz: "aperol spritz glass",
    whisky: "whisky glass",
    vodka: "vodka glass",
    rhum: "rum glass",
    gin: "gin tonic glass",
    tequila: "tequila shot",
    pastis: "pastis glass",
    liqueur: "liqueur glass",
    cocktail: "cocktail glass",
    custom: "cocktail glass",
  };
  const q = encodeURIComponent(queries[type.id] || `${type.name} drink`);
  return `https://loremflickr.com/900/620/${q}`;
}

function serviceSummary(c) {
  return `${c.type.emoji} ${c.type.name} (${c.servingLabel || `Personnalisé (${formatNumber(c.volume, 0)} ml)`} × ${c.qty})`;
}

function interpretation(computed) {
  if (computed.length < 2) return null;
  const byAlcohol = [...computed].sort((a, b) => b.g - a.g);
  const byCalories = [...computed].sort((a, b) => b.kcal - a.kcal);
  const bySugar = [...computed].sort((a, b) => b.sugarG - a.sugarG);
  const top = byAlcohol[0];
  const low = byAlcohol[byAlcohol.length - 1];
  const ratio = low.g > 0 ? top.g / low.g : null;
  const kcalDiff = byCalories[0].kcal - byCalories[byCalories.length - 1].kcal;
  const sugarDiff = bySugar[0].sugarG - bySugar[bySugar.length - 1].sugarG;
  const pct = low.g > 0 ? ((top.g - low.g) / low.g) * 100 : null;

  let text = `${serviceSummary(top)} représente la consommation la plus chargée en alcool pur`;
  if (ratio) text += `, avec environ ${formatNumber(ratio, 1)}× plus d’alcool que ${serviceSummary(low)}.`;
  else text += ` parmi les boissons sélectionnées.`;

  const kcalWinner = byCalories[0];
  const kcalLoser = byCalories[byCalories.length - 1];
  if (kcalDiff >= 50) {
    text += ` L’écart énergétique est également marqué : ${serviceSummary(kcalWinner)} apporte ${formatNumber(kcalDiff, 0)} kcal de plus que ${serviceSummary(kcalLoser)}.`;
  } else if (kcalDiff > 0) {
    text += ` La différence calorique reste modérée (${formatNumber(kcalDiff, 0)} kcal).`;
  }

  if (sugarDiff >= 5) {
    text += ` Côté sucres, ${serviceSummary(bySugar[0])} est nettement plus chargé, avec environ ${formatNumber(sugarDiff, 1)} g de sucres supplémentaires.`;
  }

  return { top, low, pct, text };
}

export default function DrinkComparator() {
  const [entries, setEntries] = useState([newEntry(4), newEntry(0)]);

  function update(key, patch) {
    setEntries((es) => es.map((e) => (e.key === key ? { ...e, ...patch } : e)));
  }

  function setType(key, typeId) {
    const t = ALCOHOL_TYPES.find((x) => x.id === typeId);
    update(key, {
      typeId,
      abv: t.abv,
      servingLabel: t.servings[0].label,
      volume: t.servings[0].ml,
      sucre: t.sucre100,
      qty: 1,
    });
  }

  function setServing(key, type, label) {
    const s = type.servings.find((x) => x.label === label);
    if (!s) return;
    update(key, { servingLabel: label, volume: s.ml });
  }

  function setVolume(key, type, v) {
    const match = type.servings.find((s) => s.ml === v);
    update(key, { volume: v, servingLabel: match ? match.label : "" });
  }

  function addEntry() {
    if (entries.length >= 5) return;
    setEntries((es) => [...es, newEntry(es.length)]);
  }

  function removeEntry(key) {
    setEntries((es) => (es.length > 1 ? es.filter((e) => e.key !== key) : es));
  }

  const computed = useMemo(() => entries.map((e) => {
    const totalVol = e.volume * e.qty;
    const g = pureAlcoholGrams(totalVol, e.abv);
    const kcal = totalKcal(totalVol, e.abv, e.sucre);
    const units = standardUnits(totalVol, e.abv, 10);
    const type = ALCOHOL_TYPES.find((t) => t.id === e.typeId);
    const sugarG = (e.sucre * totalVol) / 100;
    return { ...e, totalVol, g, kcal, units, sugarG, type };
  }), [entries]);

  const maxG = Math.max(...computed.map((c) => c.g), 1);
  const maxKcal = Math.max(...computed.map((c) => c.kcal), 1);
  const insight = interpretation(computed);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-copper font-mono mb-1">Instrument 02</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Comparateur de boissons</h2>
        <p className="text-muted text-sm mt-1 max-w-2xl">
          Compare ce que tu bois réellement : un verre, une coupe, une dose ou une bouteille. Le volume exact reste disponible pour les cas particuliers.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {computed.map((c) => (
          <article key={c.key} className="group bg-panel border border-line rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,.16)]">
            <div className="relative h-44 overflow-hidden bg-panel2">
              <img
                src={drinkPhoto(c.type)}
                alt={c.type.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <div className="text-2xl">{c.type.emoji}</div>
                  <h3 className="font-display text-xl text-paper">{c.type.name}</h3>
                </div>
                {entries.length > 1 && (
                  <button onClick={() => removeEntry(c.key)} className="w-8 h-8 rounded-full bg-ink/70 border border-line text-muted hover:text-alert" aria-label="Retirer">
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="p-5 space-y-5">
              <label className="block">
                <span className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1.5">Boisson</span>
                <select value={c.typeId} onChange={(e) => setType(c.key, e.target.value)} className="input-num">
                  {ALCOHOL_TYPES.map((t) => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                </select>
              </label>

              <div className="rounded-xl border border-copper/30 bg-copper/5 p-3">
                <div className="text-[10px] uppercase tracking-wider text-copperLight font-mono mb-2">Format de service</div>
                <select value={c.servingLabel} onChange={(e) => setServing(c.key, c.type, e.target.value)} className="input-num">
                  {c.type.servings.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
                  {!c.type.servings.some((s) => s.label === c.servingLabel) && <option value={c.servingLabel}>Personnalisé ({formatNumber(c.volume, 0)} ml)</option>}
                </select>
                <div className="text-[11px] text-muted mt-2">Choisis d'abord ce que représente réellement ta consommation.</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-[10px] uppercase text-muted font-mono mb-1">Volume exact (ml)</span>
                  <NumberField min={0} value={c.volume} onChange={(v) => setVolume(c.key, c.type, v)} />
                </label>
                <label className="block">
                  <span className="block text-[10px] uppercase text-muted font-mono mb-1">Nombre de verres / doses</span>
                  <NumberField min={1} value={c.qty} onChange={(v) => update(c.key, { qty: v })} />
                </label>
              </div>

              <label className="block">
                <span className="block text-[10px] uppercase text-muted font-mono mb-1">Titrage (% vol.)</span>
                <NumberField min={0} max={100} value={c.abv} onChange={(v) => update(c.key, { abv: v })} />
              </label>

              <div className="rounded-xl bg-panel2 border border-line px-4 py-3">
                <div className="text-[10px] uppercase tracking-wider text-muted font-mono">Consommation calculée</div>
                <div className="font-display text-lg text-paper mt-1">{c.servingLabel || `Personnalisé (${formatNumber(c.volume, 0)} ml)`} × {c.qty}</div>
                <div className="text-xs text-muted mt-1">= {formatNumber(c.totalVol, 0)} ml au total</div>
              </div>

              <GaugeBar label="Alcool pur" value={c.g} max={maxG} unit="g" color="copper" />
              <GaugeBar label="Calories" value={c.kcal} max={maxKcal} unit="kcal" color="sage" />

              <div className="grid grid-cols-3 gap-2 pt-1">
                <Metric label="Alcool" value={`${formatNumber(c.g, 1)} g`} />
                <Metric label="Calories" value={`${formatNumber(c.kcal, 0)}`} />
                <Metric label="Unités FR" value={formatNumber(c.units, 1)} />
              </div>
            </div>
          </article>
        ))}

        {entries.length < 5 && (
          <button onClick={addEntry} className="min-h-[440px] border border-dashed border-line rounded-2xl text-muted hover:text-copperLight hover:border-copper transition-all flex flex-col items-center justify-center gap-2 font-mono text-sm bg-panel/30">
            <span className="text-3xl">＋</span>
            <span>Ajouter une boisson</span>
            <span className="text-[10px] uppercase tracking-widest">Jusqu'à 5 comparaisons</span>
          </button>
        )}
      </div>

      {insight && (
        <section className="rounded-2xl border border-copper/30 bg-gradient-to-br from-copper/10 via-panel to-panel p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,.15)]">
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-copper/15 border border-copper/30 flex items-center justify-center text-2xl shrink-0">🧠</div>
            <div className="space-y-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-copperLight font-mono">Lecture intelligente</div>
              <h3 className="font-display text-2xl text-paper">Ce que les chiffres veulent vraiment dire</h3>
              <p className="text-sm md:text-base text-paper/90 leading-relaxed">{insight.text}</p>
              {insight.pct !== null && (
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-3 py-1.5 text-xs font-mono text-muted">
                  Écart d'alcool pur : <strong className="text-paper">+{formatNumber(insight.pct, 0)} %</strong>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <p className="text-xs text-muted italic">
        ⚠️ Les résultats sont des estimations indicatives. Ils dépendent notamment du titrage réel, du volume servi et de la composition de la boisson. Une estimation ne permet pas de déterminer si une personne peut conduire.
      </p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-panel2 px-2 py-2 text-center">
      <div className="font-display text-base text-paper">{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-muted font-mono mt-0.5">{label}</div>
    </div>
  );
}
