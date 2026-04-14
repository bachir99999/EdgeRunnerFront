/**
 * Workout Session Context
 */

import React, { createContext, ReactNode, useContext, useState } from "react";
import { DEFAULT_EXERCISES } from "../constants/exercises";
import { Exercise, SessionExercise, WorkoutSession } from "../types/workout";

interface WorkoutContextType {
  sessions: WorkoutSession[];
  exercises: Exercise[];
  currentSession: WorkoutSession | null;
  createSession: (name: string, description?: string) => WorkoutSession;
  deleteSession: (id: string) => void;
  updateSession: (session: WorkoutSession) => void;
  setCurrentSession: (session: WorkoutSession | null) => void;
  addExerciseToSession: (
    sessionId: string,
    exerciseId: string,
    series: number,
    reps: number,
    weight?: number,
  ) => void;
  removeExerciseFromSession: (sessionId: string, exerciseId: string) => void;
  updateSessionExercise: (
    sessionId: string,
    exerciseId: string,
    updates: Partial<SessionExercise>,
  ) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(
    null,
  );

  const createSession = (
    name: string,
    description?: string,
  ): WorkoutSession => {
    const newSession: WorkoutSession = {
      id: Date.now().toString(),
      name,
      description,
      exercises: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions((prev) => [...prev, newSession]);
    return newSession;
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (currentSession?.id === id) {
      setCurrentSession(null);
    }
  };

  const updateSession = (session: WorkoutSession) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === session.id ? { ...session, updatedAt: new Date() } : s,
      ),
    );
    if (currentSession?.id === session.id) {
      setCurrentSession({ ...session, updatedAt: new Date() });
    }
  };

  const addExerciseToSession = (
    sessionId: string,
    exerciseId: string,
    series: number,
    reps: number,
    weight?: number,
  ) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const exercise = DEFAULT_EXERCISES.find((e) => e.id === exerciseId);
          return {
            ...s,
            exercises: [
              ...s.exercises,
              { exerciseId, exercise, series, reps, weight },
            ],
            updatedAt: new Date(),
          };
        }
        return s;
      }),
    );

    if (currentSession?.id === sessionId) {
      const exercise = DEFAULT_EXERCISES.find((e) => e.id === exerciseId);
      setCurrentSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          exercises: [
            ...prev.exercises,
            { exerciseId, exercise, series, reps, weight },
          ],
          updatedAt: new Date(),
        };
      });
    }
  };

  const removeExerciseFromSession = (sessionId: string, exerciseId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            exercises: s.exercises.filter((e) => e.exerciseId !== exerciseId),
            updatedAt: new Date(),
          };
        }
        return s;
      }),
    );

    if (currentSession?.id === sessionId) {
      setCurrentSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          exercises: prev.exercises.filter((e) => e.exerciseId !== exerciseId),
          updatedAt: new Date(),
        };
      });
    }
  };

  const updateSessionExercise = (
    sessionId: string,
    exerciseId: string,
    updates: Partial<SessionExercise>,
  ) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            exercises: s.exercises.map((e) =>
              e.exerciseId === exerciseId ? { ...e, ...updates } : e,
            ),
            updatedAt: new Date(),
          };
        }
        return s;
      }),
    );

    if (currentSession?.id === sessionId) {
      setCurrentSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          exercises: prev.exercises.map((e) =>
            e.exerciseId === exerciseId ? { ...e, ...updates } : e,
          ),
          updatedAt: new Date(),
        };
      });
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        sessions,
        exercises: DEFAULT_EXERCISES,
        currentSession,
        createSession,
        deleteSession,
        updateSession,
        setCurrentSession,
        addExerciseToSession,
        removeExerciseFromSession,
        updateSessionExercise,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
