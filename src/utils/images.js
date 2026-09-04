const FOOD_KEYWORDS = {
  lait_entier: 'milk,glass', lait_demi: 'milk,glass', lait_ecreme: 'milk,glass', lait_chevre: 'goat,milk',
  lait_amande: 'almond,milk', lait_soja: 'soy,milk', lait_avoine: 'oat,milk', lait_riz: 'rice,milk',
  yaourt_nature: 'yogurt', fromage_blanc: 'cottage,cheese', kefir: 'kefir', comte: 'cheese',
  huile_olive: 'olive,oil', huile_tournesol: 'sunflower,oil', huile_colza: 'canola,oil', huile_coco: 'coconut,oil',
  huile_lin: 'flaxseed,oil', huile_sesame: 'sesame,oil', huile_arachide: 'peanut,oil', beurre: 'butter', margarine: 'margarine',
  jus_orange: 'orange,juice', jus_pomme: 'apple,juice', jus_raisin: 'grape,juice', jus_ananas: 'pineapple,juice',
  jus_tomate: 'tomato,juice', jus_pamplemousse: 'grapefruit,juice', jus_citron: 'lemon,juice', smoothie_multifruits: 'fruit,smoothie',
  soda: 'soda,drink', soda_light: 'soda,drink', boisson_energisante: 'energy,drink', the_glace: 'iced,tea', eau: 'water,glass', eau_gazeuse: 'sparkling,water',
  pomme: 'apple,fruit', banane: 'banana,fruit', orange: 'orange,fruit', fraise: 'strawberry,fruit', raisin: 'grapes,fruit', mangue: 'mango,fruit',
  avocat: 'avocado,fruit', citron: 'lemon,fruit', poire: 'pear,fruit', peche: 'peach,fruit', abricot: 'apricot,fruit', cerise: 'cherry,fruit',
  kiwi: 'kiwi,fruit', pasteque: 'watermelon,fruit', melon: 'melon,fruit', pamplemousse: 'grapefruit,fruit', framboise: 'raspberry,fruit',
  myrtille: 'blueberry,fruit', mandarine: 'tangerine,fruit', ananas_fruit: 'pineapple,fruit', figue: 'fig,fruit', datte: 'dates,fruit',
  carotte: 'carrot,vegetable', brocoli: 'broccoli,vegetable', epinard: 'spinach,vegetable', tomate: 'tomato,vegetable', pomme_terre: 'potato,vegetable',
  courgette: 'zucchini,vegetable', poivron: 'bell,pepper', oignon: 'onion,vegetable', ail: 'garlic,vegetable', aubergine: 'eggplant,vegetable',
  chou_fleur: 'cauliflower,vegetable', chou_blanc: 'cabbage,vegetable', haricot_vert: 'green,beans', petit_pois: 'peas,vegetable', champignon: 'mushroom,vegetable',
  concombre: 'cucumber,vegetable', salade: 'green,salad', patate_douce: 'sweet,potato', betterave: 'beetroot,vegetable', manioc: 'cassava',
  feuilles_manioc: 'cassava,leaves', igname: 'yam,root', gombo: 'okra,vegetable', persil: 'parsley', taro: 'taro,root',
  boeuf_maigre: 'beef,steak', boeuf_hache: 'ground,beef', mouton: 'lamb,meat', poulet: 'chicken,breast', porc: 'pork,loin',
  poisson_maigre: 'white,fish', poisson_gras: 'sardines,fish', thon: 'tuna,fish', crevette: 'shrimp', oeuf: 'egg', jambon: 'ham',
  miel: 'honey', sucre_blanc: 'sugar,cubes', arachide: 'peanuts', banane_plantain: 'plantain,banana', riz_blanc: 'cooked,rice',
  pain_blanc: 'bread,baguette', lentilles: 'lentils', haricots_rouges: 'red,beans', pates: 'pasta', mil: 'millet,grain',
  ref_biere: 'beer,glass', ref_vin: 'red,wine', ref_whisky: 'whisky,glass',
};

const DRINK_KEYWORDS = {
  biere_blonde: 'beer,glass', biere_ipa: 'craft,beer', biere_sans_alcool: 'beer,glass', cidre: 'cider,glass',
  vin_rouge: 'red,wine', vin_blanc: 'white,wine', vin_moelleux: 'sweet,wine', champagne: 'champagne,glass', rose: 'rose,wine',
  porto: 'port,wine', spritz: 'spritz,cocktail', whisky: 'whisky,glass', vodka: 'vodka,glass', rhum: 'rum,glass', gin: 'gin,cocktail',
  tequila: 'tequila,glass', pastis: 'pastis,glass', liqueur: 'liqueur,glass', cocktail: 'cocktail,drink', custom: 'cocktail,drink',
};

function lockFor(id) {
  let n = 0;
  for (const ch of id) n = (n * 31 + ch.charCodeAt(0)) >>> 0;
  return (n % 997) + 1;
}

export function foodImage(id) {
  const q = FOOD_KEYWORDS[id] || 'fresh,food';
  return `https://loremflickr.com/900/700/${q}?lock=${lockFor(id)}`;
}

export function drinkImage(id) {
  const q = DRINK_KEYWORDS[id] || 'cocktail,drink';
  return `https://loremflickr.com/900/700/${q}?lock=${lockFor(`drink-${id}`)}`;
}
