export const ETHANOL_DENSITY=0.789,KCAL_PER_G_ALCOHOL=7,KCAL_PER_G_CARB=4;
export const ELIMINATION={low:0.10,average:0.15,high:0.20};
export const pureAlcoholMl=(v,a)=>Math.max(0,Number(v)*Number(a)/100);
export const pureAlcoholGrams=(v,a)=>pureAlcoholMl(v,a)*ETHANOL_DENSITY;
export const alcoholKcal=(v,a)=>pureAlcoholGrams(v,a)*KCAL_PER_G_ALCOHOL;
export const carbKcal=(v,s)=>Math.max(0,Number(v))*Math.max(0,Number(s))/100*KCAL_PER_G_CARB;
export const totalKcal=(v,a,s)=>alcoholKcal(v,a)+carbKcal(v,s);
export const standardUnits=(v,a,g)=>pureAlcoholGrams(v,a)/g;
export function bloodAlcoholEstimate({grams,weightKg,sex='h',hoursElapsed=0}){const r=sex==='f'?0.55:0.68;if(!weightKg||weightKg<=0)return 0;return Math.max(0,Number(grams)/(weightKg*r)-ELIMINATION.average*Math.max(0,hoursElapsed));}
export function bacRange({grams,weightKg,sex='h',hoursElapsed=0}){const r=sex==='f'?0.55:0.68;if(!weightKg||weightKg<=0)return {low:0,high:0};const b=Math.max(0,Number(grams)/(weightKg*r));return {low:Math.max(0,b-ELIMINATION.high*Math.max(0,hoursElapsed)),high:Math.max(0,b-ELIMINATION.low*Math.max(0,hoursElapsed))};}
export const hoursToSober=(bac,e=ELIMINATION.average)=>bac>0?bac/e:0;
export function formatNumber(n,d=1){if(n==null||Number.isNaN(Number(n)))return '0';return Number(n).toLocaleString('fr-FR',{minimumFractionDigits:0,maximumFractionDigits:d});}
export const scaleNutrient=(v,a)=>Number(v||0)*Math.max(0,Number(a||0))/100;
