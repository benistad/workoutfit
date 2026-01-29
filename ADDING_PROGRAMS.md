# Comment ajouter un nouveau programme

## 1. Préparer les fichiers

### Dans le dossier `/PDF/`
- Ajouter le PDF du programme (ex: `nom-programme.pdf`)
- Ajouter une capture PNG de la page de détails (ex: `Nom Programme Details.png`)

### Dans le dossier `/workout-app/public/exercises/`
- Extraire les images de chaque jour du PDF
- Nommer les fichiers : `nom-programme-day-01.png`, `nom-programme-day-02.png`, etc.

## 2. Extraire les informations du PNG de détails

Le PNG contient généralement :
- **Nom du programme** (ex: "Back & Core")
- **Sous-titre** (ex: "Support & Recovery")
- **Durée** (ex: "30 days")
- **Équipement** : `none` | `minimal` | `full`
- **Type** : `addon` | `main` | `challenge`
- **Difficulté** : 1 à 5 (nombre de barres rouges)
- **Label difficulté** : "Débutant", "Intermédiaire", "Avancé", etc.

## 3. Ajouter le programme dans `src/data/workouts.js`

```javascript
{
  id: 'nom-programme',           // ID unique, en kebab-case
  name: 'Nom Programme',         // Nom affiché
  subtitle: 'Sous-titre',        // Depuis le PNG de détails
  description: 'Description complète du programme',
  duration: 30,                  // Nombre de jours
  daysPerWeek: 7,
  equipment: 'none',             // 'none' | 'minimal' | 'full'
  type: 'addon',                 // 'addon' | 'main' | 'challenge'
  difficulty: 2,                 // 1-5 (barres rouges sur le PNG)
  difficultyLabel: 'Débutant',   // Texte sous les barres
  image: 'URL_IMAGE_COUVERTURE', // Image Unsplash ou locale
  days: [
    { day: 1, title: 'Day 1 - Titre', image: '/exercises/nom-programme-day-01.png' },
    { day: 2, title: 'Day 2 - Titre', image: '/exercises/nom-programme-day-02.png' },
    // ... tous les jours
  ]
}
```

## 4. Image de couverture

Utiliser une image Unsplash en rapport avec le programme :
```
https://images.unsplash.com/photo-XXXXX?w=800&h=600&fit=crop&q=80
```

Ou une image locale dans `/public/covers/`.

## 5. Déployer

```bash
git add .
git commit -m "Add [Nom Programme] workout"
git push
```

Vercel déploiera automatiquement.

---

## Exemple : Back & Core

**PNG de détails :**
- Nom : Back & Core
- Sous-titre : Support & Recovery
- Durée : 30 days
- Équipement : No Equipment → `equipment: 'none'`
- Type : Addon Program → `type: 'addon'`
- Difficulté : 2 barres rouges → `difficulty: 2`, `difficultyLabel: 'Débutant'`

**Résultat dans workouts.js :**
```javascript
{
  id: 'back-and-core',
  name: 'Back & Core',
  subtitle: 'Support & Recovery',
  description: 'Programme DAREBEE de 30 jours pour le dos et les abdominaux',
  duration: 30,
  daysPerWeek: 7,
  equipment: 'none',
  type: 'addon',
  difficulty: 2,
  difficultyLabel: 'Débutant',
  image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&q=80',
  days: [...]
}
```
