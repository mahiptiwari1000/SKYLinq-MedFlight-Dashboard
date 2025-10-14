import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

type RootStackParamList = {
  SKYLinq: undefined;
  PilotDashboard: undefined;
  FlightLog: undefined;
  TerminalRequests: undefined;
  AdminConsole: undefined;
};

type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Navbar = () => {
  const navigation = useNavigation<NavbarNavigationProp>();
  const route = useRoute(); // Get current route name

  const navItems = [
    { label: "SKY Linq", route: "SKYLinq" },
    { label: "Pilot Dashboard", route: "PilotDashboard" },
    { label: "Flight Log", route: "FlightLog" },
    { label: "Terminal Requests", route: "TerminalRequests" },
    { label: "Admin Console", route: "AdminConsole" },
  ];

  return (
    <Appbar.Header style={{ backgroundColor: "#0f172a", elevation: 4 }}>
      <Appbar.Content
        title="Pegasus MedFlight"
        titleStyle={{ fontWeight: "700", color: "#f8fafc" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {navItems.map((item, index) => {
          const isActive = route.name === item.route;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.route as never)}
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
