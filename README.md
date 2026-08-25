# Dosimètre 🧪

Application web d'information nutritionnelle et alcoolologique :

- **Alcoomètre** : alcool pur, calories issues de l'éthanol et des sucres, unités de 10 g / 8 g / 14 g et estimation très approximative de l'alcoolémie.
- **Comparateur de boissons** : jusqu'à 5 boissons, avec titrage, volume, quantité et sucres modifiables.
- **Comparateur d'aliments** : jusqu'à 6 aliments, avec quantités ajustables, macronutriments et vitamines.
- **Bibliothèque des vitamines** : rôles et sources alimentaires.

## Important sur l'alcoolémie

Le calcul Widmark est un **modèle**, pas un appareil de mesure. Le coefficient de distribution, l'absorption et la vitesse d'élimination varient fortement d'une personne à l'autre. L'application affiche donc une fourchette indicative et interdit implicitement toute interprétation du résultat comme une preuve d'aptitude à conduire.

Le repère routier peut être choisi entre la **Côte d'Ivoire (0,8 g/L)** et la **France (0,5 g/L pour un conducteur standard)**. Le seuil affiché est un contexte réglementaire, pas un résultat de contrôle.

## Données nutritionnelles

Les valeurs sont des moyennes indicatives. La structure est compatible avec une future alimentation depuis une base documentée comme **Ciqual 2025** ou une base locale/étiquetage produit. Pour les aliments génériques, les unités sont explicitement distinguées :

- lait / jus / boissons : ml ;
- fruits / légumes / matières grasses : g ;
- alcool de référence : ml.

Les huiles et matières grasses sont désormais calculées sur une base **100 g**, afin d'éviter l'erreur consistant à traiter directement 10 ml comme 10 g.

## Calculs principaux

- Alcool pur (ml) = volume × ABV / 100
- Alcool pur (g) = alcool pur (ml) × 0,789
- Énergie de l'alcool ≈ alcool (g) × 7 kcal
- Énergie des sucres = sucres (g) × 4 kcal
- Unité de 10 g = alcool pur (g) / 10

## Stack

React 19 + Vite + Tailwind CSS. Aucun backend : les calculs sont effectués côté client.

## Développement

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Sources de référence à privilégier pour une future version documentée

- ANSES / Ciqual 2025 pour les compositions nutritionnelles.
- Ministère des Transports de Côte d'Ivoire pour le repère d'alcoolémie routière.
- Publications de toxicologie médico-légale pour les limites et incertitudes des modèles de Widmark.

Les données actuellement embarquées restent indicatives et ne doivent pas être présentées comme des mesures analytiques.
