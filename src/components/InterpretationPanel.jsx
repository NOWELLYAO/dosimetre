import React from 'react';
import {formatNumber} from '../utils/calc';

const pct=(a,b)=>b?Math.round((a/b)*100):0;
const ratio=(a,b)=>b?Math.round((a/b)*10)/10:0;

function Diff({name, value, unit='', tone='neutral'}) {
  return <span className={`interp-diff ${tone}`}>{name} {formatNumber(value,1)}{unit}</span>;
}

export function FoodInterpretation({items}) {
  if (!items?.length) return null;
  const by=(k,fn=(x)=>x.v[k])=>items.reduce((a,b)=>fn(b)>fn(a)?b:a,items[0]);
  const min=(k,fn=(x)=>x.v[k])=>items.reduce((a,b)=>fn(b)<fn(a)?b:a,items[0]);

  const kcalMax=by('kcal'), kcalMin=min('kcal');
  const sugarMax=by('sucres'), sugarMin=min('sucres');
  const proteinMax=by('proteines'), fiberMax=by('fibres');
  const fatMax=by('lipides');

  const bestOverall = items.reduce((best,x)=>{
    const score =
      (x.v.fibres/(Math.max(...items.map(i=>i.v.fibres),1)))*2 +
      (x.v.proteines/(Math.max(...items.map(i=>i.v.proteines),1)))*1.5 -
      (x.v.kcal/(Math.max(...items.map(i=>i.v.kcal),1)))*1 -
      (x.v.sucres/(Math.max(...items.map(i=>i.v.sucres),1)))*0.8;
    return score>(best.score??-Infinity)?{x,score}:{...best};
  },{}).x || kcalMin;

  const lines=[];
  if (items.length>=2) {
    const d=kcalMax.v.kcal-kcalMin.v.kcal;
    if(d>10) lines.push(
      <li key="kcal"><b>{kcalMax.p.name}</b> est le plus calorique : <strong>{formatNumber(kcalMax.v.kcal,0)} kcal</strong> contre {formatNumber(kcalMin.v.kcal,0)} kcal pour <b>{kcalMin.p.name}</b>. À quantité égale, il apporte donc davantage d'énergie — cela ne veut pas dire à lui seul qu'il « fait grossir », car la prise de poids dépend surtout de l'ensemble des apports et des dépenses.</li>
    );
    if(sugarMax.v.sucres-sugarMin.v.sucres>2) lines.push(
      <li key="sugar"><b>{sugarMax.p.name}</b> contient le plus de sucres : <strong>{formatNumber(sugarMax.v.sucres,1)} g</strong>. Sur une portion identique, c'est le choix le plus chargé en sucres ; si l'objectif est de limiter les sucres, <b>{sugarMin.p.name}</b> est nettement plus intéressant.</li>
    );
    if(proteinMax.v.proteines>1 && proteinMax.v.proteines>kcalMin.v.proteines*1.3) lines.push(
      <li key="protein"><b>{proteinMax.p.name}</b> domine pour les protéines avec <strong>{formatNumber(proteinMax.v.proteines,1)} g</strong>. C'est un avantage si vous cherchez davantage de satiété ou à renforcer l'apport protéique, sans conclure pour autant qu'il s'agit du « meilleur » aliment dans l'absolu.</li>
    );
    if(fiberMax.v.fibres>2) lines.push(
      <li key="fiber"><b>{fiberMax.p.name}</b> apporte le plus de fibres ({formatNumber(fiberMax.v.fibres,1)} g). C'est un vrai plus pour la satiété et la qualité nutritionnelle globale, surtout par rapport aux aliments très pauvres en fibres.</li>
    );
    if(fatMax.v.lipides > kcalMin.v.lipides*2 && fatMax.v.lipides>5) lines.push(
      <li key="fat"><b>{fatMax.p.name}</b> est le plus riche en lipides ({formatNumber(fatMax.v.lipides,1)} g). Comme les lipides sont très énergétiques, cela explique en partie pourquoi cet aliment peut afficher beaucoup plus de calories à portion égale.</li>
    );
  }

  return <section className="interpretation-card">
    <div className="interpretation-head"><span className="interpretation-icon">🧠</span><div><div className="kicker">Lecture humaine</div><h3>Ce que les chiffres veulent vraiment dire</h3></div></div>
    <div className="interpretation-summary"><b>À retenir :</b> {bestOverall.p.name} ressort comme le compromis le plus intéressant ici si l'on privilégie simultanément calories modérées, protéines et fibres. Le meilleur choix dépend toutefois de votre objectif.</div>
    <ul>{lines.length?lines:<li>Les écarts sont faibles sur les critères principaux : regardez surtout la quantité réellement consommée et votre objectif (énergie, sucres, protéines ou fibres).</li>}</ul>
    <div className="interpretation-tags">
      <Diff name={`Moins calorique : ${kcalMin.p.name}`} value={kcalMin.v.kcal} unit=" kcal" tone="good"/>
      <Diff name={`Plus protéiné : ${proteinMax.p.name}`} value={proteinMax.v.proteines} unit=" g" tone="good"/>
      <Diff name={`Plus riche en fibres : ${fiberMax.p.name}`} value={fiberMax.v.fibres} unit=" g" tone="good"/>
      <Diff name={`Plus sucré : ${sugarMax.p.name}`} value={sugarMax.v.sucres} unit=" g" tone="warn"/>
    </div>
    <small className="muted">Interprétation pédagogique : les valeurs sont indicatives et ne tiennent pas compte de toute la composition d'un repas.</small>
  </section>;
}

export function DrinkInterpretation({items}) {
  if (!items?.length) return null;
  const maxG=items.reduce((a,b)=>b.g>a.g?b:a,items[0]);
  const minG=items.reduce((a,b)=>b.g<a.g?b:a,items[0]);
  const maxK=items.reduce((a,b)=>b.k>a.k?b:a,items[0]);
  const maxSugar=items.reduce((a,b)=>b.sucre>b.sucre?b:a,items[0]);
  const lines=[];
  if(items.length>=2){
    if(maxG.g-minG.g>3) lines.push(<li key="alcohol"><b>{maxG.t.name}</b> apporte le plus d'alcool pur : <strong>{formatNumber(maxG.g,1)} g</strong> contre {formatNumber(minG.g,1)} g pour {minG.t.name}. À volume et nombre de verres identiques, c'est donc cette boisson qui vous expose à la plus grande quantité d'alcool — le degré seul ne suffit pas : le volume servi compte aussi.</li>);
    if(maxK.k-minG.k>40) lines.push(<li key="kcal"><b>{maxK.t.name}</b> est la plus énergétique avec <strong>{formatNumber(maxK.k,0)} kcal</strong>. Ce surplus vient de l'alcool lui-même et, selon la boisson, des sucres ; une boisson plus calorique n'est pas automatiquement « pire », mais elle compte davantage dans l'apport énergétique.</li>);
    if(maxSugar.sucre>5) lines.push(<li key="sugar"><b>{maxSugar.t.name}</b> est la plus sucrée de la sélection ({formatNumber(maxSugar.sucre,1)} g/100 ml). Une grande quantité servie peut donc faire grimper rapidement l'apport en sucres, même si son degré d'alcool n'est pas le plus élevé.</li>);
  }
  return <section className="interpretation-card">
    <div className="interpretation-head"><span className="interpretation-icon">🧠</span><div><div className="kicker">Lecture humaine</div><h3>Au-delà du degré affiché</h3></div></div>
    <div className="interpretation-summary"><b>Le vrai comparateur est la quantité d'alcool pur.</b> Une boisson à 5° servie en grand volume peut apporter autant, voire davantage, d'alcool qu'une petite dose d'un spiritueux beaucoup plus fort.</div>
    <ul>{lines.length?lines:<li>Les écarts sont limités avec les quantités choisies. Pour comparer correctement, regardez simultanément le degré, le volume servi, le nombre de verres et l'alcool pur.</li>}</ul>
    <div className="interpretation-tags">
      <Diff name={`Plus d'alcool pur : ${maxG.t.name}`} value={maxG.g} unit=" g" tone="warn"/>
      <Diff name={`Moins d'alcool pur : ${minG.t.name}`} value={minG.g} unit=" g" tone="good"/>
      <Diff name={`Plus calorique : ${maxK.t.name}`} value={maxK.k} unit=" kcal" tone="warn"/>
    </div>
    <small className="muted">Outil pédagogique : ces estimations ne mesurent pas l'alcoolémie et ne constituent pas un feu vert pour conduire.</small>
  </section>;
}
