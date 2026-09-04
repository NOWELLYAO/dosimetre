import { useMemo, useState } from 'react';
import { PRODUCTS, CATEGORIES, VITAMIN_LABELS } from '../data/database';
import { scaleNutrient, formatNumber } from '../utils/calc';
import GaugeBar from './GaugeBar';
import NumberField from './NumberField';
import ProductPhoto from './ProductPhoto';
import InterpretationPanel from './InterpretationPanel';
import { foodImage } from '../utils/images';

const NUTRIENTS = [
  { key:'kcal',label:'Calories',unit:'kcal',color:'copper' }, { key:'lipides',label:'Lipides',unit:'g',color:'sage' },
  { key:'glucides',label:'Glucides',unit:'g',color:'sage' }, { key:'sucres',label:'Sucres',unit:'g',color:'alert' },
  { key:'proteines',label:'Protéines',unit:'g',color:'sage' }, { key:'fibres',label:'Fibres',unit:'g',color:'sage' },
];

export default function FoodComparator(){
  const [selectedIds,setSelectedIds]=useState(['lait_entier','jus_orange','huile_olive','banane']);
  const [amounts,setAmounts]=useState(()=>Object.fromEntries(PRODUCTS.map(p=>[p.id,p.serving])));
  const [filter,setFilter]=useState(''); const [catFilter,setCatFilter]=useState('all');
  const toggle=id=>setSelectedIds(ids=>ids.includes(id)?ids.filter(x=>x!==id):ids.length<6?[...ids,id]:ids);
  const selected=selectedIds.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  const computed=selected.map(p=>{const amt=amounts[p.id]??p.serving;const values=Object.fromEntries(NUTRIENTS.map(n=>[n.key,scaleNutrient(p.per100[n.key]||0,amt)]));const vitamins=Object.fromEntries(Object.entries(p.vitamins||{}).map(([k,v])=>[k,scaleNutrient(v,amt)]));return {product:p,amt,values,vitamins};});
  const maxByNutrient=useMemo(()=>Object.fromEntries(NUTRIENTS.map(n=>[n.key,Math.max(...computed.map(c=>c.values[n.key]),1)])),[computed]);
  const visibleProducts=PRODUCTS.filter(p=>(catFilter==='all'||p.category===catFilter)&&p.name.toLowerCase().includes(filter.toLowerCase()));

  return <div className="space-y-8">
    <div className="section-heading"><div><span className="section-kicker">Instrument 03 · vision nutritionnelle</span><h2>Comparateur d'aliments</h2><p>Compare jusqu'à 6 aliments avec leur quantité réelle. Les photos, les chiffres et surtout leur interprétation sont réunis dans une même lecture.</p></div><div className="status-pill"><i/> {selectedIds.length}/6 sélectionnés</div></div>

    <div className="bg-panel border border-line rounded-[22px] p-5 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-4"><div className="flex flex-wrap gap-2">{CATEGORIES.map(c=><button key={c.id} onClick={()=>setCatFilter(c.id)} className={`px-3 py-2 rounded-full text-[11px] border transition ${catFilter===c.id?'border-[#c9ef83]/50 bg-[#c9ef83]/10 text-[#c9ef83]':'border-line text-muted hover:text-paper'}`}>{c.icon} {c.name}</button>)}</div><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Rechercher un aliment…" className="input-num lg:max-w-[230px] lg:ml-auto"/></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2 max-h-[270px] overflow-y-auto pr-1">{visibleProducts.map(p=><button key={p.id} onClick={()=>toggle(p.id)} className={`group text-left rounded-xl overflow-hidden border transition ${selectedIds.includes(p.id)?'border-[#c9ef83]/60 bg-[#c9ef83]/5':'border-line bg-panel2 hover:border-[#52665e]'}`}><div className="h-20"><ProductPhoto src={foodImage(p.id)} alt={p.name} className="w-full h-full"/></div><div className="p-2"><div className="text-[11px] font-medium leading-tight text-paper truncate">{p.name}</div><div className="text-[9px] text-muted font-mono mt-1">{selectedIds.includes(p.id)?'✓ sélectionné':'Ajouter'}</div></div></button>)}</div>
    </div>

    {computed.length>0&&<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{computed.map(({product,amt,values,vitamins})=><article key={product.id} className="bg-panel border border-line rounded-[22px] overflow-hidden shadow-xl"><div className="h-48 relative"><ProductPhoto src={foodImage(product.id)} alt={product.name} className="w-full h-full"/><div className="absolute top-3 left-3 status-pill">{CATEGORIES.find(c=>c.id===product.category)?.icon} {CATEGORIES.find(c=>c.id===product.category)?.name}</div><button onClick={()=>toggle(product.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur text-white">×</button><div className="absolute bottom-0 inset-x-0 p-4 pt-12 bg-gradient-to-t from-black/85 to-transparent"><h3 className="font-bold text-lg font-['Manrope']">{product.name}</h3></div></div><div className="p-5 space-y-4"><label><span className="field-label block text-[9px] text-muted mb-2">Quantité · {CATEGORIES.find(c=>c.id===product.category)?.unit}</span><NumberField min={0} value={amt} onChange={v=>setAmounts(a=>({...a,[product.id]:Number(v)}))}/><span className="text-[10px] text-muted font-mono">Repère : {product.servingLabel}</span></label><div className="tick-divider"/>{NUTRIENTS.map(n=><GaugeBar key={n.key} label={n.label} value={values[n.key]} max={maxByNutrient[n.key]} unit={n.unit} color={n.color}/>)}{Object.keys(vitamins).length>0&&<><div className="tick-divider"/><div className="flex flex-wrap gap-1.5">{Object.entries(vitamins).map(([k,v])=>VITAMIN_LABELS[k]?<span key={k} className="text-[9px] font-mono px-2 py-1 rounded-full bg-panel2 border border-line text-[#b9d99a]">{VITAMIN_LABELS[k].name.replace('Vitamine ','Vit. ')} {formatNumber(v,1)}{VITAMIN_LABELS[k].unit}</span>:null)}</div></>}</div></article>)}</div>}
    {computed.length>=1&&<InterpretationPanel computed={computed}/>} 
  </div>
}
