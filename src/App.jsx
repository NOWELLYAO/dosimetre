import { useState } from "react";
import AlcoholCalculator from "./components/AlcoholCalculator";
import DrinkComparator from "./components/DrinkComparator";
import FoodComparator from "./components/FoodComparator";
import Catalogue from "./components/Catalogue";
import VitaminLibrary from "./components/VitaminLibrary";

const TABS = [
  { id: "alcool", label: "Alcoomètre", num: "01", component: AlcoholCalculator },
  { id: "boissons", label: "Comparateur boissons", num: "02", component: DrinkComparator },
  { id: "aliments", label: "Comparateur aliments", num: "03", component: FoodComparator },
  { id: "catalogue", label: "Catalogue", num: "04", component: Catalogue },
  { id: "vitamines", label: "Vitamines", num: "05", component: VitaminLibrary },
];

export default function App() {
  const [tab, setTab] = useState("alcool");
  const Active = TABS.find((t) => t.id === tab).component;

  return (
    <div className="min-h-screen bg-ink bg-grid bg-grid text-paper">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="pt-8 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted">
                Laboratoire de mesure nutritionnelle
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-paper tracking-tight">
              Dos<span className="text-copperLight">imètre</span>
            </h1>
          </div>
          <p className="text-xs text-muted font-mono max-w-sm leading-relaxed">
            Cinq instruments pour mesurer, comparer et parcourir alcool, calories et nutriments — dosés au ml
            et au gramme près.
          </p>
        </header>

        {/* Nav — flex-wrap pour que TOUS les onglets restent visibles, même sur petit écran */}
        <nav className="flex flex-wrap gap-2 py-4 border-b border-line" aria-label="Navigation des instruments">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-sm font-mono text-sm flex items-center gap-2 transition-colors ${
                tab === t.id
                  ? "bg-panel text-copperLight border border-copper/50"
                  : "text-muted hover:text-paper border border-transparent hover:border-line"
              }`}
            >
              <span className="text-[10px] text-muted">{t.num}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <main className="py-10">
          <Active />
        </main>

        <footer className="py-8 border-t border-line text-center">
          <p className="text-[11px] text-muted font-mono">
            Valeurs indicatives — usage informatif, ne remplace pas un avis médical ou nutritionnel professionnel.
          </p>
        </footer>
      </div>
    </div>
  );
}
