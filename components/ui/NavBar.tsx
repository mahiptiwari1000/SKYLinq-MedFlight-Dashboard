import { useNavigation } from "@react-navigation/native";
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

  const navItems = [
    { label: "SKY Linq", route: "SKYLinq" },
    { label: "Pilot Dashboard", route: "PilotDashboard" },
    { label: "Flight Log", route: "FlightLog" },
    { label: "Terminal Requests", route: "TerminalRequests" },
    { label: "Admin Console", route: "AdminConsole" },
  ];

  return (
    <Appbar.Header style={{ backgroundColor: "#1e293b" }}>
      <Appbar.Content title="Pegasus MedFlight" titleStyle={{ fontWeight: "700" }} />
      <View style={{ flexDirection: "row" }}>
        {navItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate(item.route)} style={{ marginHorizontal: 8 }}>
            <Text style={{ color: "#f8fafc", fontWeight: "600" }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Appbar.Header>
  );
};

export default Navbar;
