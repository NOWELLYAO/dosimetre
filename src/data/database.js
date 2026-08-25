// Base de données nutritionnelle — valeurs moyennes indicatives (pour 100 g ou 100 ml)
// Sources : moyennes de tables nutritionnelles publiques (CIQUAL / USDA), à titre indicatif uniquement.

export const ALCOHOL_TYPES = [
  { id: "biere_blonde", name: "Bière blonde", emoji: "🍺", abv: 5, sucre100: 3.5, kcalBase100: 42, defVol: 330 },
  { id: "biere_ipa", name: "Bière IPA / forte", emoji: "🍻", abv: 6.5, sucre100: 3, kcalBase100: 45, defVol: 330 },
  { id: "cidre", name: "Cidre", emoji: "🍏", abv: 4.5, sucre100: 5, kcalBase100: 40, defVol: 330 },
  { id: "vin_rouge", name: "Vin rouge", emoji: "🍷", abv: 13, sucre100: 0.5, kcalBase100: 10, defVol: 750 },
  { id: "vin_blanc", name: "Vin blanc sec", emoji: "🥂", abv: 12.5, sucre100: 1.5, kcalBase100: 12, defVol: 750 },
  { id: "vin_moelleux", name: "Vin blanc moelleux", emoji: "🍾", abv: 12, sucre100: 6, kcalBase100: 25, defVol: 750 },
  { id: "champagne", name: "Champagne / brut", emoji: "🥂", abv: 12, sucre100: 2, kcalBase100: 15, defVol: 750 },
  { id: "rose", name: "Vin rosé", emoji: "🌸", abv: 12.5, sucre100: 1.5, kcalBase100: 12, defVol: 750 },
  { id: "whisky", name: "Whisky", emoji: "🥃", abv: 40, sucre100: 0, kcalBase100: 2, defVol: 40 },
  { id: "vodka", name: "Vodka", emoji: "🧊", abv: 40, sucre100: 0, kcalBase100: 0, defVol: 40 },
  { id: "rhum", name: "Rhum", emoji: "🏝️", abv: 40, sucre100: 0.5, kcalBase100: 2, defVol: 40 },
  { id: "gin", name: "Gin", emoji: "🌿", abv: 40, sucre100: 0, kcalBase100: 0, defVol: 40 },
  { id: "tequila", name: "Tequila", emoji: "🌵", abv: 38, sucre100: 0, kcalBase100: 0, defVol: 40 },
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
  { id: "lait", name: "Laits & boissons végétales", unit: "ml", icon: "🥛" },
  { id: "huile", name: "Huiles & matières grasses", unit: "ml", icon: "🫒" },
  { id: "jus", name: "Jus & boissons", unit: "ml", icon: "🧃" },
  { id: "fruit", name: "Fruits", unit: "g", icon: "🍎" },
  { id: "legume", name: "Légumes", unit: "g", icon: "🥦" },
  { id: "alcool", name: "Alcools (référence)", unit: "ml", icon: "🍷" },
];

// per100 = valeurs pour 100 g ou 100 ml selon la catégorie
export const PRODUCTS = [
  // LAITS
  { id: "lait_entier", name: "Lait entier", category: "lait", per100: { kcal: 64, lipides: 3.6, glucides: 4.8, sucres: 4.8, proteines: 3.2, fibres: 0, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.05, vitA: 28, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_demi", name: "Lait demi-écrémé", category: "lait", per100: { kcal: 46, lipides: 1.6, glucides: 4.8, sucres: 4.8, proteines: 3.3, fibres: 0, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.05, vitA: 15, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_ecreme", name: "Lait écrémé", category: "lait", per100: { kcal: 35, lipides: 0.2, glucides: 4.9, sucres: 4.9, proteines: 3.4, fibres: 0, alcool: 0 }, vitamins: { calcium: 125, vitD: 0.02, vitA: 3, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_amande", name: "Boisson amande", category: "lait", per100: { kcal: 24, lipides: 1.1, glucides: 2.5, sucres: 2.4, proteines: 0.5, fibres: 0.3, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_soja", name: "Boisson soja", category: "lait", per100: { kcal: 33, lipides: 1.8, glucides: 1, sucres: 1, proteines: 3.3, fibres: 0.5, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },
  { id: "lait_avoine", name: "Boisson avoine", category: "lait", per100: { kcal: 46, lipides: 1.5, glucides: 6.7, sucres: 4.1, proteines: 1, fibres: 0.8, alcool: 0 }, vitamins: { calcium: 120, vitD: 0.075, vitA: 0, vitB12: 0.4 }, serving: 250, servingLabel: "1 verre (250 ml)" },

  // HUILES
  { id: "huile_olive", name: "Huile d'olive", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 14 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_tournesol", name: "Huile de tournesol", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 41 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_colza", name: "Huile de colza", category: "huile", per100: { kcal: 884, lipides: 100, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 25 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "huile_coco", name: "Huile de coco", category: "huile", per100: { kcal: 862, lipides: 99, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: { vitE: 0.5 }, serving: 10, servingLabel: "1 c. à soupe (10 ml)" },
  { id: "beurre", name: "Beurre", category: "huile", per100: { kcal: 717, lipides: 81, glucides: 0.7, sucres: 0.7, proteines: 0.9, fibres: 0, alcool: 0 }, vitamins: { vitA: 684 }, serving: 10, servingLabel: "1 noix (10 g)" },

  // JUS
  { id: "jus_orange", name: "Jus d'orange", category: "jus", per100: { kcal: 45, lipides: 0.2, glucides: 10, sucres: 8.7, proteines: 0.7, fibres: 0.2, alcool: 0 }, vitamins: { vitC: 40 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_pomme", name: "Jus de pomme", category: "jus", per100: { kcal: 46, lipides: 0.1, glucides: 11, sucres: 10.5, proteines: 0.1, fibres: 0.2, alcool: 0 }, vitamins: { vitC: 1 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_raisin", name: "Jus de raisin", category: "jus", per100: { kcal: 60, lipides: 0.1, glucides: 14.5, sucres: 14, proteines: 0.3, fibres: 0.1, alcool: 0 }, vitamins: { vitC: 0.2 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "jus_ananas", name: "Jus d'ananas", category: "jus", per100: { kcal: 53, lipides: 0.1, glucides: 12.9, sucres: 12.5, proteines: 0.4, fibres: 0.3, alcool: 0 }, vitamins: { vitC: 10 }, serving: 200, servingLabel: "1 verre (200 ml)" },
  { id: "soda", name: "Soda classique", category: "jus", per100: { kcal: 42, lipides: 0, glucides: 10.6, sucres: 10.6, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 330, servingLabel: "1 canette (330 ml)" },
  { id: "eau", name: "Eau plate", category: "jus", per100: { kcal: 0, lipides: 0, glucides: 0, sucres: 0, proteines: 0, fibres: 0, alcool: 0 }, vitamins: {}, serving: 250, servingLabel: "1 verre (250 ml)" },

  // FRUITS
  { id: "pomme", name: "Pomme", category: "fruit", per100: { kcal: 52, lipides: 0.2, glucides: 14, sucres: 10, proteines: 0.3, fibres: 2.4, alcool: 0 }, vitamins: { vitC: 5 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "banane", name: "Banane", category: "fruit", per100: { kcal: 89, lipides: 0.3, glucides: 23, sucres: 12, proteines: 1.1, fibres: 2.6, alcool: 0 }, vitamins: { vitC: 9, potassium: 358 }, serving: 120, servingLabel: "1 fruit (120 g)" },
  { id: "orange", name: "Orange", category: "fruit", per100: { kcal: 47, lipides: 0.1, glucides: 12, sucres: 9, proteines: 0.9, fibres: 2.4, alcool: 0 }, vitamins: { vitC: 53 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "fraise", name: "Fraise", category: "fruit", per100: { kcal: 32, lipides: 0.3, glucides: 7.7, sucres: 4.9, proteines: 0.7, fibres: 2, alcool: 0 }, vitamins: { vitC: 59 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "raisin", name: "Raisin", category: "fruit", per100: { kcal: 69, lipides: 0.2, glucides: 18, sucres: 16, proteines: 0.7, fibres: 0.9, alcool: 0 }, vitamins: { vitC: 4 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "mangue", name: "Mangue", category: "fruit", per100: { kcal: 60, lipides: 0.4, glucides: 15, sucres: 14, proteines: 0.8, fibres: 1.6, alcool: 0 }, vitamins: { vitC: 36, vitA: 54 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "avocat", name: "Avocat", category: "fruit", per100: { kcal: 160, lipides: 15, glucides: 8.5, sucres: 0.7, proteines: 2, fibres: 6.7, alcool: 0 }, vitamins: { vitC: 10, vitE: 2.1 }, serving: 150, servingLabel: "1 fruit (150 g)" },
  { id: "citron", name: "Citron", category: "fruit", per100: { kcal: 29, lipides: 0.3, glucides: 9, sucres: 2.5, proteines: 1.1, fibres: 2.8, alcool: 0 }, vitamins: { vitC: 53 }, serving: 60, servingLabel: "1 fruit (60 g)" },

  // LEGUMES
  { id: "carotte", name: "Carotte", category: "legume", per100: { kcal: 41, lipides: 0.2, glucides: 10, sucres: 4.7, proteines: 0.9, fibres: 2.8, alcool: 0 }, vitamins: { vitA: 835, vitC: 6 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "brocoli", name: "Brocoli", category: "legume", per100: { kcal: 34, lipides: 0.4, glucides: 6.6, sucres: 1.7, proteines: 2.8, fibres: 2.6, alcool: 0 }, vitamins: { vitC: 89, vitA: 31 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "epinard", name: "Épinard", category: "legume", per100: { kcal: 23, lipides: 0.4, glucides: 3.6, sucres: 0.4, proteines: 2.9, fibres: 2.2, alcool: 0 }, vitamins: { vitA: 469, vitC: 28, fer: 2.7 }, serving: 100, servingLabel: "1 portion (100 g)" },
  { id: "tomate", name: "Tomate", category: "legume", per100: { kcal: 18, lipides: 0.2, glucides: 3.9, sucres: 2.6, proteines: 0.9, fibres: 1.2, alcool: 0 }, vitamins: { vitC: 14, vitA: 42 }, serving: 120, servingLabel: "1 fruit (120 g)" },
  { id: "pomme_terre", name: "Pomme de terre", category: "legume", per100: { kcal: 77, lipides: 0.1, glucides: 17, sucres: 0.8, proteines: 2, fibres: 2.2, alcool: 0 }, vitamins: { vitC: 20 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "courgette", name: "Courgette", category: "legume", per100: { kcal: 17, lipides: 0.3, glucides: 3.1, sucres: 2.5, proteines: 1.2, fibres: 1, alcool: 0 }, vitamins: { vitC: 18 }, serving: 150, servingLabel: "1 portion (150 g)" },
  { id: "poivron", name: "Poivron rouge", category: "legume", per100: { kcal: 31, lipides: 0.3, glucides: 6, sucres: 4.2, proteines: 1, fibres: 2.1, alcool: 0 }, vitamins: { vitC: 128, vitA: 157 }, serving: 100, servingLabel: "1 portion (100 g)" },

  // ALCOOLS (référence rapide pour comparateur, valeurs moyennes)
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
  { vitamin: "Vitamine A", role: "Vision, peau, immunité", sources: ["Carotte", "Épinard", "Mangue", "Beurre", "Foie"] },
  { vitamin: "Vitamine C", role: "Immunité, antioxydant, fer", sources: ["Poivron rouge", "Fraise", "Orange", "Brocoli", "Citron"] },
  { vitamin: "Vitamine D", role: "Os, calcium, immunité", sources: ["Poissons gras", "Jaune d'œuf", "Boissons végétales enrichies", "Soleil"] },
  { vitamin: "Vitamine E", role: "Antioxydant, peau", sources: ["Huile de tournesol", "Huile de colza", "Avocat", "Amandes"] },
  { vitamin: "Vitamine B12", role: "Système nerveux, globules rouges", sources: ["Lait", "Œufs", "Viande", "Boissons soja enrichies"] },
  { vitamin: "Calcium", role: "Os, dents, contraction musculaire", sources: ["Lait", "Boissons végétales enrichies", "Brocoli", "Amandes"] },
  { vitamin: "Fer", role: "Transport de l'oxygène", sources: ["Épinard", "Viande rouge", "Lentilles", "Tofu"] },
  { vitamin: "Potassium", role: "Équilibre hydrique, muscles, cœur", sources: ["Banane", "Pomme de terre", "Épinard", "Avocat"] },
];
