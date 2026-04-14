/**
 * Default exercises library
 */

import { Exercise } from "../types/workout";

export const DEFAULT_EXERCISES: Exercise[] = [
  // Chest
  {
    id: "chest_1",
    name: "Bench Press",
    description: "Classic chest exercise",
    muscleGroup: "chest",
    difficulty: "beginner",
  },
  {
    id: "chest_2",
    name: "Incline Press",
    description: "Upper chest focus",
    muscleGroup: "chest",
    difficulty: "intermediate",
  },
  {
    id: "chest_3",
    name: "Dumbbell Flyes",
    description: "Chest isolation",
    muscleGroup: "chest",
    difficulty: "beginner",
  },

  // Back
  {
    id: "back_1",
    name: "Deadlift",
    description: "Full back workout",
    muscleGroup: "back",
    difficulty: "advanced",
  },
  {
    id: "back_2",
    name: "Pull-ups",
    description: "Back and arms",
    muscleGroup: "back",
    difficulty: "intermediate",
  },
  {
    id: "back_3",
    name: "Barbell Rows",
    description: "Back strength",
    muscleGroup: "back",
    difficulty: "intermediate",
  },

  // Legs
  {
    id: "legs_1",
    name: "Squats",
    description: "Full leg workout",
    muscleGroup: "legs",
    difficulty: "beginner",
  },
  {
    id: "legs_2",
    name: "Leg Press",
    description: "Quadriceps focus",
    muscleGroup: "legs",
    difficulty: "beginner",
  },
  {
    id: "legs_3",
    name: "Leg Curls",
    description: "Hamstring isolation",
    muscleGroup: "legs",
    difficulty: "beginner",
  },
  {
    id: "legs_4",
    name: "Romanian Deadlift",
    description: "Posterior chain",
    muscleGroup: "legs",
    difficulty: "intermediate",
  },

  // Arms
  {
    id: "arms_1",
    name: "Barbell Curls",
    description: "Bicep exercise",
    muscleGroup: "arms",
    difficulty: "beginner",
  },
  {
    id: "arms_2",
    name: "Close Grip Bench",
    description: "Tricep focus",
    muscleGroup: "arms",
    difficulty: "beginner",
  },
  {
    id: "arms_3",
    name: "Hammer Curls",
    description: "Bicep variation",
    muscleGroup: "arms",
    difficulty: "beginner",
  },

  // Shoulders
  {
    id: "shoulders_1",
    name: "Shoulder Press",
    description: "Shoulder strength",
    muscleGroup: "shoulders",
    difficulty: "intermediate",
  },
  {
    id: "shoulders_2",
    name: "Lateral Raises",
    description: "Shoulder isolation",
    muscleGroup: "shoulders",
    difficulty: "beginner",
  },
  {
    id: "shoulders_3",
    name: "Face Pulls",
    description: "Rear shoulder",
    muscleGroup: "shoulders",
    difficulty: "beginner",
  },

  // Core
  {
    id: "core_1",
    name: "Plank",
    description: "Core strength",
    muscleGroup: "core",
    difficulty: "beginner",
  },
  {
    id: "core_2",
    name: "Crunches",
    description: "Abdominal exercise",
    muscleGroup: "core",
    difficulty: "beginner",
  },
  {
    id: "core_3",
    name: "Mountain Climbers",
    description: "Core cardio",
    muscleGroup: "core",
    difficulty: "intermediate",
  },
];
