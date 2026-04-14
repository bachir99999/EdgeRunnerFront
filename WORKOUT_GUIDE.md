# 💪 Système de Sessions d'Entraînement - Guide Utilisateur

## 🎯 Fonctionnalités

Votre app possède maintenant un système complet de gestion de sessions d'entraînement avec musculation!

### ✨ Fonctionnalités principales:

1. **Créer des Sessions** - Créez des sessions d'entraînement personnalisées
2. **Ajouter des Exercices** - Sélectionnez parmi 20+ exercices de musculation
3. **Paramétrer les Séries/Reps** - Définissez le nombre de séries et répétitions
4. **Ajouter le Poids** - Optionnel: enregistrez le poids utilisé
5. **Éditer les Exercices** - Modifiez les paramètres directement
6. **Supprimer les Exercices** - Retirez les exercices inutiles
7. **Gérer les Sessions** - Consultez, modifiez ou supprimez vos sessions

## 🗂️ Structure des Fichiers

### Types & Contexte

- `app/types/workout.ts` - Types TypeScript pour les exercices et sessions
- `app/context/WorkoutContext.tsx` - Contexte React pour la gestion d'état
- `app/constants/exercises.ts` - Bibliothèque d'exercices par défaut

### Composants

- `app/components/SessionCreation.tsx` - Modal de création de session
- `app/components/SessionCard.tsx` - Affichage des sessions en liste
- `app/components/SessionDetail.tsx` - Vue détaillée d'une session
- `app/components/ExerciseSelection.tsx` - Modal de sélection d'exercices

### Pages

- `app/session/index.tsx` - Page principale des sessions
- `app/session/_layout.tsx` - Layout pour la section session

## 📚 Exercices Disponibles

L'app inclut 20+ exercices organisés par groupes musculaires:

### 🦵 Jambes (Legs)

- Squats
- Leg Press
- Leg Curls
- Romanian Deadlift

### 💪 Bras (Arms)

- Barbell Curls
- Close Grip Bench
- Hammer Curls

### 🫀 Poitrine (Chest)

- Bench Press
- Incline Press
- Dumbbell Flyes

### 🔙 Dos (Back)

- Deadlift
- Pull-ups
- Barbell Rows

### 💪 Épaules (Shoulders)

- Shoulder Press
- Lateral Raises
- Face Pulls

### 🔄 Core (Core)

- Plank
- Crunches
- Mountain Climbers

## 🚀 Comment Utiliser

### Créer une session:

1. Allez à l'onglet **Session**
2. Cliquez sur le bouton **Nouvelle**
3. Remplissez le nom (et optionnellement la description)
4. Cliquez **Créer**

### Ajouter un exercice:

1. Ouvrez une session
2. Cliquez sur le bouton **+**
3. Sélectionnez un exercice
4. Entrez le nombre de **séries** et **répétitions**
5. Optionnel: ajoutez le **poids**
6. Cliquez **Ajouter**

### Modifier un exercice:

1. Dans la session, cliquez sur l'icône **crayon**
2. Modifiez les paramètres
3. Cliquez **Sauvegarder**

### Supprimer un exercice:

1. Cliquez sur l'icône **poubelle**
2. Confirmez la suppression

## 📊 Exemple de Session

```
Session: Full Body Workout
├── Bench Press (4 séries x 8 reps, 80kg)
├── Squats (3 séries x 10 reps, 100kg)
├── Pull-ups (3 séries x 8 reps)
└── Overhead Press (3 séries x 10 reps, 60kg)
```

## 🎨 Thème Cyberpunk

L'app utilise un thème cyberpunk sombre avec:

- **Fond**: Bleu-violet foncé (#0a0e27)
- **Couleurs**: Cyan, Magenta, Vert néon, Jaune électrique
- **Effets**: Ombres brillantes et text-shadows pour un look futuriste

## 🔌 Intégration avec le Contexte

Le système de sessions utilise React Context pour persister les états. Vous pouvez accéder au contexte partout dans l'app:

```typescript
import { useWorkout } from "../context/WorkoutContext";

const MyComponent = () => {
  const { sessions, currentSession, createSession } = useWorkout();
  // ...
};
```

## 📝 Notes de Développement

- Les données sont stockées en mémoire (vous pouvez ajouter AsyncStorage pour la persistance)
- Chaque session a un ID unique basé sur le timestamp
- Les exercices sont mappés avec leurs détails complets
- Le système est optimisé pour mobile (responsive design)

## 🎯 Futures Améliorations

- [ ] Persistance des données avec AsyncStorage
- [ ] Historique des entraînements
- [ ] Statistiques et progression
- [ ] Import/Export de sessions
- [ ] Synchronisation avec le cloud
- [ ] Notifications de rappel d'entraînement

---

**Bon entraînement! 💪🔥**
