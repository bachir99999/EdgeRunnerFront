import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function Index() {
  const colors = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 20,
    },
    content: {
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.magenta,
      borderRadius: 10,
      padding: 30,
      backgroundColor: colors.surface,
      shadowColor: colors.magenta,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 15,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.magenta,
      marginBottom: 15,
      textShadowColor: colors.magenta,
      textShadowRadius: 10,
    },
    text: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 10,
    },
    accent: {
      color: colors.green,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>HERO MODE</Text>
        <Text style={styles.text}>
          Customize this <Text style={styles.accent}>Hero</Text> section with
          your own content
        </Text>
      </View>
    </View>
  );
}
