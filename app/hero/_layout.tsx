import { Stack } from "expo-router";
import { useTheme } from "../hooks/useTheme";

export default function Layout() {
  const colors = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          // borderBottomColor: colors.borderGlow,
          // borderBottomWidth: 1,
        },
        headerTintColor: colors.cyan,
        headerTitleStyle: {
          fontWeight: "bold",
          color: colors.cyan,
          // textShadowColor: colors.cyan,
          // textShadowRadius: 3,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Hero" }} />
    </Stack>
  );
}
