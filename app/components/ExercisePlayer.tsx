/**
 * Exercise Player Component - Navigate through sets and exercises in a session
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DEFAULT_EXERCISES } from "../constants/exercises";
import { useTheme } from "../hooks/useTheme";
import { WorkoutSession } from "../types/workout";
import { RestTimer } from "./RestTimer";

interface ExercisePlayerProps {
  session: WorkoutSession;
  onClose: () => void;
}

interface CurrentPosition {
  exerciseIndex: number;
  seriesIndex: number;
}

export function ExercisePlayer({ session, onClose }: ExercisePlayerProps) {
  const colors = useTheme();
  const [position, setPosition] = useState<CurrentPosition>({
    exerciseIndex: 0,
    seriesIndex: 0,
  });
  const [showRest, setShowRest] = useState(false);
  const [restTime, setRestTime] = useState(60); // Default 60 seconds rest

  // Calculate total series count
  const totalSeries = session.exercises.reduce((sum, ex) => sum + ex.series, 0);

  // Calculate current series number globally
  let currentSeriesGlobal = 1;
  for (let i = 0; i < position.exerciseIndex; i++) {
    currentSeriesGlobal += session.exercises[i].series;
  }
  currentSeriesGlobal += position.seriesIndex + 1;

  const currentExerciseObj = session.exercises[position.exerciseIndex];
  const currentSeriesNum = position.seriesIndex + 1;
  const exerciseData = DEFAULT_EXERCISES.find(
    (e) => e.id === currentExerciseObj?.exerciseId,
  );

  const isLastSeries =
    position.exerciseIndex === session.exercises.length - 1 &&
    position.seriesIndex === currentExerciseObj.series - 1;

  const handleNext = () => {
    setShowRest(true);
    setRestTime(60); // Show rest timer
  };

  const handleRestComplete = () => {
    // Move to next series or exercise
    if (position.seriesIndex < currentExerciseObj.series - 1) {
      // Move to next series in same exercise
      setPosition({
        exerciseIndex: position.exerciseIndex,
        seriesIndex: position.seriesIndex + 1,
      });
    } else if (position.exerciseIndex < session.exercises.length - 1) {
      // Move to first series of next exercise
      setPosition({
        exerciseIndex: position.exerciseIndex + 1,
        seriesIndex: 0,
      });
    }
    setShowRest(false);
  };

  const handleSkipRest = () => {
    handleRestComplete();
  };

  const handlePrevious = () => {
    if (position.seriesIndex > 0) {
      // Previous series in same exercise
      setPosition({
        exerciseIndex: position.exerciseIndex,
        seriesIndex: position.seriesIndex - 1,
      });
    } else if (position.exerciseIndex > 0) {
      // Last series of previous exercise
      const prevExercise = session.exercises[position.exerciseIndex - 1];
      setPosition({
        exerciseIndex: position.exerciseIndex - 1,
        seriesIndex: prevExercise.series - 1,
      });
    }
  };

  const progress = Math.round((currentSeriesGlobal / totalSeries) * 100);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.magenta,
      borderBottomWidth: 2,
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.magenta,
      flex: 1,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.accent,
      justifyContent: "center",
      alignItems: "center",
      borderColor: colors.danger,
      borderWidth: 1,
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: "space-between",
    },
    exerciseCard: {
      backgroundColor: colors.surface,
      borderRadius: 15,
      borderColor: colors.cyan,
      borderWidth: 2,
      padding: 25,
      marginBottom: 20,
      shadowColor: colors.cyan,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 15,
    },
    progressBar: {
      backgroundColor: colors.accent,
      height: 8,
      borderRadius: 4,
      marginBottom: 20,
      overflow: "hidden",
    },
    progressFill: {
      backgroundColor: colors.green,
      height: "100%",
      borderRadius: 4,
    },
    progressText: {
      textAlign: "center",
      color: colors.textSecondary,
      fontSize: 12,
      marginBottom: 15,
      fontWeight: "600",
    },
    seriesCounter: {
      fontSize: 12,
      color: colors.yellow,
      fontWeight: "bold",
      marginBottom: 10,
    },
    exerciseName: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 15,
      textShadowColor: colors.cyan,
      textShadowRadius: 8,
    },
    exerciseDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 20,
      lineHeight: 20,
    },
    statsContainer: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      padding: 15,
      marginBottom: 20,
      borderLeftColor: colors.green,
      borderLeftWidth: 4,
    },
    statRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 12,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginBottom: 5,
      fontWeight: "600",
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.green,
    },
    muscleGroup: {
      fontSize: 12,
      color: colors.magenta,
      fontWeight: "600",
      marginTop: 15,
      paddingTop: 15,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    controlsContainer: {
      flexDirection: "row",
      gap: 10,
      marginTop: 20,
    },
    navButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
    },
    prevButton: {
      borderColor: colors.magenta,
      backgroundColor: colors.background,
    },
    nextButton: {
      borderColor: colors.yellow,
      backgroundColor: colors.background,
    },
    disabledButton: {
      opacity: 0.4,
    },
    buttonText: {
      fontSize: 13,
      fontWeight: "bold",
    },
    prevText: {
      color: colors.magenta,
    },
    nextText: {
      color: colors.yellow,
    },
    footerButtons: {
      flexDirection: "row",
      gap: 10,
      paddingTop: 15,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    footerButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 2,
      alignItems: "center",
    },
    stopButton: {
      borderColor: colors.textSecondary,
      backgroundColor: colors.background,
    },
    finishButton: {
      borderColor: colors.success,
      backgroundColor: colors.success,
    },
    stopButtonText: {
      color: colors.textSecondary,
      fontWeight: "bold",
    },
    finishButtonText: {
      color: colors.background,
      fontWeight: "bold",
    },
  });

  if (showRest) {
    return (
      <RestTimer
        initialSeconds={restTime}
        onComplete={handleRestComplete}
        onSkip={handleSkipRest}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EN COURS</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={colors.danger}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Série {currentSeriesGlobal} sur {totalSeries} ({progress}%)
          </Text>

          <View style={styles.exerciseCard}>
            <Text style={styles.seriesCounter}>
              Exercice {position.exerciseIndex + 1} - Série {currentSeriesNum}/
              {currentExerciseObj.series}
            </Text>
            <Text style={styles.exerciseName}>{exerciseData?.name}</Text>
            <Text style={styles.exerciseDescription}>
              {exerciseData?.description}
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Reps</Text>
                  <Text style={styles.statValue}>
                    {currentExerciseObj.reps}
                  </Text>
                </View>
                {currentExerciseObj.weight && (
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Poids</Text>
                    <Text style={styles.statValue}>
                      {currentExerciseObj.weight}kg
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.muscleGroup}>
                Groupe musculaire: {exerciseData?.muscleGroup.toUpperCase()}
              </Text>
            </View>

            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  styles.prevButton,
                  currentSeriesGlobal === 1 && styles.disabledButton,
                ]}
                onPress={handlePrevious}
                disabled={currentSeriesGlobal === 1}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color={colors.magenta}
                />
                <Text style={[styles.buttonText, styles.prevText]}>
                  Précédent
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={handleNext}
              >
                <Text style={[styles.buttonText, styles.nextText]}>
                  {isLastSeries ? "Terminer" : "Suivant"}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.yellow}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.footerButton, styles.stopButton]}
            onPress={onClose}
          >
            <Text style={styles.stopButtonText}>Arrêter</Text>
          </TouchableOpacity>
          {isLastSeries && (
            <TouchableOpacity
              style={[styles.footerButton, styles.finishButton]}
              onPress={onClose}
            >
              <Text style={styles.finishButtonText}>Session Terminée! 🔥</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
