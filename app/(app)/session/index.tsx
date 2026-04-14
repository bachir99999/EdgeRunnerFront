import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ExerciseSelection } from "../../components/ExerciseSelection";
import { SessionCard } from "../../components/SessionCard";
import { SessionCreation } from "../../components/SessionCreation";
import { SessionDetail } from "../../components/SessionDetail";
import { useWorkout } from "../../context/WorkoutContext";
import { useTheme } from "../../hooks/useTheme";

export default function Index() {
  const colors = useTheme();
  const {
    sessions,
    exercises,
    currentSession,
    setCurrentSession,
    createSession,
    deleteSession,
    addExerciseToSession,
  } = useWorkout();

  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);

  const handleCreateSession = (name: string, description?: string) => {
    const session = createSession(name, description);
    setCurrentSession(session);
    setShowCreateSession(false);
  };

  const handleAddExercise = (
    exerciseId: string,
    series: number,
    reps: number,
    weight?: number,
  ) => {
    if (currentSession) {
      addExerciseToSession(currentSession.id, exerciseId, series, reps, weight);
    }
    setShowAddExercise(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 0,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.green,
      borderBottomWidth: 2,
      paddingHorizontal: 20,
      paddingTop: 15,
      paddingBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.green,
      textShadowColor: colors.green,
      textShadowRadius: 5,
    },
    createButton: {
      backgroundColor: colors.success,
      borderRadius: 8,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    createButtonText: {
      color: colors.background,
      fontSize: 12,
      fontWeight: "bold",
    },
    content: {
      flex: 1,
      padding: 15,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 10,
      textAlign: "center",
    },
    emptyText: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 25,
      lineHeight: 22,
    },
    largeButton: {
      backgroundColor: colors.success,
      borderRadius: 10,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderColor: colors.success,
      borderWidth: 2,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    largeButtonText: {
      color: colors.background,
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  // If a session is selected, show the detail view
  if (currentSession) {
    return (
      <Modal
        visible={true}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SessionDetail
          session={currentSession}
          onClose={() => setCurrentSession(null)}
          onAddExercise={() => setShowAddExercise(true)}
        />
        <ExerciseSelection
          visible={showAddExercise}
          exercises={exercises}
          onSelect={handleAddExercise}
          onClose={() => setShowAddExercise(false)}
        />
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      {sessions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Aucune Session</Text>
          <Text style={styles.emptyText}>
            Créez votre première session d'entraînement avec vos exercices de
            musculation préférés
          </Text>
          <TouchableOpacity
            style={styles.largeButton}
            onPress={() => setShowCreateSession(true)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={colors.background}
            />
            <Text style={styles.largeButtonText}>Créer une Session</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onPress={() => setCurrentSession(session)}
              onDelete={() => deleteSession(session.id)}
            />
          ))}
        </ScrollView>
      )}

      <SessionCreation
        visible={showCreateSession}
        onCreate={handleCreateSession}
        onClose={() => setShowCreateSession(false)}
      />
    </View>
  );
}
