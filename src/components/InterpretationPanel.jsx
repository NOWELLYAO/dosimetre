import { useMemo } from 'react';
import { formatNumber } from '../utils/calc';

const metrics = [
  ['kcal', 'Calories', '🔥'], ['sucres', 'Sucres', '🍬'], ['proteines', 'Protéines', '💪'],
  ['fibres', 'Fibres', '🌾'], ['lipides', 'Lipides', '🥑'], ['glucides', 'Glucides', '⚡'],
];

function pct(a, b) { return b ? Math.abs((a - b) / b) * 100 : 0; }
function relation(a, b) {
  if (Math.abs(a - b) < Math.max(0.1, Math.max(a, b) * 0.05)) return 'quasiment équivalent';
  return a > b ? 'plus élevé' : 'plus faible';
}
function intensity(p) {
  if (p < 10) return 'léger';
  if (p < 25) return 'modéré';
  if (p < 50) return 'important';
  return 'très important';
}

export default function InterpretationPanel({ computed }) {
  const analysis = useMemo(() => {
    if (!computed?.length) return null;
    const bestKcal = [...computed].sort((a,b) => a.values.kcal - b.values.kcal)[0];
    const bestProtein = [...computed].sort((a,b) => b.values.proteines - a.values.proteines)[0];
    const bestFiber = [...computed].sort((a,b) => b.values.fibres - a.values.fibres)[0];
    const lowSugar = [...computed].sort((a,b) => a.values.sucres - b.values.sucres)[0];
    const highKcal = [...computed].sort((a,b) => b.values.kcal - a.values.kcal)[0];
    const highSugar = [...computed].sort((a,b) => b.values.sucres - a.values.sucres)[0];
    const highProteinDensity = [...computed].sort((a,b) => (b.values.proteines / Math.max(b.values.kcal,1)) - (a.values.proteines / Math.max(a.values.kcal,1)))[0];
    const highFiberDensity = [...computed].sort((a,b) => (b.values.fibres / Math.max(b.values.kcal,1)) - (a.values.fibres / Math.max(a.values.kcal,1)))[0];
    return { bestKcal, bestProtein, bestFiber, lowSugar, highKcal, highSugar, highProteinDensity, highFiberDensity };
  }, [computed]);

  if (!analysis) return null;
  const { bestKcal, bestProtein, bestFiber, lowSugar, highKcal, highSugar, highProteinDensity, highFiberDensity } = analysis;
  const deltaKcal = highKcal.values.kcal - bestKcal.values.kcal;
  const deltaPct = pct(highKcal.values.kcal, bestKcal.values.kcal);

  const verdict = computed.length === 1
    ? `Voici le profil de ${computed[0].product.name}. Les indicateurs ci-dessous permettent de comprendre ce que sa quantité apporte réellement.`
    : `Pour un objectif de contrôle calorique, ${bestKcal.product.name} est le choix le moins énergétique sur les quantités affichées. Mais « moins calorique » ne signifie pas automatiquement « meilleur » : la qualité du choix dépend aussi des protéines, des fibres, des sucres et de la quantité consommée.`;

  return (
    <section className="smart-panel">
      <div className="smart-header">
        <div>
          <span className="eyebrow">Analyse intelligente</span>
          <h3>Ce que les chiffres veulent vraiment dire</h3>
        </div>
        <span className="smart-badge">NUTRI-INSIGHT</span>
      </div>
      <p className="smart-lead">{verdict}</p>

      {computed.length >= 2 && (
        <div className="insight-grid">
          <article className="insight-card insight-featured">
            <div className="insight-icon">🔥</div>
            <div>
              <span className="insight-kicker">Calories</span>
              <h4>{highKcal.product.name} est {intensity(deltaPct)}ment plus énergétique</h4>
              <p><strong>+{formatNumber(deltaKcal, 0)} kcal</strong> sur la quantité choisie, soit environ <strong>+{formatNumber(deltaPct, 0)} %</strong> par rapport à {bestKcal.product.name}. Cela peut compter si ce produit est consommé fréquemment ou en grande portion.</p>
            </div>
          </article>

          <article className="insight-card"><div className="insight-icon">🍬</div><div><span className="insight-kicker">Sucres</span><h4>{highSugar.product.name} en apporte le plus</h4><p>{formatNumber(highSugar.values.sucres,1)} g contre {formatNumber(lowSugar.values.sucres,1)} g. L'écart est de <strong>{formatNumber(highSugar.values.sucres-lowSugar.values.sucres,1)} g</strong> sur les quantités comparées.</p></div></article>
          <article className="insight-card"><div className="insight-icon">💪</div><div><span className="insight-kicker">Protéines</span><h4>{bestProtein.product.name} domine en protéines</h4><p>{formatNumber(bestProtein.values.proteines,1)} g sur la portion affichée. Pour juger l'intérêt énergétique, {bestProtein.product.name} fournit aussi {formatNumber(bestProtein.values.proteines / Math.max(bestProtein.values.kcal,1) * 100,1)} g de protéines pour 100 kcal.</p></div></article>
          <article className="insight-card"><div className="insight-icon">🌾</div><div><span className="insight-kicker">Fibres</span><h4>{bestFiber.product.name} est le plus riche en fibres</h4><p>{formatNumber(bestFiber.values.fibres,1)} g sur la quantité choisie. En densité, {highFiberDensity.product.name} offre le meilleur ratio fibres/calories parmi les produits comparés.</p></div></article>
        </div>
      )}

      <div className="objective-row">
        <div><span>🎯 Contrôle calorique</span><strong>{bestKcal.product.name}</strong><small>{formatNumber(bestKcal.values.kcal,0)} kcal</small></div>
        <div><span>💪 Densité protéique</span><strong>{highProteinDensity.product.name}</strong><small>{formatNumber(highProteinDensity.values.proteines / Math.max(highProteinDensity.values.kcal,1) * 100,1)} g / 100 kcal</small></div>
        <div><span>🌾 Densité en fibres</span><strong>{highFiberDensity.product.name}</strong><small>{formatNumber(highFiberDensity.values.fibres / Math.max(highFiberDensity.values.kcal,1) * 100,1)} g / 100 kcal</small></div>
        <div><span>🍬 Moins de sucres</span><strong>{lowSugar.product.name}</strong><small>{formatNumber(lowSugar.values.sucres,1)} g</small></div>
      </div>

      <div className="smart-footnote">Les interprétations restent contextuelles : elles ne disent pas qu'un aliment est « bon » ou « mauvais ». Elles expliquent les compromis créés par la quantité réellement sélectionnée.</div>
    </section>
  );
}
