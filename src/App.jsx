import { useState } from 'react';
import AlcoholCalculator from './components/AlcoholCalculator';
import DrinkComparator from './components/DrinkComparator';
import FoodComparator from './components/FoodComparator';
import Catalogue from './components/Catalogue';
import VitaminLibrary from './components/VitaminLibrary';

const TABS = [
  { id: 'alcool', label: 'Alcoomètre', short: 'Alcool', icon: '◉', num: '01', component: AlcoholCalculator },
  { id: 'boissons', label: 'Boissons', short: 'Boissons', icon: '◌', num: '02', component: DrinkComparator },
  { id: 'aliments', label: 'Aliments', short: 'Aliments', icon: '✦', num: '03', component: FoodComparator },
  { id: 'catalogue', label: 'Catalogue', short: 'Catalogue', icon: '▦', num: '04', component: Catalogue },
  { id: 'vitamines', label: 'Vitamines', short: 'Vitamines', icon: '✚', num: '05', component: VitaminLibrary },
];

export default function App() {
  const [tab, setTab] = useState('alcool');
  const Active = TABS.find((t) => t.id === tab).component;
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="app-container">
        <header className="hero-header">
          <div className="brand-lockup">
            <div className="brand-mark"><span>µ</span></div>
            <div>
              <div className="eyebrow">Laboratoire nutritionnel · 2026</div>
              <h1>Dos<span>imètre</span></h1>
              <p>Mesurer. Comprendre. Choisir.</p>
            </div>
          </div>
          <div className="hero-copy">
            <div className="status-pill"><i /> Analyse locale · données indicatives</div>
            <p>Un laboratoire visuel pour comprendre l'alcool, l'énergie et la composition des aliments — sans réduire la nutrition à un simple chiffre.</p>
          </div>
        </header>

        <nav className="main-nav" aria-label="Navigation principale">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={tab === t.id ? 'nav-item active' : 'nav-item'}>
              <span className="nav-num">{t.num}</span><span className="nav-icon">{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </nav>

        <main className="main-content"><Active /></main>

        <footer className="app-footer">
          <div><strong>DOSIMÈTRE</strong><span>Outil pédagogique · calculs côté navigateur</span></div>
          <span>Valeurs indicatives — ne remplace pas un avis médical ou nutritionnel professionnel.</span>
        </footer>
      </div>
    </div>
  );
}
