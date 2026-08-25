# Dosimètre 🧪

Application web pour :
- **Alcoomètre** : calcul de l'alcool pur (g/ml), des calories, des unités standards (FR/UK/US) et une estimation d'alcoolémie (formule de Widmark) à partir du type de boisson, du titrage (%) et du volume.
- **Comparateur de boissons** : compare jusqu'à 5 boissons alcoolisées côte à côte.
- **Comparateur d'aliments** : compare laits, huiles, jus, fruits et légumes (calories, macronutriments, vitamines) avec quantités ajustables.
- **Bibliothèque des vitamines** : rôles et meilleures sources alimentaires.

⚠️ Toutes les valeurs sont indicatives (moyennes de tables nutritionnelles publiques) — usage informatif uniquement, ne remplace pas un avis médical.

## Stack

React 19 + Vite + Tailwind CSS. Aucun backend, aucune base de données — tout tourne côté client.

## Développement local

```bash
npm install
npm run dev
```

## Déploiement sur Vercel (via GitHub)

1. Crée un nouveau dépôt sur GitHub et pousse ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Dosimètre"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/<ton-repo>.git
   git push -u origin main
   ```
2. Va sur [vercel.com](https://vercel.com), clique **Add New → Project**, choisis ton dépôt GitHub.
3. Vercel détecte automatiquement Vite. Garde les réglages par défaut :
   - Build command : `npm run build`
   - Output directory : `dist`
4. Clique **Deploy**. L'app sera disponible en quelques secondes sur une URL `*.vercel.app`.

Chaque nouveau `git push` sur `main` redéploiera automatiquement l'app.

## Ajouter des produits

Toute la base nutritionnelle vit dans `src/data/database.js` — ajoute une entrée dans `PRODUCTS` (aliments) ou `ALCOHOL_TYPES` (boissons alcoolisées) pour l'étendre.
