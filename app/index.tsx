import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ExercisePlayer } from "./components/ExercisePlayer";
import { SessionSelector } from "./components/SessionSelector";
import { useWorkout } from "./context/WorkoutContext";
import { useTheme } from "./hooks/useTheme";

export default function Index() {
  const colors = useTheme();
  const { sessions } = useWorkout();
  const [showSessionSelector, setShowSessionSelector] = useState(false);
  const [activeSession, setActiveSession] = useState<any>(null);

  const handleSelectSession = (session: any) => {
    setActiveSession(session);
    setShowSessionSelector(false);
  };

  const handleCloseSession = () => {
    setActiveSession(null);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    content: {
      flex: 1,
      justifyContent: "space-between",
    },
    header: {
      alignItems: "center",
      marginBottom: 40,
      marginTop: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 10,
      textShadowColor: colors.cyan,
      textShadowRadius: 12,
    },
    subtitle: {
      fontSize: 16,
      color: colors.magenta,
      textAlign: "center",
    },
    mainCard: {
      backgroundColor: colors.surface,
      borderRadius: 15,
      borderColor: colors.yellow,
      borderWidth: 2,
      padding: 30,
      marginBottom: 30,
      shadowColor: colors.yellow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 15,
      alignItems: "center",
    },
    statsContainer: {
      marginBottom: 25,
      width: "100%",
    },
    statRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 15,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statValue: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.green,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: "600",
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 15,
    },
    infoText: {
      fontSize: 13,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 20,
    },
    launchButton: {
      backgroundColor: colors.success,
      borderColor: colors.success,
      borderWidth: 2,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      width: "100%",
      shadowColor: colors.success,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 10,
    },
    launchButtonText: {
      color: colors.background,
      fontSize: 18,
      fontWeight: "bold",
    },
    noSessionsCard: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      borderColor: colors.textSecondary,
      borderWidth: 1,
      padding: 20,
      alignItems: "center",
      marginBottom: 20,
    },
    noSessionsText: {
      color: colors.textSecondary,
      fontSize: 14,
      textAlign: "center",
    },
    exampleCard: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      borderLeftColor: colors.cyan,
      borderLeftWidth: 4,
      padding: 15,
      marginBottom: 15,
    },
    exampleTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.cyan,
      marginBottom: 8,
    },
    exampleText: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });

  // If a session is active, show the exercise player
  if (activeSession) {
    return (
      <Modal
        visible={true}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ExercisePlayer session={activeSession} onClose={handleCloseSession} />
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>⚡ EDGERUNNER</Text>
          <Text style={styles.subtitle}>Entraînement Cyberpunk</Text>
        </View>

        {sessions.length > 0 ? (
          <>
            <View style={styles.mainCard}>
              <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{sessions.length}</Text>
                    <Text style={styles.statLabel}>Sessions</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {sessions.reduce((acc, s) => acc + s.exercises.length, 0)}
                    </Text>
                    <Text style={styles.statLabel}>Exercices Totaux</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.infoText}>
                Sélectionnez une session pour commencer votre entraînement.
                Naviguez à travers chaque exercice et suivez vos performances.
              </Text>

              <TouchableOpacity
                style={styles.launchButton}
                onPress={() => setShowSessionSelector(true)}
              >
                <MaterialCommunityIcons
                  name="play-circle"
                  size={24}
                  color={colors.background}
                />
                <Text style={styles.launchButtonText}>LANCER SESSION</Text>
              </TouchableOpacity>
            </View>

            {sessions.length > 0 && (
              <View style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>💡 DERNIÈRE SESSION</Text>
                <Text style={styles.exampleText}>
                  {sessions[sessions.length - 1].name}
                </Text>
                <Text style={styles.exampleText}>
                  {sessions[sessions.length - 1].exercises.length} exercices
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            <View style={styles.mainCard}>
              <View style={styles.noSessionsCard}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={40}
                  color={colors.textSecondary}
                  style={{ marginBottom: 10 }}
                />
                <Text style={styles.noSessionsText}>Aucune session créée</Text>
              </View>

              <Text style={styles.infoText}>
                Créez votre première session d'entraînement dans l'onglet
                "Session" pour commencer votre parcours cyberpunk!
              </Text>

              <View style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>📝 COMMENT COMMENCER?</Text>
                <Text style={styles.exampleText}>
                  1. Allez à l'onglet Session{"\n"}
                  2. Cliquez "Nouvelle"{"\n"}
                  3. Nommez votre session{"\n"}
                  4. Ajoutez des exercices{"\n"}
                  5. Revenez ici et lancez!
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      <SessionSelector
        visible={showSessionSelector}
        sessions={sessions}
        onSelect={handleSelectSession}
        onClose={() => setShowSessionSelector(false)}
      />
    </View>
  );
}
