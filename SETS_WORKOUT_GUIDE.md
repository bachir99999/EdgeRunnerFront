# 🚀 Système d'Exercice Série par Série avec Chrono de Repos

## 📋 Nouveau Flux de Navigation

Au lieu de naviguer d'exercice en exercice, vous naviguez maintenant **série par série** avec un chrono de repos entre chaque!

### Structure de Progression:

```
Exercice 1, Série 1 → [REST] → Exercice 1, Série 2 → [REST]
→ Exercice 1, Série 3 → [REST] → Exercice 2, Série 1 → [REST] ...
```

## 🎯 Fonctionnalités Principales

### 1️⃣ **Navigation Série par Série**

- Affiche le numéro de l'exercice courant
- Affiche la série courante (ex: "Série 2/3")
- Compte global des séries (ex: "Série 5 sur 12")
- Barre de progression en temps réel

### 2️⃣ **Chrono de Repos Interactif**

Entre chaque série, le chrono de repos s'affiche avec:

- **Démarrage Automatique**: Le chrono commence immédiatement (60 secondes par défaut)
- **Pause/Reprendre**: Bouton pour mettre en pause/reprendre le compte à rebours
- **Réinitialiser**: Ramène le chrono à 60 secondes
- **Prêt pour la Suite**: Bouton pour passer à la série suivante immédiatement
- **Barre de Progression**: Montre l'avancement du temps de repos

### 3️⃣ **Affichage des Exercices**

Pour chaque série, vous voyez:

- ✅ Nom de l'exercice (en gros caractères)
- ✅ Description de l'exercice
- ✅ Nombre de répétitions
- ✅ Poids utilisé (optionnel)
- ✅ Groupe musculaire cible
- ✅ Difficulté de l'exercice

### 4️⃣ **Navigation Complète**

- 🔙 **Bouton Précédent**: Revenir à la série précédente
- ▶️ **Bouton Suivant**: Aller à la série suivante (> Affiche le rest timer)
- ❌ **Bouton Arrêter**: Quitter la session à tout moment
- ✅ **Session Terminée**: Bouton qui s'affiche à la dernière série

## 📊 Exemple de Session

### Session: Full Body Workout

```
1️⃣ Bench Press - Série 1/4 → [REST 60s] → Série 2/4 → [REST 60s] → ...
2️⃣ Squats - Série 1/3 → [REST 60s] → Série 2/3 → [REST 60s] → Série 3/3
3️⃣ Pull-ups - Série 1/3 → [REST 60s] → Série 2/3 → ...
```

## 🔧 Composants

### **ExercisePlayer**

- Gère la navigation série par série
- Calcule le total des séries globales
- Affiche les détails de chaque série
- Affiche le timer de repos entre les séries

### **RestTimer**

- Chronomètre interactif pour le repos
- Boutons: Démarrer/Pause, Réinitialiser
- Bouton "Prêt pour la Suite" pour passer rapidement
- Temps de repos par défaut: 60 secondes

## 🎮 Utilisation

### Lancer une Session:

1. Aller à la **Home** page
2. Cliquer sur **LANCER SESSION**
3. Choisir votre session dans la liste

### Pendant l'Entraînement:

1. Effectuez vos **répétitions** pour la série affichée
2. Cliquez **Suivant** quand la série est terminée
3. Le **chrono de repos** s'affiche
4. Utilisez le chrono pour vous reposer
5. Cliquez **Prêt pour la Suite** pour continuer
6. Répétez jusqu'à la fin de la session

### Personnaliser le Temps de Repos:

- Vous pouvez modifier le temps de repos directement dans le code
- Actuellement défini à 60 secondes par défaut
- Le bouton "Réinitialiser" ramène à la valeur par défaut

## 📈 Suivi de Progression

À chaque écran vous voyez:

- **Barre de progression**: Avancement en pourcentage
- **Compteur de séries**: Numéro de série courant sur le total
- **Position dans l'exercice**: Numéro de l'exercice et de la série

## ⌚ Chrono de Repos - Détails

```
├── Temps en gros caractères (MM:SS)
├── Barre de progression du repos
├── Bouton Démarrer/Pause
├── Bouton Réinitialiser
└── Bouton "Prêt pour la Suite"
```

Le chrono:

- ✅ Démarre automatiquement
- ✅ Vous pouvez le mettre en pause si besoin
- ✅ Vous pouvez sauter directement à la suite
- ✅ S'auto-complète après 60 secondes (avec notification)

## 🔄 État du Système

L'application gère:

- Position actuelle (exercice + série)
- État du timer de repos
- Progression globale à travers toutes les séries
- Navigation avant/arrière

## 💡 Tips

- 💪 Utilisez le chrono pour vraiment vous reposer entre les séries
- 📱 Gardez votre téléphone visible pendant l'entraînement
- ⏱️ Vous pouvez personnaliser le temps de repos selon vos besoins
- 🎯 Le bouton "Prêt pour la Suite" vous permet de continuer plus tôt si vous êtes prêt

---

**Bon entraînement! 🔥💪**
