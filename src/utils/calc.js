export const ETHANOL_DENSITY = 0.789; // g/ml at ~20 °C
export const KCAL_PER_G_ALCOHOL = 7;
export const KCAL_PER_G_CARB = 4;

// Widmark is an estimate, not a measurement.
// beta = blood-alcohol elimination rate in g/L/h.
// The literature commonly reports substantial inter-individual variability.
export const WIDMARK_DEFAULTS = {
  male: { r: 0.68 },
  female: { r: 0.55 },
  absorption: 0.80,
  betaLow: 0.10,
  betaHigh: 0.15,
};

export function clamp(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function pureAlcoholMl(volumeMl, abvPercent) {
  const volume = Math.max(0, Number(volumeMl) || 0);
  const abv = clamp(abvPercent, 0, 100);
  return (volume * abv) / 100;
}

export function pureAlcoholGrams(volumeMl, abvPercent) {
  return pureAlcoholMl(volumeMl, abvPercent) * ETHANOL_DENSITY;
}

export function alcoholKcal(volumeMl, abvPercent) {
  return pureAlcoholGrams(volumeMl, abvPercent) * KCAL_PER_G_ALCOHOL;
}

export function carbKcal(volumeMl, sugarPer100ml) {
  const volume = Math.max(0, Number(volumeMl) || 0);
  const sugar = Math.max(0, Number(sugarPer100ml) || 0);
  return ((volume * sugar) / 100) * KCAL_PER_G_CARB;
}

export function totalKcal(volumeMl, abvPercent, sugarPer100ml) {
  return alcoholKcal(volumeMl, abvPercent) + carbKcal(volumeMl, sugarPer100ml);
}

export function standardUnits(volumeMl, abvPercent, gramsPerUnit = 10) {
  const grams = Math.max(0, Number(gramsPerUnit) || 0);
  return grams > 0 ? pureAlcoholGrams(volumeMl, abvPercent) / grams : 0;
}

// Simplified Widmark estimate in g/L.
// absorptionFactor avoids treating 100% of consumed alcohol as immediately absorbed.
// This remains highly uncertain and must never be used as proof that someone is fit to drive.
export function bloodAlcoholEstimate({
  grams,
  weightKg,
  sex = "h",
  hoursElapsed = 0,
  absorptionFactor = WIDMARK_DEFAULTS.absorption,
  eliminationRate = WIDMARK_DEFAULTS.betaLow,
}) {
  const weight = Number(weightKg);
  if (!Number.isFinite(weight) || weight <= 0) return 0;

  const r = sex === "f" ? WIDMARK_DEFAULTS.female.r : WIDMARK_DEFAULTS.male.r;
  const absorbedGrams = Math.max(0, Number(grams) || 0) * clamp(absorptionFactor, 0, 1);
  const hours = Math.max(0, Number(hoursElapsed) || 0);
  const beta = clamp(eliminationRate, 0, 1);
  const theoreticalPeak = absorbedGrams / (weight * r);
  return Math.max(0, theoreticalPeak - beta * hours);
}

export function bacRange({ grams, weightKg, sex = "h", hoursElapsed = 0 }) {
  return {
    low: bloodAlcoholEstimate({ grams, weightKg, sex, hoursElapsed, eliminationRate: WIDMARK_DEFAULTS.betaHigh }),
    high: bloodAlcoholEstimate({ grams, weightKg, sex, hoursElapsed, eliminationRate: WIDMARK_DEFAULTS.betaLow }),
  };
}

// Conservative display estimate: time until the upper estimate reaches zero.
export function hoursToSober(bacPromille, eliminationRate = WIDMARK_DEFAULTS.betaLow) {
  const bac = Math.max(0, Number(bacPromille) || 0);
  const beta = Math.max(0.01, Number(eliminationRate) || WIDMARK_DEFAULTS.betaLow);
  return bac / beta;
}

export function formatNumber(n, decimals = 1) {
  if (n === null || n === undefined || !Number.isFinite(Number(n))) return "0";
  return Number(n).toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function scaleNutrient(per100Value, amount) {
  const base = Math.max(0, Number(per100Value) || 0);
  const qty = Math.max(0, Number(amount) || 0);
  return (base * qty) / 100;
}
