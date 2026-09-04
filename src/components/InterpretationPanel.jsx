import { useMemo } from 'react';
import { CATEGORIES, VITAMIN_LABELS } from '../data/database';
import { formatNumber } from '../utils/calc';

const METRICS = [
  { key: 'kcal', label: 'Calories', icon: '🔥', unit: 'kcal', lowerBetter: true },
  { key: 'lipides', label: 'Lipides', icon: '🥑', unit: 'g', lowerBetter: null },
  { key: 'glucides', label: 'Glucides', icon: '🍚', unit: 'g', lowerBetter: null },
  { key: 'sucres', label: 'Sucres', icon: '🍬', unit: 'g', lowerBetter: true },
  { key: 'proteines', label: 'Protéines', icon: '💪', unit: 'g', lowerBetter: false },
  { key: 'fibres', label: 'Fibres', icon: '🌾', unit: 'g', lowerBetter: false },
];

const VITAMIN_REF = {
  vitA: { ref: 800, unit: 'µg' }, vitC: { ref: 80, unit: 'mg' }, vitD: { ref: 5, unit: 'µg' },
  vitE: { ref: 12, unit: 'mg' }, vitB12: { ref: 2.5, unit: 'µg' }, fer: { ref: 14, unit: 'mg' },
  calcium: { ref: 800, unit: 'mg' }, potassium: { ref: 2000, unit: 'mg' },
};

function relativeDiff(a, b) { return b ? Math.abs((a - b) / b) * 100 : (a ? 100 : 0); }
function diffLabel(pct) {
  if (pct < 10) return 'quasi équivalent';
  if (pct < 25) return 'écart modéré';
  if (pct < 50) return 'écart important';
  return 'écart très important';
}
function valueText(value, unit) { return `${formatNumber(value, 1)} ${unit}`; }

function levelFor(key, value) {
  if (key === 'kcal') {
    if (value <= 50) return ['Très faible', 'green'];
    if (value <= 150) return ['Faible', 'green'];
    if (value <= 250) return ['Modéré', 'yellow'];
    if (value <= 400) return ['Élevé', 'orange'];
    return ['Très élevé', 'red'];
  }
  if (key === 'sucres') {
    if (value <= 5) return ['Faible', 'green'];
    if (value <= 22.5) return ['Modéré', 'yellow'];
    return ['Élevé', 'red'];
  }
  if (key === 'lipides') {
    if (value <= 3) return ['Faible', 'green'];
    if (value <= 17.5) return ['Modéré', 'yellow'];
    return ['Élevé', 'red'];
  }
  if (key === 'proteines') {
    if (value < 5) return ['Peu protéiné', 'yellow'];
    if (value < 10) return ['Bonne contribution', 'green'];
    return ['Riche en protéines', 'green'];
  }
  if (key === 'fibres') {
    if (value < 2) return ['Faible', 'yellow'];
    if (value < 5) return ['Bonne contribution', 'green'];
    return ['Riche en fibres', 'green'];
  }
  if (key === 'glucides') {
    if (value < 5) return ['Faible', 'green'];
    if (value < 20) return ['Modéré', 'yellow'];
    return ['Source importante', 'orange'];
  }
  return ['—', 'neutral'];
}

function humanTakeaway(key, value, level) {
  if (key === 'kcal') {
    if (level === 'Très faible') return 'Très peu énergétique à quantité égale.';
    if (level === 'Faible') return 'Apport énergétique relativement faible.';
    if (level === 'Modéré') return 'Apport énergétique intermédiaire : la portion compte.';
    if (level === 'Élevé') return 'Aliment dense en énergie : la quantité consommée devient particulièrement importante.';
    return 'Très dense en énergie : une petite quantité peut déjà apporter beaucoup de calories.';
  }
  if (key === 'sucres') return level === 'Faible' ? 'Peu de sucres pour 100 g/ml.' : level === 'Modéré' ? 'Présence notable de sucres : regarder aussi la portion.' : 'Teneur élevée en sucres : la quantité et la fréquence comptent.';
  if (key === 'lipides') return level === 'Faible' ? 'Très peu de matières grasses.' : level === 'Modéré' ? 'Teneur intermédiaire en matières grasses.' : 'Très riche en matières grasses et donc potentiellement très énergétique.';
  if (key === 'proteines') return level === 'Peu protéiné' ? 'Apporte peu de protéines.' : level === 'Bonne contribution' ? 'Contribue de façon intéressante aux apports protéiques.' : 'Bonne densité en protéines.';
  if (key === 'fibres') return level === 'Faible' ? 'Peu de fibres.' : level === 'Bonne contribution' ? 'Bonne contribution aux apports en fibres.' : 'Très bonne contribution en fibres.';
  if (key === 'glucides') return level === 'Faible' ? 'Peu de glucides.' : level === 'Modéré' ? 'Apporte une quantité intermédiaire de glucides.' : 'Source importante de glucides.';
  return '';
}

function VitaminReading({ vitamins }) {
  const items = Object.entries(vitamins || {}).filter(([key, value]) => value > 0 && VITAMIN_LABELS[key]);
  if (!items.length) return null;
  return (
    <div className="reading-vitamins">
      {items.map(([key, value]) => {
        const ref = VITAMIN_REF[key];
        const pct = ref ? (value / ref.ref) * 100 : 0;
        const label = pct >= 50 ? 'Très bonne source' : pct >= 15 ? 'Contribution intéressante' : 'Contribution modérée';
        return (
          <div className="reading-vitamin" key={key}>
            <span>{VITAMIN_LABELS[key].name.replace('Vitamine ', 'Vit. ')}</span>
            <strong>{formatNumber(value, 2)}{VITAMIN_LABELS[key].unit}</strong>
            <small>{label}{ref ? ` · ${formatNumber(pct, 0)} % repère` : ''}</small>
          </div>
        );
      })}
    </div>
  );
}

function FoodReadingCard({ item }) {
  const { product, values, vitamins, amt } = item;
  const category = CATEGORIES.find(c => c.id === product.category);
  const unit = category?.unit || 'g';
  const per100 = product.per100 || {};
  const calorieDensity = per100.kcal || 0;
  const proteinDensity = calorieDensity ? (per100.proteines / calorieDensity) * 100 : 0;
  const fiberDensity = calorieDensity ? (per100.fibres / calorieDensity) * 100 : 0;
  const [kcalLevel, kcalTone] = levelFor('kcal', calorieDensity);
  const strongest = METRICS.map(m => ({ ...m, level: levelFor(m.key, per100[m.key] || 0) })).filter(m => per100[m.key] !== undefined);

  return (
    <article className="reading-card">
      <div className="reading-card-head">
        <div>
          <span className="reading-category">{category?.icon} {category?.name || 'Aliment'}</span>
          <h4>{product.name}</h4>
          <p>Lecture standardisée pour <strong>100 {unit}</strong> · quantité sélectionnée : <strong>{formatNumber(amt, 0)} {unit}</strong></p>
        </div>
        <div className={`reading-score-dot ${kcalTone}`} title={kcalLevel} />
      </div>

      <div className="reading-table">
        <div className="reading-table-row reading-table-head"><span>Élément</span><span>Quantité / 100</span><span>Ce qu'il faut retenir</span></div>
        {strongest.map(m => {
          const val = per100[m.key] || 0;
          const [level] = m.level;
          return (
            <div className="reading-table-row" key={m.key}>
              <span className="reading-element">{m.icon} {m.label}</span>
              <strong>{valueText(val, m.unit)}</strong>
              <span><b className={`reading-badge ${m.level[1]}`}>{level}</b> <em>{humanTakeaway(m.key, val, level)}</em></span>
            </div>
          );
        })}
      </div>

      <div className="reading-highlight-grid">
        <div><span>🔥 Densité énergétique</span><strong>{formatNumber(calorieDensity, 0)} kcal / 100 {unit}</strong><small>{kcalLevel}</small></div>
        <div><span>💪 Protéines / 100 kcal</span><strong>{formatNumber(proteinDensity, 1)} g</strong><small>{proteinDensity >= 8 ? 'Très bonne densité' : proteinDensity >= 4 ? 'Densité intéressante' : 'Densité faible'}</small></div>
        <div><span>🌾 Fibres / 100 kcal</span><strong>{formatNumber(fiberDensity, 1)} g</strong><small>{fiberDensity >= 2.5 ? 'Très bonne densité' : fiberDensity >= 1 ? 'Densité intéressante' : 'Densité faible'}</small></div>
      </div>

      <VitaminReading vitamins={vitamins} />

      <div className="reading-note">
        <span>⚠️</span>
        <p><strong>À retenir :</strong> les niveaux sont des <strong>repères pédagogiques</strong> pour lire rapidement la composition. Une valeur élevée n'est pas automatiquement « mauvaise » : son intérêt dépend du type d'aliment, de la portion, de la fréquence et de l'objectif recherché.</p>
      </div>
    </article>
  );
}

export default function InterpretationPanel({ computed }) {
  const analysis = useMemo(() => {
    if (!computed?.length) return null;
    const sorted = key => [...computed].sort((a, b) => (a.values[key] || 0) - (b.values[key] || 0));
    const by = key => sorted(key);
    const max = key => [...computed].sort((a, b) => (b.values[key] || 0) - (a.values[key] || 0));
    const bestKcal = by('kcal')[0];
    const highKcal = max('kcal')[0];
    const lowSugar = by('sucres')[0];
    const highSugar = max('sucres')[0];
    const highProtein = max('proteines')[0];
    const highFiber = max('fibres')[0];
    const proteinDensity = [...computed].sort((a, b) => {
      const pa = (a.values.proteines || 0) / Math.max(a.values.kcal || 0, 1);
      const pb = (b.values.proteines || 0) / Math.max(b.values.kcal || 0, 1);
      return pb - pa;
    })[0];
    const fiberDensity = [...computed].sort((a, b) => {
      const pa = (a.values.fibres || 0) / Math.max(a.values.kcal || 0, 1);
      const pb = (b.values.fibres || 0) / Math.max(b.values.kcal || 0, 1);
      return pb - pa;
    })[0];
    return { bestKcal, highKcal, lowSugar, highSugar, highProtein, highFiber, proteinDensity, fiberDensity };
  }, [computed]);

  if (!analysis) return null;
  const { bestKcal, highKcal, lowSugar, highSugar, highProtein, highFiber, proteinDensity, fiberDensity } = analysis;
  const kcalDelta = (highKcal.values.kcal || 0) - (bestKcal.values.kcal || 0);
  const kcalPct = relativeDiff(highKcal.values.kcal || 0, bestKcal.values.kcal || 0);

  return (
    <section className="smart-panel">
      <div className="smart-header">
        <div>
          <span className="eyebrow">Analyse intelligente · lecture pédagogique</span>
          <h3>🧠 Et surtout : comment lire ton écran ?</h3>
        </div>
        <span className="smart-badge">NUTRI-INSIGHT</span>
      </div>
      <p className="smart-lead">
        Chaque aliment est maintenant lu sur une même grille : <strong>niveau + quantité + signification concrète</strong>.
        Le comparateur réutilise ensuite ces mêmes repères pour expliquer les écarts, au lieu de simplement déclarer qu'un chiffre est « meilleur ».
      </p>

      <div className="reading-legend">
        <span><i className="dot green" /> favorable / faible selon le critère</span>
        <span><i className="dot yellow" /> modéré / à contextualiser</span>
        <span><i className="dot orange" /> élevé / à surveiller selon l'objectif</span>
        <span><i className="dot red" /> très élevé</span>
      </div>

      <div className="reading-cards">
        {computed.map(item => <FoodReadingCard key={item.product.id} item={item} />)}
      </div>

      {computed.length >= 2 && (
        <div className="comparison-reading">
          <div className="comparison-reading-head">
            <div><span className="eyebrow">Lecture croisée</span><h4>Ce que la comparaison change réellement</h4></div>
            <span className="comparison-chip">{computed.length} aliments analysés</span>
          </div>

          <div className="insight-grid">
            <article className="insight-card insight-featured">
              <div className="insight-icon">🔥</div>
              <div><span className="insight-kicker">Calories</span>
                <h4>{highKcal.product.name} est {diffLabel(kcalPct)} plus énergétique</h4>
                <p><strong>+{formatNumber(kcalDelta, 0)} kcal</strong>, soit <strong>+{formatNumber(kcalPct, 0)} %</strong> par rapport à {bestKcal.product.name}, sur les quantités affichées. Cela peut devenir significatif si la portion est grande ou si l'aliment est consommé fréquemment.</p>
              </div>
            </article>
            <article className="insight-card"><div className="insight-icon">🍬</div><div><span className="insight-kicker">Sucres</span><h4>{highSugar.product.name} en apporte le plus</h4><p>{valueText(highSugar.values.sucres, 'g')} contre {valueText(lowSugar.values.sucres, 'g')}. L'écart est de <strong>{formatNumber(highSugar.values.sucres - lowSugar.values.sucres, 1)} g</strong>. Le niveau par 100 g/ml permet aussi de voir si cet écart vient surtout de la portion ou d'une composition réellement plus sucrée.</p></div></article>
            <article className="insight-card"><div className="insight-icon">💪</div><div><span className="insight-kicker">Protéines</span><h4>{highProtein.product.name} domine en quantité</h4><p>{valueText(highProtein.values.proteines, 'g')} sur la quantité choisie. Pour comparer l'efficacité énergétique, {proteinDensity.product.name} offre la meilleure densité avec <strong>{formatNumber((proteinDensity.values.proteines / Math.max(proteinDensity.values.kcal, 1)) * 100, 1)} g / 100 kcal</strong>.</p></div></article>
            <article className="insight-card"><div className="insight-icon">🌾</div><div><span className="insight-kicker">Fibres</span><h4>{highFiber.product.name} apporte le plus de fibres</h4><p>{valueText(highFiber.values.fibres, 'g')} sur la quantité choisie. En tenant compte des calories, {fiberDensity.product.name} possède la meilleure densité en fibres.</p></div></article>
          </div>

          <div className="objective-row">
            <div><span>🎯 Contrôle calorique</span><strong>{bestKcal.product.name}</strong><small>{formatNumber(bestKcal.values.kcal, 0)} kcal</small></div>
            <div><span>💪 Densité protéique</span><strong>{proteinDensity.product.name}</strong><small>{formatNumber((proteinDensity.values.proteines / Math.max(proteinDensity.values.kcal, 1)) * 100, 1)} g / 100 kcal</small></div>
            <div><span>🌾 Densité en fibres</span><strong>{fiberDensity.product.name}</strong><small>{formatNumber((fiberDensity.values.fibres / Math.max(fiberDensity.values.kcal, 1)) * 100, 1)} g / 100 kcal</small></div>
            <div><span>🍬 Moins de sucres</span><strong>{lowSugar.product.name}</strong><small>{formatNumber(lowSugar.values.sucres, 1)} g</small></div>
          </div>

          <div className="comparison-final">
            <span>🧭 Verdict</span>
            <p>
              Il n'existe pas un « meilleur aliment » universel. <strong>{bestKcal.product.name}</strong> est le plus léger en calories sur les quantités affichées,
              tandis que <strong>{proteinDensity.product.name}</strong> est le plus intéressant pour la densité protéique et <strong>{fiberDensity.product.name}</strong> pour les fibres.
              Le bon choix dépend donc de ce que tu cherches à optimiser.
            </p>
          </div>
        </div>
      )}

      <div className="smart-footnote">Les seuils affichés sont des repères pédagogiques de lecture rapide, pas un diagnostic médical ni une note de qualité absolue. Les comparaisons restent liées à la quantité sélectionnée et aux données disponibles dans la base.</div>
    </section>
  );
}
