export const ETHANOL_DENSITY = 0.789; // g/ml
export const KCAL_PER_G_ALCOHOL = 7;
export const KCAL_PER_G_CARB = 4;

export function pureAlcoholMl(volumeMl, abvPercent) {
  return (volumeMl * abvPercent) / 100;
}

export function pureAlcoholGrams(volumeMl, abvPercent) {
  return pureAlcoholMl(volumeMl, abvPercent) * ETHANOL_DENSITY;
}

export function alcoholKcal(volumeMl, abvPercent) {
  return pureAlcoholGrams(volumeMl, abvPercent) * KCAL_PER_G_ALCOHOL;
}

export function carbKcal(volumeMl, sucrePer100ml) {
  return ((volumeMl * sucrePer100ml) / 100) * KCAL_PER_G_CARB;
}

export function totalKcal(volumeMl, abvPercent, sucrePer100ml) {
  return alcoholKcal(volumeMl, abvPercent) + carbKcal(volumeMl, sucrePer100ml);
}

export function standardUnits(volumeMl, abvPercent, gramsPerUnit) {
  return pureAlcoholGrams(volumeMl, abvPercent) / gramsPerUnit;
}

// Formule de Widmark simplifiée — estimation du taux d'alcoolémie (g/L de sang)
// r = coefficient de diffusion (0.68 homme / 0.55 femme en moyenne)
export function bloodAlcoholEstimate({ grams, weightKg, sex = "h", hoursElapsed = 0 }) {
  const r = sex === "f" ? 0.55 : 0.68;
  if (!weightKg || weightKg <= 0) return 0;
  const bacPromille = grams / (weightKg * r);
  const eliminated = 0.15 * hoursElapsed; // élimination moyenne ≈ 0.10-0.15 g/L/h
  return Math.max(0, bacPromille - eliminated);
}

// Temps estimé (en heures) pour revenir à 0 g/L
export function hoursToSober(bacPromille) {
  if (bacPromille <= 0) return 0;
  return bacPromille / 0.15;
}

export function formatNumber(n, decimals = 1) {
  if (n === null || n === undefined || isNaN(n)) return "0";
  return Number(n).toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function scaleNutrient(per100Value, amount) {
  return (per100Value * amount) / 100;
}
