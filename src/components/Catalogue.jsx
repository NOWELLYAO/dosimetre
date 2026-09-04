import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, VITAMIN_LABELS } from "../data/database";
import { formatNumber } from "../utils/calc";

const SORTS = [
  { id: "default", label: "Ordre du catalogue" },
  { id: "kcal", label: "Calories ↓" },
  { id: "proteines", label: "Protéines ↓" },
  { id: "fibres", label: "Fibres ↓" },
  { id: "sucres", label: "Sucres ↓" },
];

export default function Catalogue() {
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [sort, setSort] = useState("default");

  const visibleCategories = CATEGORIES.filter((c) => catFilter === "all" || c.id === catFilter);

  const grouped = useMemo(() => {
    return visibleCategories.map((cat) => {
      let items = PRODUCTS.filter(
        (p) => p.category === cat.id && p.name.toLowerCase().includes(query.toLowerCase())
      );
      if (sort !== "default") {
        items = [...items].sort((a, b) => (b.per100[sort] || 0) - (a.per100[sort] || 0));
      }
      return { cat, items };
    });
  }, [visibleCategories, query, sort]);

  const totalCount = PRODUCTS.length;
  const matchCount = grouped.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-sage font-mono mb-1">Instrument 04</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Catalogue des aliments</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          {totalCount} produits classés par famille — laits, huiles, jus, fruits, légumes, viandes, poissons,
          céréales — avec leur composition complète pour 100 g / 100 ml.
        </p>
        <p className="text-[11px] text-muted/70 font-mono mt-2">
          Valeurs moyennes basées sur les tables de composition nutritionnelle CIQUAL (ANSES), USDA
          FoodData Central et FAO. Les valeurs réelles varient selon variété, origine, maturité et mode de
          cuisson — donné à titre indicatif.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-panel border border-line rounded-sm p-5 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="text"
          placeholder="Rechercher un aliment..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-num sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCatFilter("all")}
            className={`px-2.5 py-1.5 rounded-sm text-xs font-mono border ${catFilter === "all" ? "border-sage text-sageLight bg-sage/10" : "border-line text-muted"}`}
          >
            Tout
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCatFilter(c.id)}
              className={`px-2.5 py-1.5 rounded-sm text-xs font-mono border ${catFilter === c.id ? "border-sage text-sageLight bg-sage/10" : "border-line text-muted"}`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-num sm:ml-auto sm:max-w-[180px]">
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      <p className="text-[11px] text-muted font-mono">{matchCount} résultat{matchCount > 1 ? "s" : ""}</p>

      {/* Sections */}
      <div className="space-y-10">
        {grouped.map(({ cat, items }) =>
          items.length === 0 ? null : (
            <section key={cat.id}>
              <div className="flex items-baseline gap-2 mb-3 pb-2 border-b border-line">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="font-display text-lg text-copperLight">{cat.name}</h3>
                <span className="text-[11px] text-muted font-mono ml-auto">
                  pour 100 {cat.unit === "ml" ? "ml" : "g"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse min-w-[640px]">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-muted font-mono">
                      <th className="text-left py-2 pr-3 font-normal">Produit</th>
                      <th className="text-right py-2 px-2 font-normal">Kcal</th>
                      <th className="text-right py-2 px-2 font-normal">Lipides</th>
                      <th className="text-right py-2 px-2 font-normal">Glucides</th>
                      <th className="text-right py-2 px-2 font-normal">dont sucres</th>
                      <th className="text-right py-2 px-2 font-normal">Protéines</th>
                      <th className="text-right py-2 px-2 font-normal">Fibres</th>
                      <th className="text-left py-2 pl-3 font-normal">Vitamines clés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p, i) => (
                      <tr
                        key={p.id}
                        className={`border-t border-line/60 ${i % 2 === 0 ? "bg-panel/40" : ""} hover:bg-panel2/60 transition-colors`}
                      >
                        <td className="py-2.5 pr-3">
                          <div className="text-paper font-medium">{p.name}</div>
                          <div className="text-[10px] text-muted font-mono">{p.servingLabel}</div>
                        </td>
                        <td className="text-right py-2.5 px-2 font-mono text-paper">{formatNumber(p.per100.kcal, 0)}</td>
                        <td className="text-right py-2.5 px-2 font-mono text-muted">{formatNumber(p.per100.lipides, 1)} g</td>
                        <td className="text-right py-2.5 px-2 font-mono text-muted">{formatNumber(p.per100.glucides, 1)} g</td>
                        <td className="text-right py-2.5 px-2 font-mono text-alert/90">{formatNumber(p.per100.sucres, 1)} g</td>
                        <td className="text-right py-2.5 px-2 font-mono text-sageLight">{formatNumber(p.per100.proteines, 1)} g</td>
                        <td className="text-right py-2.5 px-2 font-mono text-muted">{formatNumber(p.per100.fibres, 1)} g</td>
                        <td className="py-2.5 pl-3">
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(p.vitamins || {}).length === 0 && (
                              <span className="text-muted text-[11px] font-mono">—</span>
                            )}
                            {Object.entries(p.vitamins || {}).map(([k, v]) => {
                              const label = VITAMIN_LABELS[k];
                              if (!label) return null;
                              return (
                                <span
                                  key={k}
                                  className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-panel2 border border-line text-sageLight whitespace-nowrap"
                                >
                                  {label.name.replace("Vitamine ", "Vit. ")} {formatNumber(v, 1)}{label.unit}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        {matchCount === 0 && (
          <div className="text-center text-muted font-mono text-sm py-10 border border-dashed border-line rounded-sm">
            Aucun aliment ne correspond à ta recherche.
          </div>
        )}
      </div>
    </div>
  );
}
