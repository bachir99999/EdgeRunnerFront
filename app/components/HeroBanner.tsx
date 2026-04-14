// components/HeroBanner.tsx
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export function HeroBanner() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 300],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#080c14", "#0d1526", "#080c14"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Grille cyberpunk */}
      <View style={styles.grid} pointerEvents="none">
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            style={[styles.gridLineH, { top: `${(i + 1) * 16}%` }]}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[styles.gridLineV, { left: `${(i + 1) * 20}%` }]}
          />
        ))}
      </View>

      {/* Scanline animée */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.scanline,
          { transform: [{ translateY: scanTranslate }] },
        ]}
      />

      {/* Titre */}
      <View style={styles.titleBlock}>
        <Text style={styles.titleShadow}>EDGERUNNER</Text>
        <Text style={styles.title}>EDGERUNNER</Text>
        <Animated.View style={[styles.accentLine, { opacity: pulseAnim }]} />
        <Text style={styles.subtitle}>BECOME THE HERO</Text>
      </View>

      {/* Coins décoratifs */}
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <View key={i} style={[styles.corner, pos]} />
      ))}
    </View>
  );
}

const CYAN = "#00eeff";
const MAGENTA = "#ff00cc";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  grid: { ...StyleSheet.absoluteFillObject },
  gridLineH: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: CYAN,
    opacity: 0.1,
  },
  gridLineV: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: CYAN,
    opacity: 0.1,
  },
  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: CYAN,
    opacity: 0.04,
  },
  titleBlock: { alignItems: "center", gap: 6 },
  titleShadow: {
    position: "absolute",
    fontFamily: "monospace",
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 8,
    color: MAGENTA,
    opacity: 0.4,
    top: 2,
    left: 2,
  },
  title: {
    fontFamily: "monospace",
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 8,
    color: "#e0faff",
  },
  accentLine: {
    width: 160,
    height: 1.5,
    backgroundColor: CYAN,
  },
  subtitle: {
    fontFamily: "monospace",
    fontSize: 11,
    letterSpacing: 6,
    color: CYAN,
    opacity: 0.7,
  },
  corner: {
    position: "absolute",
    width: 16,
    height: 16,
    borderColor: MAGENTA,
    borderWidth: 1.5,
    opacity: 0.8,
  },
});
