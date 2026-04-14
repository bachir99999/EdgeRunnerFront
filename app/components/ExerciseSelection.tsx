/**
 * Exercise Selection Component
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Exercise } from "../types/workout";

interface ExerciseSelectionProps {
  visible: boolean;
  exercises: Exercise[];
  onSelect: (
    exerciseId: string,
    series: number,
    reps: number,
    weight?: number,
  ) => void;
  onClose: () => void;
}

export function ExerciseSelection({
  visible,
  exercises,
  onSelect,
  onClose,
}: ExerciseSelectionProps) {
  const colors = useTheme();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [series, setSeries] = useState("3");
  const [reps, setReps] = useState("10");
  const [weight, setWeight] = useState("");

  const handleConfirm = () => {
    if (selectedExercise) {
      onSelect(
        selectedExercise.id,
        parseInt(series) || 3,
        parseInt(reps) || 10,
        weight ? parseFloat(weight) : undefined,
      );
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedExercise(null);
    setSeries("3");
    setReps("10");
    setWeight("");
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      paddingBottom: 30,
      maxHeight: "90%",
      borderTopColor: colors.cyan,
      borderTopWidth: 2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.cyan,
    },
    closeButton: {
      padding: 5,
    },
    exerciseList: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    exerciseItem: {
      backgroundColor: colors.accent,
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      borderLeftWidth: 4,
      borderLeftColor: colors.magenta,
    },
    exerciseItemActive: {
      borderLeftColor: colors.green,
      borderWidth: 2,
      borderLeftWidth: 4,
      borderColor: colors.cyan,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 5,
    },
    exerciseDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    exerciseMuscle: {
      fontSize: 11,
      color: colors.green,
      fontWeight: "600",
    },
    formSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
      borderTopColor: colors.border,
      borderTopWidth: 1,
      paddingTop: 20,
    },
    formLabel: {
      color: colors.textSecondary,
      fontSize: 12,
      marginBottom: 5,
      fontWeight: "600",
    },
    formRow: {
      flexDirection: "row",
      gap: 15,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      backgroundColor: colors.background,
      borderColor: colors.cyan,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      color: colors.text,
      fontSize: 14,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
    },
    confirmButton: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    cancelButton: {
      backgroundColor: colors.background,
      borderColor: colors.danger,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    confirmText: {
      color: colors.background,
    },
    cancelText: {
      color: colors.danger,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Ajouter un Exercice</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.cyan}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.exerciseList}>
            {exercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => setSelectedExercise(exercise)}
                style={[
                  styles.exerciseItem,
                  selectedExercise?.id === exercise.id &&
                    styles.exerciseItemActive,
                ]}
              >
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDescription}>
                  {exercise.description}
                </Text>
                <Text style={styles.exerciseMuscle}>
                  {exercise.muscleGroup.toUpperCase()} • {exercise.difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedExercise && (
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Nombre de Séries</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 3"
                placeholderTextColor={colors.textSecondary}
                value={series}
                onChangeText={setSeries}
                keyboardType="number-pad"
              />

              <Text style={styles.formLabel}>Nombre de Répétitions</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 10"
                placeholderTextColor={colors.textSecondary}
                value={reps}
                onChangeText={setReps}
                keyboardType="number-pad"
              />

              <Text style={styles.formLabel}>Poids (kg) - Optionnel</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 50"
                placeholderTextColor={colors.textSecondary}
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
              />
            </View>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                resetForm();
                onClose();
              }}
            >
              <Text style={[styles.buttonText, styles.cancelText]}>
                Annuler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                !selectedExercise && { opacity: 0.5 },
              ]}
              onPress={handleConfirm}
              disabled={!selectedExercise}
            >
              <Text style={[styles.buttonText, styles.confirmText]}>
                Ajouter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
