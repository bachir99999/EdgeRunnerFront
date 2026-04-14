/**
 * Session Card Component
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DEFAULT_EXERCISES } from "../constants/exercises";
import { useWorkout } from "../context/WorkoutContext";
import { useTheme } from "../hooks/useTheme";
import { WorkoutSession } from "../types/workout";

interface SessionCardProps {
  session: WorkoutSession;
  onPress: () => void;
  onDelete: () => void;
}

export function SessionCard({ session, onPress, onDelete }: SessionCardProps) {
  const colors = useTheme();
  const { removeExerciseFromSession } = useWorkout();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderColor: colors.green,
      borderWidth: 2,
      borderLeftWidth: 4,
      padding: 15,
      marginBottom: 15,
      shadowColor: colors.green,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    titleSection: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.green,
    },
    dateText: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 3,
    },
    exerciseCount: {
      backgroundColor: colors.accent,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderColor: colors.green,
      borderWidth: 1,
    },
    exerciseCountText: {
      color: colors.green,
      fontSize: 12,
      fontWeight: "bold",
    },
    exerciseList: {
      marginTop: 12,
      paddingTop: 12,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    exerciseItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomColor: colors.accent,
      borderBottomWidth: 1,
    },
    exerciseInfo: {
      flex: 1,
    },
    exerciseName: {
      color: colors.cyan,
      fontSize: 13,
      fontWeight: "600",
    },
    exerciseStats: {
      color: colors.textSecondary,
      fontSize: 11,
      marginTop: 2,
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 12,
      paddingTop: 12,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
    },
    editButton: {
      borderColor: colors.cyan,
      backgroundColor: colors.background,
    },
    deleteButton: {
      borderColor: colors.danger,
      backgroundColor: colors.background,
    },
    editIcon: {
      color: colors.cyan,
    },
    deleteIcon: {
      color: colors.danger,
    },
  });

  const handleDelete = () => {
    Alert.alert(
      "Supprimer la session",
      "Êtes-vous sûr de vouloir supprimer cette session ?",
      [
        { text: "Annuler", onPress: () => {} },
        {
          text: "Supprimer",
          onPress: onDelete,
          style: "destructive",
        },
      ],
    );
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{session.name}</Text>
          <Text style={styles.dateText}>{formatDate(session.createdAt)}</Text>
        </View>
        <View style={styles.exerciseCount}>
          <Text style={styles.exerciseCountText}>
            {session.exercises.length} ex.
          </Text>
        </View>
      </View>

      {session.description && (
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            marginBottom: 10,
          }}
        >
          {session.description}
        </Text>
      )}

      {session.exercises.length > 0 && (
        <View style={styles.exerciseList}>
          {session.exercises.slice(0, 3).map((ex) => {
            const exerciseData = DEFAULT_EXERCISES.find(
              (e) => e.id === ex.exerciseId,
            );
            return (
              <View key={ex.exerciseId} style={styles.exerciseItem}>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exerciseData?.name}</Text>
                  <Text style={styles.exerciseStats}>
                    {ex.series}x{ex.reps}
                    {ex.weight ? ` • ${ex.weight}kg` : ""}
                  </Text>
                </View>
              </View>
            );
          })}
          {session.exercises.length > 3 && (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 11,
                marginTop: 5,
              }}
            >
              +{session.exercises.length - 3} autres exercices
            </Text>
          )}
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={onPress}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={16}
            style={styles.editIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <MaterialCommunityIcons
            name="trash-can"
            size={16}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
