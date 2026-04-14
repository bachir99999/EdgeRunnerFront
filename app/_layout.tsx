import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WorkoutProvider } from "./context/WorkoutContext";
import { useTheme } from "./hooks/useTheme";

export default function RootLayout() {
  const colors = useTheme();

  return (
    <WorkoutProvider>
      <>
        <StatusBar backgroundColor={colors.background} />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.cyan,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.borderGlow,
              borderTopWidth: 1,
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            headerStyle: {
              backgroundColor: colors.surface,
              borderBottomColor: colors.borderGlow,
              borderBottomWidth: 1,
            },
            headerTintColor: colors.cyan,
            headerTitleStyle: {
              fontWeight: "bold",
              color: colors.cyan,
              fontSize: 18,
              textShadowColor: colors.cyan,
              textShadowRadius: 3,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: true,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" size={28} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="session"
            options={{
              title: "Session",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="controller-classic"
                  size={28}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="hero"
            options={{
              title: "Hero",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="flash" size={28} color={color} />
              ),
            }}
          />
        </Tabs>
      </>
    </WorkoutProvider>
  );
}
