import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AnimatedButton } from "./components/AnimatedButton";
import { HeroBanner } from "./components/HeroBanner";

export default function Splash() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("./(app)");
  };

  return (
    <View style={styles.container}>
      <HeroBanner />

      <View style={styles.buttonContainer}>
        <AnimatedButton onPress={handleEnter} label="ENTRER" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
  },
  buttonContainer: {
    zIndex: 10,
  },
});
