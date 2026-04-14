/**
 * Session Selector - Choose which session to launch
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DEFAULT_EXERCISES } from "../constants/exercises";
import { useTheme } from "../hooks/useTheme";
import { WorkoutSession } from "../types/workout";

interface SessionSelectorProps {
  visible: boolean;
  sessions: WorkoutSession[];
  onSelect: (session: WorkoutSession) => void;
  onClose: () => void;
}

export function SessionSelector({
  visible,
  sessions,
  onSelect,
  onClose,
}: SessionSelectorProps) {
  const colors = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderTopColor: colors.magenta,
      borderTopWidth: 3,
      maxHeight: "85%",
      paddingTop: 20,
      paddingBottom: 30,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.magenta,
      textShadowColor: colors.magenta,
      textShadowRadius: 5,
    },
    closeButton: {
      padding: 8,
    },
    sessionList: {
      paddingHorizontal: 15,
    },
    sessionItem: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      borderColor: colors.magenta,
      borderWidth: 2,
      borderLeftWidth: 5,
      padding: 16,
      marginBottom: 12,
      shadowColor: colors.magenta,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 10,
    },
    sessionItemActive: {
      borderColor: colors.green,
      backgroundColor: colors.background,
    },
    sessionName: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.magenta,
      marginBottom: 5,
    },
    sessionDescription: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 10,
    },
    sessionExerciseCount: {
      fontSize: 12,
      color: colors.yellow,
      fontWeight: "600",
      marginBottom: 10,
    },
    exercisePreview: {
      fontSize: 11,
      color: colors.cyan,
      fontStyle: "italic",
      marginBottom: 12,
      paddingLeft: 8,
      borderLeftColor: colors.cyan,
      borderLeftWidth: 2,
    },
    launchButton: {
      backgroundColor: colors.green,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    launchButtonText: {
      color: colors.background,
      fontWeight: "bold",
      fontSize: 13,
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 30,
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: "center",
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
            <Text style={styles.title}>🚀 LANCER UNE SESSION</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.magenta}
              />
            </TouchableOpacity>
          </View>

          {sessions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Aucune session disponible. Créez-en une dans l'onglet Session!
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.sessionList}
              showsVerticalScrollIndicator={false}
            >
              {sessions.map((session) => (
                <View key={session.id} style={styles.sessionItem}>
                  <Text style={styles.sessionName}>{session.name}</Text>
                  {session.description && (
                    <Text style={styles.sessionDescription}>
                      {session.description}
                    </Text>
                  )}
                  <Text style={styles.sessionExerciseCount}>
                    💪 {session.exercises.length} exercice(s)
                  </Text>

                  {session.exercises.slice(0, 2).map((ex) => {
                    const exerciseData = DEFAULT_EXERCISES.find(
                      (e) => e.id === ex.exerciseId,
                    );
                    return (
                      <Text key={ex.exerciseId} style={styles.exercisePreview}>
                        • {exerciseData?.name} ({ex.series}x{ex.reps})
                      </Text>
                    );
                  })}

                  {session.exercises.length > 2 && (
                    <Text style={styles.exercisePreview}>
                      • +{session.exercises.length - 2} autres exercices
                    </Text>
                  )}

                  <TouchableOpacity
                    style={styles.launchButton}
                    onPress={() => onSelect(session)}
                  >
                    <MaterialCommunityIcons
                      name="play"
                      size={18}
                      color={colors.background}
                    />
                    <Text style={styles.launchButtonText}>LANCER</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}
