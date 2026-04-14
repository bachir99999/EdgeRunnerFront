import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AnimatedButtonProps {
  onPress?: () => void;
  label?: string;
}

export function AnimatedButton({
  onPress,
  label = "ENTRER",
}: AnimatedButtonProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();

    // Scan line animation
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/(app)");
    }
  };

  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.glowContainer,
          {
            opacity: shadowOpacity,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.buttonWrapper,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{label}</Text>
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateX: scanTranslate }],
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const CYAN = "#00eeff";
const MAGENTA = "#ff00cc";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  glowContainer: {
    position: "absolute",
    width: 180,
    height: 60,
    borderRadius: 12,
    backgroundColor: CYAN,
    opacity: 0.3,
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  buttonWrapper: {
    zIndex: 1,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: CYAN,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: CYAN,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 15,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonText: {
    color: CYAN,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 4,
    fontFamily: "monospace",
    textShadowColor: CYAN,
    textShadowRadius: 8,
  },
  scanLine: {
    position: "absolute",
    width: 2,
    height: 50,
    backgroundColor: MAGENTA,
    opacity: 0.5,
  },
});
