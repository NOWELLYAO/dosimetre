import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, VITAMIN_LABELS } from "../data/database";
import { scaleNutrient, formatNumber, clamp } from "../utils/calc";
import GaugeBar from "./GaugeBar";

const NUTRIENTS = [
  { key: "kcal", label: "Calories", unit: "kcal", color: "copper" },
  { key: "lipides", label: "Lipides", unit: "g", color: "sage" },
  { key: "glucides", label: "Glucides", unit: "g", color: "sage" },
  { key: "sucres", label: "dont sucres", unit: "g", color: "alert" },
  { key: "proteines", label: "Protéines", unit: "g", color: "sage" },
  { key: "fibres", label: "Fibres", unit: "g", color: "sage" },
];

export default function FoodComparator() {
  const [selectedIds, setSelectedIds] = useState(["lait_entier", "jus_orange", "huile_olive", "banane"]);
  const [amounts, setAmounts] = useState(() => {
    const init = {};
    PRODUCTS.forEach((p) => (init[p.id] = p.serving));
    return init;
  });
  const [filter, setFilter] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  function toggle(id) {
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : ids.length < 6 ? [...ids, id] : ids));
  }
  function setAmount(id, val) {
    setAmounts((a) => ({ ...a, [id]: clamp(val, 0, 10000) }));
  }

  const selected = selectedIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const computed = selected.map((p) => {
    const amt = amounts[p.id] ?? p.serving;
    const values = {};
    NUTRIENTS.forEach((n) => (values[n.key] = scaleNutrient(p.per100[n.key] || 0, amt)));
    const vitamins = {};
    Object.entries(p.vitamins || {}).forEach(([k, v]) => (vitamins[k] = scaleNutrient(v, amt)));
    return { product: p, amt, values, vitamins };
  });

  const maxByNutrient = useMemo(() => {
    const m = {};
    NUTRIENTS.forEach((n) => {
      m[n.key] = Math.max(...computed.map((c) => c.values[n.key]), 1);
    });
    return m;
  }, [computed]);

  const visibleProducts = PRODUCTS.filter(
    (p) =>
      (catFilter === "all" || p.category === catFilter) &&
      p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-sage font-mono mb-1">Instrument 03</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Comparateur d'aliments</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          Lait, huiles, jus, fruits, légumes — choisis jusqu'à 6 produits et ajuste les quantités pour comparer
          leur profil nutritionnel réel.
        </p>
      </div>

      {/* Picker */}
      <div className="bg-panel border border-line rounded-sm p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCatFilter("all")}
            className={`px-2.5 py-1 rounded-sm text-xs font-mono border ${catFilter === "all" ? "border-sage text-sageLight bg-sage/10" : "border-line text-muted"}`}
          >
            Tout
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCatFilter(c.id)}
              className={`px-2.5 py-1 rounded-sm text-xs font-mono border ${catFilter === c.id ? "border-sage text-sageLight bg-sage/10" : "border-line text-muted"}`}
            >
              {c.icon} {c.name}
            </button>
          ))}
          <input
            type="text"
            placeholder="Rechercher..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-num ml-auto max-w-[180px]"
          />
        </div>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {visibleProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`px-2.5 py-1.5 rounded-sm text-xs font-mono border transition-colors ${
                selectedIds.includes(p.id)
                  ? "border-copper bg-copper/10 text-copperLight"
                  : "border-line text-muted hover:border-muted"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted mt-2 font-mono">{selectedIds.length} / 6 sélectionnés</p>
      </div>

      {/* Comparison cards */}
      {computed.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {computed.map(({ product, amt, values, vitamins }) => (
            <div key={product.id} className="bg-panel border border-line rounded-sm p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase text-muted font-mono">
                    {CATEGORIES.find((c) => c.id === product.category)?.icon}{" "}
                    {CATEGORIES.find((c) => c.id === product.category)?.name}
                  </div>
                  <h3 className="font-display text-lg text-paper leading-tight">{product.name}</h3>
                </div>
                <button
                  onClick={() => toggle(product.id)}
                  className="text-muted hover:text-alert text-xs font-mono shrink-0"
                >
                  ✕
                </button>
              </div>

              <label className="block">
                <span className="block text-[10px] uppercase text-muted font-mono mb-1">
                  Quantité ({CATEGORIES.find((c) => c.id === product.category)?.unit})
                </span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="5"
                  value={amt}
                  onChange={(e) => setAmount(product.id, e.target.value)}
                  className="input-num"
                />
                <span className="text-[10px] text-muted font-mono">suggestion : {product.servingLabel}</span>
              </label>

              <div className="tick-divider" />

              <div className="space-y-3">
                {NUTRIENTS.map((n) => (
                  <GaugeBar
                    key={n.key}
                    label={n.label}
                    value={values[n.key]}
                    max={maxByNutrient[n.key]}
                    unit={n.unit}
                    color={n.color}
                  />
                ))}
              </div>

              {Object.keys(vitamins).length > 0 && (
                <>
                  <div className="tick-divider" />
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {Object.entries(vitamins).map(([k, v]) => {
                      const label = VITAMIN_LABELS[k];
                      if (!label) return null;
                      return (
                        <span key={k} className="text-[11px] font-mono text-muted">
                          {label.name}: <span className="text-sageLight">{formatNumber(v, 1)}{label.unit}</span>
                          {label.rdi ? <span className="text-[10px]"> ({formatNumber((v / label.rdi) * 100, 0)}% repère)</span> : null}
                        </span>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {computed.length === 0 && (
        <div className="text-center text-muted font-mono text-sm py-10 border border-dashed border-line rounded-sm">
          Sélectionne au moins un produit ci-dessus pour lancer la comparaison.
        </div>
      )}
    </div>
  );
}
