import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WorkoutProvider } from "./context/WorkoutContext";
import { useTheme } from "./hooks/useTheme";

export default function RootLayout() {
  const colors = useTheme();

  return (
    <WorkoutProvider>
      <>
        <StatusBar backgroundColor={colors.background} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        ></Stack>
      </>
    </WorkoutProvider>
  );
}
