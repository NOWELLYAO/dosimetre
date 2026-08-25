import { useMemo, useState } from "react";
import { ALCOHOL_TYPES, BAC_THRESHOLDS, STANDARD_UNITS } from "../data/database";
import {
  pureAlcoholGrams,
  pureAlcoholMl,
  alcoholKcal,
  carbKcal,
  standardUnits,
  bloodAlcoholEstimate,
  bacRange,
  hoursToSober,
  formatNumber,
  clamp,
} from "../utils/calc";
import GraduatedCylinder from "./GraduatedCylinder";
import GaugeBar from "./GaugeBar";

export default function AlcoholCalculator() {
  const [typeId, setTypeId] = useState("vin_rouge");
  const type = ALCOHOL_TYPES.find((t) => t.id === typeId) || ALCOHOL_TYPES[0];
  const [abv, setAbv] = useState(type.abv);
  const [volume, setVolume] = useState(type.defVol);
  const [qty, setQty] = useState(1);
  const [sucre, setSucre] = useState(type.sucre100);
  const [weight, setWeight] = useState(70);
  const [sex, setSex] = useState("h");
  const [hours, setHours] = useState(0);
  const [jurisdiction, setJurisdiction] = useState("ci");

  function handleType(id) {
    const t = ALCOHOL_TYPES.find((x) => x.id === id);
    if (!t) return;
    setTypeId(id);
    setAbv(t.abv);
    setVolume(t.defVol);
    setSucre(t.sucre100);
  }

  const safeVolume = clamp(volume, 0, 10000);
  const safeQty = clamp(qty, 1, 100);
  const safeWeight = clamp(weight, 30, 300);
  const safeHours = clamp(hours, 0, 48);
  const safeAbv = clamp(abv, 0, 60);
  const safeSugar = clamp(sucre, 0, 100);

  const totalVolume = safeVolume * safeQty;
  const alcMl = pureAlcoholMl(totalVolume, safeAbv);
  const alcG = pureAlcoholGrams(totalVolume, safeAbv);
  const kcalAlc = alcoholKcal(totalVolume, safeAbv);
  const kcalCarb = carbKcal(totalVolume, safeSugar);
  const kcalTotal = kcalAlc + kcalCarb;

  const bac = useMemo(
    () => bloodAlcoholEstimate({
      grams: alcG,
      weightKg: safeWeight,
      sex,
      hoursElapsed: safeHours,
    }),
    [alcG, safeWeight, sex, safeHours]
  );
  const range = useMemo(
    () => bacRange({ grams: alcG, weightKg: safeWeight, sex, hoursElapsed: safeHours }),
    [alcG, safeWeight, sex, safeHours]
  );

  const soberHours = hoursToSober(range.high);
  const legal = BAC_THRESHOLDS.find((x) => x.id === jurisdiction) || BAC_THRESHOLDS[0];
  const overLimit = range.high >= legal.limit;

  const bacLevel =
    bac === 0 ? { label: "≈ 0 g/L", color: "sage" } :
    overLimit ? { label: `Au-dessus du repère ${legal.label}`, color: "alert" } :
    bac >= legal.limit * 0.75 ? { label: "Proche du repère", color: "copper" } :
    { label: "Sous le repère", color: "sage" };

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-copper font-mono mb-1">Instrument 01</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Alcoomètre — dosage &amp; effets</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          Calcule l'alcool pur et l'énergie consommée, puis affiche une estimation très approximative de l'alcoolémie.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ALCOHOL_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleType(t.id)}
            className={`px-3 py-2 rounded-sm border text-sm font-mono transition-colors ${
              typeId === t.id
                ? "border-copper bg-copper/10 text-copperLight"
                : "border-line bg-panel text-muted hover:border-muted"
            }`}
          >
            <span className="mr-1.5">{t.emoji}</span>{t.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[auto_1fr] gap-8">
        <div className="bg-panel border border-line rounded-sm p-6 flex justify-center">
          <GraduatedCylinder volumeMl={totalVolume} alcoholMl={alcMl} abv={safeAbv} />
        </div>

        <div className="bg-panel border border-line rounded-sm p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={`Titrage — ${formatNumber(safeAbv, 1)} % vol.`}>
              <input type="range" min="0" max="60" step="0.5" value={safeAbv}
                onChange={(e) => setAbv(clamp(e.target.value, 0, 60))} className="w-full" />
            </Field>
            <Field label="Sucres (g / 100 ml)">
              <input type="number" min="0" max="100" step="0.1" value={safeSugar}
                onChange={(e) => setSucre(clamp(e.target.value, 0, 100))} className="input-num" />
            </Field>
            <Field label="Volume par verre (ml)">
              <input type="number" min="0" max="10000" step="5" value={safeVolume}
                onChange={(e) => setVolume(clamp(e.target.value, 0, 10000))} className="input-num" />
            </Field>
            <Field label="Nombre de verres">
              <input type="number" min="1" max="100" step="1" value={safeQty}
                onChange={(e) => setQty(clamp(e.target.value, 1, 100))} className="input-num" />
            </Field>
          </div>

          <div className="tick-divider" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Field label="Poids (kg)">
              <input type="number" min="30" max="300" step="1" value={safeWeight}
                onChange={(e) => setWeight(clamp(e.target.value, 30, 300))} className="input-num" />
            </Field>
            <Field label="Profil de calcul">
              <select value={sex} onChange={(e) => setSex(e.target.value)} className="input-num">
                <option value="h">Homme — r 0,68</option>
                <option value="f">Femme — r 0,55</option>
              </select>
            </Field>
            <Field label="Temps écoulé (h)">
              <input type="number" min="0" max="48" step="0.5" value={safeHours}
                onChange={(e) => setHours(clamp(e.target.value, 0, 48))} className="input-num" />
            </Field>
            <Field label="Repère routier">
              <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="input-num">
                {BAC_THRESHOLDS.map((j) => <option key={j.id} value={j.id}>{j.label} — {j.limit} g/L</option>)}
              </select>
            </Field>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-panel border border-line rounded-sm p-6 space-y-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            Composition — pour {formatNumber(totalVolume, 0)} ml
          </h3>
          <GaugeBar label="Alcool pur" value={alcG} max={Math.max(alcG, 40)} unit="g" color="copper" />
          <GaugeBar label="Calories — alcool" value={kcalAlc} max={Math.max(kcalTotal, 200)} unit="kcal" color="copper" />
          <GaugeBar label="Calories — sucres" value={kcalCarb} max={Math.max(kcalTotal, 200)} unit="kcal" color="sage" />
          <div className="pt-2 flex justify-between items-baseline border-t border-line">
            <span className="text-sm text-muted font-mono uppercase tracking-wider">Total énergétique</span>
            <span className="font-display text-2xl text-paper">{formatNumber(kcalTotal, 0)} kcal</span>
          </div>
        </div>

        <div className="bg-panel border border-line rounded-sm p-6 space-y-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Repères de consommation</h3>
          <div className="grid grid-cols-3 gap-3">
            {STANDARD_UNITS.map((u) => (
              <div key={u.id} className="bg-panel2 border border-line rounded-sm p-3 text-center">
                <div className="font-display text-xl text-copperLight">
                  {formatNumber(standardUnits(totalVolume, safeAbv, u.grams), 1)}
                </div>
                <div className="text-[10px] text-muted font-mono uppercase mt-1 leading-tight">{u.label}</div>
              </div>
            ))}
          </div>

          <div className="tick-divider" />

          <div>
            <div className="flex justify-between items-baseline mb-1 gap-3">
              <span className="text-sm text-muted font-mono uppercase tracking-wider">Alcoolémie estimée</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
                bacLevel.color === "alert" ? "bg-alert/20 text-alert" :
                bacLevel.color === "copper" ? "bg-copper/20 text-copperLight" :
                "bg-sage/20 text-sageLight"
              }`}>{bacLevel.label}</span>
            </div>
            <div className="font-display text-3xl text-paper">{formatNumber(bac, 2)} g/L</div>
            <p className="text-xs text-muted mt-1">
              Fourchette indicative : {formatNumber(range.low, 2)}–{formatNumber(range.high, 2)} g/L.
              Le calcul utilise une absorption et une élimination simplifiées.
            </p>
            <p className="text-xs text-muted mt-2">
              Repère sélectionné : {legal.label}, {formatNumber(legal.limit, 1)} g/L. {legal.note}
            </p>
          </div>

          <div className="flex justify-between items-baseline pt-2 border-t border-line">
            <span className="text-sm text-muted font-mono uppercase tracking-wider">Temps prudentiel estimé</span>
            <span className="font-mono text-lg text-paper">≈ {formatNumber(soberHours, 1)} h</span>
          </div>
        </div>
      </div>

      <div className="bg-alert/10 border border-alert/30 rounded-sm p-4 text-xs text-muted">
        <strong className="text-alert">Important :</strong> une alcoolémie calculée n'est pas une mesure.
        Le résultat peut être fortement différent de la réalité. Ne l'utilise jamais pour décider si tu peux conduire ;
        seul un contrôle fiable et, surtout, l'abstention de conduire après consommation permettent d'éviter ce risque.
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted font-mono mb-1.5">{label}</span>
      {children}
    </label>
  );
}
