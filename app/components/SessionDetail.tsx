/**
 * Session Detail Component
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DEFAULT_EXERCISES } from "../constants/exercises";
import { useWorkout } from "../context/WorkoutContext";
import { useTheme } from "../hooks/useTheme";
import { WorkoutSession } from "../types/workout";

interface SessionDetailProps {
  session: WorkoutSession;
  onClose: () => void;
  onAddExercise: () => void;
}

export function SessionDetail({
  session,
  onClose,
  onAddExercise,
}: SessionDetailProps) {
  const colors = useTheme();
  const { removeExerciseFromSession, updateSessionExercise } = useWorkout();
  const [editingId, setEditingId] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.green,
      borderBottomWidth: 2,
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.green,
      marginBottom: 5,
    },
    headerDate: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      padding: 15,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 10,
      textShadowColor: colors.cyan,
      textShadowRadius: 3,
    },
    exerciseCard: {
      backgroundColor: colors.surface,
      borderRadius: 10,
      borderLeftColor: colors.yellow,
      borderLeftWidth: 4,
      padding: 12,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    exerciseInfo: {
      flex: 1,
    },
    exerciseName: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 5,
    },
    exerciseStats: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 3,
    },
    exerciseActions: {
      flexDirection: "row",
      gap: 8,
      marginLeft: 10,
    },
    iconButton: {
      width: 32,
      height: 32,
      borderRadius: 6,
      backgroundColor: colors.accent,
      justifyContent: "center",
      alignItems: "center",
      borderColor: colors.border,
      borderWidth: 1,
    },
    editingForm: {
      backgroundColor: colors.accent,
      borderRadius: 10,
      borderColor: colors.cyan,
      borderWidth: 1,
      padding: 12,
      marginBottom: 10,
    },
    formLabel: {
      fontSize: 11,
      color: colors.textSecondary,
      marginBottom: 4,
      fontWeight: "600",
    },
    formInput: {
      backgroundColor: colors.background,
      borderColor: colors.cyan,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      color: colors.text,
      fontSize: 12,
      marginBottom: 8,
    },
    formButtons: {
      flexDirection: "row",
      gap: 8,
    },
    formButton: {
      flex: 1,
      paddingVertical: 6,
      borderRadius: 6,
      alignItems: "center",
      borderWidth: 1,
    },
    saveButton: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    cancelButton: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
    },
    formButtonText: {
      fontSize: 11,
      fontWeight: "bold",
      color: colors.background,
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 14,
      marginBottom: 15,
    },
    addButton: {
      backgroundColor: colors.success,
      borderRadius: 8,
      borderColor: colors.success,
      borderWidth: 2,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    addButtonText: {
      color: colors.background,
      fontSize: 14,
      fontWeight: "bold",
    },
    footer: {
      borderTopColor: colors.border,
      borderTopWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      flexDirection: "row",
      gap: 10,
    },
    footerButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    closeButton: {
      borderColor: colors.textSecondary,
      backgroundColor: colors.background,
    },
    addSessionButton: {
      borderColor: colors.success,
      backgroundColor: colors.success,
    },
    closeButtonText: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: "bold",
    },
    addSessionButtonText: {
      color: colors.background,
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  const handleRemoveExercise = (exerciseId: string) => {
    Alert.alert("Supprimer l'exercice", "Êtes-vous sûr ?", [
      { text: "Annuler", onPress: () => {} },
      {
        text: "Supprimer",
        onPress: () => removeExerciseFromSession(session.id, exerciseId),
        style: "destructive",
      },
    ]);
  };

  const handleSaveEdit = (
    exerciseId: string,
    series: string,
    reps: string,
    weight: string,
  ) => {
    updateSessionExercise(session.id, exerciseId, {
      series: parseInt(series) || 3,
      reps: parseInt(reps) || 10,
      weight: weight ? parseFloat(weight) : undefined,
    });
    setEditingId(null);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{session.name}</Text>
        <Text style={styles.headerDate}>{formatDate(session.updatedAt)}</Text>
      </View>

      <ScrollView style={styles.content}>
        {session.exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Aucun exercice dans cette session
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={onAddExercise}>
              <MaterialCommunityIcons
                name="plus"
                size={18}
                color={colors.background}
              />
              <Text style={styles.addButtonText}>Ajouter un exercice</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.sectionTitle}>
                  Exercices ({session.exercises.length})
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={onAddExercise}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color={colors.background}
                  />
                </TouchableOpacity>
              </View>

              {session.exercises.map((ex) => {
                const exerciseData = DEFAULT_EXERCISES.find(
                  (e) => e.id === ex.exerciseId,
                );
                const isEditing = editingId === ex.exerciseId;

                if (isEditing) {
                  return (
                    <EditingExerciseForm
                      key={ex.exerciseId}
                      exercise={ex}
                      exerciseData={exerciseData}
                      colors={colors}
                      styles={styles}
                      onSave={handleSaveEdit}
                      onCancel={() => setEditingId(null)}
                    />
                  );
                }

                return (
                  <View key={ex.exerciseId} style={styles.exerciseCard}>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>
                        {exerciseData?.name}
                      </Text>
                      <Text style={styles.exerciseStats}>
                        Séries: {ex.series}
                      </Text>
                      <Text style={styles.exerciseStats}>
                        Répétitions: {ex.reps}
                      </Text>
                      {ex.weight && (
                        <Text style={styles.exerciseStats}>
                          Poids: {ex.weight}kg
                        </Text>
                      )}
                    </View>
                    <View style={styles.exerciseActions}>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setEditingId(ex.exerciseId)}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={16}
                          color={colors.cyan}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => handleRemoveExercise(ex.exerciseId)}
                      >
                        <MaterialCommunityIcons
                          name="trash-can"
                          size={16}
                          color={colors.danger}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.closeButton]}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EditingExerciseForm({
  exercise,
  exerciseData,
  colors,
  styles,
  onSave,
  onCancel,
}: any) {
  const [series, setSeries] = useState(exercise.series.toString());
  const [reps, setReps] = useState(exercise.reps.toString());
  const [weight, setWeight] = useState(exercise.weight?.toString() || "");

  return (
    <View style={styles.editingForm}>
      <Text style={styles.exerciseName}>{exerciseData?.name}</Text>

      <Text style={styles.formLabel}>Séries</Text>
      <TextInput
        style={styles.formInput}
        value={series}
        onChangeText={setSeries}
        keyboardType="number-pad"
      />

      <Text style={styles.formLabel}>Répétitions</Text>
      <TextInput
        style={styles.formInput}
        value={reps}
        onChangeText={setReps}
        keyboardType="number-pad"
      />

      <Text style={styles.formLabel}>Poids (kg)</Text>
      <TextInput
        style={styles.formInput}
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="Optionnel"
      />

      <View style={styles.formButtons}>
        <TouchableOpacity
          style={[styles.formButton, styles.saveButton]}
          onPress={() => onSave(exercise.exerciseId, series, reps, weight)}
        >
          <Text style={styles.formButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.formButtonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
