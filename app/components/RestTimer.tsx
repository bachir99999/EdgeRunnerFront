/**
 * Rest Timer Component - Countdown timer for rest between sets
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

interface RestTimerProps {
  initialSeconds?: number;
  onComplete: () => void;
  onSkip: () => void;
}

export function RestTimer({
  initialSeconds = 60,
  onComplete,
  onSkip,
}: RestTimerProps) {
  const colors = useTheme();
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    let interval: any;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds, onComplete]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((initialSeconds - seconds) / initialSeconds) * 100;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      borderColor: colors.green,
      borderWidth: 3,
      padding: 40,
      alignItems: "center",
      width: "100%",
      shadowColor: colors.green,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 15,
      elevation: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.green,
      marginBottom: 10,
      textShadowColor: colors.green,
      textShadowRadius: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 30,
    },
    timerContainer: {
      alignItems: "center",
      marginBottom: 40,
    },
    timerValue: {
      fontSize: 80,
      fontWeight: "bold",
      color: colors.yellow,
      textShadowColor: colors.yellow,
      textShadowRadius: 10,
      marginBottom: 20,
    },
    timerUnit: {
      fontSize: 18,
      color: colors.textSecondary,
      marginBottom: 20,
    },
    progressBar: {
      width: "100%",
      height: 8,
      backgroundColor: colors.accent,
      borderRadius: 4,
      overflow: "hidden",
      marginBottom: 20,
    },
    progressFill: {
      height: "100%",
      backgroundColor: colors.green,
      borderRadius: 4,
    },
    controls: {
      flexDirection: "row",
      gap: 15,
      width: "100%",
      marginBottom: 20,
    },
    controlButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 10,
      borderWidth: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    startButton: {
      borderColor: colors.green,
      backgroundColor: colors.background,
    },
    pauseButton: {
      borderColor: colors.yellow,
      backgroundColor: colors.background,
    },
    resetButton: {
      borderColor: colors.magenta,
      backgroundColor: colors.background,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    startText: {
      color: colors.green,
    },
    pauseText: {
      color: colors.yellow,
    },
    resetText: {
      color: colors.magenta,
    },
    skipButton: {
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.cyan,
      backgroundColor: colors.cyan,
      width: "100%",
      alignItems: "center",
    },
    skipButtonText: {
      color: colors.background,
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>🕐 TEMPS DE REPOS</Text>
        <Text style={styles.subtitle}>
          Reposez-vous avant la prochaine série
        </Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerValue}>{formatTime(seconds)}</Text>
          <Text style={styles.timerUnit}>minutes : secondes</Text>
        </View>

        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              isRunning ? styles.pauseButton : styles.startButton,
            ]}
            onPress={handleStart}
          >
            <MaterialCommunityIcons
              name={isRunning ? "pause" : "play"}
              size={18}
              color={isRunning ? colors.yellow : colors.green}
            />
            <Text
              style={[
                styles.buttonText,
                isRunning ? styles.pauseText : styles.startText,
              ]}
            >
              {isRunning ? "Pause" : "Démarrer"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.resetButton]}
            onPress={handleReset}
          >
            <MaterialCommunityIcons
              name="restart"
              size={18}
              color={colors.magenta}
            />
            <Text style={[styles.buttonText, styles.resetText]}>
              Réinitialiser
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>PRÊT POUR LA SUITE →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
