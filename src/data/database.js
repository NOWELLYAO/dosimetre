// Base de données nutritionnelle — valeurs moyennes indicatives (pour 100 g ou 100 ml)
// Sources : moyennes de tables nutritionnelles publiques (CIQUAL / USDA), à titre indicatif uniquement.

export const ALCOHOL_TYPES = [
  { id: "biere_blonde", name: "Bière blonde", emoji: "🍺", abv: 5, sucre100: 3.5, kcalBase100: 42, defVol: 330 },
  { id: "biere_ipa", name: "Bière IPA / forte", emoji: "🍻", abv: 6.5, sucre100: 3, kcalBase100: 45, defVol: 330 },
  { id: "biere_sans_alcool", name: "Bière sans alcool", emoji: "🚫🍺", abv: 0.3, sucre100: 4.5, kcalBase100: 25, defVol: 330 },
  { id: "cidre", name: "Cidre", emoji: "🍏", abv: 4.5, sucre100: 5, kcalBase100: 40, defVol: 330 },
  { id: "vin_rouge", name: "Vin rouge", emoji: "🍷", abv: 13, sucre100: 0.5, kcalBase100: 10, defVol: 750 },
  { id: "vin_blanc", name: "Vin blanc sec", emoji: "🥂", abv: 12.5, sucre100: 1.5, kcalBase100: 12, defVol: 750 },
  { id: "vin_moelleux", name: "Vin blanc moelleux", emoji: "🍾", abv: 12, sucre100: 6, kcalBase100: 25, defVol: 750 },
  { id: "champagne", name: "Champagne / brut", emoji: "🥂", abv: 12, sucre100: 2, kcalBase100: 15, defVol: 750 },
  { id: "rose", name: "Vin rosé", emoji: "🌸", abv: 12.5, sucre100: 1.5, kcalBase100: 12, defVol: 750 },
  { id: "porto", name: "Porto / vin muté", emoji: "🍇", abv: 19, sucre100: 10, kcalBase100: 45, defVol: 70 },
  { id: "spritz", name: "Spritz (apéritif)", emoji: "🧡", abv: 8, sucre100: 6, kcalBase100: 50, defVol: 200 },
  { id: "whisky", name: "Whisky", emoji: "🥃", abv: 40, sucre100: 0, kcalBase100: 2, defVol: 40 },
  { id: "vodka", name: "Vodka", emoji: "🧊", abv: 40, sucre100: 0, kcalBase100: 0, defVol: 40 },
  { id: "rhum", name: "Rhum", emoji: "🏝️", abv: 40, sucre100: 0.5, kcalBase100: 2, defVol: 40 },
  { id: "gin", name: "Gin", emoji: "🌿", abv: 40, sucre100: 0, kcalBase100: 0, defVol: 40 },
  { id: "tequila", name: "Tequila", emoji: "🌵", abv: 38, sucre100: 0, kcalBase100: 0, defVol: 40 },
  { id: "pastis", name: "Pastis (dilué)", emoji: "💧", abv: 45, sucre100: 1, kcalBase100: 3, defVol: 30 },
  { id: "liqueur", name: "Liqueur / digestif", emoji: "🍯", abv: 25, sucre100: 20, kcalBase100: 90, defVol: 40 },
  { id: "cocktail", name: "Cocktail sucré", emoji: "🍹", abv: 15, sucre100: 10, kcalBase100: 60, defVol: 200 },
  { id: "custom", name: "Autre / personnalisé", emoji: "⚗️", abv: 10, sucre100: 2, kcalBase100: 20, defVol: 250 },
];

// g d'alcool pur par "unité standard" selon les pays — utile pour les repères de consommation
export const STANDARD_UNITS = [
  { id: "fr", label: "Unité FR (SAAF)", grams: 10 },
  { id: "uk", label: "Unité UK", grams: 8 },
  { id: "us", label: "Standard drink US", grams: 14 },
];

export const CATEGORIES = [
  { id: "lait", name: "Laits & produits laitiers", unit: "ml", icon: "🥛" },
  { id: "huile", name: "Huiles & matières grasses", unit: "ml", icon: "🫒" },
  { id: "jus", name: "Jus & boissons", unit: "ml", icon: "🧃" },
  { id: "fruit", name: "Fruits", unit: "g", icon: "🍎" },
  { id: "legume", name: "Légumes, tubercules & aromates", unit: "g", icon: "🥦" },
  { id: "proteine", name: "Viandes, poissons & œufs", unit: "g", icon: "🍗" },
  { id: "autre", name: "Céréales, légumineuses & sucrants", unit: "g", icon: "🌾" },
  { id: "alcool", name: "Alcools (référence)", unit: "ml", icon: "🍷" },
];

// per100 = valeurs pour 100 g ou 100 ml selon la catégorie
export const PRODUCTS = [
  // ───────────────────────── LAITS & PRODUITS LAITIERS ─────────────────────────
  { id: "lait_entier", name: "Lait entier", category: "lait", per100: { kcal: 64, lipides: 3.6, glucides: 4.8, sucres: 4.8, proteines: 3.2, fibres: 0, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.05, vitA: 28, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_demi", name: "Lait demi-écrémé", category: "lait", per100: { kcal: 46, lipides: 1.6, glucides: 4.8, sucres: 4.8, proteines: 3.3, fibres: 0, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.05, vitA: 15, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_ecreme", name: "Lait écrémé", category: "lait", per100: { kcal: 35, lipides: 0.2, glucides: 4.9, sucres: 4.9, proteines: 3.4, fibres: 0, alcool: 0 }, vitamins: { calcium: 125, vitD: 0.02, vitA: 3, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_chevre", name: "Lait de chèvre", category: "lait", per100: { kcal: 68, lipides: 4, glucides: 4.5, sucres: 4.5, proteines: 3.5, fibres: 0, alcool: 0 }, vitamins: { calcium: 134, vitD: 0.03, vitA: 39, vitB12: 0.2 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_amande", name: "Boisson amande", category: "lait", per100: { kcal: 24, lipides: 1.1, glucides: 2.5, sucres: 2.4, proteines: 0.5, fibres: 0.3, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_soja", name: "Boisson soja", category: "lait", per100: { kcal: 33, lipides: 1.8, glucides: 1, sucres: 1, proteines: 3.3, fibres: 0.5, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_avoine", name: "Boisson avoine", category: "lait", per100: { kcal: 46, lipides: 1.5, glucides: 6.7, sucres: 4.1, proteines: 1, fibres: 0.8, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_riz", name: "Boisson riz", category: "lait", per100: { kcal: 47, lipides: 1, glucides: 9.2, sucres: 4, proteines: 0.3, fibres: 0.1, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "yaourt_nature", name: "Yaourt nature", category: "lait", per100: { kcal: 61, lipides: 3.3, glucides: 4.7, sucres: 4.7, proteines: 3.8, fibres: 0, alcool: 0 }, vitamins: { calcium: 140, vitD: 0.03, vitB12: 0.4 }, serving: 125, servingLabel: "1 pot (125 g)" },
  { id: "fromage_blanc", name: "Fromage blanc 0%", category: "lait", per100: { kcal: 45, lipides: 0.2, glucides: 4, sucres: 4, proteines: 7.5, fibres: 0, alcool: 0 }, vitamins: { calcium: 100, vitB12: 0.4 }, serving: 125, servingLabel: "1 pot (125 g)" },
  { id: "kefir", name: "Kéfir de lait", category: "lait", per100: { kcal: 52, lipides: 2, glucides: 4.5, sucres: 4.5, proteines: 3.3, fibres: 0, alcool: 0.1 }, vitamins: { calcium: 110, vitB12: 0.3 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "comte", name: "Comté / fromage à pâte dure", category: "lait", per100: { kcal: 400, lipides: 32, glucides: 0, sucres: 0, proteines: 27, fibres: 0, alcool: 0 }, vitamins: { calcium: 900, vitB12: 1.5, vitA: 250 }, serving: 30, servingLabel: "1 portion (30 g)" },

  // ───────────────────────── HUILES & MATIÈRES GRASSES ─────────────────────────
  { id: "huile_olive", name: "Huile d'olive", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 14 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_tournesol", name: "Huile de tournesol", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 41 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_colza", name: "Huile de colza", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 25 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_coco", name: "Huile de coco", category: "huile", per100: { kcal: 862, lipides: 99, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 0.5 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_lin", name: "Huile de lin", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 1.2 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_sesame", name: "Huile de sésame", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 1.4 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_arachide", name: "Huile d'arachide", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 17 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "beurre", name: "Beurre", category: "huile", per100: { kcal: 717, lipides: 81, glucides: 0.7, sucres: 0.7, proteines: 0.9, fibres: 0, alcool: 0 }, vitamins: { vitA: 684 }, serving: 10, servingLabel: "1 noix (10 g)" },
  { id: "margarine", name: "Margarine", category: "huile", per100: { kcal: 630, lipides: 70, glucides: 1, sucres: 1, proteines: 0.3, fibres: 0, alcool: 0 }, vitamins: { vitA: 400, vitE: 12 }, serving: 10, servingLabel: "1 noix (10 g)" },

  // ───────────────────────── JUS & BOISSONS ─────────────────────────
  { id: "jus_orange", name: "Jus d'orange", category: "jus", per100: { kcal: 45, lipides: 0.2, glucides: 10, sucres: 8.7, proteines: 0.7, fibres: 0.2, alcool: 0 }, vitamins: { vitC: 40 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_pomme", name: "Jus de pomme", category: "jus", per100: { kcal: 46, lipides: 0.1, glucides: 11, sucres: 10.5, proteines: 0.1, fibres: 0.2, alcool: 0 }, vitamins: { vitC: 1 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_raisin", name: "Jus de raisin", category: "jus", per100: { kcal: 60, lipides: 0.1, glucides: 14.5, sucres: 14, proteines: 0.3, fibres: 0.1, alcool: 0 }, vitamins: { vitC: 0.2 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_ananas", name: "Jus d'ananas", category: "jus", per100: { kcal: 53, lipides: 0.1, glucides: 12.9, sucres: 12.5, proteines: 0.4, fibres: 0.3, alcool: 0 }, vitamins: { vitC: 10 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_tomate", name: "Jus de tomate", category: "jus", per100: { kcal: 17, lipides: 0.1, glucides: 3.5, sucres: 3.3, proteines: 0.9, fibres: 0.4, alcool: 0 }, vitamins: { vitC: 11, vitA: 42 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_pamplemousse", name: "Jus de pamplemousse", category: "jus", per100: { kcal: 39, lipides: 0.1, glucides: 9, sucres: 8.5, proteines: 0.5, fibres: 0.1, alcool: 0 }, vitamins: { vitC: 31 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_citron", name: "Jus de citron pressé", category: "jus", per100: { kcal: 22, lipides: 0.2, glucides: 6.9, sucres: 2.5, proteines: 0.4, fibres: 0.3, alcool: 0 }, vitamins: { vitC: 39 }, serving: 30, servingLabel: "1 citron pressé (30 ml)" },
  { id: "smoothie_multifruits", name: "Smoothie multifruits", category: "jus", per100: { kcal: 58, lipides: 0.3, glucides: 13, sucres: 12, proteines: 0.6, fibres: 1, alcool: 0 }, vitamins: { vitC: 20 }, serving: 250, servingLabel: "1 bouteille (250 ml)" },
  { id: "soda", name: "Soda classique", category: "jus", per100: { kcal: 42, lipides: 0, glucides: 10.6, sucres: 10.6, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 330, servingLabel: "1 canette (330 ml)" },
  { id: "soda_light", name: "Soda light / zéro", category: "jus", per100: { kcal: 0.3, lipides: 0, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 330, servingLabel: "1 canette (330 ml)" },
  { id: "boisson_energisante", name: "Boisson énergisante", category: "jus", per100: { kcal: 45, lipides: 0, glucides: 11, sucres: 11, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 250, servingLabel: "1 canette (250 ml)" },
  { id: "the_glace", name: "Thé glacé sucré", category: "jus", per100: { kcal: 32, lipides: 0, glucides: 7.8, sucres: 7.6, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 330, servingLabel: "1 canette (330 ml)" },
  { id: "eau", name: "Eau plate", category: "jus", per100: { kcal: 0, lipides: 0, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "eau_gazeuse", name: "Eau gazeuse", category: "jus", per100: { kcal: 0, lipides: 0, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 250, servingLabel: "1 verre (250 ml)" },

  // ───────────────────────── FRUITS ─────────────────────────
  { id: "pomme", name: "Pomme", category: "fruit", per100: { kcal: 52, lipides: 0.2, glucides: 14, sucres: 10, proteines: 0.3, fibres: 2.4, alcool: 0 }, vitamins: { vitC: 5 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "banane", name: "Banane", category: "fruit", per100: { kcal: 89, lipides: 0.3, glucides: 23, sucres: 12, proteines: 1.1, fibres: 2.6, alcool: 0 }, vitamins: { vitC: 9, potassium: 358 }, serving: 120, servingLabel: "1 fruit (120 g)" },
  { id: "orange", name: "Orange", category: "fruit", per100: { kcal: 47, lipides: 0.1, glucides: 12, sucres: 9, proteines: 0.9, fibres: 2.4, alcool: 0 }, vitamins: { vitC: 53 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "fraise", name: "Fraise", category: "fruit", per100: { kcal: 32, lipides: 0.3, glucides: 7.7, sucres: 4.9, proteines: 0.7, fibres: 2, alcool: 0 }, vitamins: { vitC: 59 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "raisin", name: "Raisin", category: "fruit", per100: { kcal: 69, lipides: 0.2, glucides: 18, sucres: 16, proteines: 0.7, fibres: 0.9, alcool: 0 }, vitamins: { vitC: 4 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "mangue", name: "Mangue", category: "fruit", per100: { kcal: 60, lipides: 0.4, glucides: 15, sucres: 14, proteines: 0.8, fibres: 1.6, alcool: 0 }, vitamins: { vitC: 36, vitA: 54 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "avocat", name: "Avocat", category: "fruit", per100: { kcal: 160, lipides: 15, glucides: 8.5, sucres: 0.7, proteines: 2, fibres: 6.7, alcool: 0 }, vitamins: { vitC: 10, vitE: 2.1, potassium: 485 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "citron", name: "Citron", category: "fruit", per100: { kcal: 29, lipides: 0.3, glucides: 9, sucres: 2.5, proteines: 1.1, fibres: 2.8, alcool: 0 }, vitamins: { vitC: 53 }, serving: 60, servingLabel: "1 fruit (60 g)" },
  { id: "poire", name: "Poire", category: "fruit", per100: { kcal: 57, lipides: 0.1, glucides: 15, sucres: 10, proteines: 0.4, fibres: 3.1, alcool: 0 }, vitamins: { vitC: 4 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "peche", name: "Pêche", category: "fruit", per100: { kcal: 39, lipides: 0.3, glucides: 9.5, sucres: 8.4, proteines: 0.9, fibres: 1.5, alcool: 0 }, vitamins: { vitC: 6, vitA: 16 }, serving: 130, servingLabel: "1 fruit (130 g)" },
  { id: "abricot", name: "Abricot", category: "fruit", per100: { kcal: 48, lipides: 0.4, glucides: 11, sucres: 9, proteines: 1.4, fibres: 2, alcool: 0 }, vitamins: { vitC: 10, vitA: 96 }, serving: 40, servingLabel: "1 fruit (40 g)" },
  { id: "cerise", name: "Cerise", category: "fruit", per100: { kcal: 63, lipides: 0.2, glucides: 16, sucres: 13, proteines: 1.1, fibres: 2.1, alcool: 0 }, vitamins: { vitC: 7 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "kiwi", name: "Kiwi", category: "fruit", per100: { kcal: 61, lipides: 0.5, glucides: 15, sucres: 9, proteines: 1.1, fibres: 3, alcool: 0 }, vitamins: { vitC: 93 }, serving: 75, servingLabel: "1 fruit (75 g)" },
  { id: "pasteque", name: "Pastèque", category: "fruit", per100: { kcal: 30, lipides: 0.2, glucides: 7.6, sucres: 6.2, proteines: 0.6, fibres: 0.4, alcool: 0 }, vitamins: { vitC: 8, vitA: 28 }, serving: 200, servingLabel: "1 tranche (200 g)" },
  { id: "melon", name: "Melon", category: "fruit", per100: { kcal: 34, lipides: 0.2, glucides: 8, sucres: 8, proteines: 0.8, fibres: 0.9, alcool: 0 }, vitamins: { vitC: 37, vitA: 169 }, serving: 200, servingLabel: "1/4 melon (200 g)" },
  { id: "pamplemousse", name: "Pamplemousse", category: "fruit", per100: { kcal: 42, lipides: 0.1, glucides: 11, sucres: 7, proteines: 0.8, fibres: 1.6, alcool: 0 }, vitamins: { vitC: 33 }, serving: 200, servingLabel: "1 fruit (200 g)" },
  { id: "framboise", name: "Framboise", category: "fruit", per100: { kcal: 52, lipides: 0.7, glucides: 12, sucres: 4.4, proteines: 1.2, fibres: 6.5, alcool: 0 }, vitamins: { vitC: 26 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "myrtille", name: "Myrtille", category: "fruit", per100: { kcal: 57, lipides: 0.3, glucides: 14, sucres: 10, proteines: 0.7, fibres: 2.4, alcool: 0 }, vitamins: { vitC: 10 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "mandarine", name: "Mandarine / Clémentine", category: "fruit", per100: { kcal: 53, lipides: 0.3, glucides: 13, sucres: 10, proteines: 0.8, fibres: 1.8, alcool: 0 }, vitamins: { vitC: 27 }, serving: 80, servingLabel: "1 fruit (80 g)" },
  { id: "ananas_fruit", name: "Ananas (fruit)", category: "fruit", per100: { kcal: 50, lipides: 0.1, glucides: 13, sucres: 10, proteines: 0.5, fibres: 1.4, alcool: 0 }, vitamins: { vitC: 48 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "figue", name: "Figue fraîche", category: "fruit", per100: { kcal: 74, lipides: 0.3, glucides: 19, sucres: 16, proteines: 0.8, fibres: 2.9, alcool: 0 }, vitamins: { vitC: 2 }, serving: 50, servingLabel: "1 fruit (50 g)" },
  { id: "datte", name: "Datte séchée", category: "fruit", per100: { kcal: 282, lipides: 0.4, glucides: 75, sucres: 63, proteines: 2.5, fibres: 8, alcool: 0 }, vitamins: { potassium: 656 }, serving: 20, servingLabel: "2 dattes (20 g)" },

  // ───────────────────────── LÉGUMES ─────────────────────────
  { id: "carotte", name: "Carotte", category: "legume", per100: { kcal: 41, lipides: 0.2, glucides: 10, sucres: 4.7, proteines: 0.9, fibres: 2.8, alcool: 0 }, vitamins: { vitA: 835, vitC: 6 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "brocoli", name: "Brocoli", category: "legume", per100: { kcal: 34, lipides: 0.4, glucides: 6.6, sucres: 1.7, proteines: 2.8, fibres: 2.6, alcool: 0 }, vitamins: { vitC: 89, vitA: 31 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "epinard", name: "Épinard", category: "legume", per100: { kcal: 23, lipides: 0.4, glucides: 3.6, sucres: 0.4, proteines: 2.9, fibres: 2.2, alcool: 0 }, vitamins: { vitA: 469, vitC: 28, fer: 2.7 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "tomate", name: "Tomate", category: "legume", per100: { kcal: 18, lipides: 0.2, glucides: 3.9, sucres: 2.6, proteines: 0.9, fibres: 1.2, alcool: 0 }, vitamins: { vitC: 14, vitA: 42 }, serving: 120, servingLabel: "1 fruit (120 g)" },
  { id: "pomme_terre", name: "Pomme de terre", category: "legume", per100: { kcal: 77, lipides: 0.1, glucides: 17, sucres: 0.8, proteines: 2, fibres: 2.2, alcool: 0 }, vitamins: { vitC: 20 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "courgette", name: "Courgette", category: "legume", per100: { kcal: 17, lipides: 0.3, glucides: 3.1, sucres: 2.5, proteines: 1.2, fibres: 1, alcool: 0 }, vitamins: { vitC: 18 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "poivron", name: "Poivron rouge", category: "legume", per100: { kcal: 31, lipides: 0.3, glucides: 6, sucres: 4.2, proteines: 1, fibres: 2.1, alcool: 0 }, vitamins: { vitC: 128, vitA: 157 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "oignon", name: "Oignon", category: "legume", per100: { kcal: 40, lipides: 0.1, glucides: 9.3, sucres: 4.2, proteines: 1.1, fibres: 1.7, alcool: 0 }, vitamins: { vitC: 7 }, serving: 60, servingLabel: "1 oignon (60 g)" },
  { id: "ail", name: "Ail", category: "legume", per100: { kcal: 143, lipides: 0.5, glucides: 28, sucres: 1, proteines: 6.4, fibres: 2.1, alcool: 0 }, vitamins: { vitC: 31 }, serving: 5, servingLabel: "1 gousse (5 g)" },
  { id: "aubergine", name: "Aubergine", category: "legume", per100: { kcal: 25, lipides: 0.2, glucides: 6, sucres: 3.2, proteines: 1, fibres: 3, alcool: 0 }, vitamins: { vitC: 2 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "chou_fleur", name: "Chou-fleur", category: "legume", per100: { kcal: 25, lipides: 0.3, glucides: 5, sucres: 1.9, proteines: 1.9, fibres: 2, alcool: 0 }, vitamins: { vitC: 48 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "chou_blanc", name: "Chou blanc", category: "legume", per100: { kcal: 25, lipides: 0.1, glucides: 5.8, sucres: 3.2, proteines: 1.3, fibres: 2.5, alcool: 0 }, vitamins: { vitC: 37 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "haricot_vert", name: "Haricot vert", category: "legume", per100: { kcal: 31, lipides: 0.1, glucides: 7, sucres: 3.3, proteines: 1.8, fibres: 2.7, alcool: 0 }, vitamins: { vitC: 12, vitA: 35 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "petit_pois", name: "Petit pois", category: "legume", per100: { kcal: 81, lipides: 0.4, glucides: 14, sucres: 5.7, proteines: 5.4, fibres: 5.1, alcool: 0 }, vitamins: { vitC: 40 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "champignon", name: "Champignon de Paris", category: "legume", per100: { kcal: 22, lipides: 0.3, glucides: 3.3, sucres: 1.7, proteines: 3.1, fibres: 1, alcool: 0 }, vitamins: {}, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "concombre", name: "Concombre", category: "legume", per100: { kcal: 12, lipides: 0.1, glucides: 2.2, sucres: 1.7, proteines: 0.7, fibres: 0.8, alcool: 0 }, vitamins: { vitC: 3 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "salade", name: "Salade verte", category: "legume", per100: { kcal: 15, lipides: 0.2, glucides: 2.2, sucres: 0.8, proteines: 1.4, fibres: 1.3, alcool: 0 }, vitamins: { vitA: 148, vitC: 4 }, serving: 50, servingLabel: "1 portion (50 g)" },
  { id: "patate_douce", name: "Patate douce", category: "legume", per100: { kcal: 86, lipides: 0.1, glucides: 20, sucres: 4.2, proteines: 1.6, fibres: 3, alcool: 0 }, vitamins: { vitA: 709, vitC: 2.4 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "betterave", name: "Betterave", category: "legume", per100: { kcal: 43, lipides: 0.2, glucides: 10, sucres: 7, proteines: 1.6, fibres: 2.8, alcool: 0 }, vitamins: { vitC: 5 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "manioc", name: "Manioc (racine, cru)", category: "legume", per100: { kcal: 160, lipides: 0.3, glucides: 38, sucres: 1.7, proteines: 1.4, fibres: 1.8, alcool: 0 }, vitamins: { vitC: 21 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "feuilles_manioc", name: "Feuilles de manioc (cuites)", category: "legume", per100: { kcal: 40, lipides: 0.6, glucides: 6, sucres: 1, proteines: 4.1, fibres: 3, alcool: 0 }, vitamins: { vitA: 800, vitC: 30, fer: 2.5, calcium: 200 }, serving: 100, servingLabel: "1 portion cuisinée (100 g)" },
  { id: "igname", name: "Igname (cuite)", category: "legume", per100: { kcal: 118, lipides: 0.2, glucides: 28, sucres: 0.5, proteines: 1.5, fibres: 4.1, alcool: 0 }, vitamins: { vitC: 17 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "gombo", name: "Gombo (okra)", category: "legume", per100: { kcal: 33, lipides: 0.2, glucides: 7.5, sucres: 1.5, proteines: 1.9, fibres: 3.2, alcool: 0 }, vitamins: { vitC: 23, vitA: 36 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "persil", name: "Persil frais", category: "legume", per100: { kcal: 36, lipides: 0.8, glucides: 6.3, sucres: 0.9, proteines: 3, fibres: 3.3, alcool: 0 }, vitamins: { vitC: 133, vitA: 421, fer: 6.2 }, serving: 10, servingLabel: "1 bouquet (10 g)" },
  { id: "taro", name: "Taro (cuit)", category: "legume", per100: { kcal: 112, lipides: 0.1, glucides: 26, sucres: 0.4, proteines: 1.5, fibres: 4.1, alcool: 0 }, vitamins: { vitC: 4, vitE: 2.9 }, serving: 150, servingLabel: "1 portion (150 g)" },

  // ───────────────────────── VIANDES, POISSONS & ŒUFS ─────────────────────────
  { id: "boeuf_maigre", name: "Bœuf (viande maigre, cru)", category: "proteine", per100: { kcal: 158, lipides: 5.5, glucides: 0, sucres: 0, proteines: 26, fibres: 0, alcool: 0 }, vitamins: { fer: 2.6, vitB12: 2.6 }, serving: 120, servingLabel: "1 portion (120 g)" },
  { id: "boeuf_hache", name: "Bœuf haché 15% MG", category: "proteine", per100: { kcal: 215, lipides: 15, glucides: 0, sucres: 0, proteines: 19, fibres: 0, alcool: 0 }, vitamins: { fer: 2.2, vitB12: 2.3 }, serving: 120, servingLabel: "1 portion (120 g)" },
  { id: "mouton", name: "Mouton / agneau (cru)", category: "proteine", per100: { kcal: 234, lipides: 16, glucides: 0, sucres: 0, proteines: 21, fibres: 0, alcool: 0 }, vitamins: { fer: 1.9, vitB12: 2.1 }, serving: 120, servingLabel: "1 portion (120 g)" },
  { id: "poulet", name: "Poulet (blanc, sans peau, cru)", category: "proteine", per100: { kcal: 120, lipides: 2, glucides: 0, sucres: 0, proteines: 23, fibres: 0, alcool: 0 }, vitamins: { fer: 0.4, vitB12: 0.3 }, serving: 120, servingLabel: "1 portion (120 g)" },
  { id: "porc", name: "Porc (filet, cru)", category: "proteine", per100: { kcal: 143, lipides: 4.5, glucides: 0, sucres: 0, proteines: 24, fibres: 0, alcool: 0 }, vitamins: { fer: 1, vitB12: 0.7 }, serving: 120, servingLabel: "1 portion (120 g)" },
  { id: "poisson_maigre", name: "Poisson maigre (tilapia, merlu)", category: "proteine", per100: { kcal: 96, lipides: 1.7, glucides: 0, sucres: 0, proteines: 20, fibres: 0, alcool: 0 }, vitamins: { vitB12: 1.5 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "poisson_gras", name: "Poisson gras (maquereau, sardine)", category: "proteine", per100: { kcal: 205, lipides: 13, glucides: 0, sucres: 0, proteines: 19, fibres: 0, alcool: 0 }, vitamins: { vitD: 10, vitB12: 8.7 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "thon", name: "Thon frais", category: "proteine", per100: { kcal: 144, lipides: 4.9, glucides: 0, sucres: 0, proteines: 23, fibres: 0, alcool: 0 }, vitamins: { vitD: 2.7, vitB12: 9.4 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "crevette", name: "Crevette (cuite)", category: "proteine", per100: { kcal: 99, lipides: 0.3, glucides: 0.9, sucres: 0, proteines: 24, fibres: 0, alcool: 0 }, vitamins: { vitB12: 1.1 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "oeuf", name: "Œuf entier", category: "proteine", per100: { kcal: 155, lipides: 11, glucides: 1.1, sucres: 1.1, proteines: 13, fibres: 0, alcool: 0 }, vitamins: { vitA: 160, vitD: 1.8, vitB12: 0.9 }, serving: 60, servingLabel: "1 œuf (60 g)" },
  { id: "jambon", name: "Jambon blanc", category: "proteine", per100: { kcal: 107, lipides: 3, glucides: 0.5, sucres: 0.5, proteines: 19, fibres: 0, alcool: 0 }, vitamins: { vitB12: 0.5 }, serving: 40, servingLabel: "1 tranche (40 g)" },

  // ───────────────────────── CÉRÉALES, LÉGUMINEUSES & SUCRANTS ─────────────────────────
  { id: "miel", name: "Miel", category: "autre", per100: { kcal: 304, lipides: 0, glucides: 82, sucres: 82, proteines: 0.3, fibres: 0.2, alcool: 0 }, vitamins: {}, serving: 15, servingLabel: "1 c. à soupe (15 g)" },
  { id: "sucre_blanc", name: "Sucre blanc", category: "autre", per100: { kcal: 400, lipides: 0, glucides: 100, sucres: 100, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 5, servingLabel: "1 morceau (5 g)" },
  { id: "arachide", name: "Arachide grillée", category: "autre", per100: { kcal: 567, lipides: 49, glucides: 16, sucres: 4, proteines: 26, fibres: 8.5, alcool: 0 }, vitamins: { vitE: 8 }, serving: 30, servingLabel: "1 poignée (30 g)" },
  { id: "banane_plantain", name: "Banane plantain (crue)", category: "fruit", per100: { kcal: 122, lipides: 0.4, glucides: 32, sucres: 15, proteines: 1.3, fibres: 2.3, alcool: 0 }, vitamins: { vitA: 56, vitC: 18, potassium: 499 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "riz_blanc", name: "Riz blanc cuit", category: "autre", per100: { kcal: 130, lipides: 0.3, glucides: 28, sucres: 0.1, proteines: 2.7, fibres: 0.4, alcool: 0 }, vitamins: {}, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "pain_blanc", name: "Pain blanc / baguette", category: "autre", per100: { kcal: 265, lipides: 1.2, glucides: 51, sucres: 3, proteines: 9, fibres: 2.7, alcool: 0 }, vitamins: {}, serving: 60, servingLabel: "2 tranches (60 g)" },
  { id: "lentilles", name: "Lentilles cuites", category: "autre", per100: { kcal: 116, lipides: 0.4, glucides: 20, sucres: 1.8, proteines: 9, fibres: 7.9, alcool: 0 }, vitamins: { fer: 3.3 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "haricots_rouges", name: "Haricots rouges cuits", category: "autre", per100: { kcal: 127, lipides: 0.5, glucides: 23, sucres: 0.3, proteines: 8.7, fibres: 6.4, alcool: 0 }, vitamins: { fer: 2.2 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "pates", name: "Pâtes cuites", category: "autre", per100: { kcal: 158, lipides: 0.9, glucides: 31, sucres: 0.6, proteines: 5.8, fibres: 1.8, alcool: 0 }, vitamins: {}, serving: 200, servingLabel: "1 portion (200 g)" },
  { id: "mil", name: "Mil / sorgho cuit", category: "autre", per100: { kcal: 119, lipides: 1, glucides: 24, sucres: 0.3, proteines: 3.5, fibres: 1.3, alcool: 0 }, vitamins: { fer: 1.3 }, serving: 150, servingLabel: "1 portion (150 g)" },

  // ───────────────────────── ALCOOLS (référence rapide) ─────────────────────────
  { id: "ref_biere", name: "Bière (5°)", category: "alcool", per100: { kcal: 43, lipides: 0, glucides: 3.6, sucres: 3.5, proteines: 0.5, fibres: 0, alcool: 4 }, vitamins: {}, serving: 330, servingLabel: "1 canette (330 ml)" },
  { id: "ref_vin", name: "Vin rouge (13°)", category: "alcool", per100: { kcal: 85, lipides: 0, glucides: 0.5, sucres: 0.5, proteines: 0.1, fibres: 0, alcool: 10.3 }, vitamins: {}, serving: 125, servingLabel: "1 verre (125 ml)" },
  { id: "ref_whisky", name: "Whisky (40°)", category: "alcool", per100: { kcal: 231, lipides: 0, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 31.6 }, vitamins: {}, serving: 40, servingLabel: "1 shot (40 ml)" },
];

export const VITAMIN_LABELS = {
  vitC: { name: "Vitamine C", unit: "mg", rdi: 90 },
  vitA: { name: "Vitamine A", unit: "µg", rdi: 800 },
  vitD: { name: "Vitamine D", unit: "µg", rdi: 15 },
  vitE: { name: "Vitamine E", unit: "mg", rdi: 12 },
  vitB12: { name: "Vitamine B12", unit: "µg", rdi: 2.4 },
  calcium: { name: "Calcium", unit: "mg", rdi: 950 },
  fer: { name: "Fer", unit: "mg", rdi: 14 },
  potassium: { name: "Potassium", unit: "mg", rdi: 3500 },
};

// Sources de vitamines — pour la section "bibliothèque" éducative
export const VITAMIN_SOURCES = [
  { vitamin: "Vitamine A", role: "Vision, peau, immunité", sources: ["Carotte", "Épinard", "Patate douce", "Mangue", "Beurre", "Melon"] },
  { vitamin: "Vitamine C", role: "Immunité, antioxydant, absorption du fer", sources: ["Kiwi", "Poivron rouge", "Fraise", "Orange", "Brocoli", "Citron"] },
  { vitamin: "Vitamine D", role: "Os, calcium, immunité", sources: ["Poissons gras", "Jaune d'œuf", "Boissons végétales enrichies", "Exposition au soleil"] },
  { vitamin: "Vitamine E", role: "Antioxydant, protection cellulaire", sources: ["Huile de tournesol", "Huile d'arachide", "Huile de colza", "Avocat"] },
  { vitamin: "Vitamine B12", role: "Système nerveux, globules rouges", sources: ["Lait", "Comté", "Yaourt", "Boissons soja enrichies"] },
  { vitamin: "Calcium", role: "Os, dents, contraction musculaire", sources: ["Comté", "Lait", "Yaourt nature", "Boissons végétales enrichies", "Brocoli"] },
  { vitamin: "Fer", role: "Transport de l'oxygène dans le sang", sources: ["Bœuf", "Épinard", "Lentilles", "Persil", "Feuilles de manioc", "Mouton"] },
  { vitamin: "Potassium", role: "Équilibre hydrique, muscles, cœur", sources: ["Datte", "Avocat", "Banane", "Pomme de terre", "Épinard"] },
];
