import { useMemo, useState } from "react";
import { ALCOHOL_TYPES, STANDARD_UNITS } from "../data/database";
import {
  pureAlcoholGrams,
  pureAlcoholMl,
  alcoholKcal,
  carbKcal,
  standardUnits,
  bloodAlcoholEstimate,
  hoursToSober,
  formatNumber,
} from "../utils/calc";
import GraduatedCylinder from "./GraduatedCylinder";
import GaugeBar from "./GaugeBar";

export default function AlcoholCalculator() {
  const [typeId, setTypeId] = useState("vin_rouge");
  const type = ALCOHOL_TYPES.find((t) => t.id === typeId);
  const [abv, setAbv] = useState(type.abv);
  const [volume, setVolume] = useState(type.defVol);
  const [qty, setQty] = useState(1);
  const [sucre, setSucre] = useState(type.sucre100);

  const [weight, setWeight] = useState(70);
  const [sex, setSex] = useState("h");
  const [hours, setHours] = useState(0);

  function handleType(id) {
    const t = ALCOHOL_TYPES.find((x) => x.id === id);
    setTypeId(id);
    setAbv(t.abv);
    setVolume(t.defVol);
    setSucre(t.sucre100);
  }

  const totalVolume = volume * qty;
  const alcMl = pureAlcoholMl(totalVolume, abv);
  const alcG = pureAlcoholGrams(totalVolume, abv);
  const kcalAlc = alcoholKcal(totalVolume, abv);
  const kcalCarb = carbKcal(totalVolume, sucre);
  const kcalTotal = kcalAlc + kcalCarb;

  const bac = useMemo(
    () => bloodAlcoholEstimate({ grams: alcG, weightKg: weight, sex, hoursElapsed: hours }),
    [alcG, weight, sex, hours]
  );
  const soberHours = hoursToSober(bac);

  const bacLevel =
    bac === 0 ? { label: "Sobre", color: "sage" } :
    bac < 0.2 ? { label: "Traces", color: "sage" } :
    bac < 0.5 ? { label: "Sous le seuil légal (FR)", color: "sage" } :
    bac < 0.8 ? { label: "Zone limite (0,5 g/L)", color: "copper" } :
    { label: "Au-dessus du seuil légal", color: "alert" };

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-copper font-mono mb-1">Instrument 01</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Alcoomètre — dosage &amp; effets</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          Saisis le type de boisson, le titrage et le volume pour mesurer l'alcool pur, les calories et une
          estimation d'alcoolémie utile au quotidien.
        </p>
      </div>

      {/* Type selector */}
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
            <span className="mr-1.5">{t.emoji}</span>
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[auto_1fr] gap-8">
        {/* Cylinder visual */}
        <div className="bg-panel border border-line rounded-sm p-6 flex justify-center">
          <GraduatedCylinder volumeMl={totalVolume} alcoholMl={alcMl} abv={abv} />
        </div>

        {/* Inputs */}
        <div className="bg-panel border border-line rounded-sm p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={`Titrage — ${formatNumber(abv, 1)} % vol.`}>
              <input
                type="range"
                min="0"
                max="60"
                step="0.5"
                value={abv}
                onChange={(e) => setAbv(Number(e.target.value))}
                className="w-full"
              />
            </Field>
            <Field label="Sucres résiduels (g / 100 ml)">
              <input
                type="number"
                min="0"
                step="0.1"
                value={sucre}
                onChange={(e) => setSucre(Number(e.target.value))}
                className="input-num"
              />
            </Field>
            <Field label="Volume par verre (ml)">
              <input
                type="number"
                min="0"
                step="5"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="input-num"
              />
            </Field>
            <Field label="Nombre de verres">
              <input
                type="number"
                min="1"
                step="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="input-num"
              />
            </Field>
          </div>

          <div className="tick-divider" />

          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Poids (kg)">
              <input
                type="number"
                min="30"
                step="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="input-num"
              />
            </Field>
            <Field label="Sexe (coeff. Widmark)">
              <select value={sex} onChange={(e) => setSex(e.target.value)} className="input-num">
                <option value="h">Homme (0,68)</option>
                <option value="f">Femme (0,55)</option>
              </select>
            </Field>
            <Field label="Heures écoulées">
              <input
                type="number"
                min="0"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="input-num"
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-panel border border-line rounded-sm p-6 space-y-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Composition — pour {formatNumber(totalVolume,0)} ml</h3>
          <GaugeBar label="Alcool pur" value={alcG} max={Math.max(alcG, 40)} unit="g" color="copper" />
          <GaugeBar label="Calories — alcool" value={kcalAlc} max={Math.max(kcalTotal, 200)} unit="kcal" color="copper" />
          <GaugeBar label="Calories — sucres" value={kcalCarb} max={Math.max(kcalTotal, 200)} unit="kcal" color="sage" />
          <div className="pt-2 flex justify-between items-baseline border-t border-line">
            <span className="text-sm text-muted font-mono uppercase tracking-wider">Total énergétique</span>
            <span className="font-display text-2xl text-paper">{formatNumber(kcalTotal, 0)} kcal</span>
          </div>
        </div>

        <div className="bg-panel border border-line rounded-sm p-6 space-y-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Repères pour la vie active</h3>
          <div className="grid grid-cols-3 gap-3">
            {STANDARD_UNITS.map((u) => (
              <div key={u.id} className="bg-panel2 border border-line rounded-sm p-3 text-center">
                <div className="font-display text-xl text-copperLight">
                  {formatNumber(standardUnits(totalVolume, abv, u.grams), 1)}
                </div>
                <div className="text-[10px] text-muted font-mono uppercase mt-1 leading-tight">{u.label}</div>
              </div>
            ))}
          </div>

          <div className="tick-divider" />

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-muted font-mono uppercase tracking-wider">Alcoolémie estimée</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${bacLevel.color === "alert" ? "bg-alert/20 text-alert" : bacLevel.color === "copper" ? "bg-copper/20 text-copperLight" : "bg-sage/20 text-sageLight"}`}>
                {bacLevel.label}
              </span>
            </div>
            <div className="font-display text-3xl text-paper">{formatNumber(bac, 2)} g/L</div>
            <p className="text-xs text-muted mt-1">
              Seuil légal en France : 0,5 g/L (0,2 g/L jeune permis). Estimation Widmark — ne remplace pas un éthylotest.
            </p>
          </div>

          <div className="flex justify-between items-baseline pt-2 border-t border-line">
            <span className="text-sm text-muted font-mono uppercase tracking-wider">Retour à 0 g/L estimé</span>
            <span className="font-mono text-lg text-paper">≈ {formatNumber(soberHours, 1)} h</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted italic">
        ⚠️ Estimations indicatives à but informatif — de nombreux facteurs (métabolisme, repas, fatigue, médicaments)
        font varier l'alcoolémie réelle. Ne jamais prendre le volant après consommation d'alcool.
      </p>
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
