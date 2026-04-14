/**
 * Types and interfaces for the workout system
 */

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: "chest" | "back" | "legs" | "arms" | "shoulders" | "core";
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface SessionExercise {
  exerciseId: string;
  exercise?: Exercise;
  series: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  name: string;
  description?: string;
  exercises: SessionExercise[];
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface SessionState {
  sessions: WorkoutSession[];
  exercises: Exercise[];
  currentSession: WorkoutSession | null;
}
