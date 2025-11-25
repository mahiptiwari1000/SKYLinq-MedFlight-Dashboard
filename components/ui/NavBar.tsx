// src/components/ui/Navbar.tsx
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

type RootStackParamList = {
  SKYLinq: undefined;
  PilotDashboard: undefined;
  MedPartnerDashboard: undefined;
  AdminConsole: undefined;
  FlightLogs: undefined;        // exists in stack, hidden in navbar
  TerminalRequests: undefined;  // exists in stack, hidden in navbar
};

type RouteName = keyof RootStackParamList;
type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Navbar: React.FC = () => {
  const navigation = useNavigation<NavbarNavigationProp>();
  const route = useRoute();

  // Only show these in the top navbar:
  const MENU_ROUTES: { label: string; route: RouteName }[] = [
    { label: "Med Partner Terminal", route: "MedPartnerDashboard" },
    { label: "Pilot Dashboard", route: "PilotDashboard" },
    { label: "Admin Console", route: "AdminConsole" },
  ];

  const current = (route.name as RouteName) ?? "PilotDashboard";

  return (
    <Appbar.Header style={{ backgroundColor: "#0f172a", elevation: 4 }}>
      <Appbar.Content
        title="Pegasus MedFlight"
        titleStyle={{ fontWeight: "700", color: "#f8fafc" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {MENU_ROUTES.map((item) => {
          const isActive = current === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => navigation.navigate(item.route)}
              style={{
                marginHorizontal: 6,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 6,
                backgroundColor: isActive ? "#1e293b" : "transparent",
              }}
            >
              <Text
                style={{
                  color: isActive ? "#38bdf8" : "#f8fafc",
                  fontWeight: isActive ? "700" : "500",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Appbar.Header>
  );
};

export default Navbar;
